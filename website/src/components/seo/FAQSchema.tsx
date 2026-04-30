/**
 * FAQSchema.tsx
 *
 * Emits FAQPage JSON-LD for any page with a question-and-answer block.
 * Used on /faq, /chimney-scams-nh, per-service /services/[slug] pages, and
 * per-city /service-areas/[city] pages.
 *
 * Accepts the {q, a} shape used throughout site.ts so callers can pass the
 * existing data arrays directly.
 */

import { JsonLd } from "./JsonLd";

type FaqItem = {
  q: string;
  a: string;
};

type Props = {
  faqs: ReadonlyArray<FaqItem>;
};

export function FAQSchema({ faqs }: Props) {
  if (!faqs || faqs.length === 0) return null;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return <JsonLd data={data} />;
}
