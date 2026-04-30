import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { faq, siteConfig } from "@/data/site";
import { FAQAccordion } from "./FAQAccordion";

/**
 * /faq - Hero, accordion of all FAQs grouped by category, bottom CTA to /contact.
 * Uses @radix-ui/react-accordion via the FAQAccordion client component.
 */

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Pricing, scheduling, Level 2 inspections, real estate timelines, scams to watch for, and more. Real answers from a Bow, NH chimney company.",
};

type FaqItem = (typeof faq)[number];
type Group = { name: string; items: FaqItem[] };

function groupByCategory(items: FaqItem[]): Group[] {
  const groups: Map<string, FaqItem[]> = new Map();
  const order: string[] = [];
  for (const item of items) {
    const key = item.category && item.category.length > 0 ? item.category : "General";
    if (!groups.has(key)) {
      groups.set(key, []);
      order.push(key);
    }
    groups.get(key)!.push(item);
  }
  return order.map((name) => ({ name, items: groups.get(name)! }));
}

export default function FaqPage() {
  const grouped = groupByCategory(faq);

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
              "radial-gradient(ellipse at 50% 0%, rgba(184,115,51,0.10) 0%, rgba(10,10,10,0) 50%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">QUESTIONS · ANSWERS</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.7} distance={20}>
            <h1
              className="text-display font-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Real answers, written by the guy on the roof.
            </h1>
          </FadeUp>
          <FadeUp delay={0.25} duration={0.6} distance={16}>
            <p
              className="mx-auto mt-6 max-w-2xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {`Pricing, scheduling, scams to watch for, what a Level 2 inspection actually is, and what we cover across central ${siteConfig.address.state}. If your question is not here, call ${siteConfig.phone} or use the contact form.`}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============== Accordion groups ============== */}
      <section
        className="relative py-16 md:py-24"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-[860px] px-6 md:px-8 lg:px-12">
          <div className="space-y-14 md:space-y-20">
            {grouped.map((group, gi) => (
              <FadeUp
                key={group.name}
                delay={gi * 0.05}
                duration={0.5}
                distance={12}
              >
                <div>
                  <h2
                    className="text-eyebrow mb-5"
                    style={{ color: "var(--accent)" }}
                  >
                    {group.name.toUpperCase()}
                  </h2>
                  <FAQAccordion items={group.items} groupId={group.name} />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Bottom CTA ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-[820px] px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">STILL HAVE QUESTIONS?</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="text-h2 font-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Ask Kevin directly.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} duration={0.6} distance={14}>
            <p
              className="mx-auto mt-5 max-w-xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {`Email ${siteConfig.email} or use the contact form. We answer questions before we ever quote work.`}
            </p>
          </FadeUp>
          <FadeUp delay={0.3} duration={0.6} distance={14}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href="/contact" variant="primary">
                Send a Question
              </Button>
              <Link
                href="/booking"
                className="font-mono text-sm uppercase tracking-wider hover:opacity-80"
                style={{ color: "var(--accent)" }}
              >
                Or book an inspection
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
