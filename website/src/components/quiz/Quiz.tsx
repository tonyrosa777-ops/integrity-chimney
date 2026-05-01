/**
 * Quiz.tsx: "Find Your Chimney Service"
 * Multi-step diagnostic quiz with framer-motion step transitions and a scored
 * outcome that maps to a recommended service + inline BookingCalendar.
 *
 * Source of truth for copy: src/data/site.ts (quiz). No hardcoded strings.
 * Source of truth for color: globals.css design tokens.
 *
 * Flow:
 *   step 1..N    : questions with emoji-forward option grid (auto-advance)
 *   step N+1     : result + inline BookingCalendar (no email gate)
 *
 * No hook step (the /quiz page hero serves as the intro).
 * No lead capture step (Calendly form on the embedded calendar collects name/email).
 */

"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quiz } from "@/data/site";
import type { QuizOption, QuizOutcome } from "@/data/site";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function pickOutcome(
  selectedOptions: QuizOption[],
  outcomes: QuizOutcome[]
): QuizOutcome {
  const totals: Record<string, number> = {};
  for (const outcome of outcomes) totals[outcome.id] = 0;
  for (const opt of selectedOptions) {
    for (const [outcomeId, value] of Object.entries(opt.scores)) {
      if (totals[outcomeId] === undefined) totals[outcomeId] = 0;
      totals[outcomeId] += value;
    }
  }
  let winner = outcomes[0];
  let winnerScore = totals[winner.id] ?? 0;
  for (const candidate of outcomes) {
    const score = totals[candidate.id] ?? 0;
    if (score > winnerScore) {
      winner = candidate;
      winnerScore = score;
    }
  }
  return winner;
}

const slideVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function Quiz() {
  const totalQuestions = quiz.steps.length;

  // Step model:
  //   1..totalQuestions   => question N
  //   totalQuestions + 1  => result + inline BookingCalendar
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<Record<number, number>>({});

  const selectedOptions = useMemo<QuizOption[]>(() => {
    const out: QuizOption[] = [];
    for (let i = 0; i < totalQuestions; i++) {
      const optionIndex = selections[i];
      if (optionIndex !== undefined) {
        out.push(quiz.steps[i].options[optionIndex]);
      }
    }
    return out;
  }, [selections, totalQuestions]);

  const outcome = useMemo(
    () => pickOutcome(selectedOptions, quiz.outcomes),
    [selectedOptions]
  );

  const isQuestion = step >= 1 && step <= totalQuestions;
  const isResult = step === totalQuestions + 1;
  const currentQuestionIndex = step - 1;

  function handleSelectOption(questionIndex: number, optionIndex: number) {
    setSelections((prev) => ({ ...prev, [questionIndex]: optionIndex }));
    window.setTimeout(() => {
      setStep((s) => s + 1);
    }, 220);
  }

  function handleBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  const progressLabel = isQuestion
    ? `Step ${currentQuestionIndex + 1} of ${totalQuestions}`
    : isResult
      ? "Your match"
      : "";

  return (
    <section
      aria-label="Find Your Chimney Service Quiz"
      className="w-full"
    >
      {/* Progress bar */}
      {isQuestion && (
        <div className="mb-8 md:mb-10">
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[0.7rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--accent)" }}
            >
              {progressLabel}
            </span>
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--text-muted)" }}
              >
                Back
              </button>
            )}
          </div>
          <div
            className="mt-3 flex gap-1.5"
            aria-hidden="true"
          >
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              const filled = idx <= currentQuestionIndex;
              return (
                <span
                  key={idx}
                  className="h-1 flex-1 rounded-full transition-colors duration-300"
                  style={{
                    background: filled
                      ? "var(--accent)"
                      : "rgba(245,245,245,0.10)",
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* QUESTION STEPS */}
        {isQuestion && (
          <motion.div
            key={`q-${currentQuestionIndex}`}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <h2
              className="font-display text-center text-h2"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              {quiz.steps[currentQuestionIndex].question}
            </h2>

            <div
              className={cn(
                "mt-8 grid gap-3 md:mt-10 md:gap-4",
                quiz.steps[currentQuestionIndex].options.length >= 5
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                  : "grid-cols-2 md:grid-cols-4"
              )}
            >
              {quiz.steps[currentQuestionIndex].options.map((option, idx) => {
                const selected = selections[currentQuestionIndex] === idx;
                return (
                  <button
                    key={`${currentQuestionIndex}-${idx}`}
                    type="button"
                    onClick={() => handleSelectOption(currentQuestionIndex, idx)}
                    aria-pressed={selected}
                    className={cn(
                      "group flex flex-col items-center justify-start gap-3 rounded-lg border p-5 text-center transition-all duration-200 md:p-6",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      selected
                        ? "border-[var(--primary)] bg-[rgba(127,42,31,0.18)]"
                        : "border-[rgba(245,245,245,0.10)] bg-[var(--bg-card)] hover:border-[var(--accent)] hover:bg-[rgba(184,115,51,0.06)]"
                    )}
                    style={{
                      outlineColor: "var(--accent)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="block text-3xl leading-none md:text-4xl"
                    >
                      {option.emoji}
                    </span>
                    <span
                      className="text-sm leading-snug md:text-base"
                      style={{
                        color: selected
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                      }}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* RESULT STEP */}
        {isResult && (
          <motion.div
            key="result"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mx-auto w-full max-w-3xl"
          >
            <p
              className="text-eyebrow text-center"
              style={{ color: "var(--accent)" }}
            >
              Your match
            </p>
            <div
              className="mt-5 rounded-xl border p-7 md:p-9"
              style={{
                background: "var(--bg-card)",
                borderColor: "rgba(184,115,51,0.30)",
              }}
            >
              <div className="flex flex-col items-center text-center">
                <span
                  aria-hidden="true"
                  className="text-5xl leading-none md:text-6xl"
                >
                  {outcome.emoji}
                </span>
                <h2
                  className="font-display mt-4 text-h2"
                  style={{ color: "var(--text-primary)", fontWeight: 600 }}
                >
                  {outcome.title}
                </h2>
                <p
                  className="mt-4 max-w-xl text-base leading-relaxed md:text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {outcome.body}
                </p>

                <div
                  className="mt-6 inline-flex items-center gap-2 rounded-md border px-3 py-1.5"
                  style={{
                    borderColor: "rgba(184,115,51,0.30)",
                    background: "rgba(184,115,51,0.08)",
                  }}
                >
                  <span
                    className="font-mono text-[0.7rem] uppercase tracking-[0.12em]"
                    style={{ color: "var(--accent)" }}
                  >
                    Recommended
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {outcome.recommendedService}
                  </span>
                </div>
              </div>
            </div>

            {/* Bridge copy: turns the result into action. */}
            <div className="mt-12 text-center">
              <p
                className="text-eyebrow"
                style={{ color: "var(--accent)" }}
              >
                Next step
              </p>
              <h3
                className="font-display mt-3 text-h3"
                style={{ color: "var(--text-primary)", fontWeight: 600 }}
              >
                Pick a time. Kevin will be there.
              </h3>
              <p
                className="mx-auto mt-4 max-w-xl text-base leading-relaxed md:text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                No call center. No subcontractor. The owner shows up, walks the chimney with you, and leaves with a written scope. Free estimate, fully insured, BBB A+ accredited since 2009.
              </p>
            </div>

            <div className="mt-8">
              <BookingCalendar />
            </div>

            <p
              className="mt-8 text-center text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Prefer to talk it through first? Call (603) 660-4644.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Quiz;
