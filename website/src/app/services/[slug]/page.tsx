/**
 * /services/[slug] - per-service detail server component.
 * Pre-renders every slug in services[] from site.ts.
 * Next.js 16: params is a Promise and must be awaited.
 *
 * SEO: emits Service + BreadcrumbList + FAQPage JSON-LD on the server, then
 * delegates UI rendering to the client component.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BreadcrumbSchema,
  FAQSchema,
  ServiceSchema,
} from "@/components/seo";
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

  const brandShortName =
    service.pillar === "exteriors"
      ? siteConfig.secondaryBrand.shortName
      : siteConfig.shortName;

  const title = `${service.name} in Bow, NH and Central New Hampshire`;
  const description = `${service.tagline} ${service.startingPrice}. Owner-operated by ${siteConfig.owner} in Bow, NH. Free estimates, fully insured, 24-hour callback.`;

  return {
    title,
    description,
    openGraph: {
      title: `${service.name} | ${brandShortName}`,
      description,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} | ${brandShortName}`,
      description,
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

  return (
    <>
      <ServiceSchema service={service} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
      />
      {service.faq && service.faq.length > 0 ? (
        <FAQSchema faqs={service.faq.map((f) => ({ q: f.q, a: f.a }))} />
      ) : null}
      <ServicePageClient service={service} />
    </>
  );
}
