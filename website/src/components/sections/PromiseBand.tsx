/**
 * PromiseBand.tsx - Slim full-width SLA banner.
 * Light tone. Lives at the very top of the homepage above the Hero.
 * Voice: 24-hour callback SLA. Source: market-intelligence.md §9 Do #2.
 */

"use client";

import { FadeIn } from "@/components/animations";
import { promise, siteConfig } from "@/data/site";
import { telHref } from "@/lib/utils";

export function PromiseBand() {
  return (
    <section
      aria-label="Service-level promise"
      className="relative w-full bg-aged-mortar pt-20 md:pt-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 px-6 py-3 text-center md:flex-row md:gap-4 md:py-3.5">
        <FadeIn delay={0} duration={0.5}>
          <div className="flex flex-col items-center justify-center gap-1.5 md:flex-row md:gap-3">
            <span
              className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary md:text-xs"
              aria-hidden="true"
            >
              {promise.headline}
            </span>
            <span
              aria-hidden="true"
              className="hidden h-3 w-px bg-primary/40 md:inline-block"
            />
            <span className="font-body text-[0.78rem] leading-snug text-granite-slate md:text-sm">
              {promise.body}
            </span>
            <span
              aria-hidden="true"
              className="hidden h-3 w-px bg-primary/40 md:inline-block"
            />
            <a
              href={telHref(siteConfig.phoneTel)}
              className="font-mono text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-accent underline-offset-4 transition-colors hover:text-primary hover:underline md:text-sm"
            >
              {siteConfig.phone}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default PromiseBand;
