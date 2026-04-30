/**
 * BreadcrumbSchema.tsx
 *
 * Emits BreadcrumbList JSON-LD for a page's breadcrumb trail. Mounted on
 * detail pages: /services/[slug], /service-areas/[city], /blog/[slug].
 *
 * Items are passed in trail order (root first). Each item is a name + href
 * (relative or absolute). Hrefs are resolved against siteConfig.url so the
 * emitted schema always carries fully-qualified URLs.
 */

import { siteConfig } from "@/data/site";
import { JsonLd } from "./JsonLd";

type BreadcrumbItem = {
  name: string;
  href: string;
};

type Props = {
  items: ReadonlyArray<BreadcrumbItem>;
};

function toAbsolute(href: string): string {
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  if (href.startsWith("/")) return `${siteConfig.url}${href}`;
  return `${siteConfig.url}/${href}`;
}

export function BreadcrumbSchema({ items }: Props) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: toAbsolute(it.href),
    })),
  };

  return <JsonLd data={data} />;
}
