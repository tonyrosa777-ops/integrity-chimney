/**
 * WebsiteSchema.tsx
 *
 * Emits WebSite JSON-LD for the site root. Mounted in the root layout so the
 * site-level entity is present on every page.
 *
 * SearchAction is intentionally omitted because the site does not yet have a
 * /search route. Adding a SearchAction that points to a non-existent endpoint
 * is worse than omitting (Google validates and rejects).
 */

import { siteConfig } from "@/data/site";
import { JsonLd } from "./JsonLd";

export function WebsiteSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description:
      "Bow, New Hampshire chimney, masonry, and roofing contractor. Owner-operated, free estimates, fully insured. The craftsman who answers the phone.",
    inLanguage: "en-US",
    publisher: {
      "@id": `${siteConfig.url}#business`,
    },
  };

  return <JsonLd data={data} />;
}
