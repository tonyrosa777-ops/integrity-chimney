/**
 * /service-areas/[city] - per-city detail server component.
 * Pre-renders one page per slug in serviceAreas[] (6 cities).
 * Next.js 16: params is a Promise and must be awaited.
 *
 * SEO: emits BreadcrumbList + FAQPage JSON-LD on the server. The city's FAQ
 * array is the source for the FAQPage entries.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo";
import { serviceAreas, siteConfig } from "@/data/site";
import { CityPageClient } from "./CityPageClient";
import { FinalCTA } from "@/components/sections/FinalCTA";

type RouteParams = { city: string };

export function generateStaticParams(): Array<RouteParams> {
  return serviceAreas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) return {};

  const title = `${area.city}, NH Chimney, Masonry, and Roofing`;
  const description = `Chimney sweeps, Level 2 inspections, masonry, and roofing in ${area.city}, NH. ${area.distance} from Bow. ${siteConfig.yearsExperience}+ years owner-operated, free estimates, 24-hour callback.`;

  return {
    title,
    description,
    openGraph: {
      title: `${area.city}, NH Chimney + Masonry + Roofing | ${siteConfig.shortName}`,
      description,
      url: `${siteConfig.url}/service-areas/${area.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${area.city}, NH Chimney + Masonry + Roofing | ${siteConfig.shortName}`,
      description,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: `${area.city}, NH`, href: `/service-areas/${area.slug}` },
        ]}
      />
      {area.faqs && area.faqs.length > 0 ? (
        <FAQSchema faqs={area.faqs.map((f) => ({ q: f.q, a: f.a }))} />
      ) : null}
      <CityPageClient area={area} />
      <FinalCTA />
    </>
  );
}
