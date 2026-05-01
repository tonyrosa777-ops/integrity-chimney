/**
 * /blog - server component blog index.
 * Reads from src/data/blog.ts (single source of truth).
 */

import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";
import { LocalPostCard } from "@/components/blog/LocalPostCard";
import { NewsletterForm } from "@/components/blog/NewsletterForm";

export const metadata: Metadata = {
  title: "Blog · Notes from the Chimney",
  description:
    "Field notes on chimney sweeps, Level 2 inspections, lime mortar, NH masonry, and roofing. Plain answers from a Bow, NH owner-operator on real homeowner questions.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog · Notes from the Chimney | Integrity Chimney Services LLC",
    description:
      "Plain answers on chimney work, Level 2 inspections, lime mortar, and NH masonry from a working craftsman in Bow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog · Notes from the Chimney | Integrity Chimney Services LLC",
    description:
      "Plain answers on chimney work, Level 2 inspections, lime mortar, and NH masonry from a working craftsman in Bow.",
  },
};

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <div className="">
      {/* Hero */}
      <section className="border-b border-text-primary/10">
        <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24 lg:px-12">
          <p className="text-eyebrow">
            BLOG · CENTRAL NH HEATING SEASON GUIDE
          </p>
          <h1
            className="font-display mt-5 text-display text-text-primary"
            style={{ fontWeight: 600 }}
          >
            Notes from the Chimney.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            Plain-English answers to the questions homeowners actually call about. Real-estate timelines, lime-mortar restoration, safety field calls, and the rhythms of a Central NH heating season.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            {featured ? (
              <LocalPostCard post={featured} variant="featured" />
            ) : null}
            {rest.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
                {rest.map((post) => (
                  <LocalPostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : null}
          </div>

          {/* Sidebar - desktop only */}
          <aside className="hidden lg:block">
            <NewsletterForm variant="sidebar" />
          </aside>
        </div>

        {/* Mobile newsletter */}
        <div className="mt-12 lg:hidden">
          <NewsletterForm variant="block" />
        </div>
      </section>
    </div>
  );
}
