/**
 * /services/[slug] - per-service detail server component.
 * Pre-renders every slug in services[] from site.ts.
 * Next.js 16: params is a Promise and must be awaited.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, siteConfig } from "@/data/site";
import { ServicePageClient } from "./ServicePageClient";

type RouteParams = { slug: string };

export function generateStaticParams(): Array<RouteParams> {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const title = `${service.name} in Bow, NH and Central New Hampshire`;
  const description = `${service.tagline} ${service.startingPrice}. Owner-operated by ${siteConfig.owner}. Free estimates. Fully insured.`;

  return {
    title,
    description,
    openGraph: {
      title: `${service.name} | ${siteConfig.shortName}`,
      description,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return <ServicePageClient service={service} />;
}
