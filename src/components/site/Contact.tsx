import { Mail, MapPin, Phone } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { CONTACT } from "@/lib/site";
import { LinkButton } from "./LinkButton";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { InstagramIcon, LeafSprig, WhatsAppIcon } from "./icons";

type Item = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  href?: string;
};

const ITEMS: Item[] = [
  { icon: MapPin, label: "Location", value: CONTACT.location },
  { icon: Phone, label: "Phone", value: CONTACT.phone, href: CONTACT.links.phone },
  { icon: WhatsAppIcon, label: "WhatsApp", value: CONTACT.phone, href: CONTACT.links.whatsapp },
  { icon: Mail, label: "Email", value: CONTACT.email, href: CONTACT.links.email },
  { icon: InstagramIcon, label: "Instagram", value: CONTACT.instagramHandle, href: CONTACT.links.instagram },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-paper py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Get in Touch"
          subtitle="Reach out on WhatsApp, phone, email or Instagram."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {ITEMS.map(({ icon: Icon, label, value, href }, i) => {
              const body = (
                <>
                  <span className="icon-badge size-12 group-hover:-translate-y-0.5">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block text-[0.64rem]">{label}</span>
                    <span className="mt-1 block text-[0.98rem] font-medium break-words text-forest-deep">
                      {value}
                    </span>
                  </span>
                </>
              );
              const external = href?.startsWith("http");
              return (
                <Reveal
                  as="li"
                  key={label}
                  delay={i * 90}
                  className={i === 0 ? "sm:col-span-2" : undefined}
                >
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group card-premium card-hover flex h-full items-center gap-4 p-5"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="group card-premium flex h-full items-center gap-4 p-5">{body}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>

          <Reveal from="right" delay={150}>
            <div className="forest-band relative h-full overflow-hidden rounded-[1.75rem] p-7 shadow-lift sm:p-9">
              <LeafSprig className="pointer-events-none absolute -right-10 -bottom-10 w-40 text-sage/35" />
              <div className="relative">
                <p lang="kn" className="font-kannada text-xl leading-relaxed font-semibold text-gold-soft">
                  {CONTACT.kannadaTitle}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-forest-foreground">
                  Let's talk about your health &amp; habits
                </h3>
                <div className="mt-7 grid gap-3">
                  <LinkButton href={CONTACT.links.whatsapp} variant="light">
                    <WhatsAppIcon />
                    Chat on WhatsApp
                  </LinkButton>
                  <LinkButton href={CONTACT.links.phone} variant="ghostLight">
                    <Phone aria-hidden="true" />
                    Call Now
                  </LinkButton>
                  <LinkButton href={CONTACT.links.email} variant="ghostLight">
                    <Mail aria-hidden="true" />
                    Send Email
                  </LinkButton>
                  <LinkButton href={CONTACT.links.instagram} variant="ghostLight">
                    <InstagramIcon />
                    Follow on Instagram
                  </LinkButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
