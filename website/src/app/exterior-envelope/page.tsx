import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { telHref } from "@/lib/utils";

/**
 * /exterior-envelope - bundled inspection landing page.
 *
 * Source: market-intelligence.md §5 Gap 4 (chimney + roofing bundle no
 * central NH competitor merchandises), §9 Do #7, §9 Exploit #2 (NH avg
 * roof replacement $12,504 + chimney repair $5K-$15K = $20K-$30K avg
 * ticket bundled).
 */

export const metadata: Metadata = {
  title: "Exterior Envelope Inspection · Chimney + Roof + Flashing + Ice Dam",
  description:
    "$99 four-point chimney, roof, flashing, and ice-dam inspection. One contractor. One quote. One warranty. Central NH bundle nobody else merchandises.",
  openGraph: {
    title:
      "Exterior Envelope Inspection | Chimney + Roof + Flashing | Integrity Chimney",
    description:
      "Four-point exterior envelope inspection: chimney, roof, flashing, and ice dam risk. $99 bundled, $99 waived against any work over $2K. Central NH.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Exterior Envelope Inspection | Chimney + Roof + Flashing | Integrity Chimney",
    description:
      "Four-point exterior envelope inspection: chimney, roof, flashing, and ice dam risk. $99 bundled, $99 waived against any work over $2K. Central NH.",
  },
};

const FOUR_POINTS = [
  {
    eyebrow: "01",
    title: "Chimney",
    body: "Cap, crown, flue, liner, smoke chamber. Video flue scan when access allows. Mortar joints inspected at every accessible course. Cap fit checked for fasteners and storm collar.",
  },
  {
    eyebrow: "02",
    title: "Roof",
    body: "Shingle condition top to bottom. Valleys, ridge, ventilation, deck condition where visible. Drip edge, gutter line, and any obvious lift, curl, or granule loss documented with photos.",
  },
  {
    eyebrow: "03",
    title: "Flashing",
    body: "The seam between the chimney and the roof is where the leaks live. Step flashing, counter flashing, valley flashing, vent boots. Documented and photographed at every penetration.",
  },
  {
    eyebrow: "04",
    title: "Ice Dam Risk",
    body: "Eave temperature indicators, attic insulation gaps visible from the roof, ridge ventilation, and historic ice damming patterns where present. Recommendations sized to the house, not boilerplate.",
  },
];

const BUNDLE_BENEFITS = [
  {
    title: "One quote.",
    body: "Chimney work and roofing work priced together, on one document, in one number. No reconciling two contractors' line items. No surprise overlaps.",
  },
  {
    title: "One warranty.",
    body: "5-year workmanship guarantee covers the chimney, the roof repair, and the flashing seam. If a leak shows up around the chimney next March, one number to call.",
  },
  {
    title: "No finger-pointing.",
    body: "When two contractors share a seam, every leak is the other guy's fault. We are the chimney guy and the roofer. The leak is ours to fix.",
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Schedule",
    body: "Call (603) 660-4644 or use the booking page. Most weeks we are on site within 7 to 10 days. Tight transactions get same-week scheduling.",
  },
  {
    n: "02",
    title: "On-site, 1.5 to 2 hours",
    body: "Owner-led visit. Roof access, chimney top to bottom, flashing seam at every penetration, attic and eave check where accessible. Photos at every station.",
  },
  {
    n: "03",
    title: "Single PDF estimate within 24 hours",
    body: "One quote covering chimney, roof, flashing, and any ice dam mitigation recommended. Line-item priced. No surprise upsell on day-of-start.",
  },
];

const COMPARISON = [
  {
    label: "Time",
    competitor: "Two weeks of scheduling between two contractors. Phone tag, conflicting site visits, conflicting quotes.",
    integrity: "One visit. One inspection. One PDF in 24 hours.",
  },
  {
    label: "Communication",
    competitor: "Two phone trees. Two estimators. Texts to one shop, emails to another.",
    integrity: "One owner direct. Phone, text, or email goes to the same person who climbed the roof.",
  },
  {
    label: "Accountability",
    competitor: "When a seam leaks, the roofer says it is the chimney guy's problem. The chimney guy blames the roof. You stand in the middle.",
    integrity: "One quote. One warranty. One name on the invoice. The seam between chimney and roof is ours.",
  },
];

export default function ExteriorEnvelopePage() {
  return (
    <>
      {/* ============== Hero (DARK) ============== */}
      <section
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
        style={{ background: "var(--bg-base)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 0%, rgba(184,115,51,0.10) 0%, rgba(10,10,10,0) 55%), radial-gradient(ellipse at 20% 100%, rgba(127,42,31,0.10) 0%, rgba(10,10,10,0) 50%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">EXTERIOR ENVELOPE INSPECTION · $99</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.7} distance={20}>
            <h1
              className="font-display text-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Chimney, roof, flashing, ice dam. One inspection. One quote.
            </h1>
          </FadeUp>
          <FadeUp delay={0.25} duration={0.6} distance={16}>
            <p
              className="mx-auto mt-6 max-w-2xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              The seam between the chimney and the roof is where the leaks live. Two contractors at that seam means two phone trees, two visits, and a finger-point when something goes wrong. One contractor means one quote, one warranty, and one name on the invoice.
            </p>
          </FadeUp>
          <FadeUp delay={0.4} duration={0.6} distance={14}>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button
                href="/booking?service=exterior-envelope"
                variant="primary"
              >
                Book Exterior Envelope Inspection
              </Button>
              <a
                href={telHref(siteConfig.phoneTel)}
                className="inline-flex items-center justify-center rounded-md border border-accent px-6 py-3 font-mono text-sm uppercase tracking-wider text-accent transition-all duration-200 hover:bg-accent hover:text-bg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                Call {siteConfig.phone}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============== Four-Point Inspection (LIGHT) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--aged-mortar)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p
              className="text-eyebrow mb-3"
              style={{ color: "var(--primary)" }}
            >
              THE FOUR-POINT INSPECTION
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              Everything above the eave line. One owner. One inspection.
            </h2>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
            {FOUR_POINTS.map((card, idx) => (
              <FadeUp
                key={card.title}
                delay={0.05 + idx * 0.06}
                duration={0.6}
                distance={14}
              >
                <article
                  className="flex h-full flex-col rounded-md border p-6 md:p-8"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    borderColor: "rgba(127,42,31,0.20)",
                  }}
                >
                  <span
                    className="font-mono text-xs tracking-[0.16em]"
                    style={{ color: "var(--primary)" }}
                  >
                    POINT {card.eyebrow}
                  </span>
                  <h3
                    className="mt-3 font-display text-h3 font-semibold"
                    style={{ color: "var(--granite-slate)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed md:text-base"
                    style={{ color: "rgba(47,62,70,0.85)" }}
                  >
                    {card.body}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Why Bundle (DARK) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">WHY BUNDLE?</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Three reasons one number beats two phone trees.
            </h2>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {BUNDLE_BENEFITS.map((b, idx) => (
              <FadeUp
                key={b.title}
                delay={0.05 + idx * 0.08}
                duration={0.6}
                distance={14}
              >
                <article
                  className="flex h-full flex-col rounded-md border p-6 md:p-8"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(184,115,51,0.20)",
                  }}
                >
                  <h3
                    className="font-display text-h3 font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {b.title}
                  </h3>
                  <p
                    className="mt-4 text-sm leading-relaxed md:text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {b.body}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Pricing Anchor (LIGHT) ============== */}
      <section
        className="relative py-20 md:py-24"
        style={{ background: "var(--aged-mortar)" }}
      >
        <div className="mx-auto max-w-[900px] px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p
              className="text-eyebrow mb-3"
              style={{ color: "var(--primary)" }}
            >
              PROMOTIONAL PRICING
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.7} distance={20}>
            <h2
              className="font-display text-display font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              $99 for the full four-point inspection.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} duration={0.6} distance={14}>
            <p
              className="mx-auto mt-5 max-w-2xl text-base md:text-lg"
              style={{ color: "rgba(47,62,70,0.85)" }}
            >
              The $99 fee is waived against any subsequent work over $2,000. If we find work and you hire us to do it, the inspection is on us.
            </p>
          </FadeUp>
          <FadeUp delay={0.3} duration={0.6} distance={12}>
            <div
              className="mx-auto mt-10 inline-flex max-w-full flex-wrap items-center justify-center gap-4 rounded-md border px-5 py-4"
              style={{
                background: "rgba(255,255,255,0.6)",
                borderColor: "rgba(127,42,31,0.25)",
              }}
            >
              <span
                className="font-mono text-xs uppercase tracking-[0.14em]"
                style={{ color: "var(--primary)" }}
              >
                Inspection
              </span>
              <span
                className="font-display text-h3 font-semibold"
                style={{ color: "var(--granite-slate)" }}
              >
                $99
              </span>
              <span
                aria-hidden="true"
                className="hidden h-6 w-px sm:inline-block"
                style={{ background: "rgba(127,42,31,0.25)" }}
              />
              <span
                className="text-sm"
                style={{ color: "rgba(47,62,70,0.80)" }}
              >
                Waived against any subsequent work over $2,000.
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============== Process (DARK) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">PROCESS</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Three steps. From booking to PDF in your inbox.
            </h2>
          </FadeUp>

          <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <FadeUp
                key={step.n}
                delay={0.05 + idx * 0.08}
                duration={0.6}
                distance={14}
              >
                <li
                  className="flex h-full flex-col rounded-md border p-6 md:p-8"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(184,115,51,0.20)",
                  }}
                >
                  <span
                    className="font-mono text-xs tracking-[0.16em]"
                    style={{ color: "var(--accent)" }}
                  >
                    STEP {step.n}
                  </span>
                  <h3
                    className="mt-3 font-display text-h3 font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed md:text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.body}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* ============== Comparison Table (LIGHT) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--aged-mortar)" }}
      >
        <div className="mx-auto max-w-[1100px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p
              className="text-eyebrow mb-3"
              style={{ color: "var(--primary)" }}
            >
              TWO CONTRACTORS VS. INTEGRITY
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              The honest comparison.
            </h2>
          </FadeUp>

          <FadeUp delay={0.2} duration={0.6} distance={14}>
            <div
              className="mt-10 overflow-hidden rounded-md border"
              style={{
                background: "rgba(255,255,255,0.6)",
                borderColor: "rgba(127,42,31,0.20)",
              }}
            >
              <div
                className="hidden grid-cols-[140px_1fr_1fr] gap-px md:grid"
                style={{ background: "rgba(127,42,31,0.18)" }}
              >
                <HeaderCell label="" />
                <HeaderCell label="Two Contractors" />
                <HeaderCell label="Integrity" highlight />
                {COMPARISON.map((row) => (
                  <RowGroup
                    key={row.label}
                    label={row.label}
                    competitor={row.competitor}
                    integrity={row.integrity}
                  />
                ))}
              </div>

              {/* Mobile stacked */}
              <div className="flex flex-col divide-y md:hidden">
                {COMPARISON.map((row) => (
                  <div key={row.label} className="flex flex-col gap-3 p-5">
                    <span
                      className="font-mono text-xs uppercase tracking-[0.16em]"
                      style={{ color: "var(--primary)" }}
                    >
                      {row.label}
                    </span>
                    <div>
                      <p
                        className="font-mono text-[0.65rem] uppercase tracking-[0.14em]"
                        style={{ color: "rgba(47,62,70,0.65)" }}
                      >
                        Two Contractors
                      </p>
                      <p
                        className="mt-1 text-sm leading-relaxed"
                        style={{ color: "rgba(47,62,70,0.85)" }}
                      >
                        {row.competitor}
                      </p>
                    </div>
                    <div>
                      <p
                        className="font-mono text-[0.65rem] uppercase tracking-[0.14em]"
                        style={{ color: "var(--primary)" }}
                      >
                        Integrity
                      </p>
                      <p
                        className="mt-1 text-sm leading-relaxed"
                        style={{ color: "var(--granite-slate)" }}
                      >
                        {row.integrity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============== Final CTA (DARK) ============== */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 25% 35%, rgba(127,42,31,0.20) 0%, rgba(20,20,20,0) 50%), radial-gradient(ellipse at 75% 65%, rgba(184,115,51,0.16) 0%, rgba(20,20,20,0) 55%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-4xl px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">ONE INSPECTION · ONE QUOTE</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={18}>
            <h2
              className="font-display text-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Book the four-point inspection.
            </h2>
          </FadeUp>
          <FadeUp delay={0.25} duration={0.6} distance={14}>
            <p
              className="mx-auto mt-5 max-w-2xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              $99 flat. PDF in 24 hours. Waived against any subsequent work over $2,000.
            </p>
          </FadeUp>
          <FadeUp delay={0.4} duration={0.6} distance={14}>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button
                href="/booking?service=exterior-envelope"
                variant="primary"
              >
                Book Inspection
              </Button>
              <a
                href={telHref(siteConfig.phoneTel)}
                className="inline-flex items-center justify-center rounded-md border border-accent px-6 py-3 font-mono text-sm uppercase tracking-wider text-accent transition-all duration-200 hover:bg-accent hover:text-bg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated"
              >
                Call {siteConfig.phone}
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-md px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:text-accent"
                style={{ color: "var(--text-secondary)" }}
              >
                Or browse services
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

function HeaderCell({
  label,
  highlight,
}: {
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="px-5 py-4 font-mono text-xs uppercase tracking-[0.14em]"
      style={{
        background: highlight
          ? "rgba(127,42,31,0.10)"
          : "rgba(255,255,255,0.85)",
        color: highlight ? "var(--primary)" : "rgba(47,62,70,0.85)",
      }}
    >
      {label}
    </div>
  );
}

function RowGroup({
  label,
  competitor,
  integrity,
}: {
  label: string;
  competitor: string;
  integrity: string;
}) {
  return (
    <>
      <div
        className="px-5 py-5 font-mono text-xs uppercase tracking-[0.16em]"
        style={{
          background: "rgba(255,255,255,0.85)",
          color: "var(--primary)",
        }}
      >
        {label}
      </div>
      <div
        className="px-5 py-5 text-sm leading-relaxed"
        style={{
          background: "rgba(255,255,255,0.85)",
          color: "rgba(47,62,70,0.85)",
        }}
      >
        {competitor}
      </div>
      <div
        className="px-5 py-5 text-sm leading-relaxed"
        style={{
          background: "rgba(127,42,31,0.06)",
          color: "var(--granite-slate)",
        }}
      >
        {integrity}
      </div>
    </>
  );
}
