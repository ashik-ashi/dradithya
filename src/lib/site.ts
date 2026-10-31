export const CONTACT = {
  name: "Dr. Adithya Surya",
  qualification: "Naturopathy and Yoga Doctor",
  kannadaTitle: "ನಿಮ್ಮ ಆರೋಗ್ಯ ನನ್ನ ಆದ್ಯತೆ",
  tagline: "YOUR HEALTH | YOUR HABITS | OUR FOCUS",
  location: "Hassan, Karnataka, India",
  phone: "6362966465",
  email: "adithaysurya472@gmail.com",
  instagramHandle: "@vaidyaadithya_",
  links: {
    whatsapp: "https://wa.me/916362966465",
    phone: "tel:6362966465",
    email: "mailto:adithaysurya472@gmail.com",
    instagram: "https://www.instagram.com/vaidyaadithya_/",
  },
} as const;

/** Public site address; the email relay ties its one-time activation to this. */
export const SITE_URL = "https://pixel-perfect-replay-97283.lovable.app";

export const APPOINTMENT_ANCHOR = "#appointment";

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Wellness Kits", href: "#wellness-kits" },
  { label: "Wellness Guide", href: "#wellness" },
  { label: "Payment", href: "#payment" },
  { label: "Contact", href: "#contact" },
] as const;

export type Service = {
  id: string;
  title: string;
  price: number;
  duration?: string;
  description: string;
  listLabel?: string;
  list?: string[];
  cta: string;
};

export const SERVICES: Service[] = [
  {
    id: "consultation",
    title: "Personal Consultation",
    price: 300,
    duration: "15–30 minutes",
    description: "15–30 minutes",
    cta: "Book Consultation",
  },
  {
    id: "diet-plan",
    title: "Personalised Diet Plan",
    price: 250,
    description: "Progress review",
    cta: "Enquire on WhatsApp",
  },
  {
    id: "diet-consultation",
    title: "Personalised Diet & Consultation",
    price: 500,
    description: "Comprehensive diet planning paired with an initial deep-dive consultation.",
    cta: "Enquire on WhatsApp",
  },
  {
    id: "lifestyle-program",
    title: "4-Week Lifestyle Program",
    price: 2499,
    duration: "4 weeks",
    description: "Lifestyle guidance, habit tracker & scheduled follow-ups",
    cta: "Join Program",
  },
  {
    id: "online-yoga-classes",
    title: "Online Yoga Classes",
    price: 1000,
    description: "Guided yoga classes delivered online.",
    cta: "Enquire on WhatsApp",
  },
];

export function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export const HABITS = [
  "Eat balanced meals",
  "Drink water",
  "Exercise / stay active",
  "Sleep 7–8 hours",
  "Manage stress",
] as const;

export const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4"] as const;
