/**
 * CityPageClient.tsx - /service-areas/[city] UI
 * Four sections: Hero, City Info (text + Google Maps), Services, City FAQ.
 * Trust checklist + FAQ defaults are constants inside this file
 * (per Wave 2 spec). All other copy from @/data/site.
 */

"use client";

import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { FadeUp } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { services, siteConfig, type ServiceArea } from "@/data/site";
import { telHref } from "@/lib/utils";

type Props = {
  area: ServiceArea;
};

const TRUST_CHECKLIST: ReadonlyArray<string> = [
  "BBB A+ Accredited",
  "Fully Insured",
  "15+ Years Experience",
  "Free Estimates",
  "24-Hour Callback",
];

function cityFaqs(city: string): Array<{ q: string; a: string }> {
  return [
    {
      q: `Do you offer same-week service in ${city}?`,
      a: `Yes. Most ${city} customers schedule within 4-7 days during shoulder seasons. Heating-season weeks (Sept-Nov) book up faster, so call as early as you can.`,
    },
    {
      q: `How much does chimney cleaning cost in ${city}?`,
      a: `Our standard sweep starts at $219. Final price after on-site inspection. Free estimates over $500 of work.`,
    },
    {
      q: `What areas of ${city} do you serve?`,
      a: `We serve all of ${city}, including the historic district, town center, and outlying areas. We do not charge travel fees within our 25-mile core service radius.`,
    },
  ];
}

export function CityPageClient({ area }: Props) {
  const faqs = area.faqs && area.faqs.length > 0 ? area.faqs : cityFaqs(area.city);

  return (
    <>
      {/* ============== SECTION 1: HERO ============== */}
      <section
        className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
        style={{ background: "var(--bg-base)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 0%, rgba(127,42,31,0.14) 0%, rgba(10,10,10,0) 55%), radial-gradient(ellipse at 80% 90%, rgba(184,115,51,0.10) 0%, rgba(10,10,10,0) 55%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
          {/* Breadcrumb */}
          <FadeUp delay={0} duration={0.4} distance={8}>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--text-muted)" }}
            >
              <Link
                href="/service-areas"
                className="transition-colors hover:text-accent"
              >
                Service Areas
              </Link>
              <span aria-hidden="true">›</span>
              <span style={{ color: "var(--accent)" }}>
                {area.city}, {area.state}
              </span>
            </nav>
          </FadeUp>

          <FadeUp delay={0.05} duration={0.5} distance={14}>
            <p className="text-eyebrow mb-4">
              Now Serving {area.city}, {area.state}
            </p>
          </FadeUp>

          <FadeUp delay={0.15} duration={0.6} distance={20}>
            <h1
              className="font-display text-display max-w-4xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Chimney + Masonry + Roofing in {area.city}, {area.state}
            </h1>
          </FadeUp>

          <FadeUp delay={0.3} duration={0.6} distance={16}>
            <p
              className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {area.description}
            </p>
          </FadeUp>

          <FadeUp delay={0.45} duration={0.6} distance={14}>
            <div className="mt-8 flex flex-col items-stretch justify-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/contact" variant="primary">
                Get a Free Estimate in {area.city}
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

      {/* ============== SECTION 2: CITY INFO (text + map) ============== */}
      <section
        className="border-t py-16 md:py-24"
        style={{
          background: "var(--bg-elevated)",
          borderColor: "rgba(184,115,51,0.12)",
        }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT: Text + checklist */}
            <FadeUp duration={0.6} distance={18}>
              <p className="text-eyebrow mb-3">Local Coverage</p>
              <h2
                className="font-display text-h2"
                style={{ color: "var(--text-primary)", fontWeight: 600 }}
              >
                Your Local Chimney Specialists in {area.city}
              </h2>

              <div className="mt-6 space-y-5 text-base leading-relaxed md:text-lg">
                <p style={{ color: "var(--text-secondary)" }}>
                  {area.description}
                </p>
                {area.housingNote ? (
                  <p style={{ color: "var(--text-secondary)" }}>
                    {area.housingNote} Whether you&apos;re heating a 1798 center-chimney Cape or a post-2000 colonial in {area.city}, the work gets the materials, mortar, and documentation it actually deserves.
                  </p>
                ) : (
                  <p style={{ color: "var(--text-secondary)" }}>
                    {area.city} is on the regular weekly route from our base in {siteConfig.address.city}. From routine sweeps to full chimney rebuilds, every visit ends with photos so you can see what we saw before you pay anything.
                  </p>
                )}
              </div>

              {/* Trust checklist */}
              <ul className="mt-8 space-y-3" aria-label="Trust signals">
                {TRUST_CHECKLIST.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm md:text-base"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: "rgba(184,115,51,0.15)",
                        color: "var(--accent)",
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span style={{ fontWeight: 500 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* RIGHT: Map + info card */}
            <FadeUp delay={0.1} duration={0.6} distance={18}>
              <div className="overflow-hidden rounded-2xl shadow-md h-64">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    area.city + ", NH",
                  )}&output=embed&hl=en`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${area.city}, ${area.state}`}
                />
              </div>

              <div
                className="mt-5 rounded-md border p-5"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "rgba(184,115,51,0.18)",
                }}
              >
                <p
                  className="font-display text-base"
                  style={{ color: "var(--text-primary)", fontWeight: 600 }}
                >
                  Serving {area.city}, {area.state}
                </p>
                <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  <div className="flex items-baseline justify-between gap-3 sm:block">
                    <dt
                      className="font-mono text-[0.65rem] uppercase tracking-[0.12em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Distance
                    </dt>
                    <dd
                      className="sm:mt-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {area.distance}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 sm:block">
                    <dt
                      className="font-mono text-[0.65rem] uppercase tracking-[0.12em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Population
                    </dt>
                    <dd
                      className="sm:mt-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {area.population.toLocaleString()}
                    </dd>
                  </div>
                  {area.founded ? (
                    <div className="flex items-baseline justify-between gap-3 sm:block sm:col-span-2">
                      <dt
                        className="font-mono text-[0.65rem] uppercase tracking-[0.12em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Founded
                      </dt>
                      <dd
                        className="sm:mt-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {area.founded}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ============== SECTION 3: SERVICES AVAILABLE ============== */}
      <section
        className="border-t py-16 md:py-24"
        style={{
          background: "var(--bg-base)",
          borderColor: "rgba(184,115,51,0.12)",
        }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">What We Do Here</p>
            <h2
              className="font-display text-h2 max-w-3xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Services Available in {area.city}
            </h2>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {services.map((service, idx) => (
              <FadeUp
                key={service.slug}
                delay={Math.min(0.05 + idx * 0.04, 0.4)}
                duration={0.4}
                distance={12}
                className="h-full"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full items-center gap-3 rounded-md border px-4 py-3 transition-colors hover:border-accent"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(184,115,51,0.18)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-base"
                    style={{ background: "rgba(184,115,51,0.12)" }}
                  >
                    {service.emoji}
                  </span>
                  <span
                    className="text-sm transition-colors group-hover:text-accent md:text-base"
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 500,
                    }}
                  >
                    {service.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono ml-auto text-sm transition-transform group-hover:translate-x-0.5"
                    style={{ color: "var(--accent)" }}
                  >
                    →
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SECTION 4: CITY FAQ ============== */}
      <section
        className="border-t py-16 md:py-24"
        style={{
          background: "var(--bg-elevated)",
          borderColor: "rgba(184,115,51,0.12)",
        }}
      >
        <div className="mx-auto max-w-[860px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">Local Questions</p>
            <h2
              className="font-display text-h2"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              {area.city} Chimney Services FAQ
            </h2>
          </FadeUp>

          <FadeUp delay={0.1} duration={0.5} distance={12}>
            <Accordion.Root
              type="multiple"
              className="mt-8 flex flex-col gap-3"
              aria-label={`${area.city} FAQ`}
            >
              {faqs.map((faq, idx) => {
                const value = `${area.slug}-faq-${idx}`;
                return (
                  <Accordion.Item
                    key={value}
                    value={value}
                    className="overflow-hidden rounded-md border"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "rgba(184,115,51,0.18)",
                    }}
                  >
                    <Accordion.Header className="flex">
                      <Accordion.Trigger className="city-faq-trigger group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[rgba(184,115,51,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base md:px-6 md:py-5">
                        <span
                          className="font-display text-base font-semibold md:text-lg"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {faq.q}
                        </span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180"
                          style={{ color: "var(--accent)" }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="city-faq-content overflow-hidden">
                      <div
                        className="px-5 pb-5 text-sm leading-relaxed md:px-6 md:pb-6 md:text-base"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {faq.a}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                );
              })}
            </Accordion.Root>
          </FadeUp>

          <style>{`
            .city-faq-content[data-state="open"] {
              animation: city-faq-down 240ms cubic-bezier(0.16, 1, 0.3, 1);
            }
            .city-faq-content[data-state="closed"] {
              animation: city-faq-up 200ms cubic-bezier(0.16, 1, 0.3, 1);
            }
            @keyframes city-faq-down {
              from { height: 0; opacity: 0; }
              to { height: var(--radix-accordion-content-height); opacity: 1; }
            }
            @keyframes city-faq-up {
              from { height: var(--radix-accordion-content-height); opacity: 1; }
              to { height: 0; opacity: 0; }
            }
            @media (prefers-reduced-motion: reduce) {
              .city-faq-content[data-state="open"],
              .city-faq-content[data-state="closed"] {
                animation: none;
              }
            }
          `}</style>
        </div>
      </section>
    </>
  );
}

export default CityPageClient;
