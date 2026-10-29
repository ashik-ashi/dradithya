import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Starting offset: "up" (default), "left", "right", or "scale". */
  from?: "up" | "left" | "right" | "scale";
};

const OFFSETS: Record<NonNullable<RevealProps["from"]>, CSSProperties> = {
  up: {},
  left: { "--reveal-x": "-28px", "--reveal-y": "0px" } as CSSProperties,
  right: { "--reveal-x": "28px", "--reveal-y": "0px" } as CSSProperties,
  scale: { "--reveal-y": "0px", "--reveal-scale": "0.96" } as CSSProperties,
};

/** Fades + slides children in once when they enter the viewport. */
export function Reveal({ children, as: Tag = "div", className, delay = 0, from = "up" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ ...OFFSETS[from], "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
