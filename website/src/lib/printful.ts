/**
 * printful.ts - Thin Printful API client wrapper.
 *
 * This file is part of the shop scaffold. It is only used in "live" mode,
 * which requires PRINTFUL_API_KEY (and a real store with synced products).
 *
 * In the Pro-tier demo, the API routes catch PrintfulNotConfiguredError
 * and fall back to seeded JSON so the shop renders end-to-end with no
 * external dependencies.
 *
 * Premium-tier upgrade path:
 *   1. Set PRINTFUL_API_KEY in env.
 *   2. (Optional) Set PRINTFUL_STORE_ID to scope to a single sub-store.
 *   3. Restart the server. Routes flip from demo to live automatically.
 */

const PRINTFUL_BASE = "https://api.printful.com";

export class PrintfulNotConfiguredError extends Error {
  constructor(message = "Printful API key not configured") {
    super(message);
    this.name = "PrintfulNotConfiguredError";
  }
}

export class PrintfulRequestError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "PrintfulRequestError";
    this.status = status;
  }
}

function requireKey(): string {
  const key = process.env.PRINTFUL_API_KEY;
  if (!key || key.includes("REPLACE") || key.length < 8) {
    throw new PrintfulNotConfiguredError();
  }
  return key;
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${requireKey()}`,
    "Content-Type": "application/json",
  };
  const storeId = process.env.PRINTFUL_STORE_ID;
  if (storeId) {
    headers["X-PF-Store-Id"] = storeId;
  }
  return headers;
}

async function pfetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${PRINTFUL_BASE}${path}`, {
    ...init,
    headers: { ...buildHeaders(), ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new PrintfulRequestError(
      `Printful ${res.status} on ${path}: ${body.slice(0, 200)}`,
      res.status,
    );
  }
  const json = await res.json();
  return (json.result ?? json) as T;
}

// ─── Public types (subset) ───────────────────────────────────────────────────

export interface PrintfulSyncProduct {
  id: number;
  name: string;
  thumbnail_url?: string;
  variants?: number;
}

export interface PrintfulSyncVariantDetail {
  id: number;
  name: string;
  retail_price: string;
  availability_status?: string;
  synced?: boolean;
  files?: Array<{ type: string; preview_url?: string }>;
  product?: { image?: string };
}

export interface PrintfulProductDetail {
  sync_product: PrintfulSyncProduct;
  sync_variants: PrintfulSyncVariantDetail[];
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Fetch the list of synced products in the store.
 * Throws PrintfulNotConfiguredError if no API key is set - the API route
 * catches this and falls back to seeded JSON.
 */
export async function fetchPrintfulProducts(): Promise<PrintfulSyncProduct[]> {
  return pfetch<PrintfulSyncProduct[]>("/store/products");
}

/**
 * Fetch full detail (including variants) for a single synced product.
 * Throws PrintfulNotConfiguredError if no API key is set.
 */
export async function fetchPrintfulVariants(
  productId: string | number,
): Promise<PrintfulProductDetail> {
  const id = String(productId).replace(/[^a-zA-Z0-9_-]/g, "");
  return pfetch<PrintfulProductDetail>(`/store/products/${id}`);
}

/** True if PRINTFUL_API_KEY appears configured. Used to flag demo:false. */
export function isPrintfulConfigured(): boolean {
  try {
    requireKey();
    return true;
  } catch {
    return false;
  }
}
