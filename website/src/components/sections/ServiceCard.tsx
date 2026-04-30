/**
 * ServiceCard.tsx - Integrity Chimney Services LLC
 * Reusable card surface for the /services hub.
 * Renders icon/emoji + name + tagline + starting price + CTA arrow.
 * Source: site.ts services[]. Used by /services hub.
 */

import Link from "next/link";
import type { Service } from "@/data/site";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  variant?: "pillar" | "default";
  className?: string;
};

export function ServiceCard({
  service,
  variant = "default",
  className,
}: ServiceCardProps) {
  const isPillar = variant === "pillar";
  const href = `/services/${service.slug}`;

  return (
    <Link
      href={href}
      aria-label={`View ${service.name}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
        isPillar
          ? "p-6 md:p-8"
          : "p-5 md:p-6",
        className,
      )}
      style={{
        background: isPillar ? "var(--bg-card)" : "var(--bg-elevated)",
        borderColor: "rgba(184,115,51,0.18)",
      }}
    >
      {/* Hover glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(184,115,51,0.08) 0%, rgba(10,10,10,0) 60%)",
        }}
      />

      {/* Top: emoji + eyebrow pillar tag */}
      <div className="relative z-[1] flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "leading-none",
            isPillar ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl",
          )}
        >
          {service.emoji}
        </span>
        <span
          className="font-mono text-[0.65rem] uppercase tracking-[0.12em]"
          style={{ color: "var(--accent)" }}
        >
          {service.pillar}
        </span>
      </div>

      {/* Name */}
      <h3
        className={cn(
          "relative z-[1] font-display text-text-primary",
          isPillar
            ? "mt-5 text-2xl md:text-3xl"
            : "mt-4 text-xl md:text-2xl",
        )}
        style={{ fontWeight: 600, lineHeight: 1.2 }}
      >
        {service.name}
      </h3>

      {/* Tagline */}
      <p
        className={cn(
          "relative z-[1] font-display italic leading-snug",
          isPillar ? "mt-3 text-base md:text-lg" : "mt-2 text-sm md:text-base",
        )}
        style={{ color: "var(--accent)" }}
      >
        {service.tagline}
      </p>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom: price + arrow */}
      <div
        className="relative z-[1] mt-6 flex items-end justify-between gap-3 border-t pt-4"
        style={{ borderColor: "rgba(245,245,245,0.08)" }}
      >
        <div>
          <p
            className="font-mono text-[0.65rem] uppercase tracking-[0.12em]"
            style={{ color: "var(--text-muted)" }}
          >
            Pricing
          </p>
          <p
            className="font-mono text-sm font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {service.startingPrice}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="font-mono text-sm uppercase tracking-[0.08em] transition-transform duration-200 group-hover:translate-x-1"
          style={{ color: "var(--accent)" }}
        >
          View →
        </span>
      </div>
    </Link>
  );
}

export default ServiceCard;
