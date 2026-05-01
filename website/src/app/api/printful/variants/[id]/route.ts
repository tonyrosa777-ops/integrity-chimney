/**
 * GET /api/printful/variants/[id]
 *
 * Awaits params per Next 16. Tries live Printful when configured; otherwise
 * returns the seeded product's variants. Always returns 200.
 *
 * Response shape: { variants: VariantOption[], demo: boolean }
 */

import { NextResponse, type NextRequest } from "next/server";
import {
  fetchPrintfulVariants,
  isPrintfulConfigured,
} from "@/lib/printful";
import seededCatalog from "@/lib/printful-seeded-products.json";

export const dynamic = "force-dynamic";

export interface VariantOption {
  id: string;
  name: string;
  size?: string;
  color?: string;
  /** Price in cents. */
  price: number;
  image?: string;
}

interface SeededVariant {
  id: string;
  name: string;
  color?: string;
  size?: string;
  price: number;
}

interface SeededProduct {
  id: string;
  variants: SeededVariant[];
  preview_image_url?: string;
}

function seededVariantsFor(productId: string): VariantOption[] {
  const product = (seededCatalog.products as SeededProduct[]).find(
    (p) => p.id === productId,
  );
  if (!product) return [];
  return product.variants.map((v) => ({
    id: v.id,
    name: v.name,
    color: v.color,
    size: v.size,
    price: v.price,
    image: product.preview_image_url,
  }));
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { variants: [], demo: true, error: "Invalid product id" },
      { status: 200 },
    );
  }

  // Demo path: no key → return seeded variants.
  if (!isPrintfulConfigured()) {
    return NextResponse.json({
      variants: seededVariantsFor(id),
      demo: true,
    });
  }

  // Live path: fetch from Printful, fall back to seeded on error.
  try {
    const detail = await fetchPrintfulVariants(id);
    const variants: VariantOption[] = detail.sync_variants
      .filter((v) => v.synced !== false && v.availability_status !== "discontinued")
      .map((v) => {
        const parts = v.name.split(" / ");
        const color = parts[1] ?? undefined;
        const size = parts[2] ?? undefined;
        const previewFile = (v.files ?? []).find((f) => f.type === "preview");
        return {
          id: String(v.id),
          name: v.name,
          color,
          size,
          // Convert Printful's decimal-string retail price to cents.
          price: Math.round(parseFloat(v.retail_price) * 100) || 0,
          image: previewFile?.preview_url ?? v.product?.image,
        };
      });

    return NextResponse.json({ variants, demo: false });
  } catch (err) {
    console.error(`[/api/printful/variants/${id}] live fetch failed:`, err);
    return NextResponse.json({
      variants: seededVariantsFor(id),
      demo: true,
      fellBack: true,
    });
  }
}
