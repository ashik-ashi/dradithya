import { CalendarCheck, Check, ClipboardList, Clock, Stethoscope, Users } from "lucide-react";
import { APPOINTMENT_ANCHOR, CONTACT, SERVICES, formatINR } from "@/lib/site";
import { SELECT_CONSULTATION_EVENT } from "./AppointmentForm";
import { LinkButton } from "./LinkButton";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const ICONS = {
  consultation: Stethoscope,
  "lifestyle-program": ClipboardList,
  "group-education": Users,
  "follow-up": CalendarCheck,
} as const;

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="paper-grain py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="services-title"
          eyebrow="Consultation & Wellness Programs"
          title="Services"
          subtitle="Personalised guidance and practical programs to help you build better everyday habits."
        />

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.id as keyof typeof ICONS];
            return (
              <Reveal
                as="li"
                key={s.id}
                delay={i * 120}
                className="group card-premium card-hover flex flex-col p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="icon-badge size-14 group-hover:-translate-y-1">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <p className="rounded-full bg-forest px-4 py-2 font-display text-xl font-semibold text-forest-foreground ring-2 ring-gold/60 ring-offset-2 ring-offset-card">
                    {formatINR(s.price)}
                  </p>
                </div>

                <h3 className="mt-6 text-[1.4rem] leading-snug font-semibold">{s.title}</h3>
                {s.duration && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                    <Clock className="size-4" aria-hidden="true" />
                    <span className="sr-only">Duration:</span>
                    {s.duration}
                  </p>
                )}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                {s.list && (
                  <div className="mt-5">
                    <p className="eyebrow text-[0.65rem] text-forest">{s.listLabel}</p>
                    <ul className="mt-3 space-y-2">
                      {s.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-foreground/85"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto pt-7">
                  {s.cta === "Book Consultation" ? (
                    <LinkButton
                      href={APPOINTMENT_ANCHOR}
                      variant={i % 2 === 0 ? "primary" : "outline"}
                      className="w-full"
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent(SELECT_CONSULTATION_EVENT, { detail: s.title }),
                        )
                      }
                    >
                      {s.cta}
                    </LinkButton>
                  ) : (
                    <LinkButton
                      href={`${CONTACT.links.whatsapp}?text=${encodeURIComponent(
                        `Hello Dr. Adithya, I'm interested in the ${s.title} (${formatINR(s.price)}).`,
                      )}`}
                      variant={i % 2 === 0 ? "primary" : "outline"}
                      className="w-full"
                      aria-label={`${s.cta} – ${s.title} on WhatsApp`}
                    >
                      {s.cta}
                    </LinkButton>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
