import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/site";
import { LinkButton } from "./LinkButton";
import { Reveal } from "./Reveal";
import { LeafSprig, WhatsAppIcon } from "./icons";

export function ConsultationCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-paper px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal className="forest-band relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-14 text-center shadow-lift sm:px-12 sm:py-16">
        <LeafSprig className="pointer-events-none absolute -bottom-8 -left-8 w-36 text-sage/40 sm:w-48" />
        <LeafSprig className="pointer-events-none absolute -top-8 -right-8 w-32 rotate-180 text-gold/30 sm:w-44" />
        <div className="relative">
          <p className="eyebrow text-gold-soft">Consultation</p>
          <h2
            id="cta-title"
            className="mt-3 text-[2rem] leading-tight font-semibold text-balance text-forest-foreground sm:text-[2.75rem]"
          >
            Ready to Take the Next Step?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-forest-foreground/80">
            Choose a consultation option that works for you.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton href={CONTACT.links.whatsapp} variant="light" size="lg">
              <WhatsAppIcon />
              WhatsApp Consultation
            </LinkButton>
            <LinkButton href={CONTACT.links.phone} variant="ghostLight" size="lg">
              <Phone aria-hidden="true" />
              Call Now
            </LinkButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
