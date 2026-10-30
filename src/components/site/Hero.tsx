import { Leaf, PhoneCall } from "lucide-react";
import { CONTACT } from "@/lib/site";
import { LinkButton } from "./LinkButton";
import { LeafSprig, WhatsAppIcon } from "./icons";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="paper-grain relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      <LeafSprig className="pointer-events-none absolute -bottom-10 -left-12 w-40 text-sage/40 sm:w-56" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8">
        <div className="min-w-0">
          <p className="eyebrow animate-fade" style={delay(80)}>
            BNYS Intern <span className="text-sage">|</span> Health &amp; Wellness
          </p>

          <h1
            id="hero-title"
            lang="kn"
            className="font-kannada animate-rise mt-5 text-[2.05rem] leading-[1.45] font-bold text-balance text-forest-deep min-[400px]:text-[2.35rem] sm:text-5xl sm:leading-[1.4] xl:text-[3.5rem]"
            style={delay(180)}
          >
            {CONTACT.kannadaTitle}
          </h1>

          <p
            className="tagline animate-fade mt-4 text-[0.7rem] min-[400px]:text-xs sm:text-sm"
            style={delay(320)}
          >
            Your Health <span className="text-gold">|</span> Your Habits{" "}
            <span className="text-gold">|</span> OUR FOCUS
          </p>

          <div className="animate-fade mt-7 max-w-xl space-y-4" style={delay(420)}>
            <p className="font-display text-xl text-forest">Hello, I'm Dr Adithya Surya.</p>
            <p className="leading-relaxed text-muted-foreground">
              I am a BNYS intern sharing health education and lifestyle guidance to help people make
              informed, practical choices. My goal is to make reliable wellness information easier to
              understand in Kannada and English.
            </p>
            <p className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-paper/70 px-4 py-3 text-sm leading-relaxed text-forest-deep">
              <Leaf className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              Reliable wellness information made easier to understand in Kannada and English.
            </p>
          </div>

          <div
            className="animate-rise mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap"
            style={delay(560)}
          >
            <LinkButton href="#appointment" size="lg">
              Book Consultation
            </LinkButton>
            <LinkButton href={CONTACT.links.whatsapp} variant="outline" size="lg">
              <WhatsAppIcon />
              WhatsApp Us
            </LinkButton>
          </div>

          <p
            className="animate-fade mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest"
            style={delay(680)}
          >
            <span className="icon-badge size-8">
              <PhoneCall className="size-4" aria-hidden="true" />
            </span>
            WhatsApp &amp; Phone Consultation Available
          </p>
        </div>

        <div className="animate-slide-right relative min-w-0" style={delay(500)}>
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-gold/50 sm:translate-x-5 sm:translate-y-5"
          />
          <div className="group relative overflow-hidden rounded-[2rem] bg-plate shadow-lift ring-1 ring-forest/10">
            <img
              src="/doctor.jpg"
              alt="Dr Adithya Surya"
              width={1024}
              height={731}
              fetchPriority="high"
              className="aspect-[1024/731] h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>
          <LeafSprig className="pointer-events-none absolute -right-4 -bottom-10 w-28 text-sage sm:-right-8 sm:w-36" />
          <div className="absolute -bottom-6 left-4 max-w-[calc(100%-2rem)] rounded-2xl border border-border bg-paper px-4 py-3 shadow-soft sm:left-6">
            <p className="font-display text-base leading-tight text-forest-deep">Dr Adithya Surya</p>
            <p className="eyebrow mt-1 text-[0.62rem]">BNYS Intern</p>
          </div>
        </div>
      </div>
    </section>
  );
}
