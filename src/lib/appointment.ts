import { z } from "zod";
import { CONTACT } from "@/lib/site";

export const GENDERS = ["Male", "Female", "Other", "Prefer not to say"] as const;

export const CONSULTATION_TYPES = [
  "Personal Consultation",
  "4-Week Lifestyle Program",
  "Group Education Program",
  "Follow-up Session",
] as const;

export const AGE_MIN = 1;
export const AGE_MAX = 120;

/** Today's date (YYYY-MM-DD) in India, where the practice is based. */
export function todayInIndia(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Removes control characters and angle brackets, collapses whitespace on single-line fields. */
export function clean(value: string, multiline = false): string {
  // eslint-disable-next-line no-control-regex
  let v = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/[<>]/g, "");
  v = multiline ? v.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n") : v.replace(/\s+/g, " ");
  return v.trim();
}

const phoneDigits = (v: string) => v.replace(/\D/g, "");

export function appointmentSchema(today: string = todayInIndia()) {
  return z.object({
    name: z
      .string()
      .transform((v) => clean(v))
      .pipe(
        z
          .string()
          .min(2, "Please enter your full name.")
          .max(80, "Name must be under 80 characters.")
          .regex(/\p{L}/u, "Please enter your full name."),
      ),
    phone: z
      .string()
      .transform((v) => clean(v))
      .pipe(
        z
          .string()
          .min(1, "Please enter your phone number.")
          .regex(/^\+?[\d\s()-]+$/, "Please enter a valid phone number.")
          .refine((v) => {
            const d = phoneDigits(v);
            return d.length >= 10 && d.length <= 13;
          }, "Please enter a valid phone number (at least 10 digits)."),
      ),
    gender: z.enum(GENDERS, { errorMap: () => ({ message: "Please select your gender." }) }),
    age: z.preprocess(
      (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
      z.coerce
        .number({ required_error: "Please enter your age.", invalid_type_error: "Please enter your age." })
        .int("Please enter your age in whole years.")
        .min(AGE_MIN, `Age must be between ${AGE_MIN} and ${AGE_MAX}.`)
        .max(AGE_MAX, `Age must be between ${AGE_MIN} and ${AGE_MAX}.`),
    ),
    email: z
      .string()
      .transform((v) => clean(v))
      .pipe(
        z
          .string()
          .min(1, "Please enter your email address.")
          .max(254, "Email is too long.")
          .email("Please enter a valid email address."),
      ),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a preferred date.")
      .refine((v) => v >= today, "Please choose today or a future date."),
    consultation: z.enum(CONSULTATION_TYPES, {
      errorMap: () => ({ message: "Please select a consultation type." }),
    }),
    problem: z
      .string()
      .transform((v) => clean(v, true))
      .pipe(
        z
          .string()
          .min(10, "Please describe your concern in a few words (at least 10 characters).")
          .max(2000, "Please keep this under 2000 characters.")
          .refine(
            (v) => (v.match(/\p{L}/gu) ?? []).length >= 5,
            "Please describe your concern in a few words.",
          ),
      ),
  });
}

export type AppointmentInput = z.input<ReturnType<typeof appointmentSchema>>;
export type Appointment = z.output<ReturnType<typeof appointmentSchema>>;
export type AppointmentField = 
  | "name"
  | "phone"
  | "gender"
  | "age"
  | "email"
  | "date"
  | "consultation"
  | "problem";

/** Human-readable date, e.g. "Mon, 2 Nov 2026". */
export function formatPreferredDate(iso: string): string {
  const [y = 1970, m = 1, d = 1] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

export function whatsappDetailsUrl(a: Appointment): string {
  const text = [
    "Hello Dr. Adithya,",
    "",
    "I have submitted a consultation request.",
    "",
    `Name: ${a.name}`,
    `Phone: ${a.phone}`,
    `Gender: ${a.gender}`,
    `Age: ${a.age}`,
    `Email: ${a.email}`,
    `Preferred Date: ${formatPreferredDate(a.date)}`,
    `Consultation: ${a.consultation}`,
    "",
    "Health Concern:",
    a.problem,
    "",
    "Please review my appointment request.",
  ].join("\n");
  return `${CONTACT.links.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function doctorEmailSubject(name: string): string {
  return `New Consultation Appointment Request - ${name}`;
}

export function patientConfirmationText(a: Appointment): string {
  return [
    `Hello ${a.name},`,
    "",
    "Thank you for submitting your consultation request with Dr. Adithya.",
    "",
    "Appointment request received for:",
    "",
    `Date: ${formatPreferredDate(a.date)}`,
    `Consultation: ${a.consultation}`,
    "",
    "Dr. Adithya will review your request and contact you regarding the appointment.",
    "",
    "Thank you.",
    "",
    "Dr. Adithya",
    "BNYS Intern",
    "Health & Wellness Consultation",
  ].join("\n");
}
