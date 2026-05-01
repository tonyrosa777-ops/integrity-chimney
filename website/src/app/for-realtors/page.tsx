import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { telHref } from "@/lib/utils";
import { RealtorIntakeForm } from "./RealtorIntakeForm";

/**
 * /for-realtors - B2B landing page for real estate agents managing
 * tight inspection windows. $295 flat, 24-hour written PDF, same-week
 * scheduling for transactions under contract.
 *
 * Source: market-intelligence.md §5 Gap 3, §9 Do #5, §9 Exploit #4
 * (LAER VIP partnership reactivation).
 */

export const metadata: Metadata = {
  title: "For Realtors: Chimney Inspections Built for Closing Dates",
  description:
    "$295 flat Level 2 chimney inspections with a 24-hour written PDF. Same-week scheduling for central NH transactions under contract. NHAR-aligned.",
  openGraph: {
    title:
      "For Realtors | NH Level 2 Chimney Inspection · 24-Hour PDF · Integrity Chimney",
    description:
      "$295 flat. NFPA 211 Level 2 inspection. Branded PDF report in your inbox within 24 hours. Same-week scheduling for closings across central NH.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "For Realtors | NH Level 2 Chimney Inspection · 24-Hour PDF · Integrity Chimney",
    description:
      "$295 flat. NFPA 211 Level 2 inspection. Branded PDF report in your inbox within 24 hours. Same-week scheduling for closings across central NH.",
  },
};

const WHAT_YOU_GET = [
  {
    eyebrow: "PDF in 24 hours",
    title: "Written Report, Not a Phone Call",
    body: "Branded PDF Level 2 inspection report in your inbox within 24 hours of the visit. NFPA 211-aligned. Photos at every station. Recommendations the buyer's agent and the closing attorney can act on.",
  },
  {
    eyebrow: "$295 flat",
    title: "Published Price, No Surprises",
    body: "$295 covers a full Level 2 video scan, roof access, firebox and smoke chamber documentation, and the written PDF. No deposit. Payment on completion. No upsell on a buyer's transaction.",
  },
  {
    eyebrow: "Same-week scheduling",
    title: "Built for 10 to 14 Day Windows",
    body: "Transactions under contract get same-week scheduling. Email or submit a closing date and we work backwards from your timeline. Most weeks we are on site within 3 to 5 business days of the request.",
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Submit closing date",
    body: "Use the form below or email IntegrityChimney1@gmail.com with property address and target close date.",
  },
  {
    n: "02",
    title: "Confirm scheduling",
    body: "We confirm the inspection slot by reply within one business day. We work backwards from your closing.",
  },
  {
    n: "03",
    title: "Inspect within 5 business days",
    body: "Owner-led visit. Video flue scan, roof access, firebox documentation, photo at every station.",
  },
  {
    n: "04",
    title: "PDF in 24 hours",
    body: "Branded PDF report emailed within 24 hours of the visit. Direct to the agent inbox. Forward-ready for the attorney.",
  },
];

const TRUST_BADGES = [
  "LAER Preferred Partner",
  "BBB A+ Accredited",
  "Fully Insured",
  "NHAR-Aligned",
  "Owner-Operated, Always",
  "Photo Documentation Standard",
];

const REALTOR_FAQ: Array<{ q: string; a: string }> = [
  {
    q: "How fast can the written PDF be in my inbox?",
    a: "Within 24 hours of the on-site visit. Most reports go out the same evening. The PDF is branded, NFPA 211-aligned, and forward-ready for the closing attorney.",
  },
  {
    q: "Who pays the inspection fee?",
    a: "Whoever ordered the inspection. Buyers and sellers split the bill differently in every transaction. The $295 invoice is due on completion of the visit. No deposit. We do not bill the brokerage unless you ask us to.",
  },
  {
    q: "What is in the report?",
    a: "Level 2 NFPA 211 written report: video flue scan results for every flue, firebox condition, smoke chamber and damper, crown and cap, flashing, accessible chimney exterior. Photos at each station. A clear list of any defects with severity and recommended action.",
  },
  {
    q: "What if the chimney needs work the buyer wants priced?",
    a: "We provide a separate written repair estimate within 48 hours. The repair quote is independent of the inspection report so the report is unbiased. The buyer or seller can take the repair quote anywhere.",
  },
  {
    q: "Do you work on transactions outside the central NH market?",
    a: "We cover Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke, Canterbury, Penacook, Allenstown, Auburn, and the surrounding towns within roughly 30 miles of Bow. Outside that radius, call us and we will tell you honestly whether we can hit your closing date.",
  },
];

export default function ForRealtorsPage() {
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
            <p className="text-eyebrow mb-4">FOR REALTORS · NHAR-ALIGNED</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.7} distance={20}>
            <h1
              className="font-display text-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Chimney inspections built for closing dates.
            </h1>
          </FadeUp>
          <FadeUp delay={0.25} duration={0.6} distance={16}>
            <p
              className="mx-auto mt-6 max-w-2xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              $295 flat. Branded NFPA 211 Level 2 PDF in your inbox within 24 hours of the visit. Same-week scheduling for transactions under contract. Submit a closing date below and we work backwards from your timeline.
            </p>
          </FadeUp>
          <FadeUp delay={0.4} duration={0.6} distance={14}>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="#realtor-intake-form" variant="primary">
                Submit Closing Date
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

      {/* ============== What You Get (LIGHT) ============== */}
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
              WHAT YOU GET
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              Three things every realtor asks for. All three, every time.
            </h2>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {WHAT_YOU_GET.map((card, idx) => (
              <FadeUp
                key={card.title}
                delay={0.05 + idx * 0.08}
                duration={0.6}
                distance={16}
              >
                <article
                  className="flex h-full flex-col rounded-md border p-6 md:p-8"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    borderColor: "rgba(127,42,31,0.20)",
                  }}
                >
                  <p
                    className="font-mono text-[0.7rem] uppercase tracking-[0.12em]"
                    style={{ color: "var(--primary)" }}
                  >
                    {card.eyebrow}
                  </p>
                  <h3
                    className="mt-3 font-display text-h3 font-semibold"
                    style={{ color: "var(--granite-slate)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mt-4 text-sm leading-relaxed md:text-base"
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

      {/* ============== Intake Form (DARK) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-elevated)" }}
        id="submit"
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-12">
          <div>
            <FadeUp duration={0.5} distance={12}>
              <p className="text-eyebrow mb-3">SUBMIT CLOSING DATE</p>
            </FadeUp>
            <FadeUp delay={0.1} duration={0.6} distance={16}>
              <h2
                className="font-display text-h2 font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Tell us your closing date. We work backwards.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2} duration={0.6} distance={14}>
              <p
                className="mt-4 max-w-xl text-base md:text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                Confirmation by reply within one business day. Most central NH transactions get an inspection slot within 3 to 5 business days and the written PDF within 24 hours of the visit.
              </p>
            </FadeUp>

            <FadeUp delay={0.3} duration={0.6} distance={14}>
              <div className="mt-10">
                <RealtorIntakeForm />
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.15} duration={0.6} distance={16}>
            <aside
              className="flex h-full flex-col gap-6 rounded-md border p-6 md:p-8"
              style={{
                background: "var(--bg-card)",
                borderColor: "rgba(184,115,51,0.20)",
              }}
            >
              <div>
                <p
                  className="text-eyebrow mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  DIRECT LINE
                </p>
                <a
                  href={telHref(siteConfig.phoneTel)}
                  className="font-display text-h3 transition-colors hover:text-accent"
                  style={{ color: "var(--text-primary)", fontWeight: 600 }}
                >
                  {siteConfig.phone}
                </a>
                <p
                  className="mt-3 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Owner-answered. If we miss, callback within 4 business hours.
                </p>
              </div>

              <div>
                <p
                  className="text-eyebrow mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  EMAIL
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all text-sm transition-colors hover:text-accent md:text-base"
                  style={{ color: "var(--text-primary)" }}
                >
                  {siteConfig.email}
                </a>
              </div>

              <div>
                <p
                  className="text-eyebrow mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  TURNAROUND
                </p>
                <ul
                  className="flex flex-col gap-2 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <li>Confirmation: 1 business day</li>
                  <li>On-site visit: 3 to 5 business days</li>
                  <li>PDF report: within 24 hours of the visit</li>
                  <li>Repair quote (if needed): within 48 hours</li>
                </ul>
              </div>
            </aside>
          </FadeUp>
        </div>
      </section>

      {/* ============== Process (LIGHT) ============== */}
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
              FOUR STEPS
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              From submission to PDF in your inbox.
            </h2>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, idx) => (
              <FadeUp
                key={step.n}
                delay={0.05 + idx * 0.08}
                duration={0.6}
                distance={14}
              >
                <article
                  className="flex h-full flex-col rounded-md border p-6"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    borderColor: "rgba(127,42,31,0.20)",
                  }}
                >
                  <span
                    className="font-mono text-xs tracking-[0.16em]"
                    style={{ color: "var(--primary)" }}
                  >
                    STEP {step.n}
                  </span>
                  <h3
                    className="mt-3 font-display text-h4 font-semibold"
                    style={{ color: "var(--granite-slate)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "rgba(47,62,70,0.85)" }}
                  >
                    {step.body}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Trust signals (DARK) ============== */}
      <section
        className="relative py-20 md:py-24"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">TRUST SIGNALS</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Why central NH realtors keep our number.
            </h2>
          </FadeUp>

          <FadeUp delay={0.2} duration={0.6} distance={14}>
            <div
              className="mt-8 inline-flex flex-wrap items-center gap-3 rounded-md border px-4 py-3"
              style={{
                background: "rgba(184,115,51,0.10)",
                borderColor: "rgba(184,115,51,0.45)",
              }}
            >
              <span
                aria-hidden="true"
                className="inline-flex h-2 w-2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="font-mono text-xs uppercase tracking-[0.14em]"
                style={{ color: "var(--accent)" }}
              >
                LAER Preferred Partner
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Active vendor partnership for LAER Realty Partners agents.
              </span>
            </div>
          </FadeUp>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3 md:gap-x-8">
            {TRUST_BADGES.map((badge) => (
              <li
                key={badge}
                className="flex flex-col items-start"
              >
                <span
                  className="font-mono text-xs uppercase tracking-[0.12em]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {badge}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-2 block h-px w-10"
                  style={{ background: "var(--accent)" }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============== Realtor FAQ (LIGHT) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--aged-mortar)" }}
      >
        <div className="mx-auto max-w-[920px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p
              className="text-eyebrow mb-3"
              style={{ color: "var(--primary)" }}
            >
              REALTOR FAQ
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              Questions every closing agent asks.
            </h2>
          </FadeUp>

          <div className="mt-10 flex flex-col gap-4">
            {REALTOR_FAQ.map((row) => (
              <FadeUp key={row.q} duration={0.5} distance={12}>
                <details
                  className="group rounded-md border px-5 py-4 md:px-6 md:py-5"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    borderColor: "rgba(127,42,31,0.18)",
                  }}
                >
                  <summary
                    className="cursor-pointer list-none font-display text-base font-semibold md:text-lg"
                    style={{ color: "var(--granite-slate)" }}
                  >
                    {row.q}
                  </summary>
                  <p
                    className="mt-3 text-sm leading-relaxed md:text-base"
                    style={{ color: "rgba(47,62,70,0.85)" }}
                  >
                    {row.a}
                  </p>
                </details>
              </FadeUp>
            ))}
          </div>
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
              "radial-gradient(ellipse at 20% 30%, rgba(127,42,31,0.22) 0%, rgba(20,20,20,0) 50%), radial-gradient(ellipse at 80% 70%, rgba(184,115,51,0.18) 0%, rgba(20,20,20,0) 55%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-4xl px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">CLOSE WITHOUT CHIMNEY DRAMA</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={18}>
            <h2
              className="font-display text-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Submit a closing date. Get a PDF.
            </h2>
          </FadeUp>
          <FadeUp delay={0.25} duration={0.6} distance={14}>
            <p
              className="mx-auto mt-5 max-w-2xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              That is the entire workflow. No call center. No chasing scheduling. No surprise pricing on the day of the visit.
            </p>
          </FadeUp>
          <FadeUp delay={0.4} duration={0.6} distance={14}>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="#realtor-intake-form" variant="primary">
                Submit Closing Date
              </Button>
              <a
                href={telHref(siteConfig.phoneTel)}
                className="inline-flex items-center justify-center rounded-md border border-accent px-6 py-3 font-mono text-sm uppercase tracking-wider text-accent transition-all duration-200 hover:bg-accent hover:text-bg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated"
              >
                Call {siteConfig.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:text-accent"
                style={{ color: "var(--text-secondary)" }}
              >
                Or send a message
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
