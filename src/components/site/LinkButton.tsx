import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const linkButtonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold tracking-wide whitespace-nowrap transition-[transform,box-shadow,background-color,color,border-color,filter] duration-250 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold [&_svg]:size-[1.1rem] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-forest text-forest-foreground shadow-soft hover:bg-forest-deep hover:shadow-lift",
        gold: "bg-gold text-forest-deep shadow-soft hover:brightness-105 hover:shadow-lift",
        outline:
          "border border-forest/30 bg-paper/60 text-forest hover:border-forest hover:bg-paper hover:shadow-soft",
        whatsapp:
          "bg-whatsapp text-whatsapp-foreground shadow-soft hover:bg-forest hover:shadow-lift",
        light:
          "bg-paper text-forest-deep shadow-soft hover:bg-background hover:shadow-lift",
        ghostLight:
          "border border-forest-foreground/35 text-forest-foreground hover:border-forest-foreground hover:bg-forest-foreground/10",
      },
      size: {
        default: "",
        sm: "min-h-10 px-5 text-[0.8rem]",
        lg: "min-h-13 px-7 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof linkButtonVariants>;

export function LinkButton({ className, variant, size, href, children, ...rest }: Props) {
  const external = href?.startsWith("http");
  return (
    <a
      href={href}
      className={cn(linkButtonVariants({ variant, size }), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
