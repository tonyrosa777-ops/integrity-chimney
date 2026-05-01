/**
 * ServicePageClient.tsx - Integrity Chimney Services LLC
 * Client UI for /services/[slug].
 * Sections: Hero with breadcrumb · What You Get · Who It's For · How It Works ·
 *           Service-tagged testimonials · Service-specific FAQ · Final CTA.
 * FAQ accordion: @radix-ui/react-accordion with animated chevron rotation.
 */

"use client";

import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { FadeUp, StaggerContainer } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import {
  type Service,
  siteConfig,
  testimonials,
  promise,
} from "@/data/site";
import { telHref } from "@/lib/utils";

type ServicePageClientProps = {
  service: Service;
};

/**
 * Inline keyframes for the radix accordion content slide.
 * Scoped via a unique class name so we don't touch globals.css.
 */
const ACCORDION_STYLE = `
@keyframes ic-accordion-down {
  from { height: 0; opacity: 0; }
  to { height: var(--radix-accordion-content-height); opacity: 1; }
}
@keyframes ic-accordion-up {
  from { height: var(--radix-accordion-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
}
.ic-accordion-content[data-state="open"] {
  animation: ic-accordion-down 280ms cubic-bezier(0.16, 1, 0.3, 1);
}
.ic-accordion-content[data-state="closed"] {
  animation: ic-accordion-up 220ms cubic-bezier(0.16, 1, 0.3, 1);
}
@media (prefers-reduced-motion: reduce) {
  .ic-accordion-content[data-state="open"],
  .ic-accordion-content[data-state="closed"] {
    animation: none;
  }
}
`;

export function ServicePageClient({ service }: ServicePageClientProps) {
  const matchedTestimonials = testimonials
    .filter((t) => t.service === service.name)
    .slice(0, 3);

  return (
    <div>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: ACCORDION_STYLE }}
      />
      {/* ── Hero with breadcrumb (dark) ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
        style={{ background: "transparent" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(127,42,31,0.14) 0%, rgba(10,10,10,0) 60%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
          <FadeUp delay={0} duration={0.4} distance={10}>
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.08em]"
              style={{ color: "var(--text-muted)" }}
            >
              <Link
                href="/services"
                className="transition-colors hover:text-accent"
                style={{ color: "var(--text-muted)" }}
              >
                Services
              </Link>
              <span aria-hidden="true">›</span>
              <span style={{ color: "var(--text-secondary)" }}>
                {service.name}
              </span>
            </nav>
          </FadeUp>

          <FadeUp delay={0.1} duration={0.5} distance={14}>
            <p className="text-eyebrow mb-4 flex items-center gap-2">
              <span aria-hidden="true" className="text-base">
                {service.emoji}
              </span>
              <span>{service.pillar} services</span>
            </p>
          </FadeUp>

          <FadeUp delay={0.2} duration={0.6} distance={20}>
            <h1
              className="font-display text-display max-w-4xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              {service.name}
            </h1>
          </FadeUp>

          <FadeUp delay={0.35} duration={0.6} distance={16}>
            <p
              className="font-display mt-5 max-w-3xl text-lg italic md:text-xl"
              style={{ color: "var(--accent)" }}
            >
              {service.tagline}
            </p>
          </FadeUp>

          <FadeUp delay={0.5} duration={0.6} distance={16}>
            <p
              className="mt-6 max-w-3xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {service.description}
            </p>
          </FadeUp>

          <FadeUp delay={0.65} duration={0.5} distance={14}>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/booking" variant="primary">
                Book Inspection
              </Button>
              <Button
                href={telHref(siteConfig.phoneTel)}
                variant="secondary"
              >
                Call {siteConfig.phone}
              </Button>
              <span
                className="font-mono text-xs uppercase tracking-[0.12em] sm:ml-2"
                style={{ color: "var(--text-muted)" }}
              >
                {service.startingPrice}
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── What You Get (light-elevated) ──────────────────────────────── */}
      <section
        className="border-t py-16 md:py-24"
        style={{
          background: "transparent",
          borderColor: "rgba(184,115,51,0.12)",
        }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
          <FadeUp delay={0} duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">What You Get</p>
            <h2
              className="font-display text-h2 max-w-2xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Every job, every time.
            </h2>
          </FadeUp>

          <ul className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
            {service.whatYouGet.map((item, idx) => (
              <FadeUp
                key={item}
                delay={Math.min(0.05 + idx * 0.05, 0.35)}
                duration={0.5}
                distance={14}
              >
                <li
                  className="flex items-start gap-4 rounded-lg border p-5 md:p-6"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(184,115,51,0.18)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-mono text-xs"
                    style={{
                      background: "rgba(184,115,51,0.18)",
                      color: "var(--accent)",
                    }}
                  >
                    ✓
                  </span>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Who It's For (dark) ────────────────────────────────────────── */}
      <section
        className="border-t py-16 md:py-24"
        style={{
          background: "transparent",
          borderColor: "rgba(184,115,51,0.12)",
        }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
          <FadeUp delay={0} duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">Who It's For</p>
            <h2
              className="font-display text-h2 max-w-2xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Built for these situations.
            </h2>
          </FadeUp>

          <ul className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
            {service.whoItsFor.map((item, idx) => (
              <FadeUp
                key={item}
                delay={Math.min(0.05 + idx * 0.05, 0.35)}
                duration={0.5}
                distance={14}
              >
                <li
                  className="flex items-start gap-4 rounded-lg border-l-2 p-4 md:p-5"
                  style={{
                    borderLeftColor: "var(--accent)",
                    background: "transparent",
                  }}
                >
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How It Works (light-elevated) ──────────────────────────────── */}
      <section
        className="border-t py-16 md:py-24"
        style={{
          background: "transparent",
          borderColor: "rgba(184,115,51,0.12)",
        }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
          <FadeUp delay={0} duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">How It Works</p>
            <h2
              className="font-display text-h2 max-w-2xl"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              From the first call to the final walk-through.
            </h2>
          </FadeUp>

          <ol className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:gap-8">
            {service.process.map((step, idx) => (
              <FadeUp
                key={step.step}
                delay={Math.min(0.05 + idx * 0.06, 0.4)}
                duration={0.55}
                distance={16}
              >
                <li
                  className="grid grid-cols-[auto_1fr] gap-5 rounded-lg border p-5 md:gap-8 md:p-7"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(184,115,51,0.18)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md font-mono text-lg md:h-14 md:w-14 md:text-xl"
                    style={{
                      background: "var(--primary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {String(step.step).padStart(2, "0")}
                  </div>
                  <div>
                    <h3
                      className="font-display text-h4"
                      style={{
                        color: "var(--text-primary)",
                        fontWeight: 600,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="mt-2 text-base leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {step.body}
                    </p>
                  </div>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Testimonials (dark) ────────────────────────────────────────── */}
      {matchedTestimonials.length > 0 ? (
        <section
          className="border-t py-16 md:py-24"
          style={{
            background: "transparent",
            borderColor: "rgba(184,115,51,0.12)",
          }}
        >
          <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
            <FadeUp delay={0} duration={0.5} distance={12}>
              <p className="text-eyebrow mb-3">From Neighbors</p>
              <h2
                className="font-display text-h2 max-w-2xl"
                style={{ color: "var(--text-primary)", fontWeight: 600 }}
              >
                What homeowners said about this work.
              </h2>
            </FadeUp>

            <StaggerContainer
              staggerDelay={0.1}
              className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3 md:gap-8"
            >
              {matchedTestimonials.map((t) => (
                <figure
                  key={`${t.name}-${t.date}`}
                  className="flex h-full flex-col gap-4 rounded-lg border p-6 md:p-7"
                  style={{
                    background: "transparent",
                    borderColor: "rgba(184,115,51,0.18)",
                  }}
                >
                  <div
                    aria-label={`${t.rating} out of 5 stars`}
                    className="font-mono text-sm tracking-[0.2em]"
                    style={{ color: "var(--accent)" }}
                  >
                    ★★★★★
                  </div>
                  <blockquote
                    className="font-display text-base leading-relaxed italic md:text-lg"
                    style={{ color: "var(--text-primary)" }}
                  >
                    “{t.quote}”
                  </blockquote>
                  <figcaption
                    className="mt-auto border-t pt-4 font-mono text-xs uppercase tracking-[0.08em]"
                    style={{
                      borderColor: "rgba(245,245,245,0.08)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <span style={{ color: "var(--text-secondary)" }}>
                      {t.name}
                    </span>
                    <span aria-hidden="true"> · </span>
                    <span>{t.town}</span>
                  </figcaption>
                </figure>
              ))}
            </StaggerContainer>
          </div>
        </section>
      ) : null}

      {/* ── FAQ (light-elevated, radix accordion) ──────────────────────── */}
      <section
        className="border-t py-16 md:py-24"
        style={{
          background: "transparent",
          borderColor: "rgba(184,115,51,0.12)",
        }}
      >
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8 lg:px-0">
          <FadeUp delay={0} duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">Common Questions</p>
            <h2
              className="font-display text-h2"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              {service.name} FAQ
            </h2>
          </FadeUp>

          <FadeUp delay={0.15} duration={0.5} distance={14}>
            <Accordion.Root
              type="single"
              collapsible
              className="mt-10 flex flex-col gap-3 md:mt-14"
            >
              {service.faq.map((item, idx) => {
                const value = `faq-${idx}`;
                return (
                  <Accordion.Item
                    key={value}
                    value={value}
                    className="overflow-hidden rounded-lg border"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "rgba(184,115,51,0.18)",
                    }}
                  >
                    <Accordion.Header className="flex">
                      <Accordion.Trigger
                        className="group flex flex-1 items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[rgba(184,115,51,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset md:px-6"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <span className="font-display text-base font-medium leading-snug md:text-lg">
                          {item.q}
                        </span>
                        <svg
                          aria-hidden="true"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-1 flex-shrink-0 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180"
                          style={{ color: "var(--accent)" }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content
                      className="ic-accordion-content overflow-hidden"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <div
                        className="border-t px-5 pb-5 pt-4 text-base leading-relaxed md:px-6"
                        style={{ borderColor: "rgba(245,245,245,0.08)" }}
                      >
                        {item.a}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                );
              })}
            </Accordion.Root>
          </FadeUp>
        </div>
      </section>

      {/* ── Final CTA (dark) ───────────────────────────────────────────── */}
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

export default ServicePageClient;
