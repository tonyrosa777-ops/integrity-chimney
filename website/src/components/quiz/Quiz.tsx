/**
 * Quiz.tsx: "Find Your Chimney Service"
 * Multi-step diagnostic quiz with framer-motion step transitions, lead capture,
 * and a scored outcome that maps to a recommended service + booking CTA.
 *
 * Source of truth for copy: src/data/site.ts (quiz). No hardcoded strings.
 * Source of truth for color: globals.css design tokens (brick / accent / etc).
 *
 * Flow:
 *   step 0          : hook + start CTA
 *   step 1..N       : questions with emoji-forward option grid
 *   step N+1        : lead capture (name, email, phone)
 *   step N+2        : result (highest scoring outcome)
 */

"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { quiz } from "@/data/site";
import type { QuizOption, QuizOutcome } from "@/data/site";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

type LeadFormValues = {
  name: string;
  email: string;
  phone?: string;
};

type AnswerRecord = {
  questionIndex: number;
  optionIndex: number;
  label: string;
};

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
});

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function pickOutcome(
  selectedOptions: QuizOption[],
  outcomes: QuizOutcome[]
): { outcome: QuizOutcome; scores: Record<string, number> } {
  // Sum scores across selected options for each outcome id.
  const totals: Record<string, number> = {};
  for (const outcome of outcomes) totals[outcome.id] = 0;
  for (const opt of selectedOptions) {
    for (const [outcomeId, value] of Object.entries(opt.scores)) {
      if (totals[outcomeId] === undefined) totals[outcomeId] = 0;
      totals[outcomeId] += value;
    }
  }
  // Tie -> first outcome (stable order from site.ts).
  let winner = outcomes[0];
  let winnerScore = totals[winner.id] ?? 0;
  for (const candidate of outcomes) {
    const score = totals[candidate.id] ?? 0;
    if (score > winnerScore) {
      winner = candidate;
      winnerScore = score;
    }
  }
  return { outcome: winner, scores: totals };
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
  //   0                       => hook
  //   1..totalQuestions       => question N
  //   totalQuestions + 1      => lead capture
  //   totalQuestions + 2      => result
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<LeadFormValues>({
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "" },
  });

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

  const { outcome, scores } = useMemo(
    () => pickOutcome(selectedOptions, quiz.outcomes),
    [selectedOptions]
  );

  const allAnswered = selectedOptions.length === totalQuestions;
  const isHook = step === 0;
  const isQuestion = step >= 1 && step <= totalQuestions;
  const isLead = step === totalQuestions + 1;
  const isResult = step === totalQuestions + 2;
  const currentQuestionIndex = step - 1;

  function handleSelectOption(questionIndex: number, optionIndex: number) {
    setSelections((prev) => ({ ...prev, [questionIndex]: optionIndex }));
    // Auto-advance to next step shortly after selection (small delay so users
    // see their choice settle in).
    window.setTimeout(() => {
      setStep((s) => s + 1);
    }, 220);
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function handleLeadSubmit(values: LeadFormValues) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const answers: AnswerRecord[] = [];
      for (let i = 0; i < totalQuestions; i++) {
        const optionIndex = selections[i];
        if (optionIndex === undefined) continue;
        answers.push({
          questionIndex: i,
          optionIndex,
          label: quiz.steps[i].options[optionIndex].label,
        });
      }
      const payload = {
        answers,
        scores,
        outcome: outcome.id,
        lead: {
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone?.trim() || undefined,
        },
      };
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error || "Submission failed. Please try again.");
      }
      setSubmitted(true);
      setStep(totalQuestions + 2);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Submission failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // Progress indicator: shown during questions only.
  const progressLabel = isQuestion
    ? `Step ${currentQuestionIndex + 1} of ${totalQuestions}`
    : isLead
      ? "Almost done"
      : isResult
        ? "Your match"
        : "";

  return (
    <section
      aria-label="Find Your Chimney Service Quiz"
      className="w-full"
    >
      {/* Progress bar */}
      {(isQuestion || isLead) && (
        <div className="mb-8 md:mb-10">
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[0.7rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--accent)" }}
            >
              {progressLabel}
            </span>
            {step > 1 && !submitting && (
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
            {Array.from({ length: totalQuestions + 1 }).map((_, idx) => {
              const filled =
                (isQuestion && idx <= currentQuestionIndex) ||
                (isLead && idx <= totalQuestions);
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
        {/* HOOK STEP */}
        {isHook && (
          <motion.div
            key="hook"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center"
          >
            <p
              className="text-eyebrow mb-4"
              style={{ color: "var(--accent)" }}
            >
              {totalQuestions} questions
            </p>
            <h2
              className="font-display text-h1"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              {quiz.hookHeadline}
            </h2>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {quiz.hookBody}
            </p>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="font-mono inline-flex items-center justify-center rounded-md px-8 py-3.5 text-sm uppercase tracking-[0.08em] transition-all duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-primary)",
                  outlineColor: "var(--accent)",
                }}
              >
                {quiz.startCTA}
              </button>
            </div>
          </motion.div>
        )}

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

        {/* LEAD CAPTURE STEP */}
        {isLead && (
          <motion.div
            key="lead"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto max-w-lg"
          >
            <h2
              className="font-display text-center text-h2"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Where should we send your match?
            </h2>
            <p
              className="mt-3 text-center text-sm md:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              We will send your result and a real next step. No spam.
            </p>

            <form
              onSubmit={form.handleSubmit(async (values) => {
                const parsed = leadSchema.safeParse(values);
                if (!parsed.success) {
                  for (const issue of parsed.error.issues) {
                    const field = issue.path[0] as keyof LeadFormValues;
                    form.setError(field, { message: issue.message });
                  }
                  return;
                }
                await handleLeadSubmit(parsed.data);
              })}
              className="mt-8 flex flex-col gap-4"
              noValidate
            >
              <FieldLabel htmlFor="quiz-name" label="Name" required>
                <input
                  id="quiz-name"
                  type="text"
                  autoComplete="name"
                  {...form.register("name", {
                    required: "Please enter your name.",
                  })}
                  className="w-full rounded-md border bg-[var(--bg-elevated)] px-4 py-3 text-base outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "rgba(245,245,245,0.15)",
                    color: "var(--text-primary)",
                  }}
                  aria-invalid={form.formState.errors.name ? "true" : "false"}
                />
                {form.formState.errors.name && (
                  <FieldError message={form.formState.errors.name.message} />
                )}
              </FieldLabel>

              <FieldLabel htmlFor="quiz-email" label="Email" required>
                <input
                  id="quiz-email"
                  type="email"
                  autoComplete="email"
                  {...form.register("email", {
                    required: "Please enter your email.",
                  })}
                  className="w-full rounded-md border bg-[var(--bg-elevated)] px-4 py-3 text-base outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "rgba(245,245,245,0.15)",
                    color: "var(--text-primary)",
                  }}
                  aria-invalid={form.formState.errors.email ? "true" : "false"}
                />
                {form.formState.errors.email && (
                  <FieldError message={form.formState.errors.email.message} />
                )}
              </FieldLabel>

              <FieldLabel htmlFor="quiz-phone" label="Phone (optional)">
                <input
                  id="quiz-phone"
                  type="tel"
                  autoComplete="tel"
                  {...form.register("phone")}
                  className="w-full rounded-md border bg-[var(--bg-elevated)] px-4 py-3 text-base outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "rgba(245,245,245,0.15)",
                    color: "var(--text-primary)",
                  }}
                />
              </FieldLabel>

              {submitError && (
                <p
                  role="alert"
                  className="rounded-md border px-3 py-2 text-sm"
                  style={{
                    borderColor: "rgba(127,42,31,0.5)",
                    color: "var(--text-primary)",
                    background: "rgba(127,42,31,0.15)",
                  }}
                >
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !allAnswered}
                className="font-mono mt-2 inline-flex items-center justify-center rounded-md px-6 py-3.5 text-sm uppercase tracking-[0.08em] transition-all duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-primary)",
                  outlineColor: "var(--accent)",
                }}
              >
                {submitting ? "Sending..." : "See My Match"}
              </button>
            </form>
          </motion.div>
        )}

        {/* RESULT STEP */}
        {isResult && submitted && (
          <motion.div
            key="result"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mx-auto max-w-2xl"
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

                <Link
                  href={outcome.ctaHref}
                  className="font-mono mt-8 inline-flex items-center justify-center rounded-md px-7 py-3.5 text-sm uppercase tracking-[0.08em] transition-all duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
                  style={{
                    background: "var(--primary)",
                    color: "var(--text-primary)",
                    outlineColor: "var(--accent)",
                  }}
                >
                  Book {outcome.recommendedService}
                </Link>
              </div>
            </div>

            <p
              className="mt-6 text-center text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              We sent a copy to your email. Someone will be in touch within 4 business hours.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Internal building blocks                                                    */
/* -------------------------------------------------------------------------- */

function FieldLabel({
  htmlFor,
  label,
  required,
  children,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span
        className="font-mono mb-1.5 block text-[0.7rem] uppercase tracking-[0.12em]"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mt-1.5 text-xs"
      style={{ color: "var(--accent)" }}
    >
      {message}
    </p>
  );
}

export default Quiz;
