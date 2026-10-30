import { Download, ShieldCheck } from "lucide-react";
import { CONTACT, SERVICES, formatINR } from "@/lib/site";
import { LinkButton } from "./LinkButton";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { WhatsAppIcon } from "./icons";

const STEPS = [
  "Select your service.",
  "Scan the QR code using your preferred UPI app.",
  "Complete the payment.",
  "Send your payment confirmation on WhatsApp.",
];

export function Payment() {
  return (
    <section id="payment" aria-labelledby="payment-title" className="paper-grain py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="payment-title"
          eyebrow="UPI Payment"
          title="Payment Details"
          subtitle="Pay for your chosen service via UPI and share the confirmation on WhatsApp."
        />

        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal from="left" className="min-w-0 space-y-8">
            <div className="card-premium p-6 sm:p-8">
              <h3 className="text-xl font-semibold">Services &amp; Prices</h3>
              <ul className="mt-5 divide-y divide-border">
                {SERVICES.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-4 py-3.5">
                    <span className="min-w-0 text-[0.95rem] text-foreground">{s.title}</span>
                    <span className="shrink-0 font-display text-lg font-semibold text-forest">
                      {formatINR(s.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">How to pay</h3>
              <ol className="mt-5 space-y-4">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-forest font-display text-sm font-semibold text-forest-foreground ring-2 ring-gold/50 ring-offset-2 ring-offset-background">
                      {i + 1}
                    </span>
                    <span className="pt-1.5 text-[0.98rem] text-foreground/85">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <LinkButton href={CONTACT.links.whatsapp} variant="whatsapp" size="lg" className="w-full sm:w-auto">
              <WhatsAppIcon />
              Send Payment Confirmation
            </LinkButton>
          </Reveal>

          <Reveal from="scale" delay={120} className="mx-auto w-full max-w-[26rem]">
            <figure className="rounded-[1.75rem] border border-border bg-paper p-4 shadow-lift sm:p-5">
              {/* QR shown exactly as provided: no crop, filter, overlay or stretching. */}
              <div className="rounded-2xl bg-qr-surface p-3">
                <img
                  src="/dr-adithya-payment-qr (1).jpg"
                  alt="Payment QR code for Dr. Adithya consultation services"
                  width={744}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                <ShieldCheck className="size-4 shrink-0 text-sage" aria-hidden="true" />
                Scan with any UPI app
              </figcaption>
            </figure>
            <a
              href="/dr-adithya-payment-qr (1).jpg"
              download="dr-adithya-payment-qr.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-medium text-forest transition-colors hover:bg-sage-mist"
            >
              <Download className="size-4" aria-hidden="true" />
              Open / save QR image
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
