/**
 * ServiceSchema.tsx
 *
 * Emits Service JSON-LD for a single service detail page. Provider links
 * back to the LocalBusiness entity declared at the site root.
 *
 * areaServed mirrors the LocalBusiness coverage area so a search engine
 * scanning the service page sees the same six cities.
 */

import { type Service, siteConfig, serviceAreas } from "@/data/site";
import { JsonLd } from "./JsonLd";

type Props = {
  service: Service;
};

export function ServiceSchema({ service }: Props) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${service.slug}#service`,
    name: service.name,
    description: service.description,
    serviceType: service.name,
    category: service.pillar,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: {
      "@id": `${siteConfig.url}#business`,
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: siteConfig.url,
    },
    areaServed: serviceAreas.map((a) => ({
      "@type": "City",
      name: a.city,
    })),
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/services/${service.slug}`,
      priceCurrency: "USD",
      description: service.startingPrice,
      availability: "https://schema.org/InStock",
    },
  };

  return <JsonLd data={data} />;
}
