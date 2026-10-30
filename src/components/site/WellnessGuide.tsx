import { Droplet, Flower2, Footprints, Moon, Salad } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const TIPS = [
  { icon: Salad, title: "Eat Real Food", text: "Choose fresh, whole foods." },
  { icon: Droplet, title: "Stay Hydrated", text: "Drink adequate water throughout the day." },
  { icon: Footprints, title: "Be Active", text: "Aim for regular daily movement." },
  { icon: Moon, title: "Get Quality Sleep", text: "Prioritise consistent, quality sleep." },
  {
    icon: Flower2,
    title: "Manage Stress",
    text: "Practice breathing, meditation or spend time in nature.",
  },
];

export function WellnessGuide() {
  return (
    <section id="wellness" aria-labelledby="wellness-title" className="sage-band py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="wellness-title"
          eyebrow="Key Lifestyle Tips"
          title="Patient Wellness Guide"
          subtitle={
            <p className="tagline text-[0.7rem] sm:text-xs">
              YOUR HEALTH <span className="text-gold">|</span> YOUR HABITS{" "}
              <span className="text-gold">|</span> OUR FOCUS
            </p>
          }
        />

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {TIPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 90}
              className={cn(
                "group card-premium card-hover flex flex-col items-center px-4 py-7 text-center sm:px-5",
                i === TIPS.length - 1 && "col-span-2 sm:col-span-1",
              )}
            >
              <span className="icon-badge size-16 ring-8 ring-sage-mist group-hover:scale-110">
                <Icon className="size-7" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-sans text-[0.8rem] font-bold tracking-[0.12em] text-forest-deep uppercase">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
