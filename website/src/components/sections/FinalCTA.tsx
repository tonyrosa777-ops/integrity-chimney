/**
 * FinalCTA.tsx - Bottom-of-homepage closer block. Dark tone.
 * Phone + email + Book Inspection CTA. Last conversion shot.
 * Format intentionally distinct from QuizCTA: this is "book now" not "find your service."
 */

"use client";

import { FadeUp } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { hero, promise, siteConfig } from "@/data/site";
import { telHref } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative w-full overflow-hidden bg-bg-elevated py-20 md:py-28"
    >
      {/* Backdrop accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(127,42,31,0.22) 0%, rgba(20,20,20,0) 50%), radial-gradient(ellipse at 80% 70%, rgba(184,115,51,0.18) 0%, rgba(20,20,20,0) 55%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 text-center md:px-8 lg:px-12">
        <FadeUp delay={0} duration={0.6} distance={20}>
          <p className="text-eyebrow mb-4">
            {siteConfig.address.city}, {siteConfig.address.state} · {siteConfig.yearsExperience}+ years owner-operated
          </p>
          <h2
            id="final-cta-heading"
            className="font-display text-display text-text-primary"
            style={{ fontWeight: 600 }}
          >
            We answer the phone.
          </h2>
        </FadeUp>

        <FadeUp delay={0.15} duration={0.6} distance={18}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            {promise.body} {hero.subheadline.split(". ")[0]}.
          </p>
        </FadeUp>

        <FadeUp delay={0.3} duration={0.6} distance={16}>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-12">
            <Button href="/booking" variant="primary">
              Book inspection
            </Button>
            <a
              href={telHref(siteConfig.phoneTel)}
              className="inline-flex items-center justify-center rounded-md border border-accent px-6 py-3 font-mono text-sm uppercase tracking-wider text-accent transition-all duration-200 hover:bg-accent hover:text-bg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated"
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.45} duration={0.6} distance={14}>
          <div className="mx-auto mt-12 grid grid-cols-1 gap-4 border-t border-text-primary/10 pt-8 sm:grid-cols-3 sm:gap-6 md:mt-16">
            <div className="flex flex-col items-center text-center">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent">
                Phone
              </p>
              <a
                href={telHref(siteConfig.phoneTel)}
                className="font-display mt-2 text-base text-text-primary transition-colors hover:text-accent md:text-lg"
                style={{ fontWeight: 600 }}
              >
                {siteConfig.phone}
              </a>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent">
                Email
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-display mt-2 break-all text-base text-text-primary transition-colors hover:text-accent md:text-lg"
                style={{ fontWeight: 600 }}
              >
                {siteConfig.email}
              </a>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent">
                Owner
              </p>
              <p
                className="font-display mt-2 text-base text-text-primary md:text-lg"
                style={{ fontWeight: 600 }}
              >
                {siteConfig.owner}
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default FinalCTA;
