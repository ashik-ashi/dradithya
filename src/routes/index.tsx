import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { AppointmentForm } from "@/components/site/AppointmentForm";
import { ConsultationCta } from "@/components/site/ConsultationCta";
import { Contact } from "@/components/site/Contact";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Footer } from "@/components/site/Footer";
import { HabitTracker } from "@/components/site/HabitTracker";
import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import { Payment } from "@/components/site/Payment";
import { Services } from "@/components/site/Services";
import { WellnessGuide } from "@/components/site/WellnessGuide";
import { WellnessKits } from "@/components/site/WellnessKits";

const TITLE = "Dr. Adithya | Health & Wellness Consultation";
const DESCRIPTION =
  "Dr. Adithya, BNYS Intern, provides health education and lifestyle guidance with a focus on practical wellness habits in Kannada and English.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-forest px-5 py-3 text-forest-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <WellnessKits />
        <AppointmentForm />
        <ConsultationCta />
        <WellnessGuide />
        <HabitTracker />
        <Payment />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
