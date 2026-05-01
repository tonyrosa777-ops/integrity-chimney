/**
 * GET /api/printful/products
 *
 * Tries live Printful when PRINTFUL_API_KEY is set; otherwise (and on any
 * error) returns the seeded JSON catalog so /shop renders end-to-end with
 * no env vars. Always returns 200 with { products, demo }.
 */

import { NextResponse } from "next/server";
import {
  fetchPrintfulProducts,
  isPrintfulConfigured,
} from "@/lib/printful";
import seededCatalog from "@/lib/printful-seeded-products.json";

export const dynamic = "force-dynamic";

export async function GET() {
  // Demo path: no key → return seeded catalog immediately.
  if (!isPrintfulConfigured()) {
    return NextResponse.json({
      products: seededCatalog.products,
      demo: true,
    });
  }

  // Live path: try Printful, fall back gracefully on any error.
  try {
    const live = await fetchPrintfulProducts();
    return NextResponse.json({ products: live, demo: false });
  } catch (err) {
    console.error("[/api/printful/products] live fetch failed:", err);
    return NextResponse.json({
      products: seededCatalog.products,
      demo: true,
      fellBack: true,
    });
  }
}
