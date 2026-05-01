/**
 * /blog/[slug] - server component for an individual blog post.
 * Reads from src/data/blog.ts. Renders Markdown body via LocalPostBody.
 *
 * AEO compliance:
 *   - Article schema JSON-LD always emitted
 *   - FAQ schema JSON-LD emitted from post.faqs
 *   - First paragraph of body is the direct-answer block
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blog";
import {
  LocalPostBody,
  extractTocFromMarkdown,
} from "@/components/blog/LocalPostBody";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { LocalPostCard } from "@/components/blog/LocalPostCard";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { BreadcrumbSchema } from "@/components/seo";
import { siteConfig, founder } from "@/data/site";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.headerImage, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt,
      authors: [siteConfig.owner],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.headerImage],
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({ params }: RouteProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const tocEntries = extractTocFromMarkdown(post.body);

  const fullHeaderImage = `${siteConfig.url}${post.headerImage}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: [fullHeaderImage],
    author: { "@type": "Person", name: siteConfig.owner },
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
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <article className="bg-bg-base">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      {/* Hero */}
      <header className="border-b border-text-primary/10">
        <div className="mx-auto w-full max-w-4xl px-6 pt-32 pb-10 md:px-8 md:pt-40 md:pb-14 lg:px-12">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
            <Link href="/blog" className="hover:text-text-primary">
              Blog
            </Link>
            <span aria-hidden="true" className="text-text-muted">
              /
            </span>
            <span>{post.category}</span>
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
            <span>By {siteConfig.owner}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </div>

        <div className="relative mx-auto aspect-[16/8] w-full max-w-6xl overflow-hidden md:rounded-lg">
          <Image
            src={post.headerImage}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
          />
        </div>
      </header>

      {/* Body grid */}
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <LocalPostBody body={post.body} />

            {/* Author bio */}
            <div className="mt-16 flex flex-col gap-5 rounded-lg border border-text-primary/10 bg-bg-card p-6 md:flex-row md:items-start md:p-8">
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
                  Written by
                </p>
                <p
                  className="font-display mt-2 text-lg text-text-primary"
                  style={{ fontWeight: 600 }}
                >
                  {siteConfig.owner}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {founder.title} at {siteConfig.name}. Owner-operated chimney, masonry, and roofing across central New Hampshire.
                </p>
              </div>
            </div>

            {/* FAQs (visual; schema injected above) */}
            {post.faqs.length > 0 ? (
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

            <div className="mt-16">
              <NewsletterForm />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            <TableOfContents entries={tocEntries} />

            {related.length > 0 ? (
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
                  Keep reading
                </p>
                <div className="mt-4 space-y-4">
                  {related.map((p) => (
                    <LocalPostCard key={p.slug} post={p} variant="compact" />
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
