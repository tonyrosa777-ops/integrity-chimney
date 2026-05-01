/**
 * CartDrawer.tsx - Right-side slide-in cart for Integrity Chimney shop.
 *
 * Pattern #51: dark opaque overlay over content; closes on overlay click,
 * Esc key, or after a successful checkout redirect. Cart subtotal renders
 * from cents to $XX.XX in the footer.
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice, useCart, type CartItem } from "@/lib/cart";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
  } = useCart();

  // Esc to close.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeDrawer]);

  // Lock body scroll while open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  async function handleCheckout() {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = (await res.json()) as { ok?: boolean; url?: string };
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      console.error("[CartDrawer] checkout returned no URL");
    } catch (err) {
      console.error("[CartDrawer] checkout failed:", err);
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="cart-portal"
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label="Cart"
        >
          {/* Pattern #51: dark opaque overlay */}
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeDrawer}
            className="absolute inset-0 cursor-default bg-black/70"
          />

          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-bg-elevated"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
                  Integrity Chimney
                </p>
                <h2 className="font-display text-xl font-semibold text-text-primary">
                  Your Cart
                </h2>
                {itemCount > 0 ? (
                  <p className="mt-0.5 text-xs text-text-muted">
                    {itemCount} item{itemCount === 1 ? "" : "s"}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-card hover:text-accent"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <EmptyState onContinue={closeDrawer} />
              ) : (
                <ul className="flex flex-col gap-3">
                  {items.map((line) => (
                    <CartLine
                      key={line.id}
                      line={line}
                      onRemove={() => removeItem(line.id)}
                      onIncrement={() =>
                        updateQuantity(line.id, line.quantity + 1)
                      }
                      onDecrement={() =>
                        updateQuantity(line.id, line.quantity - 1)
                      }
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 ? (
              <div className="space-y-4 border-t border-white/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                    Subtotal
                  </span>
                  <span className="font-display text-lg font-semibold text-text-primary">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-center text-[11px] leading-relaxed text-text-muted">
                  Shipping and tax calculated at checkout. Print-on-demand items
                  ship in 3 to 7 business days once produced.
                </p>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full rounded-md bg-primary px-5 py-3 font-mono text-xs uppercase tracking-wider text-text-primary transition-colors hover:bg-primary-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="w-full text-center font-mono text-[0.7rem] uppercase tracking-wider text-accent transition-colors hover:opacity-80"
                >
                  Continue shopping
                </button>
              </div>
            ) : null}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function EmptyState({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="text-text-muted"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <p className="font-display text-base text-text-primary">
        Your cart is empty.
      </p>
      <p className="max-w-[18rem] text-xs leading-relaxed text-text-muted">
        Branded gear, work apparel, and gift sets for the people who heat with
        wood.
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="mt-2 font-mono text-[0.7rem] uppercase tracking-wider text-accent hover:opacity-80"
      >
        Keep browsing
      </button>
    </div>
  );
}

function CartLine({
  line,
  onRemove,
  onIncrement,
  onDecrement,
}: {
  line: CartItem;
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <li className="flex gap-4 rounded-md border border-white/5 bg-bg-card/60 p-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-white/5 bg-bg-base">
        {line.image ? (
          <Image
            src={line.image}
            alt={line.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-muted">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate font-display text-sm font-semibold text-text-primary">
          {line.name}
        </p>
        {line.category ? (
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-text-muted">
            {line.category}
          </p>
        ) : null}
        <p className="mt-1 font-mono text-xs text-accent">
          {formatPrice(line.price)}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between">
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${line.name}`}
          className="text-text-muted transition-colors hover:text-accent"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="flex items-center gap-2 rounded-full border border-white/10 px-2 py-1">
          <button
            type="button"
            onClick={onDecrement}
            aria-label="Decrease quantity"
            className="flex h-4 w-4 items-center justify-center text-text-secondary transition-colors hover:text-accent"
          >
            <span aria-hidden="true">−</span>
          </button>
          <span className="w-4 text-center font-mono text-[0.7rem] text-text-primary">
            {line.quantity}
          </span>
          <button
            type="button"
            onClick={onIncrement}
            aria-label="Increase quantity"
            className="flex h-4 w-4 items-center justify-center text-text-secondary transition-colors hover:text-accent"
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </li>
  );
}

/**
 * Reuse this from elsewhere as a hint to send users back to /shop after a
 * successful order. Not directly used inside the drawer.
 */
export function ContinueShoppingLink() {
  return (
    <Link
      href="/shop"
      className="font-mono text-[0.7rem] uppercase tracking-wider text-accent hover:opacity-80"
    >
      Continue shopping
    </Link>
  );
}

export default CartDrawer;
