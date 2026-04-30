"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Testimonial } from "@/data/site";

const PAGE_SIZE = 9;

type Props = {
  items: Testimonial[];
};

/**
 * Paginated 3x3 testimonial grid.
 * Page 1 -> indices 0-8
 * Page 2 -> indices 9-17
 * Page 3 -> indices 18-26
 * Page 4 -> indices 27-35
 *
 * Optional `?service=X` filter (ungated for now: all 36 items
 * always render unless `service` matches an existing service name).
 */
export function TestimonialsGrid({ items }: Props) {
  const searchParams = useSearchParams();

  const rawPage = Number(searchParams.get("page") ?? "1");
  const serviceFilter = (searchParams.get("service") ?? "").trim();

  const filtered = useMemo(() => {
    if (!serviceFilter) return items;
    const lc = serviceFilter.toLowerCase();
    const matched = items.filter((t) => t.service.toLowerCase() === lc);
    // Ungated guarantee: if filter yields nothing, fall back to full list
    // so the page never renders empty.
    return matched.length > 0 ? matched : items;
  }, [items, serviceFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = clampInt(rawPage, 1, totalPages);

  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const visible = filtered.slice(startIdx, endIdx);

  return (
    <div>
      {/* Pagination meta */}
      <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <p
          className="font-mono text-xs uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          {`Page ${page} of ${totalPages} · Showing ${visible.length} of ${filtered.length}`}
        </p>
        {serviceFilter ? (
          <Link
            href="/testimonials"
            className="font-mono text-xs uppercase tracking-wider hover:opacity-80"
            style={{ color: "var(--accent)" }}
          >
            Clear service filter
          </Link>
        ) : null}
      </div>

      {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((t, i) => (
          <article
            key={`${t.name}-${t.date}-${startIdx + i}`}
            className="flex h-full flex-col gap-3 rounded-md border p-5 md:p-6"
            style={{
              background: "var(--bg-card)",
              borderColor: "rgba(184,115,51,0.18)",
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <p
                className="text-eyebrow"
                style={{ color: "var(--accent)" }}
              >
                {t.service}
              </p>
              <Stars count={t.rating} />
            </div>
            <blockquote
              className="font-display text-base italic md:text-base"
              style={{ color: "var(--text-primary)", lineHeight: 1.45 }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <p
              className="mt-auto pt-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {`${t.name} · ${t.town}`}
            </p>
          </article>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 ? (
        <nav
          className="mt-12 flex items-center justify-center gap-2"
          aria-label="Testimonial pages"
        >
          <PageLink
            page={page - 1}
            disabled={page <= 1}
            serviceFilter={serviceFilter}
            label="Prev"
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <PageNumber
              key={n}
              n={n}
              active={n === page}
              serviceFilter={serviceFilter}
            />
          ))}
          <PageLink
            page={page + 1}
            disabled={page >= totalPages}
            serviceFilter={serviceFilter}
            label="Next"
          />
        </nav>
      ) : null}
    </div>
  );
}

/* =============================================================
   Sub-components
   ============================================================= */

function buildHref(page: number, serviceFilter: string): string {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (serviceFilter) params.set("service", serviceFilter);
  const qs = params.toString();
  return qs ? `/testimonials?${qs}` : "/testimonials";
}

function PageNumber({
  n,
  active,
  serviceFilter,
}: {
  n: number;
  active: boolean;
  serviceFilter: string;
}) {
  const base =
    "inline-flex h-9 w-9 items-center justify-center rounded-md font-mono text-xs uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base";
  if (active) {
    return (
      <span
        aria-current="page"
        className={base}
        style={{
          background: "var(--primary)",
          color: "var(--text-primary)",
        }}
      >
        {n}
      </span>
    );
  }
  return (
    <Link
      href={buildHref(n, serviceFilter)}
      className={`${base} border`}
      style={{
        borderColor: "rgba(184,115,51,0.25)",
        color: "var(--text-primary)",
      }}
    >
      {n}
    </Link>
  );
}

function PageLink({
  page,
  disabled,
  serviceFilter,
  label,
}: {
  page: number;
  disabled: boolean;
  serviceFilter: string;
  label: string;
}) {
  const cls =
    "inline-flex h-9 items-center justify-center rounded-md border px-3 font-mono text-xs uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cls}
        style={{
          borderColor: "rgba(245,245,245,0.10)",
          color: "var(--text-muted)",
          pointerEvents: "none",
        }}
      >
        {label}
      </span>
    );
  }
  return (
    <Link
      href={buildHref(page, serviceFilter)}
      className={cls}
      style={{
        borderColor: "rgba(184,115,51,0.25)",
        color: "var(--text-primary)",
      }}
    >
      {label}
    </Link>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span
      aria-label={`${count} out of 5 stars`}
      className="inline-flex items-center gap-0.5"
      style={{ color: "var(--accent)" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

function clampInt(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  const i = Math.floor(n);
  if (i < min) return min;
  if (i > max) return max;
  return i;
}
