/**
 * site.ts — Single source of truth for all site copy.
 * Filled by the content-writer agent in Stage 1D.
 * Components MUST import from here. Zero hardcoded strings in components.
 */

export const siteConfig = {
  name: "Integrity Chimney Services LLC",
  legalName: "Integrity Chimney Services LLC",
  shortName: "Integrity Chimney",
  domain: "integritychimney.com",
  url: "https://integritychimney.com",
  owner: "Kevin Fredrickson",
  phone: "(603) 660-4644",
  phoneTel: "+16036604644",
  email: "IntegrityChimney1@gmail.com",
  address: {
    city: "Bow",
    state: "NH",
    region: "Central New Hampshire",
  },
  founded: 2010,
  yearsExperience: 15,
  socials: {
    instagram: "",
    facebook: "",
  },
} as const;

/* =============================================================
   Hero (homepage)
   ============================================================= */
export const hero = {
  eyebrow: "",
  headline: "",
  subheadline: "",
  primaryCTA: { label: "", href: "/booking" },
  secondaryCTA: { label: "", href: "/quiz" },
  trustBadges: [] as string[],
};

/* =============================================================
   Promise / SLA Banner — homepage above-the-fold
   Source: market-intelligence.md §9 Do #2 — 24-hour callback SLA
   ============================================================= */
export const promise = {
  headline: "",
  body: "",
  guarantee: "",
};

/* =============================================================
   Pain Points (4 cards, empathy-first, no CTA)
   ============================================================= */
export const painPoints: Array<{ emoji: string; title: string; body: string }> = [];

/* =============================================================
   Services — three pillars + sub-services
   Site structure: /services hub + /services/[slug] detail pages
   ============================================================= */
export type Service = {
  slug: string;
  pillar: "chimney" | "masonry" | "roofing";
  emoji: string;
  name: string;
  tagline: string;
  description: string;
  startingPrice: string;
  whatYouGet: string[];
  whoItsFor: string[];
  process: Array<{ step: number; title: string; body: string }>;
  faq: Array<{ q: string; a: string }>;
};
export const services: Service[] = [];

/* =============================================================
   Pricing — "starting at" line items (market-intel §9 Do #3)
   ============================================================= */
export const pricing: Array<{
  service: string;
  price: string;
  includes: string[];
  excludes?: string[];
  href: string;
}> = [];

/* =============================================================
   About / Founder
   ============================================================= */
export const founder = {
  name: "Kevin Fredrickson",
  title: "Owner & Lead Craftsman",
  photo: "",
  bio: "",
  credentials: [] as string[],
  yearsExperience: 15,
};

/* =============================================================
   Testimonials — 36 total, paginated 9 per page (Error #31)
   ============================================================= */
export type Testimonial = {
  name: string;
  town: string;
  service: string;
  quote: string;
  rating: 5;
  date: string;
};
export const testimonials: Testimonial[] = [];

/* =============================================================
   FAQ — homepage + /faq page
   ============================================================= */
export const faq: Array<{ q: string; a: string; category?: string }> = [];

/* =============================================================
   Quiz — "Find Your Chimney Service" (5 questions, 5 outcomes)
   ============================================================= */
export type QuizOption = {
  emoji: string;
  label: string;
  scores: Record<string, number>;
};
export type QuizStep = {
  question: string;
  options: QuizOption[];
};
export type QuizOutcome = {
  id: "sweep" | "level1" | "level2-realtor" | "liner" | "historic";
  emoji: string;
  title: string;
  body: string;
  recommendedService: string;
  ctaLabel: string;
  ctaHref: string;
};
export const quiz = {
  hookHeadline: "",
  hookBody: "",
  startCTA: "",
  steps: [] as QuizStep[],
  outcomes: [] as QuizOutcome[],
};

/* =============================================================
   Service Areas — 6 towns
   Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke
   ============================================================= */
export type ServiceArea = {
  city: string;
  state: "NH";
  slug: string;
  population: number;
  distance: string;
  founded?: number;
  housingNote?: string;
  description: string;
  faqs: Array<{ q: string; a: string }>;
};
export const serviceAreas: ServiceArea[] = [];

/* =============================================================
   Trust signals (footer + scattered)
   ============================================================= */
export const trustSignals: Array<{ icon: string; label: string; detail: string }> = [];

/* =============================================================
   Navigation
   ============================================================= */
export const nav = {
  primary: [
    { label: "Services", href: "/services" },
    { label: "Historic Restoration", href: "/historic-restoration" },
    { label: "For Realtors", href: "/for-realtors" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "Pricing", href: "/pricing" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  ctaPrimary: { label: "Book Inspection", href: "/booking" },
  ctaSecondary: { label: "Take the Quiz", href: "/quiz" },
};

/* =============================================================
   Footer
   ============================================================= */
export const footer = {
  tagline: "",
  legal: {
    licenseNotice: "",
    insuredNotice: "Fully insured. Free estimates.",
  },
  schemaAddress: {
    streetAddress: "",
    addressLocality: "Bow",
    addressRegion: "NH",
    postalCode: "",
    addressCountry: "US",
  },
};
