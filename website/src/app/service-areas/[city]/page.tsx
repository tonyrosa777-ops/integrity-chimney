/**
 * /service-areas/[city] - per-city detail server component.
 * Pre-renders one page per slug in serviceAreas[] (6 cities).
 * Next.js 16: params is a Promise and must be awaited.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

  const title = `Chimney Services in ${area.city}, NH | Integrity Chimney Services LLC`;
  const description = `Chimney, masonry, and roofing in ${area.city}, NH. Free estimates over $500. 24-hour callback or your estimate is on us. ${siteConfig.yearsExperience}+ years owner-operated by ${siteConfig.owner}.`;

  return {
    title,
    description,
    openGraph: {
      title: `${area.city}, NH Chimney + Masonry + Roofing | ${siteConfig.shortName}`,
      description,
      url: `${siteConfig.url}/service-areas/${area.slug}`,
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
      <CityPageClient area={area} />
      <FinalCTA />
    </>
  );
}
