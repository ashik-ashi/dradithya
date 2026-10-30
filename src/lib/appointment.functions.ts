import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  appointmentSchema,
  doctorEmailSubject,
  formatPreferredDate,
  patientConfirmationText,
} from "@/lib/appointment";
import { CONTACT, SITE_URL } from "@/lib/site";

const payloadSchema = z.object({
  fields: z.record(z.unknown()),
  /** Honeypot: real visitors never fill this hidden field. */
  website: z.string().max(200).optional().default(""),
  /** Milliseconds the form was open before submitting. */
  elapsedMs: z.number().int().nonnegative().max(86_400_000),
});

type Result = { ok: true } | { ok: false; reason: "invalid" | "rate_limited" | "send_failed" };

// Best-effort per-instance limiter: 3 requests per 10 minutes per visitor.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

export const requestAppointment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => payloadSchema.parse(input))
  .handler(async ({ data }): Promise<Result> => {
    // Bots: pretend success silently is avoided; just reject without sending.
    if (data.website.trim() !== "" || data.elapsedMs < 2500) {
      return { ok: false, reason: "invalid" };
    }

    const parsed = appointmentSchema().safeParse(data.fields);
    if (!parsed.success) return { ok: false, reason: "invalid" };
    const a = parsed.data;

    const { getRequestHeader } = await import("@tanstack/react-start/server");
    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    if (rateLimited(ip)) return { ok: false, reason: "rate_limited" };

    const submittedOn = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    const body = {
      _subject: doctorEmailSubject(a.name),
      _template: "table",
      _captcha: "false",
      _replyto: a.email,
      _autoresponse: patientConfirmationText(a),
      "New Consultation Appointment Request": "Patient Details",
      Name: a.name,
      Phone: a.phone,
      Gender: a.gender,
      Age: String(a.age),
      email: a.email,
      "Preferred Appointment Date": formatPreferredDate(a.date),
      "Consultation Type": a.consultation,
      "Health Concern / Problem": a.problem,
      "Submitted On": `${submittedOn} IST`,
    };

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: SITE_URL,
          Referer: `${SITE_URL}/`,
        },
        body: JSON.stringify(body),
      });
      const json = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
      const ok = res.ok && (json?.success === true || json?.success === "true");
      if (!ok) {
        console.error("Appointment relay rejected", res.status, json?.message);
        return { ok: false, reason: "send_failed" };
      }
      return { ok: true };
    } catch (err) {
      console.error("Appointment relay error", err instanceof Error ? err.message : "unknown");
      return { ok: false, reason: "send_failed" };
    }
  });
