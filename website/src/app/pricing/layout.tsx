import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * /pricing layout - hosts the metadata export for the client-component page.
 * The /pricing page is a Client Component because it uses scroll smoothing
 * and dynamic accent reveals, so the metadata cannot live in page.tsx.
 */

export const metadata: Metadata = {
  title: "Starting-At Pricing | Chimney, Masonry, and Roofing",
  description:
    "Published prices: $219 chimney sweep, $295 Level 2 inspection, $2,495 stainless liner, $495 crown repair, $895 multi-flue cap. No hidden fees. Bow, NH.",
  openGraph: {
    title: "Starting-At Pricing | Integrity Chimney Services LLC",
    description:
      "$219 sweeps, $295 Level 2 inspections, $2,495 stainless liners. Published prices and a 24-hour callback SLA. Most NH chimney companies refuse to publish either.",
    url: "https://integritychimney.com/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Starting-At Pricing | Integrity Chimney Services LLC",
    description:
      "$219 sweeps, $295 Level 2 inspections, $2,495 stainless liners. Published prices and a 24-hour callback SLA across central NH.",
  },
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
