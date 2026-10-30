import { BookOpen, HeartHandshake, Languages, Sprout } from "lucide-react";
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
        <div className="max-w-3xl">
          <Reveal from="right" className="min-w-0">
            <p className="eyebrow">About</p>
            <h2
              id="about-title"
              className="mt-3 text-[2rem] leading-[1.1] font-semibold sm:text-[2.6rem]"
            >
              About Dr Adithya Surya Surya
            </h2>
            <div className="mt-5 flex items-center gap-3">
              <TwinLeaf className="h-4 w-7 text-sage" />
              <span className="gold-rule w-24" />
            </div>
            <span className="mt-6 inline-flex items-center rounded-full border border-forest/20 bg-sage-mist px-4 py-1.5 text-sm font-semibold text-forest">
              BNYS Intern
            </span>
            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-muted-foreground">
              <p className="font-display text-2xl text-forest">Hello, I'm Dr Adithya Surya.</p>
              <p>
                I am a BNYS intern sharing health education and lifestyle guidance to help people make
                informed, practical choices. My goal is to make reliable wellness information easier to
                understand in Kannada and English.
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
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
