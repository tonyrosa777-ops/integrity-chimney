/**
 * Hero.tsx - Integrity Chimney Services LLC
 * Aesthetic: industrial-utilitarian x organic-natural (design-system.md §8)
 * Animation: ember-drift over hearth stone (locked progress.md hero layout)
 * Layout: vertical stack, items-start, pt-24 md:pt-40 (Optimus mobile QA)
 * Honors prefers-reduced-motion (Pattern #51)
 */

"use client";

import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { hero, siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] items-start overflow-hidden"
      style={{ minHeight: "max(100svh, 720px)" }}
    >
      {/* Ember canvas now lives globally in layout.tsx (GlobalEmberLayer) */}

      {/* Layer 2: radial vignette to seat the type and pull eyes upward */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(127,42,31,0.18) 0%, rgba(10,10,10,0) 55%), linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0) 25%, rgba(10,10,10,0) 70%, rgba(10,10,10,0.65) 100%)",
        }}
      />

      {/* Layer 3: content */}
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 pt-24 pb-20 md:px-8 md:pt-40 md:pb-32 lg:px-12">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow */}
          <FadeUp delay={0.1} duration={0.5} distance={16}>
            <p className="text-eyebrow mb-5 text-center md:mb-6">
              {hero.eyebrow ||
                `${siteConfig.address.city}, ${siteConfig.address.state} · Chimney · Masonry · Roofing`}
            </p>
          </FadeUp>

          {/* H1: Fraunces display, brick-to-copper shimmer */}
          <FadeUp delay={0.3} duration={0.7} distance={24}>
            <h1
              className="hero-shimmer font-display text-display text-center"
              style={{ fontWeight: 600 }}
            >
              {hero.headline ||
                "Chimney. Masonry. Roofing. One craftsman who answers the phone."}
            </h1>
          </FadeUp>

          {/* Subhead */}
          <FadeUp delay={0.5} duration={0.6} distance={20}>
            <p
              className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed md:mt-8 md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {hero.subheadline ||
                "We answer the phone, show up when we said, and tell you what your chimney actually needs."}
            </p>
          </FadeUp>

          {/* CTA pair */}
          <FadeUp delay={0.7} duration={0.6} distance={18}>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-12">
              <Link
                href={hero.primaryCTA?.href || "/booking"}
                className="font-mono inline-flex items-center justify-center rounded-md px-6 py-3 text-sm uppercase tracking-[0.08em] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-primary)",
                  outlineColor: "var(--accent)",
                }}
              >
                {hero.primaryCTA?.label || "Book Inspection"}
              </Link>
              <Link
                href={hero.secondaryCTA?.href || "/quiz"}
                className="font-mono inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm uppercase tracking-[0.08em] transition-all duration-200 hover:bg-[rgba(184,115,51,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
                style={{
                  borderColor: "var(--accent)",
                  color: "var(--accent)",
                  outlineColor: "var(--accent)",
                }}
              >
                {hero.secondaryCTA?.label || "Take the Quiz"}
              </Link>
            </div>
          </FadeUp>

          {/* Trust band */}
          <FadeUp delay={0.9} duration={0.6} distance={14}>
            <ul
              className="mt-14 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-8 md:mt-20 md:grid-cols-4 md:gap-x-8"
              style={{ borderColor: "rgba(245,245,245,0.08)" }}
            >
              {(hero.trustBadges && hero.trustBadges.length > 0
                ? hero.trustBadges
                : ["Fully Insured", "BBB A+", "Free Estimates", "Owner-Operated"]
              ).map((badge, idx) => (
                <li
                  key={`${badge}-${idx}`}
                  className="flex flex-col items-center text-center"
                >
                  <span
                    className="font-mono text-xs uppercase tracking-[0.12em]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {badge}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-2 block h-px w-8"
                    style={{ background: "var(--accent)" }}
                  />
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* Owner-name signature */}
          <FadeUp delay={1.1} duration={0.6} distance={10}>
            <p
              className="font-display mt-8 text-center text-sm italic md:mt-10 md:text-base"
              style={{ color: "var(--text-muted)", fontWeight: 400 }}
            >
              {(hero as { signature?: string }).signature ||
                `${siteConfig.owner}, ${siteConfig.address.city}, ${siteConfig.address.state}`}
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

export default Hero;
