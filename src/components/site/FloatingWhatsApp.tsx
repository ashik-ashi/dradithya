import { CONTACT } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp() {
  return (
    <a
      href={CONTACT.links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Dr. Adithya on WhatsApp"
      className="animate-rise group fixed right-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-float transition-[transform,background-color] duration-300 ease-out hover:-translate-y-1 hover:bg-forest active:scale-95 sm:right-6"
      style={{ animationDelay: "900ms", bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <span
        aria-hidden="true"
        className="animate-soft-pulse absolute inset-0 rounded-full bg-whatsapp"
      />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
