/**
 * FounderTeaser.tsx - About teaser linking to /about.
 * Dark tone. Photo placeholder + bio excerpt + CTA.
 * Source: site.ts founder.
 */

"use client";

import { FadeUp } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { founder, siteConfig } from "@/data/site";

function bioExcerpt(bio: string): string {
  // First two sentences, no em dashes inserted.
  const sentences = bio.split(/(?<=[.!?])\s+/).slice(0, 2);
  return sentences.join(" ");
}

export function FounderTeaser() {
  return (
    <section
      aria-labelledby="founder-teaser-heading"
      className="relative w-full overflow-hidden bg-bg-base py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(184,115,51,0.18) 0%, rgba(10,10,10,0) 55%), radial-gradient(ellipse at 10% 90%, rgba(127,42,31,0.15) 0%, rgba(10,10,10,0) 55%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Photo placeholder */}
          <FadeUp
            delay={0}
            duration={0.7}
            distance={24}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg border border-text-primary/10 bg-bg-card lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(127,42,31,0.55) 0%, rgba(20,20,20,0.85) 50%, rgba(184,115,51,0.35) 100%)",
                }}
              />
              <div className="relative flex h-full w-full flex-col items-center justify-center p-8 text-center">
                <span
                  aria-hidden="true"
                  className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/30 text-3xl"
                >
                  👷
                </span>
                <p
                  className="font-display mt-5 text-2xl text-text-primary"
                  style={{ fontWeight: 600 }}
                >
                  {founder.name}
                </p>
                <p className="font-mono mt-2 text-xs uppercase tracking-[0.14em] text-accent">
                  {founder.title}
                </p>
                <p className="font-display mt-6 text-sm italic text-text-secondary">
                  {siteConfig.address.city}, {siteConfig.address.state}
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Copy + CTA */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.1} duration={0.6} distance={20}>
              <p className="text-eyebrow mb-4">
                Owner-operated since {siteConfig.founded}
              </p>
              <h2
                id="founder-teaser-heading"
                className="font-display text-h1 text-text-primary"
                style={{ fontWeight: 600 }}
              >
                Hire Kevin. Get Kevin.
              </h2>
            </FadeUp>

            <FadeUp delay={0.25} duration={0.6} distance={18}>
              <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">
                {bioExcerpt(founder.bio)}
              </p>
            </FadeUp>

            <FadeUp delay={0.4} duration={0.6} distance={16}>
              <ul className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {founder.credentials.slice(0, 4).map((credential) => (
                  <li
                    key={credential}
                    className="flex items-start gap-2.5 text-sm leading-snug text-text-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                    />
                    <span>{credential}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.55} duration={0.6} distance={14}>
              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button href="/about" variant="primary">
                  Read Kevin&apos;s story
                </Button>
                <Button href="/about#crew" variant="ghost">
                  Meet the crew →
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FounderTeaser;
