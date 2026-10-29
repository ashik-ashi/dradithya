import { describe, expect, it } from "vitest";
import { CONTACT, SERVICES, formatINR } from "@/lib/site";

const price = (title: string) => SERVICES.find((s) => s.title === title)?.price;

describe("Service prices", () => {
  it("Personal Consultation is ₹499", () => {
    expect(price("Personal Consultation")).toBe(499);
  });
  it("4-Week Lifestyle Program is ₹2,499", () => {
    expect(price("4-Week Lifestyle Program")).toBe(2499);
    expect(formatINR(2499)).toBe("₹2,499");
  });
  it("Group Education Program is ₹999", () => {
    expect(price("Group Education Program")).toBe(999);
  });
  it("Follow-up Session is ₹299", () => {
    expect(price("Follow-up Session")).toBe(299);
  });
  it("offers exactly four services", () => {
    expect(SERVICES).toHaveLength(4);
  });
});

describe("Contact links", () => {
  it("WhatsApp opens wa.me/916362966465", () => {
    expect(CONTACT.links.whatsapp).toBe("https://wa.me/916362966465");
  });
  it("phone dials 6362966465", () => {
    expect(CONTACT.links.phone).toBe("tel:6362966465");
  });
  it("Kannada title is unchanged", () => {
    expect(CONTACT.kannadaTitle).toBe("ನಿಮ್ಮ ಆರೋಗ್ಯ ನನ್ನ ಕೈಯಲ್ಲಿದೆ");
  });
});
