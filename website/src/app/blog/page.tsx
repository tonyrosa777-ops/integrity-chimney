/**
 * /blog - server component blog index.
 *
 * Graceful degradation: when Sanity is not configured (no env vars) OR there
 * are zero posts, renders an "empty state" with placeholder cards plus a
 * newsletter capture form. Never throws.
 */

import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import type { PostSummary } from "@/sanity/lib/types";
import { PostCard } from "@/components/blog/PostCard";
import { NewsletterForm } from "@/components/blog/NewsletterForm";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-English answers to the questions homeowners actually call about. Field notes from the Bow, NH chimney, masonry, and roofing crew at Integrity Chimney Services.",
  alternates: { canonical: "/blog" },
};

const PLACEHOLDER_PREVIEWS = [
  {
    category: "Real Estate",
    title:
      "What a Level 2 inspection actually looks like for a NH closing.",
    excerpt:
      "Inside the 24-hour PDF: what realtors flag, what lawyers want to see, and how to keep a chimney issue from blowing up the close.",
    gradient:
      "linear-gradient(135deg, rgba(127,42,31,0.85) 0%, rgba(20,20,20,0.95) 60%, rgba(184,115,51,0.45) 100%)",
  },
  {
    category: "Historic Restoration",
    title:
      "Why Portland cement spalls pre-1900 brick, and what to use instead.",
    excerpt:
      "The math on softer brick, the Type O lime mortar standard, and why a $1,500 repoint can save a $30,000 rebuild on a Federal-era chimney.",
    gradient:
      "linear-gradient(135deg, rgba(47,62,70,0.9) 0%, rgba(20,20,20,0.95) 55%, rgba(127,42,31,0.55) 100%)",
  },
  {
    category: "Heating Season",
    title:
      "The five warning signs a Bow homeowner should never ignore mid-winter.",
    excerpt:
      "From a sweet smell on the second floor to a draft that reverses on cold nights, the field calls that should pause your fire tonight.",
    gradient:
      "linear-gradient(135deg, rgba(184,115,51,0.7) 0%, rgba(20,20,20,0.95) 55%, rgba(127,42,31,0.7) 100%)",
  },
];

export default async function BlogIndexPage() {
  const posts =
    (await sanityFetch<PostSummary[]>(postsQuery, {}, [])) ?? [];

  const hasPosts = posts.length > 0;
  const featured = hasPosts ? posts[0] : null;
  const rest = hasPosts ? posts.slice(1) : [];

  return (
    <div className="bg-bg-base">
      {/* ===== Hero ===== */}
      <section className="border-b border-text-primary/10 bg-bg-base">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8 md:py-28 lg:px-12">
          <p className="text-eyebrow">
            BLOG &middot; BOW NH HEATING SEASON GUIDE
          </p>
          <h1
            className="font-display mt-5 text-display text-text-primary"
            style={{ fontWeight: 600 }}
          >
            Notes from the Chimney.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            Plain-English answers to the questions homeowners actually call
            about. Real-estate timelines, lime-mortar restoration, safety
            field calls, and the rhythms of a Central NH heating season.
          </p>
        </div>
      </section>

      {/* ===== Body ===== */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            {hasPosts && featured ? (
              <>
                <PostCard post={featured} variant="featured" />
                {rest.length > 0 ? (
                  <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
                    {rest.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <EmptyState />
            )}
          </div>

          {/* Sidebar - desktop only */}
          <aside className="hidden lg:block">
            <NewsletterForm variant="sidebar" />
          </aside>
        </div>

        {/* Mobile newsletter - under content */}
        <div className="mt-12 lg:hidden">
          <NewsletterForm variant="block" />
        </div>
      </section>
    </div>
  );
}

function EmptyState() {
  return (
    <div>
      <p className="text-eyebrow">Coming this fall</p>
      <h2
        className="font-display mt-4 text-h1 text-text-primary"
        style={{ fontWeight: 600 }}
      >
        The first posts are nearly out of the kiln.
      </h2>
      <p className="mt-4 max-w-2xl text-text-secondary">
        We are writing the heating-season guide right now. Drop your email and
        we will send the first post the day it goes live.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
        {PLACEHOLDER_PREVIEWS.map((p) => (
          <article
            key={p.title}
            className="flex flex-col overflow-hidden rounded-lg border border-text-primary/10 bg-bg-card"
          >
            <div
              aria-hidden="true"
              className="relative h-44 w-full overflow-hidden"
              style={{ background: p.gradient }}
            >
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
                <span>{p.category}</span>
                <span aria-hidden="true" className="text-text-muted">
                  &middot;
                </span>
                <span className="text-text-muted">Coming this fall</span>
              </div>
              <h3
                className="font-display mt-4 text-lg leading-snug text-text-primary md:text-xl"
                style={{ fontWeight: 600 }}
              >
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                {p.excerpt}
              </p>
              <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-muted">
                Draft in progress
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
