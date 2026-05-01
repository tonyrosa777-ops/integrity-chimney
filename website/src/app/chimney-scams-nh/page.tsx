import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { FAQSchema } from "@/components/seo";
import { siteConfig } from "@/data/site";
import { telHref } from "@/lib/utils";

/**
 * /chimney-scams-nh - long-form consumer guide.
 *
 * Source: market-intelligence.md §5 Gap 6, §9 Exploit #1 (reinforces the
 * "Integrity" brand-name claim, defensive content). FAQPage JSON-LD is mounted
 * via FAQSchema using RED_FLAGS as the source FAQ items.
 */

export const metadata: Metadata = {
  title: "How to Spot a Chimney Scam in New Hampshire (2026)",
  description:
    "Five red flags on cold-call $99 sweeps and $2,000 liner upsells, a four-step contractor verification checklist, and what to do if a NH chimney scam called.",
  openGraph: {
    title:
      "How to Spot a Chimney Scam in New Hampshire | Integrity Chimney Services",
    description:
      "Five red flags on cold-call $99 sweeps, a verification checklist, and what to do if a NH chimney scam called your house this winter.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Spot a Chimney Scam in New Hampshire | Integrity Chimney Services",
    description:
      "Five red flags on cold-call $99 sweeps, a verification checklist, and what to do if a NH chimney scam called your house this winter.",
  },
};

const RED_FLAGS: Array<{ n: string; title: string; body: string; tip: string }> = [
  {
    n: "01",
    title: "The cold call.",
    body: "An unsolicited phone call claiming a neighbor referred you, the company is in your area, and they have a discounted rate this week only. Reputable chimney companies in NH do not cold-call. Word-of-mouth, online reviews, BBB profiles, and realtor referrals fill our calendars. Cold calls fill scam calendars.",
    tip: "Hang up. Look up the company on the BBB. Call the number on the BBB profile, not the number that called you.",
  },
  {
    n: "02",
    title: "$99 sweep teaser pricing.",
    body: "A real chimney sweep with a Level 1 inspection takes 60 to 90 minutes for a single flue and uses a HEPA vacuum, drop cloths, and a roof access ladder. The math at $99 does not work for an honest company. The price is a teaser. The plan is to find $2,000 of imaginary work on the roof. Anything Chimney's published $199 is the floor in NH. Below that means upsell setup.",
    tip: "Get the price in writing before booking. If the company refuses to write down the inspection price, that is the answer.",
  },
  {
    n: "03",
    title: "Roof-side photos of cracks you cannot see.",
    body: "On the roof, the inspector calls down to the homeowner standing in the driveway with a phone. Photos appear of dramatic cracks, missing crown sections, or a destroyed liner. The homeowner cannot see them in person. They cannot get a second opinion the same day. The pressure is immediate.",
    tip: "Ask for ladder access yourself, ask for an iPad walk-through, or ask the inspector to wait while you call a second company. A real contractor will say yes to all three.",
  },
  {
    n: "04",
    title: "$1,000+ deposit before work.",
    body: "Reputable NH masonry and chimney shops take small deposits if any, and never ask for $1,000+ to schedule. Large deposits before work begins are how scam operations vanish on Friday afternoon. We never take deposits over $1,000 until the day work starts.",
    tip: "If a contractor demands a large deposit before any materials are ordered, walk away. Pay on completion or pay nothing.",
  },
  {
    n: "05",
    title: "An upsell no other contractor confirms.",
    body: "The cold-caller says you need a new $2,400 stainless liner immediately. A second, third, and fourth chimney company come out and find nothing. The upsell was invented. By then the homeowner has often signed a credit application and put money down.",
    tip: "Get a second opinion before signing anything over $1,500. Two more inspections cost less than one fake liner.",
  },
];

const VERIFICATION_CHECKLIST = [
  {
    title: "Look up the BBB profile.",
    body: "Search the company name on bbb.org. Read the profile. Check accreditation, complaint count, and the company's response to complaints. Real companies show up. Scam shells do not.",
  },
  {
    title: "Ask for the certificate of insurance.",
    body: "A real contractor carries general liability and workers' comp. The certificate of insurance can be emailed in two minutes. If a contractor cannot or will not produce one, that is the answer.",
  },
  {
    title: "Get the estimate in writing.",
    body: "Scope of work, line-item pricing, materials, timeline, deposit terms, and warranty terms. Anything quoted on the phone or in person without a written follow-up is a verbal pitch, not an estimate.",
  },
  {
    title: "Ask for two or three reference jobs in your town.",
    body: "Real chimney work in central NH gets done in dense neighborhoods. A real chimney company can name three customers in your town and say yes to a phone call. Drive past the houses if you want. The work is on the rooftops.",
  },
];

export default function ChimneyScamsNHPage() {
  const scamFaqs = RED_FLAGS.map((f) => ({
    q: `Chimney scam red flag: ${f.title}`,
    a: `${f.body} What to do: ${f.tip}`,
  }));

  return (
    <>
      <FAQSchema faqs={scamFaqs} />
      {/* ============== Hero (DARK) ============== */}
      <section
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
        style={{ background: "transparent" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 0%, rgba(184,115,51,0.10) 0%, rgba(10,10,10,0) 55%), radial-gradient(ellipse at 20% 100%, rgba(127,42,31,0.12) 0%, rgba(10,10,10,0) 50%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">CONSUMER GUIDE · 2026 EDITION</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.7} distance={20}>
            <h1
              className="font-display text-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              How to spot a chimney scam in New Hampshire.
            </h1>
          </FadeUp>
          <FadeUp delay={0.25} duration={0.6} distance={16}>
            <p
              className="mx-auto mt-6 max-w-2xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              The most common chimney scam in NH is the $99 cold-call sweep that turns into a $2,000 liner upsell on the roof. This page exists so you can recognize the pattern, verify any contractor including us, and call the right people if you got the call.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============== 5 Red Flags (LIGHT) ============== */}
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
              FIVE RED FLAGS
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              The pattern repeats every winter.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} duration={0.6} distance={14}>
            <p
              className="mt-4 max-w-2xl text-base md:text-lg"
              style={{ color: "rgba(47,62,70,0.85)" }}
            >
              Every December and January, central NH inboxes fill with stories about a chimney guy who showed up with a clipboard and left with a credit card number. These are the five signals that mean stop.
            </p>
          </FadeUp>

          <ol className="mt-12 flex flex-col gap-6">
            {RED_FLAGS.map((flag, idx) => (
              <FadeUp
                key={flag.n}
                delay={0.05 + idx * 0.06}
                duration={0.6}
                distance={14}
              >
                <li
                  className="flex flex-col gap-4 rounded-md border p-6 md:flex-row md:items-start md:gap-6 md:p-8"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    borderColor: "rgba(127,42,31,0.20)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md font-mono text-sm font-semibold"
                    style={{
                      background: "rgba(127,42,31,0.12)",
                      color: "var(--primary)",
                    }}
                  >
                    {flag.n}
                  </span>
                  <div className="flex-1">
                    <h3
                      className="font-display text-h3 font-semibold"
                      style={{ color: "var(--granite-slate)" }}
                    >
                      {flag.title}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-relaxed md:text-base"
                      style={{ color: "rgba(47,62,70,0.85)" }}
                    >
                      {flag.body}
                    </p>
                    <p
                      className="mt-4 rounded-md border-l-4 py-2 pl-4 text-sm font-medium md:text-base"
                      style={{
                        borderColor: "var(--primary)",
                        background: "rgba(127,42,31,0.06)",
                        color: "var(--granite-slate)",
                      }}
                    >
                      <span
                        className="font-mono text-xs uppercase tracking-[0.14em]"
                        style={{ color: "var(--primary)" }}
                      >
                        What to do:
                      </span>{" "}
                      {flag.tip}
                    </p>
                  </div>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* ============== We Do Not Cold-Call Banner (DARK) ============== */}
      <section
        className="relative py-20 md:py-24"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto max-w-[1000px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.6} distance={16}>
            <div
              className="flex flex-col gap-5 rounded-md border-l-4 px-6 py-8 md:flex-row md:items-start md:px-10 md:py-10"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--accent)",
              }}
            >
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: "rgba(184,115,51,0.16)",
                  color: "var(--accent)",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2 L4 6 V12 C4 17 7.5 21 12 22 C16.5 21 20 17 20 12 V6 Z" />
                  <path d="M9 12 L11 14 L15 10" />
                </svg>
              </span>
              <div>
                <p className="text-eyebrow mb-3">OUR PROMISE</p>
                <h2
                  className="font-display text-h2 font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Integrity Chimney does not cold-call homeowners. Ever.
                </h2>
                <p
                  className="mt-4 text-base leading-relaxed md:text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  If someone calls you saying they represent {siteConfig.legalName} and offers a $49 or $99 sweep, hang up and call us at{" "}
                  <a
                    href={telHref(siteConfig.phoneTel)}
                    className="underline transition-colors hover:text-accent"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {siteConfig.phone}
                  </a>
                  {" "}to verify. Our BBB profile says the same thing. The cold-call $49 or $99 sweep is the most common chimney scam in NH and it is not us.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============== Verification Checklist (LIGHT) ============== */}
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
              HOW TO VERIFY ANY CHIMNEY CONTRACTOR
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              Run the four checks before signing anything.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} duration={0.6} distance={14}>
            <p
              className="mt-4 max-w-2xl text-base md:text-lg"
              style={{ color: "rgba(47,62,70,0.85)" }}
            >
              These four checks work on any contractor in any town. Run them on us first. If we fail any of them, do not hire us.
            </p>
          </FadeUp>

          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {VERIFICATION_CHECKLIST.map((item, idx) => (
              <FadeUp
                key={item.title}
                delay={0.05 + idx * 0.06}
                duration={0.6}
                distance={14}
              >
                <li
                  className="flex h-full flex-col gap-3 rounded-md border p-6 md:p-7"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    borderColor: "rgba(127,42,31,0.20)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: "rgba(127,42,31,0.12)",
                        color: "var(--primary)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="5 12 10 17 19 8" />
                      </svg>
                    </span>
                    <h3
                      className="font-display text-h4 font-semibold"
                      style={{ color: "var(--granite-slate)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(47,62,70,0.85)" }}
                  >
                    {item.body}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      {/* ============== If You Got A Cold Call (DARK) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto max-w-[900px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">IF YOU GOT THE CALL</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Hang up. File a report. Call a real contractor.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} duration={0.6} distance={14}>
            <p
              className="mt-5 text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              If a chimney company cold-called you, pressured you on the roof, or charged a deposit and disappeared, file a complaint with the New Hampshire Consumer Protection Bureau. The state takes these reports seriously and runs cases against the worst operators every year.
            </p>
          </FadeUp>
          <FadeUp delay={0.3} duration={0.6} distance={14}>
            <ul
              className="mt-8 flex flex-col gap-3"
              style={{ color: "var(--text-secondary)" }}
            >
              <li className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <span>
                  NH Consumer Protection Bureau:{" "}
                  <a
                    href="https://www.doj.nh.gov/consumer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline transition-colors hover:text-accent"
                    style={{ color: "var(--text-primary)" }}
                  >
                    doj.nh.gov/consumer
                  </a>
                </span>
              </li>
              <li className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <span>
                  Better Business Bureau:{" "}
                  <a
                    href="https://www.bbb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline transition-colors hover:text-accent"
                    style={{ color: "var(--text-primary)" }}
                  >
                    bbb.org
                  </a>
                </span>
              </li>
              <li className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <span>
                  Or call us at{" "}
                  <a
                    href={telHref(siteConfig.phoneTel)}
                    className="underline transition-colors hover:text-accent"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {siteConfig.phone}
                  </a>
                  {" "}for a real second opinion. Free. No obligation.
                </span>
              </li>
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* ============== Final CTA (LIGHT) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--aged-mortar)" }}
      >
        <div className="mx-auto w-full max-w-4xl px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p
              className="text-eyebrow mb-4"
              style={{ color: "var(--primary)" }}
            >
              VERIFIED, INSURED, ON RECORD
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={18}>
            <h2
              className="font-display text-display font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              Get a real second opinion.
            </h2>
          </FadeUp>
          <FadeUp delay={0.25} duration={0.6} distance={14}>
            <p
              className="mx-auto mt-5 max-w-2xl text-base md:text-lg"
              style={{ color: "rgba(47,62,70,0.85)" }}
            >
              We answer the phone. We send the certificate of insurance. We put the estimate in writing. If we ever fall short on any of those, hold us to this page.
            </p>
          </FadeUp>
          <FadeUp delay={0.4} duration={0.6} distance={14}>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/booking" variant="primary">
                Book Inspection
              </Button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors"
                style={{
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                }}
              >
                Send a message
              </Link>
              <a
                href={telHref(siteConfig.phoneTel)}
                className="inline-flex items-center justify-center rounded-md px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:text-primary"
                style={{ color: "var(--granite-slate)" }}
              >
                Or call {siteConfig.phone}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Schema-ready data structure (Stage 1F injects JSON-LD here) */}
      {/* HowTo + FAQPage candidates exported via the RED_FLAGS / VERIFICATION_CHECKLIST arrays above. */}
    </>
  );
}
