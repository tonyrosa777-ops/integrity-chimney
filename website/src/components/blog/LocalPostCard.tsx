import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/data/blog";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export type LocalPostCardProps = {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
};

export function LocalPostCard({ post, variant = "default" }: LocalPostCardProps) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

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
          className={[
            "relative w-full overflow-hidden",
            isFeatured ? "h-64 md:h-auto md:w-1/2" : "h-44",
            isCompact ? "h-32" : "",
          ].join(" ")}
        >
          <Image
            src={post.cardImage}
            alt={post.title}
            fill
            sizes={
              isFeatured
                ? "(min-width: 768px) 50vw, 100vw"
                : "(min-width: 768px) 33vw, 100vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base/40 via-transparent to-transparent" />
        </div>

        <div
          className={[
            "flex flex-1 flex-col p-6",
            isFeatured ? "md:p-8 lg:p-10" : "",
            isCompact ? "p-4" : "",
          ].join(" ")}
        >
          <div className="flex flex-wrap items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
            <span>{post.category}</span>
            <span aria-hidden="true" className="text-text-muted">
              ·
            </span>
            <time dateTime={post.publishedAt} className="text-text-muted">
              {formatDate(post.publishedAt)}
            </time>
            <span aria-hidden="true" className="text-text-muted">
              ·
            </span>
            <span className="text-text-muted">
              {post.readingMinutes} min read
            </span>
          </div>

          <h3
            className={[
              "font-display mt-4 leading-snug text-text-primary group-hover:text-accent transition-colors",
              isFeatured ? "text-h3 md:text-h2" : "text-lg md:text-xl",
              isCompact ? "text-base" : "",
            ].join(" ")}
            style={{ fontWeight: 600 }}
          >
            {post.title}
          </h3>

          {!isCompact ? (
            <p
              className={[
                "mt-3 flex-1 leading-relaxed text-text-secondary",
                isFeatured ? "text-base md:text-lg" : "text-sm",
              ].join(" ")}
            >
              {post.excerpt}
            </p>
          ) : null}

          <p className="mt-5 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
            Read article
            <span aria-hidden="true">→</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
