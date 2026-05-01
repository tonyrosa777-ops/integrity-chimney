/**
 * /quiz: Find Your Chimney Service
 * Server component shell that renders the hero strip + the client Quiz.
 * Copy is sourced from src/data/site.ts (quiz). No hardcoded strings.
 */

import type { Metadata } from "next";
import { Quiz } from "@/components/quiz/Quiz";
import { quiz } from "@/data/site";

export function generateMetadata(): Metadata {
  const description =
    "Five questions, sixty seconds. We point you to the right chimney, masonry, or roofing service for your situation in Bow, NH and central New Hampshire.";
  return {
    title: "Find Your Chimney Service Quiz",
    description,
    openGraph: {
      title:
        "Find Your Chimney Service Quiz | Integrity Chimney Services LLC",
      description,
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Find Your Chimney Service Quiz | Integrity Chimney Services LLC",
      description,
    },
  };
}

export default function QuizPage() {
  return (
    <>
      {/* Hero strip */}
      <section
        aria-labelledby="quiz-hero-heading"
        className="relative w-full overflow-hidden"
        style={{ background: "transparent" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(127,42,31,0.18) 0%, rgba(10,10,10,0) 55%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-3xl px-6 pt-28 pb-10 text-center md:px-8 md:pt-36 md:pb-14">
          <p
            className="text-eyebrow mb-4"
            style={{ color: "var(--accent)" }}
          >
            Find Your Service
          </p>
          <h1
            id="quiz-hero-heading"
            className="font-display text-h1"
            style={{ color: "var(--text-primary)", fontWeight: 600 }}
          >
            {quiz.hookHeadline}
          </h1>
          <p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {quiz.hookBody}
          </p>
        </div>
      </section>

      {/* Quiz body */}
      <section
        className="w-full pb-24 md:pb-32"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
          <Quiz />
        </div>
      </section>
    </>
  );
}
