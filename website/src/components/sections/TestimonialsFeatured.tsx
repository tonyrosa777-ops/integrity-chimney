/**
 * TestimonialsFeatured.tsx - 3 featured testimonial quotes. Light tone.
 * Source: site.ts testimonials[] - hand-picks 3 strongest across pillars.
 * Link to /testimonials for the full set (36 total).
 */

"use client";

import { motion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  staggerItem,
} from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { testimonials, type Testimonial } from "@/data/site";

const FEATURED_NAMES = ["Dan R.", "Bob and Linda H.", "Patricia L."];

function featured(): Testimonial[] {
  return FEATURED_NAMES.map((name) => testimonials.find((t) => t.name === name)).filter(
    (t): t is Testimonial => Boolean(t),
  );
}

function Stars({ rating }: { rating: 5 }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: rating }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="text-base text-accent"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialsFeatured() {
  const items = featured();

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative w-full bg-aged-mortar py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <FadeUp delay={0} duration={0.6} distance={20}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow mb-4 text-primary">
              From neighbors, realtors, and farmhouse owners
            </p>
            <h2
              id="testimonials-heading"
              className="font-display text-h1 text-granite-slate"
              style={{ fontWeight: 600 }}
            >
              The work record stands.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-granite-slate/80 md:text-lg">
              Three of thirty-six. Every name is real, every quote is verbatim, every star is earned.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer
          staggerDelay={0.12}
          className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-7"
        >
          {items.map((t) => (
            <motion.figure
              key={t.name}
              variants={staggerItem}
              className="flex flex-col rounded-lg border border-primary/15 bg-white/75 p-6 shadow-sm md:p-8"
            >
              <Stars rating={t.rating} />
              <blockquote className="mt-5 flex-1">
                <p className="font-display text-base italic leading-relaxed text-granite-slate md:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-6 border-t border-primary/15 pt-4">
                <p
                  className="font-mono text-xs uppercase tracking-[0.12em] text-primary"
                >
                  {t.name}
                </p>
                <p className="mt-1 text-sm text-granite-slate/80">
                  {t.town} · {t.service}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2} duration={0.6} distance={14}>
          <div className="mt-12 flex justify-center md:mt-14">
            <Button
              href="/testimonials"
              variant="secondary"
              className="border-primary text-primary hover:bg-primary hover:text-bg-base"
            >
              See all {testimonials.length} testimonials
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default TestimonialsFeatured;
