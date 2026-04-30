/**
 * /blog/[slug] - server component for an individual blog post.
 *
 * Sources:
 *   - postBySlugQuery (Sanity GROQ) - full post + author + faqs.
 *   - relatedPostsQuery - sidebar related posts.
 *
 * Graceful degradation:
 *   - generateStaticParams returns [] when Sanity is not configured, so the
 *     route still builds. Visiting any /blog/[slug] in that state hits
 *     notFound() cleanly (no 500).
 *
 * AEO compliance:
 *   - Article schema JSON-LD always emitted.
 *   - FAQ schema JSON-LD emitted when post.faqs is present.
 *   - First paragraph of body / excerpt provides the direct answer block.
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch, isSanityConfigured } from "@/sanity/lib/client";
import {
  postBySlugQuery,
  relatedPostsQuery,
  allPostSlugsQuery,
} from "@/sanity/lib/queries";
import type { PostFull, PostSummary } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { PostBody, slugifyHeading } from "@/components/blog/PostBody";
import { TableOfContents, type TocEntry } from "@/components/blog/TableOfContents";
import { PostCard } from "@/components/blog/PostCard";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { siteConfig } from "@/data/site";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  if (!isSanityConfigured) return [];
  const slugs =
    (await sanityFetch<Array<{ slug: string }>>(allPostSlugsQuery, {}, [])) ??
    [];
  return slugs
    .filter((s) => typeof s.slug === "string" && s.slug.length > 0)
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<PostFull>(postBySlugQuery, { slug });

  if (!post) {
    return {
      title: "Post not found",
      robots: { index: false, follow: false },
    };
  }

  const title = post.seo?.metaTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.excerpt;
  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).quality(85).url()
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: post.seo?.canonicalUrl ?? `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }]
        : undefined,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Walks the body blocks for H2 styles and produces the TOC entries.
 * Exported intentionally inline rather than as a util - only used here.
 */
function extractTocEntries(
  body: PostFull["body"] | null | undefined,
): TocEntry[] {
  if (!body) return [];
  const out: TocEntry[] = [];
  for (const block of body) {
    if (
      block &&
      typeof block === "object" &&
      "_type" in block &&
      block._type === "block" &&
      "style" in block &&
      block.style === "h2" &&
      "children" in block &&
      Array.isArray(block.children)
    ) {
      const text = block.children
        .map((c) =>
          c && typeof c === "object" && "text" in c
            ? String((c as { text?: unknown }).text ?? "")
            : "",
        )
        .join("")
        .trim();
      if (text.length > 0) {
        out.push({ id: slugifyHeading(text), text });
      }
    }
  }
  return out;
}

export default async function BlogPostPage({ params }: RouteProps) {
  const { slug } = await params;
  const post = await sanityFetch<PostFull>(postBySlugQuery, { slug });
  if (!post) notFound();

  const related =
    (await sanityFetch<PostSummary[]>(relatedPostsQuery, { slug }, [])) ?? [];
  const tocEntries = extractTocEntries(post.body);

  const heroImageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1800).quality(85).url()
    : "";
  const category = post.categories?.[0]?.title ?? "Field notes";

  // ===== JSON-LD =====
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: heroImageUrl ? [heroImageUrl] : undefined,
    author: {
      "@type": "Person",
      name: post.author?.name ?? siteConfig.owner,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <article className="bg-bg-base">
      {/* JSON-LD ---------------------------------------------------- */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      {/* Hero ------------------------------------------------------- */}
      <header className="border-b border-text-primary/10">
        <div className="mx-auto w-full max-w-4xl px-6 pt-16 pb-10 md:px-8 md:pt-24 md:pb-14 lg:px-12">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
            <Link href="/blog" className="hover:text-text-primary">
              Blog
            </Link>
            <span aria-hidden="true" className="text-text-muted">
              /
            </span>
            <span>{category}</span>
          </div>

          <h1
            className="font-display mt-6 text-display text-text-primary"
            style={{ fontWeight: 600 }}
          >
            {post.title}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span>By {post.author?.name ?? siteConfig.owner}</span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </div>

        {heroImageUrl ? (
          <div className="relative mx-auto aspect-[16/8] w-full max-w-6xl overflow-hidden md:rounded-lg">
            <Image
              src={heroImageUrl}
              alt={post.mainImage?.alt ?? post.title}
              fill
              priority
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </header>

      {/* Body grid -------------------------------------------------- */}
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <PostBody value={post.body} />

            {/* Author bio ------------------------------------------ */}
            {post.author?.name ? (
              <div className="mt-16 flex flex-col gap-5 rounded-lg border border-text-primary/10 bg-bg-card p-6 md:flex-row md:items-start md:p-8">
                {post.author.image?.asset ? (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={urlFor(post.author.image)
                        .width(160)
                        .height(160)
                        .quality(85)
                        .url()}
                      alt={post.author.image.alt ?? post.author.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
                    Written by
                  </p>
                  <p
                    className="font-display mt-2 text-lg text-text-primary"
                    style={{ fontWeight: 600 }}
                  >
                    {post.author.name}
                  </p>
                  {post.author.bio ? (
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {post.author.bio}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* FAQs (visual block; schema injected above) ---------- */}
            {post.faqs && post.faqs.length > 0 ? (
              <section
                aria-labelledby="post-faqs-heading"
                className="mt-16 border-t border-text-primary/10 pt-12"
              >
                <p className="text-eyebrow">Frequently asked</p>
                <h2
                  id="post-faqs-heading"
                  className="font-display mt-3 text-h2 text-text-primary"
                  style={{ fontWeight: 600 }}
                >
                  Common questions, plain answers.
                </h2>
                <dl className="mt-8 space-y-6">
                  {post.faqs.map((f, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-text-primary/10 bg-bg-card p-6"
                    >
                      <dt
                        className="font-display text-lg text-text-primary"
                        style={{ fontWeight: 600 }}
                      >
                        {f.question}
                      </dt>
                      <dd className="mt-3 text-sm leading-relaxed text-text-secondary">
                        {f.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            {/* Newsletter CTA -------------------------------------- */}
            <div className="mt-16">
              <NewsletterForm />
            </div>
          </div>

          {/* Sidebar -------------------------------------------------- */}
          <aside className="space-y-10">
            <TableOfContents entries={tocEntries} />

            {related.length > 0 ? (
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
                  Keep reading
                </p>
                <div className="mt-4 space-y-4">
                  {related.map((p) => (
                    <PostCard key={p._id} post={p} variant="compact" />
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  );
}
