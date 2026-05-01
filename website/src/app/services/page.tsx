/**
 * /services - Services hub
 * Shows three pillar services prominently, then sub-services in a grid.
 * Source: site.ts services[]. Each card links to /services/[slug].
 */

import type { Metadata } from "next";
import { FadeUp } from "@/components/animations";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Button } from "@/components/ui/Button";
import { services, siteConfig, promise } from "@/data/site";
import { telHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services | Chimney, Masonry, and Roofing in Central NH",
  description:
    "Chimney sweeps, Level 2 inspections, stainless liners, crown rebuilds, lime mortar restoration, and architectural roofing across Bow and central NH.",
  openGraph: {
    title: "Services | Integrity Chimney Services LLC",
    description:
      "Eleven owner-operated chimney, masonry, and roofing services across central New Hampshire. One craftsman who answers the phone. Free estimates.",
    url: `${siteConfig.url}/services`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Integrity Chimney Services LLC",
    description:
      "Eleven owner-operated chimney, masonry, and roofing services across central New Hampshire. One craftsman who answers the phone. Free estimates.",
  },
};

const PILLAR_SLUGS = ["chimney", "masonry", "roofing"] as const;

export default function ServicesPage() {
  const pillars = PILLAR_SLUGS.map((slug) =>
    services.find((s) => s.slug === slug),
  ).filter((s): s is (typeof services)[number] => Boolean(s));

  const subServices = services.filter(
    (s) => !PILLAR_SLUGS.includes(s.slug as (typeof PILLAR_SLUGS)[number]),
  );

  return (
    <div>
      {/* ── Page Hero (dark) ───────────────────────────────────────────── */}
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
            <p className="text-eyebrow mb-4">What We Do</p>
          </FadeUp>

          <FadeUp delay={0.15} duration={0.6} distance={20}>
            <h1
              className="font-display text-display max-w-4xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Chimney, masonry, and roofing across central New Hampshire.
            </h1>
          </FadeUp>

          <FadeUp delay={0.3} duration={0.6} distance={16}>
            <p
              className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Owner-operated work from {siteConfig.address.city},{" "}
              {siteConfig.address.state}. {promise.body}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Three Pillars (light-elevated) ─────────────────────────────── */}
      <section
        className="border-t py-16 md:py-24"
        style={{
          background: "transparent",
          borderColor: "rgba(184,115,51,0.12)",
        }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
          <FadeUp delay={0} duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">The Three Pillars</p>
            <h2
              className="font-display text-h2 max-w-3xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              One contractor. One warranty. One visit when you need both.
            </h2>
            <p
              className="mt-4 max-w-2xl text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Most chimney leaks start at the flashing where the chimney meets
              the roof. We handle chimney, masonry, and roofing together so the
              seal lasts and the work is documented end to end.
            </p>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
            {pillars.map((service, idx) => (
              <FadeUp
                key={service.slug}
                delay={0.1 + idx * 0.08}
                duration={0.6}
                distance={20}
                className="h-full"
              >
                <ServiceCard service={service} variant="pillar" />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sub-services grid (dark) ───────────────────────────────────── */}
      <section
        className="border-t py-16 md:py-24"
        style={{
          background: "transparent",
          borderColor: "rgba(184,115,51,0.12)",
        }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
          <FadeUp delay={0} duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">Specific Services</p>
            <h2
              className="font-display text-h2 max-w-3xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Pick the service that matches your situation.
            </h2>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-3">
            {subServices.map((service, idx) => (
              <FadeUp
                key={service.slug}
                delay={Math.min(0.05 + idx * 0.05, 0.4)}
                duration={0.5}
                distance={16}
                className="h-full"
              >
                <ServiceCard service={service} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA (light/aged-mortar) ──────────────────────────────── */}
      <section
        className="border-t py-16 md:py-24"
        style={{
          background: "transparent",
          borderColor: "rgba(184,115,51,0.12)",
        }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 text-center md:px-8 lg:px-12">
          <FadeUp delay={0} duration={0.5} distance={14}>
            <p className="text-eyebrow mb-4">Ready to Schedule</p>
            <h2
              className="font-display text-h2 mx-auto max-w-2xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              {promise.headline}
            </h2>
            <p
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {promise.body}
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/booking" variant="primary">
                Book Inspection
              </Button>
              <Button
                href={telHref(siteConfig.phoneTel)}
                variant="secondary"
              >
                Call {siteConfig.phone}
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
