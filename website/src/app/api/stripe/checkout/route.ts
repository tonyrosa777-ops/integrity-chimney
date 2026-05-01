/**
 * POST /api/stripe/checkout
 *
 * Body: { items: [{ id, name, price (cents), quantity, variantId? }],
 *         successUrl?, cancelUrl? }
 *
 * - With STRIPE_SECRET_KEY set: creates a real Stripe Checkout Session via
 *   the Stripe REST API (no SDK dependency required).
 * - Without the key: returns a demo success URL so the seeded shop can
 *   complete an end-to-end checkout flow against /shop/success.
 *
 * Always returns 200 with { ok, url, demo? } unless the body is malformed.
 */

import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

interface CheckoutItem {
  id: string;
  name: string;
  /** Unit price in cents. */
  price: number;
  quantity: number;
  variantId?: string;
  image?: string;
}

interface CheckoutPayload {
  items: CheckoutItem[];
  successUrl?: string;
  cancelUrl?: string;
}

function isStripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY;
  return Boolean(key && !key.includes("REPLACE") && key.length > 8);
}

function resolveOrigin(req: NextRequest): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env.replace(/\/$/, "");
  const origin = req.headers.get("origin");
  if (origin) return origin;
  const host = req.headers.get("host");
  if (host) return `https://${host}`;
  return "http://localhost:3000";
}

export async function POST(req: NextRequest) {
  let payload: CheckoutPayload;
  try {
    payload = (await req.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const items = payload?.items ?? [];
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Cart is empty." },
      { status: 400 },
    );
  }

  const origin = resolveOrigin(req);
  const successUrl =
    payload.successUrl ?? `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = payload.cancelUrl ?? `${origin}/shop`;

  // ── Demo path ─────────────────────────────────────────────────────────────
  if (!isStripeConfigured()) {
    return NextResponse.json({
      ok: true,
      url: `${origin}/shop/success?demo=true`,
      demo: true,
    });
  }

  // ── Live path ────────────────────────────────────────────────────────────
  // Use Stripe's REST API directly so this scaffold has no `stripe` SDK
  // dependency. When the client upgrades to Premium, swap this for the
  // typed SDK if preferred - both paths stay compatible.
  try {
    const params = new URLSearchParams();
    params.append("mode", "payment");
    params.append("payment_method_types[0]", "card");
    params.append("success_url", successUrl);
    params.append("cancel_url", cancelUrl);
    params.append("shipping_address_collection[allowed_countries][0]", "US");
    params.append("shipping_address_collection[allowed_countries][1]", "CA");

    items.forEach((item, i) => {
      params.append(
        `line_items[${i}][price_data][currency]`,
        "usd",
      );
      params.append(
        `line_items[${i}][price_data][product_data][name]`,
        item.name,
      );
      if (item.image && /^https?:\/\//.test(item.image)) {
        params.append(
          `line_items[${i}][price_data][product_data][images][0]`,
          item.image,
        );
      }
      params.append(
        `line_items[${i}][price_data][unit_amount]`,
        String(Math.round(item.price)),
      );
      params.append(`line_items[${i}][quantity]`, String(item.quantity));
    });

    // Cart payload preserved on the session for later webhook fulfillment.
    params.append(
      "metadata[cart]",
      JSON.stringify(
        items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          variantId: i.variantId,
        })),
      ),
    );

    const stripeRes = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY ?? ""}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      },
    );

    if (!stripeRes.ok) {
      const errBody = await stripeRes.text().catch(() => "");
      console.error(
        "[/api/stripe/checkout] Stripe REST error:",
        stripeRes.status,
        errBody.slice(0, 300),
      );
      return NextResponse.json(
        { ok: false, error: "Checkout could not be created." },
        { status: 502 },
      );
    }

    const session = (await stripeRes.json()) as { id?: string; url?: string };
    if (!session.url) {
      return NextResponse.json(
        { ok: false, error: "Stripe returned no checkout URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      url: session.url,
      demo: false,
      sessionId: session.id ?? null,
    });
  } catch (err) {
    console.error("[/api/stripe/checkout] unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Checkout failed unexpectedly." },
      { status: 500 },
    );
  }
}
