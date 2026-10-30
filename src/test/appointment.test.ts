import { describe, expect, it } from "vitest";
import {
  appointmentSchema,
  doctorEmailSubject,
  patientConfirmationText,
  whatsappDetailsUrl,
  type AppointmentInput,
} from "@/lib/appointment";

const TODAY = "2026-10-30";
const schema = appointmentSchema(TODAY);
const valid: AppointmentInput = {
  name: "Ravi Kumar",
  phone: "98765 43210",
  gender: "Male",
  age: "34",
  email: "ravi@example.com",
  date: "2026-11-02",
  consultation: "Personal Consultation",
  problem: "Trouble sleeping and low energy during the day.",
};
const errorFor = (patch: Partial<AppointmentInput>) => {
  const r = schema.safeParse({ ...valid, ...patch });
  return r.success ? null : r.error.issues[0]?.path[0];
};

describe("Appointment form rules", () => {
  it("accepts a complete request", () => {
    expect(schema.safeParse(valid).success).toBe(true);
  });
  it("rejects an empty name", () => {
    expect(errorFor({ name: "   " })).toBe("name");
  });
  it("rejects a phone number with fewer than 10 digits", () => {
    expect(errorFor({ phone: "12345" })).toBe("phone");
  });
  it("accepts an Indian number with +91", () => {
    expect(errorFor({ phone: "+91 63629 66465" })).toBeNull();
  });
  it("requires a gender", () => {
    expect(errorFor({ gender: "" as never })).toBe("gender");
  });
  it("rejects negative and unrealistic ages", () => {
    expect(errorFor({ age: "-5" })).toBe("age");
    expect(errorFor({ age: "0" })).toBe("age");
    expect(errorFor({ age: "150" })).toBe("age");
  });
  it("rejects a malformed email", () => {
    expect(errorFor({ email: "ravi@" })).toBe("email");
  });
  it("rejects a past date but allows today", () => {
    expect(errorFor({ date: "2026-10-29" })).toBe("date");
    expect(errorFor({ date: TODAY })).toBeNull();
  });
  it("requires a meaningful health concern", () => {
    expect(errorFor({ problem: "......." })).toBe("problem");
  });
  it("only allows the four consultation types", () => {
    expect(errorFor({ consultation: "Surgery" as never })).toBe("consultation");
  });
});

describe("Messages", () => {
  const a = schema.parse(valid);
  it("doctor email subject names the patient", () => {
    expect(doctorEmailSubject(a.name)).toBe("New Consultation Appointment Request - Ravi Kumar");
  });
  it("patient confirmation says request received, never confirmed", () => {
    const text = patientConfirmationText(a);
    expect(text).toContain("Appointment request received");
    expect(text.toLowerCase()).not.toContain("appointment confirmed");
  });
  it("WhatsApp link goes to Dr. Adithya with the details pre-filled", () => {
    const url = whatsappDetailsUrl(a);
    expect(url.startsWith("https://wa.me/916362966465?text=")).toBe(true);
    const text = decodeURIComponent(url.split("?text=")[1] ?? "");
    expect(text).toContain("Name: Ravi Kumar");
    expect(text).toContain("Consultation: Personal Consultation");
  });
});
