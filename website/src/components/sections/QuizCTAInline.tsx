/**
 * QuizCTAInline.tsx
 * Embedded variant of the Quiz, intended for pages that want the full quiz
 * experience inline (centered, max-width constrained) rather than linking to
 * /quiz. The homepage QuizCTA section (built separately) links to /quiz; this
 * wrapper is for landing pages or other surfaces that need the quiz mounted
 * directly.
 */

import { Quiz } from "@/components/quiz/Quiz";

export function QuizCTAInline() {
  return (
    <section
      aria-label="Find Your Chimney Service"
      className="relative w-full py-20 md:py-28"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
        <Quiz />
      </div>
    </section>
  );
}

export default QuizCTAInline;
