/**
 * sitemap.ts - Next.js 16 sitemap generator (XML emitted at /sitemap.xml).
 *
 * Includes every public route. /optimus-pricing (Optimus internal sales tool,
 * deleted before launch) and /studio (Sanity admin) are excluded.
 *
 * Blog posts are pulled from Sanity at build time when configured; if Sanity
 * is not wired, the blog post entries degrade to an empty array so the build
 * never fails. Same isSanityConfigured pattern used in /blog/[slug]/page.tsx.
 *
 * Validation gate per Stage 1F spec: this file MUST be the .ts source. Next
 * generates the .xml at build time. Do not check in a static sitemap.xml.
 */

import type { MetadataRoute } from "next";
import { siteConfig, services, serviceAreas } from "@/data/site";
import { sanityFetch, isSanityConfigured } from "@/sanity/lib/client";
import { allPostSlugsQuery } from "@/sanity/lib/queries";

const BASE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url
).replace(/\/$/, "");

type SanitySlug = { slug: string };

async function fetchBlogSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  const slugs = (await sanityFetch<SanitySlug[]>(allPostSlugsQuery, {}, [])) ?? [];
  return slugs
    .filter((s) => typeof s.slug === "string" && s.slug.length > 0)
    .map((s) => s.slug);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/booking`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/historic-restoration`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/for-realtors`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/exterior-envelope`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/chimney-scams-nh`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
  ];

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const cityEntries: MetadataRoute.Sitemap = serviceAreas.map((a) => ({
    url: `${BASE_URL}/service-areas/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogSlugs = await fetchBlogSlugs();
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...cityEntries,
    ...blogEntries,
  ];
}
