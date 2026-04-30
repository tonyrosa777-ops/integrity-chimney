/**
 * BlogPreview.tsx - Placeholder blog cards (3 latest). Dark tone.
 * Article images will be fal.ai-generated in Stage 1G; for now, gradient
 * placeholders keyed by topic.
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FadeUp,
  StaggerContainer,
  staggerItem,
} from "@/components/animations";
import { Button } from "@/components/ui/Button";

type BlogPlaceholder = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  date: string;
  gradient: string;
  emoji: string;
};

const PLACEHOLDERS: BlogPlaceholder[] = [
  {
    slug: "level-2-inspection-real-estate-nh",
    category: "Real Estate",
    title: "What a Level 2 inspection actually looks like for a NH closing.",
    excerpt:
      "Inside the 24-hour PDF: what realtors flag, what lawyers want to see, and how to keep a chimney issue from blowing up the close.",
    readMinutes: 7,
    date: "2026-04-14",
    gradient:
      "linear-gradient(135deg, rgba(127,42,31,0.85) 0%, rgba(20,20,20,0.95) 60%, rgba(184,115,51,0.45) 100%)",
    emoji: "📋",
  },
  {
    slug: "lime-mortar-vs-portland-pre-1900-chimneys",
    category: "Historic Restoration",
    title:
      "Why Portland cement spalls pre-1900 brick (and what to use instead).",
    excerpt:
      "The math on softer brick, the Type O lime mortar standard, and why a $1,500 repoint can save a $30,000 rebuild on a Federal-era chimney.",
    readMinutes: 9,
    date: "2026-03-22",
    gradient:
      "linear-gradient(135deg, rgba(47,62,70,0.9) 0%, rgba(20,20,20,0.95) 55%, rgba(127,42,31,0.55) 100%)",
    emoji: "🏛️",
  },
  {
    slug: "creosote-the-kids-are-upstairs",
    category: "Safety",
    title: "You smell creosote and the kids are upstairs. What to do tonight.",
    excerpt:
      "A field guide for the call you don&rsquo;t want to make. When to stop using the stove, when it can wait, and what a real same-day sweep covers.",
    readMinutes: 5,
    date: "2026-02-09",
    gradient:
      "linear-gradient(135deg, rgba(184,115,51,0.7) 0%, rgba(20,20,20,0.95) 55%, rgba(127,42,31,0.7) 100%)",
    emoji: "🔥",
  },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPreview() {
  return (
    <section
      aria-labelledby="blog-preview-heading"
      className="relative w-full bg-bg-base py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <FadeUp delay={0} duration={0.6} distance={20}>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-eyebrow mb-4">Field notes from the roof</p>
              <h2
                id="blog-preview-heading"
                className="font-display text-h1 text-text-primary"
                style={{ fontWeight: 600 }}
              >
                Plain-English answers to the questions homeowners actually call about.
              </h2>
            </div>
            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-[0.12em] text-accent transition-colors hover:text-text-primary"
            >
              View all posts →
            </Link>
          </div>
        </FadeUp>

        <StaggerContainer
          staggerDelay={0.12}
          className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-7"
        >
          {PLACEHOLDERS.map((post) => (
            <motion.article
              key={post.slug}
              variants={staggerItem}
              className="group flex flex-col overflow-hidden rounded-lg border border-text-primary/10 bg-bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
                {/* Image placeholder */}
                <div
                  aria-hidden="true"
                  className="relative h-44 w-full overflow-hidden"
                  style={{ background: post.gradient }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl opacity-80">{post.emoji}</span>
                  </div>
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(245,245,245,0.3) 1px, transparent 1px)",
                      backgroundSize: "10px 10px",
                    }}
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
                    <span>{post.category}</span>
                    <span aria-hidden="true" className="text-text-muted">
                      ·
                    </span>
                    <span className="text-text-muted">
                      {post.readMinutes} min read
                    </span>
                  </div>

                  <h3
                    className="font-display mt-4 text-lg leading-snug text-text-primary group-hover:text-accent md:text-xl"
                    style={{ fontWeight: 600 }}
                  >
                    {post.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    {post.excerpt}
                  </p>

                  <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-muted">
                    {formatDate(post.date)}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2} duration={0.6} distance={14}>
          <div className="mt-12 flex justify-center md:mt-14">
            <Button href="/blog" variant="secondary">
              Read the blog
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default BlogPreview;
