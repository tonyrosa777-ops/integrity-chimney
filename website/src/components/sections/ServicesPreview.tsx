/**
 * ServicesPreview.tsx - 3-card preview of the chimney/masonry/roofing pillars.
 * Dark tone. Each card links to /services/[slug] of the pillar service.
 * Source: site.ts services[] filtered to one per pillar.
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FadeUp, StaggerContainer, staggerItem } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { services, type Service } from "@/data/site";

const PILLAR_ORDER: Array<Service["pillar"]> = ["chimney", "masonry", "roofing"];

function pillarServices(): Service[] {
  return PILLAR_ORDER.map((p) => services.find((s) => s.slug === p)).filter(
    (s): s is Service => Boolean(s),
  );
}

export function ServicesPreview() {
  const pillars = pillarServices();

  return (
    <section
      aria-labelledby="services-preview-heading"
      className="relative w-full bg-bg-elevated py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <FadeUp delay={0} duration={0.6} distance={20}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow mb-4">Three pillars, one phone number.</p>
            <h2
              id="services-preview-heading"
              className="font-display text-h1 text-text-primary"
              style={{ fontWeight: 600 }}
            >
              Chimney, masonry, and roofing under one roof.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              Most contractors hand off the parts they don&apos;t want to do. We don&apos;t. The chimney flashing, the brick, and the shingles all meet at the same line on the roof, and we work all three.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer
          staggerDelay={0.14}
          className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-7"
        >
          {pillars.map((service) => (
            <motion.article
              key={service.slug}
              variants={staggerItem}
              className="group relative flex flex-col rounded-lg border border-text-primary/10 bg-bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 md:p-7"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary/15 text-2xl"
              >
                {service.emoji}
              </span>
              <h3
                className="font-display mt-5 text-2xl leading-snug text-text-primary"
                style={{ fontWeight: 600 }}
              >
                {service.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
                {service.tagline}
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-accent">
                {service.startingPrice}
              </p>

              <ul className="mt-5 space-y-2 border-t border-text-primary/10 pt-5">
                {service.whatYouGet.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-snug text-text-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-1 items-end pt-2">
                <Link
                  href={`/services/${service.slug}`}
                  className="font-mono text-xs uppercase tracking-[0.1em] text-accent transition-colors hover:text-text-primary"
                >
                  See {service.pillar} services →
                </Link>
              </div>
            </motion.article>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2} duration={0.6} distance={14}>
          <div className="mt-12 flex justify-center md:mt-16">
            <Button href="/services" variant="secondary">
              View all services
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default ServicesPreview;
