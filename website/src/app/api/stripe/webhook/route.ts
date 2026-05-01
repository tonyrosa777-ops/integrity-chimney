/**
 * POST /api/stripe/webhook
 *
 * Demo mode (no STRIPE_WEBHOOK_SECRET): accepts and no-ops with 200 +
 * { demo: true, skipped: "webhook not configured" }. This keeps Stripe-
 * less environments from 500ing if the route is hit accidentally.
 *
 * Live mode: verifies the Stripe-Signature header against the raw body and
 * logs the event. Order fulfillment (Resend email + Printful order) is
 * intentionally left as a Premium-tier follow-up since it requires both
 * RESEND_API_KEY and PRINTFUL_API_KEY plus a synced product map.
 */

import { NextResponse, type NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

export const dynamic = "force-dynamic";

function isWebhookConfigured(): boolean {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  return Boolean(secret && !secret.includes("REPLACE") && secret.length > 8);
}

/**
 * Verify Stripe webhook signature without the SDK.
 * Stripe-Signature header format:
 *   t=<unix_ts>,v1=<sig>,v1=<sig>...
 */
function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string,
  toleranceSeconds = 300,
): boolean {
  const parts = signatureHeader.split(",").reduce<Record<string, string[]>>(
    (acc, part) => {
      const [k, v] = part.split("=");
      if (!k || !v) return acc;
      if (!acc[k]) acc[k] = [];
      acc[k].push(v);
      return acc;
    },
    {},
  );

  const timestamp = parts.t?.[0];
  const sigs = parts.v1 ?? [];
  if (!timestamp || sigs.length === 0) return false;

  const ts = parseInt(timestamp, 10);
  if (Number.isNaN(ts)) return false;
  const ageSeconds = Math.abs(Date.now() / 1000 - ts);
  if (ageSeconds > toleranceSeconds) return false;

  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");
  const expectedBuf = Buffer.from(expected, "hex");

  return sigs.some((candidate) => {
    try {
      const candBuf = Buffer.from(candidate, "hex");
      if (candBuf.length !== expectedBuf.length) return false;
      return timingSafeEqual(candBuf, expectedBuf);
    } catch {
      return false;
    }
  });
}

export async function POST(req: NextRequest) {
  // Demo mode - accept and acknowledge. Useful so dev/staging can ping
  // this route without Stripe credentials and still get a clean 200.
  if (!isWebhookConfigured()) {
    return NextResponse.json({
      received: true,
      demo: true,
      skipped: "webhook not configured",
    });
  }

  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      { received: false, error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  const verified = verifyStripeSignature(rawBody, sig, secret);
  if (!verified) {
    console.warn("[/api/stripe/webhook] invalid signature");
    return NextResponse.json(
      { received: false, error: "Signature verification failed." },
      { status: 400 },
    );
  }

  let event: { type?: string; id?: string };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { received: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  console.log(
    "[/api/stripe/webhook] verified event:",
    event.type ?? "unknown",
    event.id ?? "no-id",
  );

  // Premium-tier upgrade: branch on event.type === "checkout.session.completed"
  // to send a Resend order email + create a Printful order.
  return NextResponse.json({ received: true, demo: false });
}
