import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TwinLeaf } from "./icons";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  tone?: "default" | "light";
  id?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center", tone = "default", id }: Props) {
  const center = align === "center";
  return (
    <Reveal className={cn("mx-auto max-w-2xl", center ? "text-center" : "mx-0 text-left")}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        id={id}
        className={cn(
          "mt-3 text-[2rem] leading-[1.1] font-semibold text-balance sm:text-[2.6rem]",
          tone === "light" && "text-forest-foreground",
        )}
      >
        {title}
      </h2>
      <div className={cn("mt-5 flex items-center gap-3", center ? "justify-center" : "justify-start")}>
        <span className={cn("gold-rule w-12 sm:w-20", !center && "hidden")} />
        <TwinLeaf className="h-4 w-7 shrink-0 text-sage" />
        <span className="gold-rule w-12 sm:w-20" />
      </div>
      {subtitle && (
        <div
          className={cn(
            "mt-5 text-[0.98rem] leading-relaxed",
            tone === "light" ? "text-forest-foreground/80" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </div>
      )}
    </Reveal>
  );
}
