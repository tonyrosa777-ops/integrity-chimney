/**
 * LocalBusinessSchema.tsx
 *
 * Emits LocalBusiness + HomeAndConstructionBusiness JSON-LD for the site root.
 * Mounted in the root layout so every page reinforces the entity for local SEO.
 *
 * Coordinates: Bow, NH approximate town centroid (43.1322, -71.5547).
 * areaServed: the six service-area cities defined in site.ts.
 * sameAs: empty array (no GBP / no socials yet); omitting per schema-policy
 *   ("omit over invent") would also be valid, but Google tolerates an empty
 *   sameAs and including it documents the intent for future linking.
 *
 * priceRange "$$$" reflects the published "starting at" floor: $219 sweep,
 * $295 Level 2, $2,495 liner. Mid-to-upper craftsman tier in central NH.
 */

import { siteConfig, serviceAreas } from "@/data/site";
import { JsonLd } from "./JsonLd";

export function LocalBusinessSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${siteConfig.url}#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    description:
      "Owner-operated chimney, masonry, and roofing contractor based in Bow, New Hampshire. Fifteen years on central NH rooftops. Sweeps, Level 2 inspections, lime-mortar historic restoration, stainless steel liners, crown rebuilds, and architectural roofing.",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.1322,
      longitude: -71.5547,
    },
    areaServed: serviceAreas.map((a) => ({
      "@type": "City",
      name: a.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: a.city,
        addressRegion: a.state,
        addressCountry: "US",
      },
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    priceRange: "$$$",
    foundingDate: String(siteConfig.founded),
    sameAs: [],
  };

  return <JsonLd data={data} />;
}
