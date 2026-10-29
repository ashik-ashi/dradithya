import { BookOpen, HeartHandshake, Languages, Sprout } from "lucide-react";
import doctor from "@/assets/dr-adithya.jpg.asset.json";
import { Reveal } from "./Reveal";
import { TwinLeaf } from "./icons";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Health Education",
    text: "Provide understandable and practical health information.",
  },
  {
    icon: Sprout,
    title: "Lifestyle Guidance",
    text: "Support healthier everyday habits and lifestyle choices.",
  },
  {
    icon: HeartHandshake,
    title: "Personalised Support",
    text: "Guidance based on individual lifestyle concerns within professional scope.",
  },
  {
    icon: Languages,
    title: "Kannada & English",
    text: "Health information explained clearly in both Kannada and English.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-paper py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal from="left" className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="group overflow-hidden rounded-[2rem] rounded-tl-[6rem] bg-plate shadow-lift ring-1 ring-forest/10">
              <img
                src={doctor.url}
                alt="Dr. Adithya, BNYS Intern"
                width={1024}
                height={731}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] h-auto w-full object-cover object-[76%_center] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
            <div className="absolute -right-2 bottom-8 rounded-2xl bg-forest px-5 py-3 text-forest-foreground shadow-lift sm:-right-6">
              <p className="eyebrow text-gold-soft">Qualification</p>
              <p className="mt-1 font-display text-lg">BNYS Intern</p>
            </div>
          </Reveal>

          <Reveal from="right" className="min-w-0">
            <p className="eyebrow">About</p>
            <h2
              id="about-title"
              className="mt-3 text-[2rem] leading-[1.1] font-semibold sm:text-[2.6rem]"
            >
              About Dr. Adithya
            </h2>
            <div className="mt-5 flex items-center gap-3">
              <TwinLeaf className="h-4 w-7 text-sage" />
              <span className="gold-rule w-24" />
            </div>
            <span className="mt-6 inline-flex items-center rounded-full border border-forest/20 bg-sage-mist px-4 py-1.5 text-sm font-semibold text-forest">
              BNYS Intern
            </span>
            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-muted-foreground">
              <p className="font-display text-2xl text-forest">Hello, I'm Dr Adithya.</p>
              <p>
                I am a BNYS intern sharing health education and lifestyle guidance to help people make
                informed, practical choices. My goal is to make reliable wellness information easier to
                understand in Kannada and English.
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 110} className="group card-premium card-hover p-6">
              <span className="icon-badge size-12 group-hover:-translate-y-1">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
