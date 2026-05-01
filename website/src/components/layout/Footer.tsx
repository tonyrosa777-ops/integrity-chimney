import Link from "next/link";
import { siteConfig, nav, footer, trustSignals } from "@/data/site";
import { telHref } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + contact */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold text-text-primary">
              {siteConfig.name}
            </h2>
            {footer.tagline && (
              <p className="mt-3 text-text-secondary text-sm leading-relaxed max-w-md">
                {footer.tagline}
              </p>
            )}

            <div className="mt-6 space-y-2 font-mono text-sm">
              <a
                href={telHref(siteConfig.phone)}
                className="block text-text-primary hover:text-accent transition-colors"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-text-secondary hover:text-accent transition-colors"
              >
                {siteConfig.email}
              </a>
              <p className="text-text-muted">
                {footer.schemaAddress.addressLocality},{" "}
                {footer.schemaAddress.addressRegion}
              </p>
            </div>

            <p className="mt-6 text-text-muted text-xs">
              {footer.legal.insuredNotice}
            </p>
          </div>

          {/* Site nav */}
          <div>
            <h3 className="text-eyebrow mb-4">Explore</h3>
            <ul className="space-y-2">
              {nav.primary.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust signals */}
          <div>
            <h3 className="text-eyebrow mb-4">Why Integrity</h3>
            <ul className="space-y-3">
              {trustSignals.slice(0, 4).map((signal) => (
                <li key={signal.label} className="flex items-start gap-2">
                  <span className="text-base leading-none mt-0.5" aria-hidden="true">
                    {signal.icon}
                  </span>
                  <div>
                    <span className="block text-sm text-text-primary">
                      {signal.label}
                    </span>
                    <span className="block text-xs text-text-muted">
                      {signal.detail}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-text-muted text-xs">
            {footer.schemaAddress.addressLocality},{" "}
            {footer.schemaAddress.addressRegion} · Serving {siteConfig.address.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
