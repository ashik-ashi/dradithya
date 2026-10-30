import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CalendarCheck, Loader2, ShieldAlert } from "lucide-react";
import {
  AGE_MAX,
  AGE_MIN,
  CONSULTATION_TYPES,
  GENDERS,
  appointmentSchema,
  doctorEmailSubject,
  formatPreferredDate,
  todayInIndia,
  whatsappDetailsUrl,
  type Appointment,
  type AppointmentField,
} from "@/lib/appointment";
import { CONTACT } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LinkButton } from "./LinkButton";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { LeafSprig, WhatsAppIcon } from "./icons";

// Paste the Web3Forms access key for adithaysurya472@gmail.com here when ready.
const WEB3FORMS_ACCESS_KEY = "262d725a-8d82-44ef-9af3-4e5b52590dbe";

type Values = Record<AppointmentField, string>;
const EMPTY: Values = {
  name: "",
  phone: "",
  gender: "",
  age: "",
  email: "",
  date: "",
  consultation: "",
  problem: "",
};

export const SELECT_CONSULTATION_EVENT = "appointment:select-consultation";

type Status = "idle" | "sending" | "success" | "error";

const fieldBase =
  "w-full rounded-2xl border bg-paper px-4 text-base text-foreground shadow-[inset_0_1px_2px_oklch(0_0_0/0.03)] transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/70 focus:border-forest focus:ring-2 focus:ring-sage/40 focus:outline-none disabled:opacity-60";

export function AppointmentForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<AppointmentField, string | undefined>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [rateLimited, setRateLimited] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sent, setSent] = useState<Appointment | null>(null);
  const [minDate, setMinDate] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const openedAt = useRef(0);
  const sendingRef = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMinDate(todayInIndia());
    openedAt.current = Date.now();
    const onSelect = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if ((CONSULTATION_TYPES as readonly string[]).includes(value)) {
        setValues((v) => ({ ...v, consultation: value }));
        setErrors((er) => ({ ...er, consultation: undefined }));
      }
    };
    window.addEventListener(SELECT_CONSULTATION_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_CONSULTATION_EVENT, onSelect);
  }, []);

  const set = (field: AppointmentField) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendingRef.current) return;

    const parsed = appointmentSchema(todayInIndia()).safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<AppointmentField, string | undefined>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as AppointmentField;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(EMPTY).find((k) => next[k as AppointmentField]);
      if (first) document.getElementById(`appt-${first}`)?.focus();
      return;
    }

    sendingRef.current = true;
    setStatus("sending");
    setRateLimited(false);
    setSendError(null);
    try {
      const accessKey = WEB3FORMS_ACCESS_KEY;
      if (!accessKey || accessKey === "PASTE_WEB3FORMS_ACCESS_KEY_HERE") {
        throw new Error("Appointment email is not configured yet. Please contact us on WhatsApp.");
      }

      // Basic client-side bot checks. Web3Forms also applies its own spam protection.
      if (honeypot.current?.value || Date.now() - openedAt.current < 2500) {
        throw new Error("Your request could not be verified. Please refresh the page and try again.");
      }

      const a = parsed.data;
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: doctorEmailSubject(a.name),
          from_name: "Dr. Adithya Appointment Website",
          email: a.email,
          replyto: a.email,
          botcheck: false,
          "Patient Name": a.name,
          "Phone Number": a.phone,
          Gender: a.gender,
          Age: String(a.age),
          "Patient Email": a.email,
          "Preferred Appointment Date": formatPreferredDate(a.date),
          "Consultation Type": a.consultation,
          "Health Concern / Problem": a.problem,
          "Submitted On": `${new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "Asia/Kolkata",
          }).format(new Date())} IST`,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string; error?: string; body?: { message?: string } }
        | null;
      if (!response.ok || result?.success !== true) {
        throw new Error(
          result?.message ||
            result?.body?.message ||
            result?.error ||
            `Email service returned HTTP ${response.status}. Please try again later.`,
        );
      }

      setSent(a);
      setValues(EMPTY);
      setErrors({});
      setStatus("success");
    } catch (err) {
      setSendError(
        err instanceof Error
          ? err.message
          : "Unable to send your appointment request. Please try again.",
      );
      setStatus("error");
    } finally {
      sendingRef.current = false;
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  const sending = status === "sending";

  return (
    <section
      id="appointment"
      aria-labelledby="appointment-title"
      className="paper-grain relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <LeafSprig className="pointer-events-none absolute -top-6 -right-10 w-36 rotate-180 text-sage/30 sm:w-52" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="appointment-title"
          eyebrow="Appointment Request"
          title="Book Your Consultation"
          subtitle="Share a few details and your preferred date. Dr. Adithya will review your request and contact you to arrange the appointment."
        />

        <Reveal className="card-premium mt-12 p-5 sm:p-8 lg:p-10">
          {status === "success" && sent ? (
            <div ref={statusRef} tabIndex={-1} role="status" className="text-center outline-none">
              <span className="icon-badge mx-auto size-14">
                <CalendarCheck className="size-6" aria-hidden="true" />
              </span>
              <p className="eyebrow mt-6">Appointment request sent successfully!</p>
              <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">Appointment Request Sent</h3>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
                Thank you, {sent.name}. Your consultation request has been received. Dr. Adithya
                will review it and contact you regarding the appointment.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <LinkButton href={whatsappDetailsUrl(sent)} variant="whatsapp">
                  <WhatsAppIcon />
                  Send Details on WhatsApp
                </LinkButton>
                <LinkButton href={CONTACT.links.whatsapp} variant="outline">
                  <WhatsAppIcon />
                  WhatsApp Dr. Adithya
                </LinkButton>
                <LinkButton href="#services" variant="outline">
                  Back to Services
                </LinkButton>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSent(null);
                  setStatus("idle");
                  openedAt.current = Date.now();
                }}
                className="mt-6 text-sm font-semibold text-forest underline-offset-4 hover:underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate aria-busy={sending}>
              {status === "error" && (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role="alert"
                  className="mb-8 flex flex-col gap-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-5 outline-none sm:flex-row sm:items-start"
                >
                  <AlertCircle className="size-5 shrink-0 text-destructive" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">Something went wrong</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {rateLimited
                        ? "Too many requests were sent from this connection. Please wait a few minutes, or contact Dr. Adithya directly on WhatsApp."
                        : sendError
                        ? `Email service: ${sendError}`
                        : "Unable to send your appointment request right now. Please try again or contact us directly on WhatsApp."}
                    </p>
                    <LinkButton
                      href={CONTACT.links.whatsapp}
                      variant="whatsapp"
                      size="sm"
                      className="mt-4"
                    >
                      <WhatsAppIcon />
                      WhatsApp Dr. Adithya
                    </LinkButton>
                  </div>
                </div>
              )}

              {/* Honeypot for bots */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  Website
                  <input
                    ref={honeypot}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <fieldset
                disabled={sending}
                className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2"
              >
                <Field id="name" label="Full Name" error={errors.name}>
                  <input
                    id="appt-name"
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    value={values.name}
                    onChange={(e) => set("name")(e.target.value)}
                    className={cn(
                      fieldBase,
                      "h-13",
                      errors.name ? "border-destructive" : "border-border",
                    )}
                    {...describe("name", errors.name)}
                  />
                </Field>

                <Field id="phone" label="Phone Number" error={errors.phone}>
                  <input
                    id="appt-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={20}
                    placeholder="e.g. 98765 43210"
                    value={values.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    className={cn(
                      fieldBase,
                      "h-13",
                      errors.phone ? "border-destructive" : "border-border",
                    )}
                    {...describe("phone", errors.phone)}
                  />
                </Field>

                <Field id="gender" label="Gender" error={errors.gender}>
                  <select
                    id="appt-gender"
                    value={values.gender}
                    onChange={(e) => set("gender")(e.target.value)}
                    className={cn(
                      fieldBase,
                      "h-13",
                      errors.gender ? "border-destructive" : "border-border",
                      !values.gender && "text-muted-foreground/80",
                    )}
                    {...describe("gender", errors.gender)}
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    {GENDERS.map((g) => (
                      <option key={g} value={g} className="text-foreground">
                        {g}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id="age" label="Age" error={errors.age}>
                  <input
                    id="appt-age"
                    type="number"
                    inputMode="numeric"
                    min={AGE_MIN}
                    max={AGE_MAX}
                    step={1}
                    value={values.age}
                    onChange={(e) => set("age")(e.target.value)}
                    onKeyDown={(e) =>
                      ["-", "+", "e", "E", "."].includes(e.key) && e.preventDefault()
                    }
                    className={cn(
                      fieldBase,
                      "h-13",
                      errors.age ? "border-destructive" : "border-border",
                    )}
                    {...describe("age", errors.age)}
                  />
                </Field>

                <Field id="email" label="Email Address" error={errors.email}>
                  <input
                    id="appt-email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    value={values.email}
                    onChange={(e) => set("email")(e.target.value)}
                    className={cn(
                      fieldBase,
                      "h-13",
                      errors.email ? "border-destructive" : "border-border",
                    )}
                    {...describe("email", errors.email)}
                  />
                </Field>

                <Field id="date" label="Preferred Appointment Date" error={errors.date}>
                  <input
                    id="appt-date"
                    type="date"
                    min={minDate || undefined}
                    value={values.date}
                    onChange={(e) => set("date")(e.target.value)}
                    className={cn(
                      fieldBase,
                      "h-13",
                      errors.date ? "border-destructive" : "border-border",
                    )}
                    {...describe("date", errors.date)}
                  />
                </Field>

                <Field
                  id="consultation"
                  label="Preferred Consultation Type"
                  error={errors.consultation}
                  className="md:col-span-2"
                >
                  <select
                    id="appt-consultation"
                    value={values.consultation}
                    onChange={(e) => set("consultation")(e.target.value)}
                    className={cn(
                      fieldBase,
                      "h-13",
                      errors.consultation ? "border-destructive" : "border-border",
                      !values.consultation && "text-muted-foreground/80",
                    )}
                    {...describe("consultation", errors.consultation)}
                  >
                    <option value="" disabled>
                      Select consultation type
                    </option>
                    {CONSULTATION_TYPES.map((c) => (
                      <option key={c} value={c} className="text-foreground">
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  id="problem"
                  label="How can we help you?"
                  error={errors.problem}
                  className="md:col-span-2"
                >
                  <textarea
                    id="appt-problem"
                    rows={5}
                    maxLength={2000}
                    placeholder="Please briefly describe your health concern, symptoms, lifestyle concern, or what you would like to discuss with the doctor."
                    value={values.problem}
                    onChange={(e) => set("problem")(e.target.value)}
                    className={cn(
                      fieldBase,
                      "min-h-36 resize-y py-3 leading-relaxed",
                      errors.problem ? "border-destructive" : "border-border",
                    )}
                    {...describe("problem", errors.problem)}
                  />
                </Field>
              </fieldset>

              <p className="mt-4 text-xs text-muted-foreground">
                The date you choose is a preference only. Dr. Adithya will contact you to arrange
                the appointment.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-forest px-8 text-[0.95rem] font-semibold tracking-wide text-forest-foreground shadow-soft transition-[transform,box-shadow,background-color] duration-250 ease-out hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:translate-y-0 disabled:pointer-events-none disabled:opacity-75"
                >
                  {sending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                  {sending ? "Sending Request..." : "Request Appointment"}
                </button>
                <span className="text-sm text-muted-foreground">
                  Prefer to talk?{" "}
                  <a
                    href={CONTACT.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-forest underline-offset-4 hover:underline"
                  >
                    WhatsApp
                  </a>{" "}
                  or{" "}
                  <a
                    href={CONTACT.links.phone}
                    className="font-semibold text-forest underline-offset-4 hover:underline"
                  >
                    call
                  </a>
                  .
                </span>
              </div>

              <p className="mt-8 flex items-start gap-3 rounded-2xl border border-gold/30 bg-sage-mist/60 px-4 py-3 text-sm leading-relaxed text-forest-deep">
                <ShieldAlert className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                Please avoid sharing emergency or highly sensitive information through this form.
                For emergencies, seek appropriate emergency medical care.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function describe(field: AppointmentField, error?: string | undefined) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `appt-${field}-error` : undefined,
    "aria-required": true,
  } as const;
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: AppointmentField;
  label: string;
  error?: string | undefined;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={`appt-${id}`} className="mb-2 block text-sm font-semibold text-forest-deep">
        {label}{" "}
        <span className="text-gold" aria-hidden="true">
          *
        </span>
      </label>
      {children}
      {error && (
        <p id={`appt-${id}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
