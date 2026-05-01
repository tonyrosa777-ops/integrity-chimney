import { Hero } from "@/components/sections/Hero";
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
 * Homepage section composition.
 * Strict dark/light alternation at every adjacency.
 *
 *  1. Hero                 (DARK   - bg-base, ember drift)
 *  2. PainPoints           (LIGHT  - bg-aged-mortar)
 *  3. ServicesPreview      (DARK   - bg-bg-elevated)
 *  4. StatsRow             (LIGHT  - bg-aged-mortar)
 *  5. FounderTeaser        (DARK   - bg-base)
 *  6. TestimonialsFeatured (LIGHT  - bg-aged-mortar)
 *  7. QuizCTA              (DARK   - bg-bg-elevated + copper accent)
 *  8. ServiceAreasMap      (LIGHT  - bg-aged-mortar)
 *  9. BlogPreview          (DARK   - bg-base)
 * 10. BookingPreview       (LIGHT  - bg-aged-mortar)
 * 11. FinalCTA             (DARK   - bg-bg-elevated)
 *
 * PromiseBand component removed from the homepage 2026-04-30: the phone
 * number is already a tap-target in the nav next to Contact, and the
 * 24-hour callback SLA is now baked into the H1 itself.
 */
export default function Home() {
  return (
    <>
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
