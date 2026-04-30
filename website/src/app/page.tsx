import { Hero } from "@/components/sections/Hero";
import { PromiseBand } from "@/components/sections/PromiseBand";
import { PainPoints } from "@/components/sections/PainPoints";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { StatsRow } from "@/components/sections/StatsRow";
import { FounderTeaser } from "@/components/sections/FounderTeaser";
import { TestimonialsFeatured } from "@/components/sections/TestimonialsFeatured";
import { QuizCTA } from "@/components/sections/QuizCTA";
import { ServiceAreasMap } from "@/components/sections/ServiceAreasMap";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { BookingPreview } from "@/components/sections/BookingPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Homepage section composition (Stage 1E Wave 1).
 * Locked order. Strict dark/light alternation enforced at every adjacency.
 *
 *  1. PromiseBand          (LIGHT  - bg-aged-mortar, slim SLA band)
 *  2. Hero                 (DARK   - bg-base, ember drift)
 *  3. PainPoints           (LIGHT  - bg-aged-mortar, 4 empathy cards)
 *  4. ServicesPreview      (DARK   - bg-bg-elevated, 3 pillar cards)
 *  5. StatsRow             (LIGHT  - bg-aged-mortar, 3 CountUp stats)
 *  6. FounderTeaser        (DARK   - bg-base, owner photo + bio)
 *  7. TestimonialsFeatured (LIGHT  - bg-aged-mortar, 3 quotes)
 *  8. QuizCTA              (DARK   - bg-bg-elevated + copper accent)
 *  9. ServiceAreasMap      (LIGHT  - bg-aged-mortar, 6 town dots)
 * 10. BlogPreview          (DARK   - bg-base, 3 placeholder cards)
 * 11. BookingPreview       (LIGHT  - bg-aged-mortar, calendar teaser)
 * 12. FinalCTA             (DARK   - bg-bg-elevated, phone + email + book)
 */
export default function Home() {
  return (
    <>
      <PromiseBand />
      <Hero />
      <PainPoints />
      <ServicesPreview />
      <StatsRow />
      <FounderTeaser />
      <TestimonialsFeatured />
      <QuizCTA />
      <ServiceAreasMap />
      <BlogPreview />
      <BookingPreview />
      <FinalCTA />
    </>
  );
}
