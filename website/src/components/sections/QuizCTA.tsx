/**
 * QuizCTA.tsx - Quiz funnel CTA. Dark tone with copper accent.
 * Source: site.ts quiz.hookHeadline + quiz.hookBody.
 * Primary CTA → /quiz.
 */

"use client";

import { motion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  staggerItem,
} from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { quiz } from "@/data/site";

const HIGHLIGHTS = [
  { emoji: "🧭", label: "5 questions" },
  { emoji: "⏱️", label: "60 seconds" },
  { emoji: "💵", label: "Real price, real next step" },
];

export function QuizCTA() {
  return (
    <section
      aria-labelledby="quiz-cta-heading"
      className="relative w-full overflow-hidden bg-bg-elevated py-20 md:py-28"
    >
      {/* Copper accent backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(184,115,51,0.22) 0%, rgba(20,20,20,0) 60%), radial-gradient(ellipse at 50% 100%, rgba(127,42,31,0.18) 0%, rgba(20,20,20,0) 55%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 md:px-8 lg:px-12">
        <FadeUp delay={0} duration={0.6} distance={22}>
          <div className="rounded-xl border border-accent/30 bg-bg-card/80 p-8 shadow-lg backdrop-blur-sm md:p-12 lg:p-16">
            <div className="flex flex-col items-center text-center">
              <span
                aria-hidden="true"
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl"
              >
                🧭
              </span>

              <p className="text-eyebrow mt-6">Not sure which service you need?</p>

              <h2
                id="quiz-cta-heading"
                className="font-display text-h1 mt-4 text-text-primary"
                style={{ fontWeight: 600 }}
              >
                {quiz.hookHeadline}
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
                {quiz.hookBody}
              </p>

              <StaggerContainer
                staggerDelay={0.1}
                className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-5"
              >
                {HIGHLIGHTS.map((h) => (
                  <motion.span
                    key={h.label}
                    variants={staggerItem}
                    className="inline-flex items-center gap-2 rounded-full border border-text-primary/15 bg-bg-base/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-text-secondary"
                  >
                    <span aria-hidden="true">{h.emoji}</span>
                    {h.label}
                  </motion.span>
                ))}
              </StaggerContainer>

              <FadeUp delay={0.3} duration={0.6} distance={14}>
                <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Button href="/quiz" variant="primary">
                    {quiz.startCTA}
                  </Button>
                  <Button href="/services" variant="ghost">
                    Browse services instead →
                  </Button>
                </div>
              </FadeUp>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default QuizCTA;
