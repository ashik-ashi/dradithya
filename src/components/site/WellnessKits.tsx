import { CONTACT } from "@/lib/site";
import { LinkButton } from "./LinkButton";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { WhatsAppIcon } from "./icons";

const KITS = [
  {
    name: "Hairfall, White Hair and Dandruff Kit",
    message: "Hello Dr. Adithya, I am interested in the Hairfall, White Hair and Dandruff Kit. I would like to know more about it.",
  },
  {
    name: "Seed Cycling Kit for Irregular Periods",
    message: "Hello Dr. Adithya, I am interested in the Seed Cycling Kit for Irregular Periods. I would like to know more about it.",
  },
  {
    name: "Thyroid Kit for Primary Hypothyroidism and Hashimoto Thyroiditis",
    message: "Hello Dr. Adithya, I am interested in the Thyroid Kit for Primary Hypothyroidism and Hashimoto Thyroiditis. I would like to know more about it.",
  },
  {
    name: "Anti-inflammatory Kit to Reduce Inflammation and Autoimmune Disease",
    message: "Hello Dr. Adithya, I am interested in the Anti-inflammatory Kit to Reduce Inflammation and Autoimmune Disease. I would like to know more about it.",
  },
];

export function WellnessKits() {
  return (
    <section id="wellness-kits" aria-labelledby="wellness-kits-title" className="bg-paper py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="wellness-kits-title"
          eyebrow="Explore"
          title="Wellness Kits"
          subtitle="Contact Dr. Adithya Surya to enquire about a kit."
        />
        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {KITS.map((kit, i) => (
            <Reveal
              as="li"
              key={kit.name}
              delay={i * 90}
              className="card-premium card-hover flex flex-col p-6 sm:p-7"
            >
              <span className="icon-badge size-14" aria-hidden="true">
                <WhatsAppIcon className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-forest-deep">{kit.name}</h3>
              <div className="mt-auto pt-7">
                <LinkButton
                  href={`${CONTACT.links.whatsapp}?text=${encodeURIComponent(kit.message)}`}
                  variant="whatsapp"
                  className="w-full"
                >
                  <WhatsAppIcon />
                  WhatsApp Enquiry
                </LinkButton>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
