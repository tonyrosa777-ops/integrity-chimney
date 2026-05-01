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
      {/* Layer 0: Hero video (desktop+tablet only) with poster fallback.
          Mobile (≤767px) uses the poster as a CSS background — saves ~2 MB on phones.
          prefers-reduced-motion users see the poster regardless of viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Mobile / reduced-motion: static poster image */}
        <div
          className="absolute inset-0 md:hidden motion-reduce:block bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero/hero-poster.jpg')",
          }}
        />
        {/* Desktop+tablet: looping video with same poster as fallback */}
        <video
          className="hidden h-full w-full object-cover md:block motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero/hero-poster.jpg"
        >
          <source src="/videos/hero-craftsman.webm" type="video/webm" />
          <source src="/videos/hero-craftsman.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Layer 1: dark gradient overlay. Stronger darkening on the LEFT
          where text now lives (so the brick column doesn't compete);
          right side stays lighter so Kevin and the sunset breathe. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.55) 35%, rgba(10,10,10,0.20) 65%, rgba(10,10,10,0.05) 100%), linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.0) 30%, rgba(10,10,10,0.0) 70%, rgba(10,10,10,0.78) 100%), radial-gradient(ellipse at 25% 100%, rgba(127,42,31,0.22) 0%, rgba(10,10,10,0) 55%)",
        }}
      />

      {/* Layer 3: content (LEFT-ANCHORED — cinematic poster pattern) */}
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 pt-24 pb-20 md:px-8 md:pt-40 md:pb-32 lg:px-12">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <FadeUp delay={0.1} duration={0.5} distance={16}>
            <p className="text-eyebrow mb-5 md:mb-6">
              {hero.eyebrow ||
                `${siteConfig.address.city}, ${siteConfig.address.state} · Chimney · Masonry · Roofing`}
            </p>
          </FadeUp>

          {/* H1: Fraunces display, brick-to-copper shimmer */}
          <FadeUp delay={0.3} duration={0.7} distance={24}>
            <h1
              className="hero-shimmer font-display text-display"
              style={{ fontWeight: 600 }}
            >
              {hero.headline ||
                "Chimney. Masonry. Roofing. One craftsman who answers the phone."}
            </h1>
          </FadeUp>

          {/* Subhead */}
          <FadeUp delay={0.5} duration={0.6} distance={20}>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed md:mt-8 md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {hero.subheadline ||
                "We answer the phone, show up when we said, and tell you what your chimney actually needs."}
            </p>
          </FadeUp>

          {/* CTA pair */}
          <FadeUp delay={0.7} duration={0.6} distance={18}>
            <div className="mt-10 flex flex-col items-stretch justify-start gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-12">
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

          {/* Trust band — left-anchored row, badges flow left to right */}
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
                  className="flex flex-col items-start text-left"
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
              className="font-display mt-8 text-sm italic md:mt-10 md:text-base"
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
