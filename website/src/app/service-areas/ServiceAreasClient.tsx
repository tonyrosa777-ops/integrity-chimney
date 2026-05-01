/**
 * ServiceAreasClient.tsx - /service-areas index UI
 * Hero + 2-col grid of all 6 cities + "Don't see your town?" CTA.
 * All copy from @/data/site. Mobile-first.
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { serviceAreas, siteConfig } from "@/data/site";
import { telHref } from "@/lib/utils";

export function ServiceAreasClient() {
  return (
    <>
      {/* ── Hero (dark) ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
        style={{ background: "transparent" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(127,42,31,0.12) 0%, rgba(10,10,10,0) 60%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
          <FadeUp delay={0} duration={0.5} distance={14}>
            <p className="text-eyebrow mb-4">Where We Work</p>
          </FadeUp>

          <FadeUp delay={0.15} duration={0.6} distance={20}>
            <h1
              className="font-display text-display max-w-4xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Chimney + Masonry + Roofing Across Central NH
            </h1>
          </FadeUp>

          <FadeUp delay={0.3} duration={0.6} distance={16}>
            <p
              className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Based in {siteConfig.address.city}, {siteConfig.address.state}. We work the houses {siteConfig.address.city} and the surrounding towns have been heating for two centuries. Six core towns on the regular weekly route, plus everything within a 25-mile radius. Free estimates over $500. 24-hour callback.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Areas Grid (elevated) ───────────────────────────────────────── */}
      <section
        className="border-t py-16 md:py-24"
        style={{
          background: "transparent",
          borderColor: "rgba(184,115,51,0.12)",
        }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
          <FadeUp delay={0} duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">Six Towns On The Route</p>
            <h2
              className="font-display text-h2 max-w-3xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Cities and towns we serve.
            </h2>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
            {serviceAreas.map((area, idx) => (
              <FadeUp
                key={area.slug}
                delay={Math.min(0.05 + idx * 0.05, 0.35)}
                duration={0.5}
                distance={16}
                className="h-full"
              >
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="group block h-full"
                  aria-label={`Service details for ${area.city}, ${area.state}`}
                >
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-full flex-col rounded-md border p-6 transition-colors md:p-7"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "rgba(184,115,51,0.18)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className="font-display text-h3 transition-colors group-hover:text-accent"
                          style={{
                            color: "var(--text-primary)",
                            fontWeight: 600,
                          }}
                        >
                          {area.city}, {area.state}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span
                            className="font-mono inline-flex items-center rounded-sm border px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.1em]"
                            style={{
                              borderColor: "rgba(184,115,51,0.4)",
                              color: "var(--accent)",
                            }}
                          >
                            Pop. {area.population.toLocaleString()}
                          </span>
                          <span
                            className="font-mono inline-flex items-center rounded-sm border px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.1em]"
                            style={{
                              borderColor: "rgba(184,115,51,0.4)",
                              color: "var(--accent)",
                            }}
                          >
                            {area.distance}
                          </span>
                        </div>
                      </div>
                      <span
                        aria-hidden="true"
                        className="font-mono text-lg transition-transform group-hover:translate-x-1"
                        style={{ color: "var(--accent)" }}
                      >
                        →
                      </span>
                    </div>

                    <p
                      className="mt-4 line-clamp-4 text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {area.description}
                    </p>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Don't See Your Town CTA (dark) ──────────────────────────────── */}
      <section
        className="border-t py-16 md:py-24"
        style={{
          background: "transparent",
          borderColor: "rgba(184,115,51,0.12)",
        }}
      >
        <div className="mx-auto w-full max-w-[820px] px-6 text-center md:px-8 lg:px-12">
          <FadeUp delay={0} duration={0.5} distance={14}>
            <p className="text-eyebrow mb-4">Outside The Six?</p>
            <h2
              className="font-display text-h2 mx-auto max-w-2xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Don&apos;t see your town listed?
            </h2>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              We regularly travel throughout central New Hampshire. If you&apos;re within roughly 25 miles of {siteConfig.address.city}, you&apos;re likely on the route. Call and we&apos;ll tell you straight.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href={telHref(siteConfig.phoneTel)} variant="primary">
                Call {siteConfig.phone}
              </Button>
              <Button href="/contact" variant="secondary">
                Send a Message
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

export default ServiceAreasClient;
