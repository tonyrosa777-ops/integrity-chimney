/**
 * ShopContent.tsx - Client-side shop UI for Integrity Chimney.
 *
 * Renders hero, category filter pills, and the product grid. Fetches
 * /api/printful/products and falls back to the seeded JSON import if the
 * fetch fails. When the response is flagged demo:true (or no env keys are
 * detected), surfaces a small banner so the demo is honest about what's
 * live and what isn't.
 *
 * Aesthetic: industrial-utilitarian × organic-natural per design-system.md
 * §8. Heritage Brick primary, Hearth Copper accent, dark base with cream
 * card surfaces inside the dark hero band.
 */

"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerContainer, staggerItem } from "@/components/animations";
import { formatPrice, useCart } from "@/lib/cart";
import seededCatalog from "@/lib/printful-seeded-products.json";

interface SeededVariant {
  id: string;
  name: string;
  color?: string;
  size?: string;
  price: number;
}

interface SeededProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  preview_image_url: string;
  variants: SeededVariant[];
}

interface CatalogResponse {
  products: SeededProduct[] | unknown[];
  demo?: boolean;
}

const SEEDED: SeededProduct[] = (seededCatalog.products as SeededProduct[]) ?? [];

const CATEGORY_ALL = "All";
const CATEGORIES: string[] = [
  CATEGORY_ALL,
  ...Array.from(new Set(SEEDED.map((p) => p.category))),
];

// Maps friendly color labels → CSS swatch colors.
const COLOR_MAP: Record<string, string> = {
  Black: "#1c1c1c",
  Charcoal: "#3d4349",
  "Heritage Brick": "rgb(127, 42, 31)",
  Cream: "#E9E2D4",
  Copper: "rgb(184, 115, 51)",
  Tan: "#c9a274",
  Stainless: "#c0c0c0",
  Natural: "#d8c8a8",
};

function swatchColor(label?: string): string {
  if (!label) return "#444";
  return COLOR_MAP[label] ?? "#888";
}

function isLightSwatch(label?: string): boolean {
  if (!label) return false;
  const hex = COLOR_MAP[label];
  return hex === "#E9E2D4" || hex === "#d8c8a8" || hex === "#c0c0c0";
}

export function ShopContent() {
  const [catalog, setCatalog] = useState<SeededProduct[]>(SEEDED);
  const [demoMode, setDemoMode] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORY_ALL);
  const [selections, setSelections] = useState<
    Record<string, { variantId: string }>
  >(() => {
    const init: Record<string, { variantId: string }> = {};
    SEEDED.forEach((p) => {
      if (p.variants[0]) init[p.id] = { variantId: p.variants[0].id };
    });
    return init;
  });
  const [addedId, setAddedId] = useState<string | null>(null);

  const { addItem } = useCart();

  // Hydrate from API. If the API returns the same shape (seeded), we keep
  // demo:true. If live, we drop the demo banner.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/printful/products")
      .then((r) => r.json() as Promise<CatalogResponse>)
      .then((data) => {
        if (cancelled) return;
        if (data?.demo === false && Array.isArray(data.products)) {
          // Live response: shape may differ from seeded - if it doesn't
          // match our seeded contract, keep seeded data so the grid
          // doesn't fall apart.
          const usable = (data.products as SeededProduct[]).every(
            (p) => p && typeof p.id === "string" && Array.isArray(p.variants),
          );
          if (usable) {
            setCatalog(data.products as SeededProduct[]);
            setDemoMode(false);
          } else {
            setDemoMode(true);
          }
        } else {
          setDemoMode(true);
        }
      })
      .catch(() => {
        // Network error → stay on seeded data, demo banner stays on.
        if (!cancelled) setDemoMode(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === CATEGORY_ALL) return catalog;
    return catalog.filter((p) => p.category === activeCategory);
  }, [catalog, activeCategory]);

  function handleSelectVariant(productId: string, variantId: string) {
    setSelections((prev) => ({ ...prev, [productId]: { variantId } }));
  }

  function handleAdd(product: SeededProduct) {
    const sel = selections[product.id];
    const variant = product.variants.find((v) => v.id === sel?.variantId)
      ?? product.variants[0];
    if (!variant) return;

    const variantLabel =
      [variant.color, variant.size].filter(Boolean).join(" / ") || variant.name;
    const displayName =
      variantLabel && variantLabel !== product.name
        ? `${product.name} - ${variantLabel}`
        : product.name;

    addItem({
      id: variant.id,
      name: displayName,
      price: variant.price,
      quantity: 1,
      image: product.preview_image_url,
      variantId: variant.id,
      size: variant.size,
      color: variant.color,
      category: product.category,
    });

    setAddedId(variant.id);
    window.setTimeout(() => setAddedId((prev) => (prev === variant.id ? null : prev)), 1400);
  }

  return (
    <>
      {/* Demo banner */}
      {demoMode ? (
        <div className="border-b border-accent/20 bg-bg-elevated/80 px-6 py-3 text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
            Demo mode · seeded products · checkout will not charge
          </p>
        </div>
      ) : null}

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-bg-base px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(127,42,31,0.22) 0%, rgba(10,10,10,0) 55%), radial-gradient(ellipse at 80% 80%, rgba(184,115,51,0.18) 0%, rgba(10,10,10,0) 60%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeUp delay={0.05} duration={0.5} distance={14}>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
              Workwear · Gear · Gifts
            </p>
          </FadeUp>
          <FadeUp delay={0.18} duration={0.6} distance={20}>
            <h1
              className="font-display text-display mt-5 text-text-primary"
              style={{ fontWeight: 600 }}
            >
              Built for Bow, NH winters.
            </h1>
          </FadeUp>
          <FadeUp delay={0.32} duration={0.6} distance={16}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              Branded gear, work apparel, and gift sets from Integrity Chimney
              Services. The kit we wear on the job, available to the people we
              work for.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Filter pills */}
      <div className="sticky top-20 z-20 border-b border-white/10 bg-bg-base/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-all whitespace-nowrap ${
                    active
                      ? "border-accent bg-accent text-bg-base"
                      : "border-white/15 text-text-secondary hover:border-accent/60 hover:text-accent"
                  }`}
                  aria-pressed={active}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="relative bg-bg-base px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-xl text-text-primary">
                Nothing in that category yet.
              </p>
              <p className="mt-2 text-sm text-text-muted">
                Try another filter or check back soon.
              </p>
            </div>
          ) : (
            <StaggerContainer
              staggerDelay={0.06}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((product) => {
                const sel = selections[product.id];
                const activeVariant =
                  product.variants.find((v) => v.id === sel?.variantId) ??
                  product.variants[0];
                const justAdded = activeVariant && addedId === activeVariant.id;

                const colors = Array.from(
                  new Set(
                    product.variants
                      .map((v) => v.color)
                      .filter((c): c is string => Boolean(c)),
                  ),
                );
                const sizes = Array.from(
                  new Set(
                    product.variants
                      .map((v) => v.size)
                      .filter((s): s is string => Boolean(s)),
                  ),
                );

                return (
                  <motion.article
                    key={product.id}
                    variants={staggerItem}
                    className="group flex flex-col overflow-hidden rounded-md border border-white/10 bg-bg-elevated transition-colors hover:border-accent/40"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden border-b border-white/5 bg-bg-base">
                      <Image
                        src={product.preview_image_url}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">
                        {product.category}
                      </p>
                      <h2 className="font-display text-lg font-semibold leading-tight text-text-primary">
                        {product.name}
                      </h2>
                      <p className="text-xs leading-relaxed text-text-secondary">
                        {product.description}
                      </p>

                      {/* Variant picker - colors */}
                      {colors.length > 0 ? (
                        <div className="mt-1">
                          <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-text-muted">
                            Color{activeVariant?.color ? ` · ${activeVariant.color}` : ""}
                          </p>
                          <div className="mt-1.5 flex flex-wrap gap-2">
                            {colors.map((color) => {
                              // Default to first variant of this color.
                              const target = product.variants.find(
                                (v) => v.color === color,
                              );
                              if (!target) return null;
                              const selected = activeVariant?.color === color;
                              return (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() =>
                                    handleSelectVariant(product.id, target.id)
                                  }
                                  title={color}
                                  aria-label={color}
                                  className="relative h-6 w-6 rounded-full border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated"
                                  style={{
                                    background: swatchColor(color),
                                    borderColor: isLightSwatch(color)
                                      ? "rgba(0,0,0,0.25)"
                                      : "rgba(255,255,255,0.2)",
                                    boxShadow: selected
                                      ? "0 0 0 2px var(--bg-elevated), 0 0 0 4px var(--accent)"
                                      : "none",
                                  }}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ) : null}

                      {/* Variant picker - sizes */}
                      {sizes.length > 0 ? (
                        <div className="mt-1">
                          <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-text-muted">
                            Size
                          </p>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {sizes.map((size) => {
                              // Among the active color (if any), find the
                              // variant that matches this size.
                              const targetByColor = product.variants.find(
                                (v) =>
                                  v.size === size &&
                                  (!activeVariant?.color ||
                                    v.color === activeVariant.color),
                              );
                              const target = targetByColor
                                ?? product.variants.find((v) => v.size === size);
                              const available = Boolean(target);
                              const selected = activeVariant?.size === size;
                              return (
                                <button
                                  key={size}
                                  type="button"
                                  disabled={!available}
                                  onClick={() => {
                                    if (target) {
                                      handleSelectVariant(product.id, target.id);
                                    }
                                  }}
                                  className={`rounded-sm border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider transition-all ${
                                    selected
                                      ? "border-accent bg-accent/15 text-accent"
                                      : available
                                        ? "border-white/15 text-text-secondary hover:border-accent/60 hover:text-accent"
                                        : "cursor-not-allowed border-white/5 text-text-muted/40 line-through"
                                  }`}
                                >
                                  {size}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}

                      {/* Footer row */}
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <span className="font-display text-lg font-semibold text-text-primary">
                          {formatPrice(activeVariant?.price ?? product.price)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAdd(product)}
                          className={`rounded-md px-4 py-2 font-mono text-[0.65rem] uppercase tracking-wider transition-colors ${
                            justAdded
                              ? "bg-accent text-bg-base"
                              : "bg-primary text-text-primary hover:bg-primary-muted"
                          }`}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                              key={justAdded ? "added" : "add"}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.18 }}
                              className="inline-block"
                            >
                              {justAdded ? "Added" : "Add to cart"}
                            </motion.span>
                          </AnimatePresence>
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}

export default ShopContent;
