/**
 * BookingPreview.tsx - Light-stage teaser for the /booking page.
 * Headline + intro + small calendar visual placeholder + CTA → /booking.
 * The full BookingCalendar lives at /booking; this is the homepage teaser.
 * Background: bg-aged-mortar (Calendly light-stage token).
 */

"use client";

import { motion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  staggerItem,
} from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { promise, siteConfig } from "@/data/site";
import { telHref } from "@/lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIME_SLOTS = ["8:00", "10:30", "1:00", "3:30"];

function placeholderDates() {
  // Stable strings, no Date() to keep SSR/CSR matching.
  return [
    { label: "May 5", available: 3 },
    { label: "May 6", available: 2 },
    { label: "May 7", available: 4 },
    { label: "May 8", available: 1 },
    { label: "May 9", available: 3 },
  ];
}

export function BookingPreview() {
  const dates = placeholderDates();

  return (
    <section
      aria-labelledby="booking-preview-heading"
      className="relative w-full bg-aged-mortar py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy column */}
          <div className="lg:col-span-6">
            <FadeUp delay={0} duration={0.6} distance={20}>
              <p className="text-eyebrow mb-4 text-primary">Real availability</p>
              <h2
                id="booking-preview-heading"
                className="font-display text-h1 text-granite-slate"
                style={{ fontWeight: 600 }}
              >
                Book a slot. We&apos;ll be there the day we said.
              </h2>
            </FadeUp>

            <FadeUp delay={0.15} duration={0.6} distance={18}>
              <p className="mt-5 text-base leading-relaxed text-granite-slate/80 md:text-lg">
                Pick a day on the calendar, tell us about the chimney, and we lock the slot. No phone tag, no quote-by-text, no deposit over $1,000 until day-of-start.
              </p>
            </FadeUp>

            <FadeUp delay={0.3} duration={0.6} distance={16}>
              <ul className="mt-7 space-y-2.5">
                <li className="flex items-start gap-2.5 text-sm leading-snug text-granite-slate/85 md:text-base">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
                  />
                  <span>
                    Same-week scheduling for real estate transactions.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-sm leading-snug text-granite-slate/85 md:text-base">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
                  />
                  <span>{promise.body}</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm leading-snug text-granite-slate/85 md:text-base">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
                  />
                  <span>{promise.guarantee}</span>
                </li>
              </ul>
            </FadeUp>

            <FadeUp delay={0.45} duration={0.6} distance={14}>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button href="/booking" variant="primary">
                  Book inspection
                </Button>
                <a
                  href={telHref(siteConfig.phoneTel)}
                  className="inline-flex items-center justify-center font-mono text-sm uppercase tracking-[0.1em] text-primary underline-offset-4 hover:underline"
                >
                  Or call {siteConfig.phone}
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Calendar visual placeholder */}
          <div className="lg:col-span-6">
            <FadeUp delay={0.2} duration={0.7} distance={24}>
              <div className="relative rounded-xl border border-primary/15 bg-white/85 p-6 shadow-md md:p-8">
                {/* Calendar header */}
                <div className="flex items-center justify-between border-b border-primary/15 pb-4">
                  <p
                    className="font-display text-lg text-granite-slate"
                    style={{ fontWeight: 600 }}
                  >
                    This week
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
                    Live availability
                  </p>
                </div>

                {/* Day grid */}
                <StaggerContainer
                  staggerDelay={0.07}
                  className="mt-5 grid grid-cols-5 gap-2"
                >
                  {dates.map((d, idx) => (
                    <motion.div
                      key={d.label}
                      variants={staggerItem}
                      className="flex flex-col items-center rounded-md border border-primary/10 bg-aged-mortar/60 p-2.5"
                    >
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-granite-slate/70">
                        {WEEKDAYS[idx]}
                      </p>
                      <p
                        className="font-display mt-1 text-lg text-granite-slate"
                        style={{ fontWeight: 600 }}
                      >
                        {d.label.split(" ")[1]}
                      </p>
                      <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                      <p className="mt-1 font-mono text-[0.65rem] text-primary">
                        {d.available} open
                      </p>
                    </motion.div>
                  ))}
                </StaggerContainer>

                {/* Time slots */}
                <div className="mt-6 border-t border-primary/15 pt-5">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-granite-slate/70">
                    Tuesday slots
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {TIME_SLOTS.map((time, i) => (
                      <span
                        key={time}
                        className={`inline-flex items-center justify-center rounded-md border px-3 py-2 font-mono text-xs ${
                          i === 1
                            ? "border-primary bg-primary text-aged-mortar"
                            : "border-primary/20 bg-white text-granite-slate"
                        }`}
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-5 text-center font-mono text-[0.7rem] uppercase tracking-[0.12em] text-granite-slate/60">
                  Preview only · full calendar on /booking
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingPreview;
