/**
 * Shared TypeScript shapes for Sanity-fetched data. The shapes mirror the
 * GROQ projections in `queries.ts` - keep them in sync when you change a query.
 */

import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      dimensions?: { width: number; height: number };
      lqip?: string;
    };
  } | null;
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number } | null;
} | null;

export type CategoryRef = {
  _id: string;
  title: string;
  slug: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type AuthorRef = {
  name?: string;
  bio?: string;
  image?: SanityImage;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  mainImage?: SanityImage;
  categories?: CategoryRef[];
};

export type PostFull = PostSummary & {
  body?: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  } | null;
  faqs?: FAQItem[];
  author?: AuthorRef | null;
};
