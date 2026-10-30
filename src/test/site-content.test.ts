import { describe, expect, it } from "vitest";
import { CONTACT, SERVICES, formatINR } from "@/lib/site";

describe("Service prices", () => {
  it("uses the four current services and exact prices", () => {
    expect(SERVICES.map(({ title, price }) => [title, price])).toEqual([
      ["Personal Consultation", 300],
      ["Personalised Diet Plan", 250],
      ["Personalised Diet & Consultation", 500],
      ["4-Week Lifestyle Program", 2499],
    ]);
    expect(formatINR(2499)).toBe("₹2,499");
  });
});

describe("Contact links", () => {
  it("WhatsApp opens wa.me/916362966465", () => {
    expect(CONTACT.links.whatsapp).toBe("https://wa.me/916362966465");
  });
  it("phone dials 6362966465", () => {
    expect(CONTACT.links.phone).toBe("tel:6362966465");
  });
  it("uses the updated Kannada tagline", () => {
    expect(CONTACT.kannadaTitle).toBe("ನಿಮ್ಮ ಆರೋಗ್ಯ ನನ್ನ ಆದ್ಯತೆ");
  });
});
