"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, siteConfig } from "@/data/site";
import { telHref } from "@/lib/utils";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change (best-effort: close on navigation)
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg-base/85 backdrop-blur-md border-b border-white/5 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors"
              aria-label={siteConfig.name}
            >
              <span className="font-display text-xl font-semibold">
                Integrity Chimney
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
              {nav.primary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href={telHref(siteConfig.phone)}
                className="font-mono text-sm tracking-wider text-text-secondary hover:text-accent transition-colors"
                aria-label={`Call ${siteConfig.phone}`}
              >
                {siteConfig.phone}
              </a>
              <Link
                href={nav.ctaPrimary.href}
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-text-primary hover:bg-primary-muted transition-colors"
              >
                {nav.ctaPrimary.label}
              </Link>
            </div>

            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-text-primary hover:bg-bg-elevated"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div
              className="absolute inset-0 bg-bg-base/95 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-bg-elevated border-l border-white/10 px-6 py-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-lg font-semibold text-text-primary">
                  Integrity Chimney
                </span>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md text-text-primary hover:bg-bg-card"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <svg
                    width="22"
                    height="22"
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

              <nav className="flex-1 flex flex-col gap-1" aria-label="Primary mobile">
                {nav.primary.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-3 text-base text-text-primary hover:text-accent transition-colors border-b border-white/5"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="pt-4 mt-4 border-t border-white/10 flex flex-col gap-3">
                <a
                  href={telHref(siteConfig.phone)}
                  className="font-mono text-sm tracking-wider text-text-secondary hover:text-accent text-center py-2"
                >
                  {siteConfig.phone}
                </a>
                <Link
                  href={nav.ctaPrimary.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 font-mono text-xs uppercase tracking-wider text-text-primary hover:bg-primary-muted"
                >
                  {nav.ctaPrimary.label}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
