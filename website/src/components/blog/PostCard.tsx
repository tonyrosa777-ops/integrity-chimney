/**
 * PostCard - reusable card used on /blog index, /blog/[slug] sidebar
 * (related posts), and the homepage BlogPreview section.
 *
 * Server-component-safe: no client hooks. The card collapses to a gradient
 * placeholder when the post has no mainImage (Stage 1G fal.ai images
 * backfill these).
 */

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { PostSummary } from "@/sanity/lib/types";

const FALLBACK_GRADIENT =
  "linear-gradient(135deg, rgba(127,42,31,0.85) 0%, rgba(20,20,20,0.95) 60%, rgba(184,115,51,0.45) 100%)";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export type PostCardProps = {
  post: PostSummary;
  variant?: "default" | "featured" | "compact";
};

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(isFeatured ? 1600 : 800).quality(80).url()
    : "";

  const category = post.categories?.[0]?.title ?? "Field notes";

  return (
    <article
      className={[
        "group flex overflow-hidden rounded-lg border border-text-primary/10 bg-bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40",
        isFeatured ? "flex-col md:flex-row" : "flex-col",
        isCompact ? "h-full" : "",
      ].join(" ")}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={[
          "flex flex-1",
          isFeatured ? "flex-col md:flex-row" : "flex-col",
        ].join(" ")}
      >
        <div
          aria-hidden={imageUrl ? undefined : true}
          className={[
            "relative w-full overflow-hidden",
            isFeatured ? "h-64 md:h-auto md:w-1/2" : "h-44",
            isCompact ? "h-32" : "",
          ].join(" ")}
          style={imageUrl ? undefined : { background: FALLBACK_GRADIENT }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt ?? post.title}
              fill
              sizes={
                isFeatured
                  ? "(min-width: 768px) 50vw, 100vw"
                  : "(min-width: 768px) 50vw, 100vw"
              }
              className="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(245,245,245,0.3) 1px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
            />
          )}
        </div>

        <div
          className={[
            "flex flex-1 flex-col",
            isFeatured ? "p-6 md:p-10" : "p-6",
            isCompact ? "p-5" : "",
          ].join(" ")}
        >
          <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
            <span>{category}</span>
            <span aria-hidden="true" className="text-text-muted">
              ·
            </span>
            <span className="text-text-muted">
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <h3
            className={[
              "font-display mt-4 leading-snug text-text-primary group-hover:text-accent",
              isFeatured ? "text-2xl md:text-3xl" : "text-lg md:text-xl",
              isCompact ? "text-base md:text-lg" : "",
            ].join(" ")}
            style={{ fontWeight: 600 }}
          >
            {post.title}
          </h3>

          {!isCompact && (
            <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
              {post.excerpt}
            </p>
          )}

          <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-accent">
            Read &rarr;
          </p>
        </div>
      </Link>
    </article>
  );
}

export default PostCard;
