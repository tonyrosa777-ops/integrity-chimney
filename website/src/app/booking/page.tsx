/**
 * /booking - Light-stage booking page (Pattern #52).
 *
 * Renders a custom calendar UI (BookingCalendar) on a soft cream
 * (var(--aged-mortar)) surface with granite-slate body text, intentionally
 * shifting from the rest of the dark site per design-system.md ("step into
 * the light"). Server component; the calendar itself is a client island.
 *
 * Trust signals + phone fallback flank the calendar as a side panel on
 * desktop and stack below it on mobile.
 */

import type { Metadata } from "next";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { siteConfig } from "@/data/site";
import { telHref } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Book Inspection | Integrity Chimney Services LLC",
    description:
      "Book a chimney inspection or service visit with Integrity Chimney Services. Pick a date, choose a time, and we'll confirm within 24 hours.",
    openGraph: {
      title: "Book Inspection | Integrity Chimney Services LLC",
      description:
        "Pick a date, choose a time. Free estimates, fully insured, same-week scheduling across central New Hampshire.",
      url: `${siteConfig.url}/booking`,
    },
  };
}

const TRUST_SIGNALS: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Free Estimates",
    body: "We come out, look at the work, and quote it before you owe a dollar.",
  },
  {
    title: "Fully Insured",
    body: "General liability and workers' comp on every visit.",
  },
  {
    title: "24-Hour Callback",
    body: "If we miss your call, we ring back within 4 business hours.",
  },
  {
    title: "Same-Week Scheduling",
    body: "Real estate transactions and emergencies move to the front of the line.",
  },
];

export default function BookingPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--aged-mortar)",
        color: "var(--granite-slate)",
      }}
    >
      {/* Hero strip */}
      <section className="border-b" style={{ borderColor: "rgba(47, 62, 70, 0.12)" }}>
        <div className="mx-auto w-full max-w-[1320px] px-6 pt-32 pb-10 md:px-8 md:pt-40 md:pb-14 lg:px-12">
          <p
            className="font-mono text-xs uppercase tracking-[0.12em]"
            style={{ color: "var(--accent)" }}
          >
            Schedule a visit
          </p>
          <h1
            className="font-display text-display mt-3 max-w-3xl"
            style={{ color: "var(--granite-slate)", fontWeight: 600 }}
          >
            Book your chimney inspection.
          </h1>
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--granite-slate)", opacity: 0.8 }}
          >
            Pick a date and a time that works for you. We&apos;ll confirm
            within 24 business hours and follow up with a quick courtesy call
            before the visit.
          </p>
        </div>
      </section>

      {/* Calendar + side panel */}
      <section className="pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
            {/* Calendar (main) */}
            <div>
              <BookingCalendar />
            </div>

            {/* Side panel: trust signals + phone fallback */}
            <aside className="space-y-6">
              <div
                className="rounded-xl border bg-white/60 p-5 shadow-sm sm:p-6"
                style={{ borderColor: "rgba(127, 42, 31, 0.18)" }}
              >
                <p
                  className="font-mono text-xs uppercase tracking-[0.12em]"
                  style={{ color: "var(--accent)" }}
                >
                  Why book with us
                </p>
                <ul className="mt-4 space-y-4">
                  {TRUST_SIGNALS.map((sig) => (
                    <li key={sig.title}>
                      <p
                        className="font-mono text-[0.75rem] uppercase tracking-[0.1em]"
                        style={{ color: "var(--granite-slate)", fontWeight: 600 }}
                      >
                        {sig.title}
                      </p>
                      <p
                        className="mt-1 text-sm leading-relaxed"
                        style={{ color: "var(--granite-slate)", opacity: 0.8 }}
                      >
                        {sig.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-xl border p-5 shadow-sm sm:p-6"
                style={{
                  borderColor: "rgba(184, 115, 51, 0.35)",
                  background: "rgba(127, 42, 31, 0.06)",
                }}
              >
                <p
                  className="font-mono text-xs uppercase tracking-[0.12em]"
                  style={{ color: "var(--accent)" }}
                >
                  Prefer to call?
                </p>
                <a
                  href={telHref(siteConfig.phoneTel)}
                  className="mt-2 block font-display text-2xl font-semibold transition-colors hover:opacity-80"
                  style={{ color: "var(--primary)" }}
                >
                  {siteConfig.phone}
                </a>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--granite-slate)", opacity: 0.8 }}
                >
                  {siteConfig.owner} or a member of the crew picks up. If we
                  miss you, we ring back within 4 business hours.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
