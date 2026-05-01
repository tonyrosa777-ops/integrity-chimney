/**
 * /shop/success - Order confirmation page.
 *
 * Demo path: arrives via /shop/success?demo=true after a seeded checkout.
 * Live path: arrives via /shop/success?session_id=cs_xxx after a real
 * Stripe Checkout completes. Either way, we reassure the customer and
 * cross-sell the booking funnel - heating with wood means an annual
 * sweep is the right next step.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description:
    "Thanks for your order from Integrity Chimney Services. You'll receive a shipping notification by email.",
  robots: { index: false, follow: false },
};

interface SuccessSearchParams {
  session_id?: string;
  demo?: string;
}

export default async function ShopSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SuccessSearchParams>;
}) {
  const params = await searchParams;
  const isDemo = params?.demo === "true" || !params?.session_id;
  const sessionId = params?.session_id;

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-bg-base px-6 pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(127,42,31,0.18) 0%, rgba(10,10,10,0) 55%), radial-gradient(ellipse at 50% 100%, rgba(184,115,51,0.14) 0%, rgba(10,10,10,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <FadeUp delay={0.05} duration={0.5} distance={14}>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
            Order Confirmed
          </p>
        </FadeUp>

        <FadeUp delay={0.18} duration={0.6} distance={20}>
          <h1
            className="font-display text-display mt-5 text-text-primary"
            style={{ fontWeight: 600 }}
          >
            Thanks for the order.
          </h1>
        </FadeUp>

        <FadeUp delay={0.32} duration={0.6} distance={16}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
            We will email you when it ships. Print-on-demand items typically
            move out the door in 3 to 7 business days.
          </p>
        </FadeUp>

        {isDemo ? (
          <FadeUp delay={0.4} duration={0.5} distance={12}>
            <p className="mx-auto mt-6 max-w-md rounded-md border border-accent/30 bg-bg-elevated px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
              Demo mode · no payment was captured
            </p>
          </FadeUp>
        ) : sessionId ? (
          <FadeUp delay={0.4} duration={0.5} distance={12}>
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-text-muted">
              Order reference: {sessionId.slice(0, 18)}…
            </p>
          </FadeUp>
        ) : null}

        <FadeUp delay={0.5} duration={0.5} distance={14}>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href="/shop" variant="primary">
              Continue shopping
            </Button>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-md border border-accent px-6 py-3 font-mono text-sm uppercase tracking-wider text-accent transition-all duration-200 hover:bg-accent hover:text-bg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
            >
              Schedule a sweep
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.62} duration={0.5} distance={12}>
          <p className="mt-12 text-xs text-text-muted">
            Heating with wood this winter? Book your annual sweep while you are
            here. We answer the phone and tell you what your chimney actually
            needs.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
