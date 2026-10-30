import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  appointmentSchema,
  doctorEmailSubject,
  formatPreferredDate,
  patientConfirmationText,
} from "@/lib/appointment";
import { CONTACT } from "@/lib/site";

const payloadSchema = z.object({
  fields: z.record(z.unknown()),
  /** Honeypot: real visitors never fill this hidden field. */
  website: z.string().max(200).optional().default(""),
  /** Milliseconds the form was open before submitting. */
  elapsedMs: z.number().int().nonnegative().max(86_400_000),
});

type Result = { ok: true } | { ok: false; reason: "invalid" | "rate_limited" | "send_failed"; message?: string };

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
  .validator((input: unknown) => payloadSchema.parse(input))
  .handler(async ({ data }): Promise<Result> => {
    // Likely bot: honeypot filled or submitted implausibly fast. Never send.
    if (data.website.trim() !== "" || data.elapsedMs < 2500) {
      return { ok: false, reason: "invalid" };
    }

    const parsed = appointmentSchema().safeParse(data.fields);
    if (!parsed.success) return { ok: false, reason: "invalid" };
    const a = parsed.data;

    const { getRequestHeader } = await import("@tanstack/react-start/server");
    const requestOrigin = getRequestHeader("origin");
    const requestReferer = getRequestHeader("referer");
    const forwardedHost = getRequestHeader("x-forwarded-host");
    const forwardedProto = getRequestHeader("x-forwarded-proto") ?? "https";
    const siteUrl =
      requestOrigin ??
      (forwardedHost ? `${forwardedProto}://${forwardedHost}` : undefined);
    const formPageUrl = requestReferer ?? (siteUrl ? `${siteUrl}/` : undefined);
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

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error("Appointment email service is missing WEB3FORMS_ACCESS_KEY.");
      return {
        ok: false,
        reason: "send_failed",
        message: "Appointment email is not configured yet. Please contact us on WhatsApp.",
      };
    }

    const body = {
      access_key: accessKey,
      subject: doctorEmailSubject(a.name),
      from_name: "Dr. Adithya Appointment Website",
      email: a.email,
      replyto: a.email,
      "Patient Name": a.name,
      "Phone Number": a.phone,
      Gender: a.gender,
      Age: String(a.age),
      "Patient Email": a.email,
      "Preferred Appointment Date": formatPreferredDate(a.date),
      "Consultation Type": a.consultation,
      "Health Concern / Problem": a.problem,
      "Submitted On": `${submittedOn} IST`,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json().catch(() => null)) as
        | { success?: boolean; message?: string; error?: string }
        | null;
      if (!res.ok || json?.success !== true) {
        console.error("Appointment email service rejected", res.status, json?.message || json?.error);
        return {
          ok: false,
          reason: "send_failed",
          message: json?.message || json?.error || `Email service returned HTTP ${res.status}.`,
        };
      }
      return { ok: true };
    } catch (err) {
      console.error("Appointment email relay error", err instanceof Error ? err.message : "unknown");
      return {
        ok: false,
        reason: "send_failed",
        message: "Could not connect to the email service. Please try again later.",
      };
    }
  });
