export const CONTACT = {
  name: "Dr. Adithya",
  qualification: "BNYS Intern",
  kannadaTitle: "ನಿಮ್ಮ ಆರೋಗ್ಯ ನನ್ನ ಕೈಯಲ್ಲಿದೆ",
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

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
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
    price: 499,
    duration: "30–45 minutes",
    description:
      "Discuss your health concerns and lifestyle. Review diet, sleep, stress and other lifestyle factors and receive personalised guidance within professional scope.",
    cta: "Book Consultation",
  },
  {
    id: "lifestyle-program",
    title: "4-Week Lifestyle Program",
    price: 2499,
    duration: "4 weeks",
    description:
      "Lifestyle guidance, habit tracking and scheduled follow-ups to help build consistent healthy habits.",
    listLabel: "Includes",
    list: [
      "Personalised lifestyle guidance",
      "Lifestyle modifications",
      "Habit tracking",
      "Scheduled follow-ups",
    ],
    cta: "Join Program",
  },
  {
    id: "group-education",
    title: "Group Education Program",
    price: 999,
    description: "Group learning and practical lifestyle education.",
    listLabel: "Topics",
    list: ["Nutrition", "Sleep", "Exercise", "Stress management", "Healthy lifestyle habits"],
    cta: "Join Program",
  },
  {
    id: "follow-up",
    title: "Follow-up Session",
    price: 299,
    description: "Review your progress, discuss challenges and make necessary adjustments.",
    cta: "Book Follow-up",
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
