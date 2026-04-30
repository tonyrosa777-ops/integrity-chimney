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
  title: "Service Areas | Integrity Chimney Services LLC",
  description:
    "Chimney, masonry, and roofing across Bow, Concord, Hopkinton, Henniker, Loudon, and Pembroke. Owner-operated. Free estimates. 24-hour callback.",
  openGraph: {
    title: "Service Areas | Integrity Chimney Services LLC",
    description:
      "Six central NH towns we know by name and by chimney. Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke.",
    url: `${siteConfig.url}/service-areas`,
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
