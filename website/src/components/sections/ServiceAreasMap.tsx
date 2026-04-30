/**
 * ServiceAreasMap.tsx - 6 service-area towns rendered as a checklist of dots
 * over a stylized map silhouette. Light tone.
 * Source: site.ts serviceAreas (6 towns).
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FadeUp,
  StaggerContainer,
  staggerItem,
} from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { serviceAreas, siteConfig } from "@/data/site";

export function ServiceAreasMap() {
  return (
    <section
      aria-labelledby="service-areas-heading"
      className="relative w-full overflow-hidden bg-aged-mortar py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Heading + intro */}
          <div className="lg:col-span-5">
            <FadeUp delay={0} duration={0.6} distance={20}>
              <p className="text-eyebrow mb-4 text-primary">
                Central New Hampshire
              </p>
              <h2
                id="service-areas-heading"
                className="font-display text-h1 text-granite-slate"
                style={{ fontWeight: 600 }}
              >
                Six towns we know by name and by chimney.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-granite-slate/80 md:text-lg">
                Based in {siteConfig.address.city}. We work the houses {siteConfig.address.city} and the surrounding towns have been heating for two centuries. If you&apos;re within thirty miles, you&apos;re on the route.
              </p>

              <FadeUp delay={0.2} duration={0.6} distance={14}>
                <div className="mt-8">
                  <Button
                    href="/service-areas"
                    variant="secondary"
                    className="border-primary text-primary hover:bg-primary hover:text-bg-base"
                  >
                    See all service areas
                  </Button>
                </div>
              </FadeUp>
            </FadeUp>
          </div>

          {/* Town list / map dots */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.15} duration={0.6} distance={20}>
              <div className="relative rounded-xl border border-primary/15 bg-white/70 p-6 shadow-sm md:p-8">
                {/* Decorative dotted backdrop */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(127,42,31,0.18) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />

                <StaggerContainer
                  staggerDelay={0.08}
                  className="relative grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {serviceAreas.map((area) => (
                    <motion.div key={area.slug} variants={staggerItem}>
                      <Link
                        href={`/service-areas/${area.slug}`}
                        className="group flex items-center gap-3 rounded-md border border-primary/10 bg-white/80 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md md:p-4"
                      >
                        <span
                          aria-hidden="true"
                          className="relative flex h-3 w-3 flex-shrink-0 items-center justify-center"
                        >
                          <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-accent/60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>
                        <div className="flex-1">
                          <p
                            className="font-display text-base text-granite-slate group-hover:text-primary"
                            style={{ fontWeight: 600 }}
                          >
                            {area.city}, {area.state}
                          </p>
                          <p className="font-mono mt-0.5 text-[0.7rem] uppercase tracking-[0.1em] text-granite-slate/70">
                            {area.distance}
                          </p>
                        </div>
                        <span
                          aria-hidden="true"
                          className="font-mono text-sm text-accent transition-transform group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </StaggerContainer>

                <p className="relative mt-6 text-center text-sm text-granite-slate/70">
                  Outside these six? Call {siteConfig.phone}. If you&apos;re within thirty miles of {siteConfig.address.city}, we&apos;ll come.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceAreasMap;
