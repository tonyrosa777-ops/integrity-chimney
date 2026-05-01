/**
 * BlogPreview.tsx - Homepage section showing the 3 latest blog posts.
 * Reads from src/data/blog.ts. Dark tone.
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FadeUp,
  StaggerContainer,
  staggerItem,
} from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { blogPosts } from "@/data/blog";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function BlogPreview() {
  const latest = [...blogPosts]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 3);

  return (
    <section
      aria-labelledby="blog-preview-heading"
      className="relative w-full bg-transparent py-20 md:py-28"
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
          {latest.map((post) => (
            <motion.article
              key={post.slug}
              variants={staggerItem}
              className="group flex flex-col overflow-hidden rounded-lg border border-text-primary/10 bg-bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={post.cardImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-base/40 via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
                    <span>{post.category}</span>
                    <span aria-hidden="true" className="text-text-muted">
                      ·
                    </span>
                    <span className="text-text-muted">
                      {post.readingMinutes} min read
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
                    {formatDate(post.publishedAt)}
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
