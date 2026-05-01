"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  galleryItems,
  galleryCategories,
  type GalleryCategory,
} from "@/data/gallery";
import { FadeUp } from "@/components/animations";

type Filter = GalleryCategory | "all";

export function GalleryClient() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? galleryItems
        : galleryItems.filter((i) => i.category === filter),
    [filter]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) =>
          i === null ? null : (i + 1) % visible.length
        );
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + visible.length) % visible.length
        );
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex, visible.length]);

  useEffect(() => {
    if (openIndex !== null && openIndex >= visible.length) {
      setOpenIndex(null);
    }
  }, [filter, openIndex, visible.length]);

  return (
    <section className="bg-bg-base">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-20 md:pb-28">
        <FadeUp>
          <p className="text-eyebrow">Real work · Central New Hampshire</p>
          <h1 className="font-display text-h1 mt-3 max-w-3xl">
            <span className="hero-shimmer">
              Chimneys, masonry, and roofs across central New Hampshire.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-text-secondary">
            Documentation of recent work across Bow, Concord, Hopkinton, Henniker, Loudon, and Pembroke. Before-and-after pairs, historic restorations, and Level 2 inspection imagery. Real photography is being commissioned post-launch; the images shown here are representative of the type and standard of work.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
            {galleryCategories.map((cat) => {
              const active = cat.id === filter;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(cat.id)}
                  className={[
                    "rounded-md px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                    active
                      ? "bg-primary text-text-primary"
                      : "border border-white/10 text-text-secondary hover:border-accent hover:text-accent",
                  ].join(" ")}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </FadeUp>

        <div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          role="tabpanel"
        >
          {visible.map((item, index) => (
            <motion.button
              key={item.slug}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative overflow-hidden rounded-md bg-bg-card border border-white/5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
              aria-label={`Open ${item.title}`}
            >
              <div
                className={
                  item.aspect === "landscape_16_9"
                    ? "relative aspect-video"
                    : item.aspect === "square_hd"
                    ? "relative aspect-square"
                    : "relative aspect-[3/4]"
                }
              >
                <Image
                  src={item.file}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base/85 via-bg-base/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                  {item.category}
                </p>
                <p className="mt-1 font-display text-base text-text-primary">
                  {item.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
          >
            <div
              className="absolute inset-0 bg-bg-base/95 backdrop-blur-sm"
              onClick={() => setOpenIndex(null)}
              aria-hidden="true"
            />

            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-11 h-11 rounded-md bg-bg-elevated/90 text-text-primary hover:bg-bg-card transition-colors"
              aria-label="Close gallery viewer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            {visible.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex((i) =>
                      i === null
                        ? null
                        : (i - 1 + visible.length) % visible.length
                    )
                  }
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-bg-elevated/90 text-text-primary hover:bg-bg-card transition-colors"
                  aria-label="Previous image"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex((i) =>
                      i === null ? null : (i + 1) % visible.length
                    )
                  }
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-bg-elevated/90 text-text-primary hover:bg-bg-card transition-colors"
                  aria-label="Next image"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}

            <motion.div
              className="relative z-[1] mx-auto w-full max-w-5xl px-4 md:px-12"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {(() => {
                const item = visible[openIndex];
                if (!item) return null;
                return (
                  <div className="rounded-md overflow-hidden bg-bg-elevated border border-white/10 shadow-2xl">
                    <div
                      className={
                        item.aspect === "landscape_16_9"
                          ? "relative aspect-video"
                          : item.aspect === "square_hd"
                          ? "relative aspect-square"
                          : "relative aspect-[3/4]"
                      }
                    >
                      <Image
                        src={item.file}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 80vw, 100vw"
                        className="object-contain"
                        priority
                      />
                    </div>
                    <div className="p-5 md:p-6 border-t border-white/5">
                      <p className="text-eyebrow">{item.category}</p>
                      <h2 className="mt-1 font-display text-h3 text-text-primary">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-text-secondary">{item.caption}</p>
                      <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-wider text-text-muted">
                        {openIndex + 1} / {visible.length}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
