/**
 * /service-areas - Service Areas index (server component)
 * Lists all 6 cities Integrity Chimney covers in central NH.
 * Source: site.ts serviceAreas[]. Each card links to /service-areas/[slug].
 */

import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { ServiceAreasClient } from "./ServiceAreasClient";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title:
    "Service Areas | Central NH Chimney, Masonry, Siding, and Roofing Coverage",
  description:
    "Owner-operated chimney, masonry, siding, and roofing coverage across central New Hampshire. Six core towns on the route every week: Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke. Extended and premium project coverage beyond.",
  openGraph: {
    title: "Service Areas | Integrity Chimney & Integrity Exteriors NH",
    description:
      "Six central NH towns on the route every week: Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke. Two specialized companies, one owner. Extended and premium coverage available.",
    url: `${siteConfig.url}/service-areas`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas | Integrity Chimney & Integrity Exteriors NH",
    description:
      "Six central NH towns on the route every week. Two specialized companies, one owner. Extended and premium project coverage available.",
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      <ServiceAreasClient />
      <FinalCTA />
    </>
  );
}
