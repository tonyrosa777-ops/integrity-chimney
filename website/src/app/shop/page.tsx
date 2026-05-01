/**
 * /shop - Server-rendered wrapper around the shop client UI.
 *
 * Per Pro-tier scaffold rules: the page must render with no env vars set.
 * ShopContent fetches /api/printful/products and gracefully falls back to
 * the seeded JSON catalog so the demo always has something to show.
 */

import type { Metadata } from "next";
import { ShopContent } from "@/components/shop/ShopContent";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Branded gear, work apparel, and gift sets from Integrity Chimney Services. Built for Bow, NH winters and the people who heat with wood.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <ShopContent />
      <FinalCTA />
    </>
  );
}
