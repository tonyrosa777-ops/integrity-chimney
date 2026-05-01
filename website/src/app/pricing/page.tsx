"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { pricing, pricingDisclaimer, siteConfig } from "@/data/site";

/**
 * /pricing - Client-facing starting-at pricing page.
 * Source: market-intel section 4 plus section 9 Do #3.
 * Anything Chimney is the only other NH competitor publishing prices.
 * Integrity beats them by publishing AND adding the 24-hour callback SLA.
 *
 * NOTE: This file is a Client Component because the page CTAs use scroll
 * smoothing and the disclaimer band uses a dynamic accent reveal that
 * other agents extend in Wave 3. All copy comes from site.ts.
 */

const checkPath = "M5 13l4 4L19 7";
const dashPath = "M5 12h14";

function ServiceIcon({ kind }: { kind: "check" | "dash" }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 flex-shrink-0"
    >
      <path d={kind === "check" ? checkPath : dashPath} />
    </svg>
  );
}

const differentiators = [
  {
    label: "Honest Numbers",
    title: "We post the price. The category hides it.",
    body: "Most chimney companies in central NH won't publish a single number. They want to send a salesman so they can read your driveway, your zip code, and your kitchen counter. We post the starting price because the work has a real number.",
  },
  {
    label: "24-Hour Callback",
    title: "If we miss your call, we call back in four business hours.",
    body: "Published prices plus a published SLA. If we don't hit the callback window, your free estimate is on us. That promise is on every page of this site for a reason.",
  },
  {
    label: "Free Estimates",
    title: "On-site quotes are free over $500 of work.",
    body: "We come out, climb the roof, look at the flue, and write the number down. No deposit over $1,000 until day-of-start. Travel fees waived inside our 25-mile core service radius.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* ============== Hero ============== */}
      <section
        className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
        style={{ background: "transparent" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(184,115,51,0.10) 0%, rgba(10,10,10,0) 55%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[920px] px-6 text-center md:px-8 lg:px-12">
          <p className="text-eyebrow mb-4">
            STARTING-AT PRICING · NO HIDDEN COSTS
          </p>
          <h1
            className="text-display font-display font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Honest Prices, Up Front
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-base md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Most chimney companies in central New Hampshire refuse to publish
            prices. They want a salesman in your kitchen before they hand you a
            number. We do the opposite. The starting prices below are real.
            They were the same yesterday and they will be the same next month.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button href="/booking" variant="primary">
              Book Inspection
            </Button>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="font-mono text-sm uppercase tracking-wider hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              Or call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ============== Pricing cards ============== */}
      <section
        className="relative py-16 md:py-24"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {pricing.map((tier) => (
              <article
                key={tier.service}
                className="flex flex-col rounded-xl p-7 md:p-8"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(184,115,51,0.18)",
                }}
              >
                <header className="mb-5">
                  <h2
                    className="font-display text-xl font-semibold leading-snug md:text-2xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {tier.service}
                  </h2>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span
                      className="font-display text-4xl font-semibold leading-none md:text-5xl"
                      style={{ color: "var(--accent)" }}
                    >
                      {tier.price}
                    </span>
                    <span
                      className="font-mono text-xs uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      starting at
                    </span>
                  </div>
                </header>

                <div className="mb-5">
                  <p
                    className="text-eyebrow mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    INCLUDED
                  </p>
                  <ul className="space-y-2.5">
                    {tier.includes.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2.5 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span style={{ color: "var(--accent)" }}>
                          <ServiceIcon kind="check" />
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {tier.excludes && tier.excludes.length > 0 && (
                  <div className="mb-6">
                    <p
                      className="text-eyebrow mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      NOT INCLUDED
                    </p>
                    <ul className="space-y-2.5">
                      {tier.excludes.map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-2.5 text-sm leading-relaxed"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <span style={{ color: "var(--text-muted)" }}>
                            <ServiceIcon kind="dash" />
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto flex flex-col gap-2">
                  <Button href="/booking" variant="primary">
                    Schedule This Service
                  </Button>
                  <Link
                    href={tier.href}
                    className="text-center font-mono text-xs uppercase tracking-wider hover:opacity-80"
                    style={{ color: "var(--accent)" }}
                  >
                    Service details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Disclaimer band ============== */}
      <section
        className="relative py-12 md:py-16"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto max-w-[920px] px-6 md:px-8 lg:px-12">
          <div
            className="rounded-lg px-6 py-7 md:px-9 md:py-8"
            style={{
              background: "transparent",
              borderLeft: "3px solid var(--accent)",
            }}
          >
            <p
              className="text-eyebrow mb-3"
              style={{ color: "var(--accent)" }}
            >
              FINE PRINT, IN PLAIN ENGLISH
            </p>
            <p
              className="text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Final price after on-site assessment. Free estimates over $500 of
              work. Travel fees waived within 25-mile core service radius.{" "}
              {pricingDisclaimer.body}
            </p>
          </div>
        </div>
      </section>

      {/* ============== Why we publish prices ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto max-w-[1100px] px-6 md:px-8 lg:px-12">
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <p className="text-eyebrow mb-4">
              WHY WE PUBLISH PRICES
            </p>
            <h2
              className="text-h1 font-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Three reasons we don&apos;t hide the number.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
            {differentiators.map((d) => (
              <div
                key={d.label}
                className="rounded-xl p-7 md:p-8"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(184,115,51,0.14)",
                }}
              >
                <p
                  className="text-eyebrow mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  {d.label.toUpperCase()}
                </p>
                <h3
                  className="font-display text-lg font-semibold leading-snug md:text-xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  {d.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed md:text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Final CTA ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto max-w-[820px] px-6 text-center md:px-8 lg:px-12">
          <p className="text-eyebrow mb-4">READY WHEN YOU ARE</p>
          <h2
            className="text-h2 font-display font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Book the inspection. Get the real number.
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-base md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {`We answer the phone at ${siteConfig.phone}. If we miss, you hear back inside four business hours. Same week scheduling for real estate transactions across ${siteConfig.address.region}.`}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button href="/booking" variant="primary">
              Book Inspection
            </Button>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="font-mono text-sm uppercase tracking-wider hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
