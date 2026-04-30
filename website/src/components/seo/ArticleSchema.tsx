/**
 * ArticleSchema.tsx
 *
 * Emits Article JSON-LD for a blog post. Compatible with the Sanity post
 * shape used in /blog/[slug] (post.title, post.excerpt, post.publishedAt,
 * post.author, post.mainImage). The blog page may inline its own schema
 * or use this component for consistency.
 */

import { siteConfig } from "@/data/site";
import { JsonLd } from "./JsonLd";

type ArticlePost = {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  dateModified?: string;
  imageUrl?: string;
  author?: { name?: string };
};

type Props = {
  post: ArticlePost;
};

export function ArticleSchema({ post }: Props) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.dateModified ?? post.publishedAt,
    image: post.imageUrl ? [post.imageUrl] : undefined,
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

  return <JsonLd data={data} />;
}
