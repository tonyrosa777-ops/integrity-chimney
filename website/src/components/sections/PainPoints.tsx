/**
 * PainPoints.tsx - 4-card empathy section.
 * Light tone. No CTA. Mirrors the homeowner's mindset before pitch.
 * Source: site.ts painPoints[] (market-intelligence.md §2 + §7).
 */

"use client";

import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, staggerItem } from "@/components/animations";
import { painPoints } from "@/data/site";

export function PainPoints() {
  return (
    <section
      aria-labelledby="pain-points-heading"
      className="relative w-full bg-aged-mortar py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <FadeUp delay={0} duration={0.6} distance={20}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow mb-4 text-primary">
              Sound familiar?
            </p>
            <h2
              id="pain-points-heading"
              className="font-display text-h1 text-granite-slate"
              style={{ fontWeight: 600 }}
            >
              You called three guys. One came out. None followed up.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-granite-slate/80 md:text-lg">
              Most chimney calls in central NH start with a homeowner who has been ignored. We hear these four stories more than any others.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer
          staggerDelay={0.12}
          className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:gap-8"
        >
          {painPoints.map((point) => (
            <motion.article
              key={point.title}
              variants={staggerItem}
              className="group relative flex flex-col rounded-lg border border-primary/15 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md md:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute -top-4 left-6 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg shadow-md md:left-8"
              >
                {point.emoji}
              </span>
              <h3
                className="font-display mt-4 text-xl leading-snug text-granite-slate md:text-2xl"
                style={{ fontWeight: 600 }}
              >
                {point.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-granite-slate/80">
                {point.body}
              </p>
            </motion.article>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default PainPoints;
