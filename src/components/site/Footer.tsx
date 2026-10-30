import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, NAV_ITEMS } from "@/lib/site";
import { Reveal } from "./Reveal";
import { InstagramIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  return (
    <footer className="forest-band">
      <Reveal className="mx-auto max-w-7xl px-4 pt-16 pb-28 sm:px-6 sm:pb-12 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div className="min-w-0">
            <a href="#home" className="inline-block overflow-hidden rounded-2xl bg-plate ring-1 ring-gold/40">
              <img
                src="/logo.jpg"
                alt="Dr. Adithya Health & Wellness"
                width={1280}
                height={714}
                loading="lazy"
                decoding="async"
                className="h-24 w-auto sm:h-28"
              />
            </a>
            <p lang="kn" className="font-kannada mt-6 text-xl leading-relaxed font-semibold text-gold-soft">
              {CONTACT.kannadaTitle}
            </p>
            <p className="mt-2 text-[0.7rem] font-semibold tracking-[0.22em] text-forest-foreground/75 uppercase">
              Your Health | Your Habits | Our Focus
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-sans text-xs font-bold tracking-[0.2em] text-gold-soft uppercase">
              Quick Links
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.95rem] text-forest-foreground/80 transition-colors hover:text-forest-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className="font-sans text-xs font-bold tracking-[0.2em] text-gold-soft uppercase">Contact</h2>
            <ul className="mt-5 space-y-3.5 text-[0.95rem] text-forest-foreground/85">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-soft" aria-hidden="true" />
                {CONTACT.location}
              </li>
              <li>
                <a href={CONTACT.links.phone} className="flex items-start gap-3 hover:text-forest-foreground">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold-soft" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.links.email}
                  className="flex items-start gap-3 break-all hover:text-forest-foreground"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold-soft" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href={CONTACT.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${CONTACT.instagramHandle}`}
                className="grid size-11 place-items-center rounded-full border border-forest-foreground/25 text-forest-foreground transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-forest-foreground/10"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={CONTACT.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-11 place-items-center rounded-full border border-forest-foreground/25 text-forest-foreground transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-forest-foreground/10"
              >
                <WhatsAppIcon className="size-5" />
              </a>
              <span className="self-center text-sm text-forest-foreground/75">{CONTACT.instagramHandle}</span>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-forest-foreground/15 pt-8 text-sm text-forest-foreground/65">
          <p className="max-w-3xl leading-relaxed">
            This website provides health education and lifestyle guidance. It is not a substitute for
            emergency medical care or diagnosis by a qualified medical professional.
          </p>
          <p className="mt-4">© 2026 Dr. Adithya. All rights reserved.</p>
        </div>
      </Reveal>
    </footer>
  );
}
