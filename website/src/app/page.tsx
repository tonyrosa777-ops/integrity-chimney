import { Hero } from "@/components/sections/Hero";

/**
 * Homepage section composition (locked plan — Stage 1E).
 * Sections build out in subsequent commits. Adjacent dark/light alternation
 * is enforced; no two adjacent sections share the same purpose.
 *
 * 1.  Hero (dark)                              ← built (Stage 1D)
 * 2.  Pain Points / 4-card empathy (light)     ← Stage 1E next
 * 3.  Services Preview / 3 pillars (dark)      ← Stage 1E next
 * 4.  Stats Row / CountUp (light-elevated)     ← Stage 1E next
 * 5.  Founder Teaser → /about (dark)           ← Stage 1E next
 * 6.  Testimonials Featured (light)            ← Stage 1E next
 * 7.  Quiz CTA → /quiz (dark)                  ← Stage 1E next
 * 8.  Service Areas Map → /service-areas (light) ← Stage 1E next
 * 9.  Blog Preview → /blog (dark)              ← Stage 1E next
 * 10. Booking Calendar Preview (light-stage)   ← Stage 1E next
 * 11. Final CTA Block (dark)                   ← Stage 1E next
 */
export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
