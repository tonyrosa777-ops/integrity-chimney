/**
 * robots.ts - Next.js 16 robots.txt generator.
 *
 * Allows everything except the Sanity admin (/studio), the Optimus internal
 * sales tool (/optimus-pricing, deleted before launch), and the API routes.
 *
 * The sitemap URL is anchored to siteConfig.url so the canonical host is
 * always emitted, regardless of which preview domain a crawler hits.
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

const BASE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/optimus-pricing", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
