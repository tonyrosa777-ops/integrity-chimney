"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * /optimus-pricing - SALES PRESENTATION TOOL.
 * This page is shown by Anthony during pitch meetings to demonstrate the
 * Optimus tier structure. It is DELETED before launch (per playbook).
 *
 * RULES enforced in this file:
 *   - No external-search-vendor name anywhere (Optimus does not resell those).
 *   - No payment-split language. The price is the price.
 *   - No em dash anywhere; the comparison-table dash uses an SVG line glyph.
 *   - robots: noindex (set in sibling layout file).
 */

type Tier = {
  id: "starter" | "pro" | "premium";
  label: string;
  price: number;
  recommended: boolean;
  features: string[];
  cta: string;
};

const tiers: Tier[] = [
  {
    id: "starter",
    label: "Starter",
    price: 1500,
    recommended: false,
    features: [
      "Custom homepage with animated hero",
      "About, Services, FAQ, Contact pages",
      "Mobile-first responsive design",
      "Free SSL plus custom domain wiring",
      "Basic SEO meta tags",
    ],
    cta: "Get Started",
  },
  {
    id: "pro",
    label: "Pro",
    price: 3000,
    recommended: true,
    features: [
      "Everything in Starter, plus:",
      "Three service-pillar hub pages",
      "Professional Blog (Sanity CMS, 9 to 10 launch articles)",
      "Lead-Capture Quiz (interactive funnel)",
      "Automated Booking Calendar",
      "Photo Gallery (12 to 16 images)",
      "Testimonials Showcase (36 testimonials)",
      "Service-Area pages (6 towns)",
      "Advanced AEO plus JSON-LD schema",
    ],
    cta: "Most Chosen",
  },
  {
    id: "premium",
    label: "Premium",
    price: 5500,
    recommended: false,
    features: [
      "Everything in Pro, plus:",
      "Branded Merch Shop (Stripe plus Printful POD)",
      "Cart plus checkout flow",
      "Owner sales-alert emails",
      "Premium SEO plus content strategy",
    ],
    cta: "Go Premium",
  },
];

type CellValue = boolean | string;
type Row = [string, CellValue, CellValue, CellValue];

type ComparisonGroup = {
  category: string;
  rows: Row[];
};

const comparisonGroups: ComparisonGroup[] = [
  {
    category: "Foundation",
    rows: [
      ["Custom homepage with animated hero", true, true, true],
      ["Mobile-first responsive design", true, true, true],
      ["About, Services, FAQ, Contact pages", true, true, true],
      ["Free SSL plus domain wiring", true, true, true],
      ["Click-to-call plus contact form", true, true, true],
    ],
  },
  {
    category: "Conversion",
    rows: [
      ["Lead-Capture Quiz (interactive funnel)", false, true, true],
      ["Automated Booking Calendar", false, true, true],
      ["Photo Gallery (12 to 16 images)", false, true, true],
      ["Testimonials Showcase (36 testimonials)", false, true, true],
    ],
  },
  {
    category: "Content & SEO",
    rows: [
      ["Basic SEO meta tags", true, true, true],
      ["Three service-pillar hub pages", false, true, true],
      ["Professional Blog (Sanity CMS, 9 to 10 articles)", false, true, true],
      ["Service-Area pages (6 towns)", false, true, true],
      ["Advanced AEO plus JSON-LD schema", false, true, true],
      ["Premium SEO plus content strategy", false, false, true],
    ],
  },
  {
    category: "Commerce",
    rows: [
      ["Branded Merch Shop (Stripe plus Printful POD)", false, false, true],
      ["Cart plus checkout flow", false, false, true],
      ["Owner sales-alert emails", false, false, true],
    ],
  },
  {
    category: "Support",
    rows: [
      ["Delivery timeline", "14 days", "21 days", "30 days"],
      ["Revision rounds", "1", "2", "3"],
      ["Post-launch support window", "7 days", "14 days", "30 days"],
    ],
  },
];

// Brand-token icons (no Lucide, no Heroicons).
function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function DashIcon() {
  // Per spec: NEVER use the literal em-dash character.
  // We render a short SVG line glyph styled with currentColor.
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="inline-block"
    >
      <path d="M7 12h10" />
    </svg>
  );
}

// ROI Calculator component
function ROICalculator() {
  const [jobValue, setJobValue] = useState(2500);
  const [clientsPerMonth, setClientsPerMonth] = useState(3);
  const [selectedTierIndex, setSelectedTierIndex] = useState(1);

  const packagePrice = tiers[selectedTierIndex].price;
  const monthlyRevenue = jobValue * clientsPerMonth;
  const annualRevenue = monthlyRevenue * 12;
  const breakEvenMonthsRaw = packagePrice / monthlyRevenue;
  const breakEvenMonths = Math.ceil(breakEvenMonthsRaw * 10) / 10;
  const roi12 = Math.round(((annualRevenue - packagePrice) / packagePrice) * 100);

  const fmt = (n: number) =>
    n >= 1000
      ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
      : `$${n.toLocaleString()}`;

  const sliderBg = (val: number, min: number, max: number) => {
    const pct = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--accent) ${pct}%, rgba(245,245,245,0.08) ${pct}%)`;
  };

  return (
    <section
      className="relative py-20 md:py-28"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-8 lg:px-12">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <p className="text-eyebrow mb-4">RUN THE NUMBERS</p>
          <h2
            className="text-h1 font-display font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            What does this website actually make you?
          </h2>
          <p
            className="mt-4 text-base md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Adjust the sliders to your real numbers. The math updates live.
          </p>
        </div>

        <div
          className="overflow-hidden rounded-2xl"
          style={{
            background: "var(--bg-card)",
            border: "1px solid rgba(184,115,51,0.18)",
          }}
        >
          <div className="grid grid-cols-1 gap-10 p-8 md:gap-12 md:p-10 lg:grid-cols-2">
            {/* Inputs */}
            <div className="space-y-8">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label
                    htmlFor="job-value"
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Average job / project value
                  </label>
                  <span
                    className="font-display text-xl font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ${jobValue.toLocaleString()}
                  </span>
                </div>
                <input
                  id="job-value"
                  type="range"
                  min={500}
                  max={20000}
                  step={100}
                  value={jobValue}
                  onChange={(e) => setJobValue(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full"
                  style={{ background: sliderBg(jobValue, 500, 20000) }}
                />
                <div
                  className="mt-2 flex justify-between text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span>$500</span>
                  <span>$20,000</span>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label
                    htmlFor="clients-month"
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    New clients per month from website
                  </label>
                  <span
                    className="font-display text-xl font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {clientsPerMonth}
                  </span>
                </div>
                <input
                  id="clients-month"
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={clientsPerMonth}
                  onChange={(e) => setClientsPerMonth(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full"
                  style={{ background: sliderBg(clientsPerMonth, 1, 20) }}
                />
                <div
                  className="mt-2 flex justify-between text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span>1 client</span>
                  <span>20 clients</span>
                </div>
              </div>

              <div>
                <p
                  className="mb-3 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Package
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {tiers.map((t, i) => {
                    const active = selectedTierIndex === i;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTierIndex(i)}
                        className="rounded-lg px-3 py-3 text-center font-mono text-xs uppercase tracking-wider transition-all"
                        style={{
                          background: active
                            ? "var(--accent)"
                            : "rgba(245,245,245,0.04)",
                          color: active
                            ? "var(--bg-base)"
                            : "var(--text-secondary)",
                          border: active
                            ? "1px solid var(--accent)"
                            : "1px solid rgba(245,245,245,0.10)",
                        }}
                      >
                        <span className="block">{t.label}</span>
                        <span className="mt-1 block font-display text-sm font-semibold">
                          ${t.price.toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div className="flex flex-col gap-4">
              <ResultCard
                label="Monthly Revenue"
                value={fmt(monthlyRevenue)}
                sublabel={`${clientsPerMonth} jobs × $${jobValue.toLocaleString()} avg`}
                animationKey={`m-${jobValue}-${clientsPerMonth}`}
              />
              <ResultCard
                label="Annual Revenue"
                value={fmt(annualRevenue)}
                sublabel="From website-driven leads"
                animationKey={`a-${jobValue}-${clientsPerMonth}`}
                accent
              />
              <div className="grid grid-cols-2 gap-4">
                <ResultCard
                  label="Break Even"
                  value={
                    breakEvenMonths < 1
                      ? `${Math.max(1, Math.round(breakEvenMonths * 30))}d`
                      : `${breakEvenMonths}mo`
                  }
                  animationKey={`b-${jobValue}-${clientsPerMonth}-${selectedTierIndex}`}
                  compact
                />
                <ResultCard
                  label="12-Month ROI"
                  value={`${roi12 > 0 ? "+" : ""}${roi12.toLocaleString()}%`}
                  animationKey={`r-${jobValue}-${clientsPerMonth}-${selectedTierIndex}`}
                  compact
                  accent={roi12 > 0}
                />
              </div>
            </div>
          </div>

          <div
            className="border-t px-8 py-5 md:px-10"
            style={{
              borderColor: "rgba(184,115,51,0.18)",
              background: "rgba(184,115,51,0.05)",
            }}
          >
            <p
              className="text-center text-sm md:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              The{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {tiers[selectedTierIndex].label}
              </span>{" "}
              package at{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--accent)" }}
              >
                ${tiers[selectedTierIndex].price.toLocaleString()}
              </span>{" "}
              pays for itself in{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {breakEvenMonths < 1
                  ? `${Math.max(1, Math.round(breakEvenMonths * 30))} days`
                  : `${breakEvenMonths} month${breakEvenMonths !== 1 ? "s" : ""}`}
                .
              </span>{" "}
              After that, every new client is pure profit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultCard({
  label,
  value,
  sublabel,
  animationKey,
  accent,
  compact,
}: {
  label: string;
  value: string;
  sublabel?: string;
  animationKey: string;
  accent?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-xl ${compact ? "p-4" : "p-5 md:p-6"} flex-1`}
      style={{
        background: accent
          ? "rgba(184,115,51,0.08)"
          : "rgba(245,245,245,0.03)",
        border: accent
          ? "1px solid rgba(184,115,51,0.30)"
          : "1px solid rgba(245,245,245,0.08)",
      }}
    >
      <p
        className="font-mono text-[10px] uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>
      <motion.p
        key={animationKey}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`font-display font-semibold leading-none ${
          compact ? "mt-2 text-2xl" : "mt-2 text-3xl md:text-4xl"
        }`}
        style={{ color: accent ? "var(--accent)" : "var(--text-primary)" }}
      >
        {value}
      </motion.p>
      {sublabel && (
        <p
          className="mt-2 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          {sublabel}
        </p>
      )}
    </div>
  );
}

// Tier card
function TierCard({ tier }: { tier: Tier }) {
  return (
    <article
      className="relative flex flex-col rounded-2xl p-7 md:p-8"
      style={{
        background: tier.recommended ? "var(--bg-elevated)" : "var(--bg-card)",
        border: tier.recommended
          ? "1.5px solid var(--accent)"
          : "1px solid rgba(245,245,245,0.08)",
        boxShadow: tier.recommended
          ? "0 12px 40px rgba(184,115,51,0.18)"
          : "0 4px 16px rgba(0,0,0,0.20)",
      }}
    >
      {tier.recommended && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest"
          style={{
            background: "var(--accent)",
            color: "var(--bg-base)",
          }}
        >
          Most Popular
        </span>
      )}

      <header className="mb-6">
        <p
          className="font-mono text-xs uppercase tracking-widest"
          style={{
            color: tier.recommended ? "var(--accent)" : "var(--text-muted)",
          }}
        >
          {tier.label}
        </p>
        <div className="mt-4 flex items-baseline gap-2">
          <span
            className="font-display text-5xl font-semibold leading-none md:text-6xl"
            style={{
              color: tier.recommended ? "var(--accent)" : "var(--text-primary)",
            }}
          >
            ${tier.price.toLocaleString()}
          </span>
        </div>
        <p
          className="mt-2 font-mono text-xs uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          One-Time
        </p>
      </header>

      <ul className="mb-7 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            <span
              className="mt-0.5 flex-shrink-0"
              style={{ color: "var(--accent)" }}
            >
              <CheckIcon />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="rounded-md px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all"
        style={{
          background: tier.recommended ? "var(--primary)" : "transparent",
          color: tier.recommended ? "var(--text-primary)" : "var(--accent)",
          border: tier.recommended
            ? "1px solid var(--primary)"
            : "1px solid var(--accent)",
        }}
      >
        {tier.cta}
      </button>
    </article>
  );
}

// Comparison table
function ComparisonTable() {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{ background: "var(--bg-elevated)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <p className="text-eyebrow mb-4">FEATURE BY FEATURE</p>
          <h2
            className="text-h1 font-display font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Compare the packages
          </h2>
        </div>

        <div
          className="overflow-x-auto rounded-2xl"
          style={{
            border: "1px solid rgba(245,245,245,0.08)",
            background: "var(--bg-card)",
          }}
        >
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th
                  className="w-[40%] p-5 text-left font-mono text-[10px] uppercase tracking-widest"
                  style={{
                    color: "var(--text-muted)",
                    borderBottom: "1px solid rgba(245,245,245,0.08)",
                  }}
                >
                  Feature
                </th>
                {tiers.map((t) => (
                  <th
                    key={t.id}
                    className="p-5 text-center"
                    style={{
                      background: t.recommended
                        ? "rgba(184,115,51,0.06)"
                        : "transparent",
                      borderBottom: "1px solid rgba(245,245,245,0.08)",
                      borderLeft: t.recommended
                        ? "1px solid rgba(184,115,51,0.30)"
                        : "1px solid rgba(245,245,245,0.08)",
                      borderRight: t.recommended
                        ? "1px solid rgba(184,115,51,0.30)"
                        : "none",
                    }}
                  >
                    <div
                      className="font-mono text-[10px] uppercase tracking-widest"
                      style={{
                        color: t.recommended
                          ? "var(--accent)"
                          : "var(--text-muted)",
                      }}
                    >
                      {t.label}
                    </div>
                    <div
                      className="mt-1 font-display text-lg font-semibold"
                      style={{
                        color: t.recommended
                          ? "var(--accent)"
                          : "var(--text-primary)",
                      }}
                    >
                      ${t.price.toLocaleString()}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonGroups.map((group) => (
                <ComparisonGroupRows
                  key={group.category}
                  group={group}
                />
              ))}
              <tr
                style={{ borderTop: "1px solid rgba(245,245,245,0.10)" }}
              >
                <td
                  className="px-5 py-5 text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Total investment
                </td>
                {tiers.map((t) => (
                  <td
                    key={t.id}
                    className="px-5 py-5 text-center"
                    style={{
                      borderLeft: t.recommended
                        ? "1px solid rgba(184,115,51,0.30)"
                        : "1px solid rgba(245,245,245,0.08)",
                      borderRight: t.recommended
                        ? "1px solid rgba(184,115,51,0.30)"
                        : "none",
                      background: t.recommended
                        ? "rgba(184,115,51,0.06)"
                        : "transparent",
                    }}
                  >
                    <span
                      className="font-display text-lg font-semibold"
                      style={{
                        color: t.recommended
                          ? "var(--accent)"
                          : "var(--text-primary)",
                      }}
                    >
                      ${t.price.toLocaleString()}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ComparisonGroupRows({ group }: { group: ComparisonGroup }) {
  return (
    <>
      <tr>
        <td
          colSpan={4}
          className="px-5 py-3 font-mono text-[10px] uppercase tracking-widest"
          style={{
            background: "rgba(245,245,245,0.02)",
            color: "var(--text-muted)",
            borderTop: "1px solid rgba(245,245,245,0.08)",
          }}
        >
          {group.category}
        </td>
      </tr>
      {group.rows.map((row) => {
        const [feature, ...cells] = row;
        return (
          <tr key={feature}>
            <td
              className="px-5 py-3.5 text-sm"
              style={{
                color: "var(--text-secondary)",
                borderBottom: "1px solid rgba(245,245,245,0.05)",
              }}
            >
              {feature}
            </td>
            {cells.map((val, ci) => {
              const isRecommendedColumn = ci === 1;
              return (
                <td
                  key={ci}
                  className="px-5 py-3.5 text-center"
                  style={{
                    borderBottom: "1px solid rgba(245,245,245,0.05)",
                    borderLeft: isRecommendedColumn
                      ? "1px solid rgba(184,115,51,0.30)"
                      : "1px solid rgba(245,245,245,0.05)",
                    borderRight: isRecommendedColumn
                      ? "1px solid rgba(184,115,51,0.30)"
                      : "none",
                    background: isRecommendedColumn
                      ? "rgba(184,115,51,0.04)"
                      : "transparent",
                  }}
                >
                  {val === true ? (
                    <span
                      className="inline-flex"
                      style={{ color: "var(--accent)" }}
                    >
                      <CheckIcon />
                    </span>
                  ) : val === false ? (
                    <span
                      className="inline-flex"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <DashIcon />
                    </span>
                  ) : (
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {String(val)}
                    </span>
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}

export default function OptimusPricingPage() {
  return (
    <>
      {/* ============== Hero ============== */}
      <section
        className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
        style={{ background: "var(--bg-base)" }}
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
            WEBSITE BUILD PROPOSAL
          </p>
          <h1
            className="text-display font-display font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            A website built to win you jobs.
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-base md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Custom-designed for tradespeople. No WordPress. No monthly platform
            fees. One investment. You own the asset forever.
          </p>
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
            style={{ color: "var(--text-muted)" }}
          >
            {[
              "100% Custom Code",
              "Delivered in 14 to 30 Days",
              "No Monthly Fees",
              "Mobile-First",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full px-4 py-1.5 text-xs"
                style={{
                  background: "rgba(245,245,245,0.04)",
                  border: "1px solid rgba(245,245,245,0.08)",
                  color: "var(--text-secondary)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Tier cards ============== */}
      <section
        className="relative py-20 md:py-24"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start lg:gap-7">
            {tiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      {/* ============== ROI Calculator ============== */}
      <ROICalculator />

      {/* ============== Comparison Chart ============== */}
      <ComparisonTable />

      {/* ============== Closing ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-[820px] px-6 text-center md:px-8 lg:px-12">
          <p className="text-eyebrow mb-4">READY WHEN YOU ARE</p>
          <h2
            className="text-h2 font-display font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Let&apos;s build the website that wins you jobs.
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-base md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Pick a package, lock the timeline, and get the asset that works for
            you 24 hours a day.
          </p>
        </div>
      </section>
    </>
  );
}
