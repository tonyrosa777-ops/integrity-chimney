"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, serviceAreas, siteConfig } from "@/data/site";
import { telHref } from "@/lib/utils";

const SERVICE_AREAS_LABEL = "Service Areas";
const SERVICE_AREAS_HREF = "/service-areas";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

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

  // Click-outside closes the desktop "Service Areas" dropdown.
  useEffect(() => {
    if (!areasOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setAreasOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [areasOpen]);

  // Click-outside closes the desktop "More" dropdown.
  useEffect(() => {
    if (!moreOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [moreOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-bg-base/95 backdrop-blur-md border-b ${
          scrolled
            ? "border-white/10 shadow-lg"
            : "border-white/5"
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
              {nav.primary.map((item) => {
                if (item.label === SERVICE_AREAS_LABEL) {
                  return (
                    <div
                      key={item.href}
                      ref={dropdownRef}
                      className="relative"
                    >
                      <button
                        type="button"
                        onClick={() => setAreasOpen((v) => !v)}
                        aria-expanded={areasOpen}
                        aria-haspopup="menu"
                        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors"
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={`inline-block text-[0.6rem] transition-transform duration-200 ${
                            areasOpen ? "rotate-180" : ""
                          }`}
                        >
                          ▾
                        </span>
                      </button>

                      <AnimatePresence>
                        {areasOpen && (
                          <motion.div
                            role="menu"
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-1/2 top-full mt-3 w-[320px] -translate-x-1/2 rounded-md border border-white/10 bg-bg-elevated shadow-2xl"
                          >
                            <div className="px-4 pt-4">
                              <p
                                className="font-mono text-[0.65rem] uppercase tracking-[0.14em]"
                                style={{ color: "var(--accent)" }}
                              >
                                Central New Hampshire
                              </p>
                            </div>
                            <ul className="grid grid-cols-1 gap-1 p-3" role="none">
                              {serviceAreas.map((area) => (
                                <li key={area.slug} role="none">
                                  <Link
                                    role="menuitem"
                                    href={`/service-areas/${area.slug}`}
                                    onClick={() => setAreasOpen(false)}
                                    className="group flex items-center justify-between gap-3 rounded-sm px-3 py-2 text-sm text-text-primary transition-colors hover:bg-[rgba(184,115,51,0.08)] hover:text-accent"
                                  >
                                    <span>
                                      {area.city}, {area.state}
                                    </span>
                                    <span
                                      aria-hidden="true"
                                      className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-text-muted group-hover:text-accent"
                                    >
                                      {area.distance}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <div className="border-t border-white/10 px-4 py-3">
                              <Link
                                href={SERVICE_AREAS_HREF}
                                onClick={() => setAreasOpen(false)}
                                className="font-mono text-xs uppercase tracking-wider text-accent hover:opacity-80"
                              >
                                View All Service Areas →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* More dropdown - Pricing / Gallery / Blog */}
              <div ref={moreRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen((v) => !v)}
                  aria-expanded={moreOpen}
                  aria-haspopup="menu"
                  aria-label="More"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md text-text-secondary hover:text-accent hover:bg-bg-elevated/60 transition-colors"
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
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-3 w-[220px] rounded-md border border-white/10 bg-bg-elevated shadow-2xl"
                    >
                      <div className="px-4 pt-4">
                        <p
                          className="font-mono text-[0.65rem] uppercase tracking-[0.14em]"
                          style={{ color: "var(--accent)" }}
                        >
                          More
                        </p>
                      </div>
                      <ul className="grid grid-cols-1 gap-1 p-3" role="none">
                        {nav.more.map((item) => (
                          <li key={item.href} role="none">
                            <Link
                              role="menuitem"
                              href={item.href}
                              onClick={() => setMoreOpen(false)}
                              className="block rounded-sm px-3 py-2 text-sm text-text-primary transition-colors hover:bg-[rgba(184,115,51,0.08)] hover:text-accent"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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

              <nav className="flex-1 flex flex-col gap-1 overflow-y-auto" aria-label="Primary mobile">
                {nav.primary.map((item) => {
                  if (item.label === SERVICE_AREAS_LABEL) {
                    return (
                      <div key={item.href} className="border-b border-white/5">
                        <button
                          type="button"
                          onClick={() => setMobileAreasOpen((v) => !v)}
                          aria-expanded={mobileAreasOpen}
                          className="flex w-full items-center justify-between py-3 text-left text-base text-text-primary hover:text-accent transition-colors"
                        >
                          <span>{item.label}</span>
                          <span
                            aria-hidden="true"
                            className={`inline-block text-[0.7rem] transition-transform duration-200 ${
                              mobileAreasOpen ? "rotate-180" : ""
                            }`}
                          >
                            ▾
                          </span>
                        </button>
                        <AnimatePresence>
                          {mobileAreasOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {serviceAreas.map((area) => (
                                <li key={area.slug}>
                                  <Link
                                    href={`/service-areas/${area.slug}`}
                                    onClick={() => setOpen(false)}
                                    className="block py-2 pl-4 text-sm text-text-secondary hover:text-accent"
                                  >
                                    {area.city}, {area.state}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  href={SERVICE_AREAS_HREF}
                                  onClick={() => setOpen(false)}
                                  className="font-mono mt-1 mb-3 block py-2 pl-4 text-xs uppercase tracking-wider text-accent hover:opacity-80"
                                >
                                  View All Service Areas →
                                </Link>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-3 text-base text-text-primary hover:text-accent transition-colors border-b border-white/5"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                {/* Mobile More group - Pricing / Gallery / Blog */}
                <div className="border-b border-white/5">
                  <button
                    type="button"
                    onClick={() => setMobileMoreOpen((v) => !v)}
                    aria-expanded={mobileMoreOpen}
                    className="flex w-full items-center justify-between py-3 text-left text-base text-text-primary hover:text-accent transition-colors"
                  >
                    <span>More</span>
                    <span
                      aria-hidden="true"
                      className={`inline-block text-[0.7rem] transition-transform duration-200 ${
                        mobileMoreOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  <AnimatePresence>
                    {mobileMoreOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {nav.more.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="block py-2 pl-4 text-sm text-text-secondary hover:text-accent"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
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
