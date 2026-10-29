import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/dr-adithya-logo.jpg.asset.json";
import { NAV_ITEMS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LinkButton } from "./LinkButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ease-in-out",
        solid
          ? "border-b border-border/70 bg-background/95 shadow-soft backdrop-blur-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          className="animate-fade shrink-0 overflow-hidden rounded-xl bg-plate shadow-soft ring-1 ring-gold/25"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo.url}
            alt="Dr. Adithya Health & Wellness"
            width={1280}
            height={714}
            className="h-12 w-auto sm:h-[3.25rem]"
            decoding="async"
          />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-link text-[0.9rem] font-medium text-foreground/80 transition-colors duration-300 hover:text-forest"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LinkButton href="#services" size="sm" className="hidden sm:inline-flex">
            Book Consultation
          </LinkButton>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-forest/20 bg-paper/70 text-forest transition-colors hover:bg-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="overflow-hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-4 pt-1 pb-6 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-4 font-display text-lg text-forest-deep transition-colors hover:bg-sage-mist"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <LinkButton href="#services" className="w-full" onClick={() => setOpen(false)}>
                Book Consultation
              </LinkButton>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
