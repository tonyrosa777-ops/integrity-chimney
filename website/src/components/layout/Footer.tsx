import Link from "next/link";
import { siteConfig, nav, footer, trustSignals } from "@/data/site";
import { telHref } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative z-10 bg-bg-elevated border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Brand line + tagline */}
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-text-primary">
            Integrity <span className="text-accent">NH</span>
          </h2>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-text-muted">
            Kevin Fredrickson, Owner · Two specialized companies, one standard
          </p>
          {footer.tagline && (
            <p className="mt-4 text-text-secondary text-sm leading-relaxed">
              {footer.tagline}
            </p>
          )}
        </div>

        {/* Dual-brand columns + nav + trust */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {footer.brands.map((brand) => (
            <div key={brand.name}>
              <h3 className="text-eyebrow mb-3">{brand.focus}</h3>
              <p className="font-display text-base font-semibold text-text-primary">
                {brand.name}
              </p>
              <div className="mt-3 space-y-1.5 font-mono text-sm">
                <a
                  href={telHref(brand.phoneTel)}
                  className="block text-text-primary hover:text-accent transition-colors"
                >
                  {brand.phone}
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="block text-text-secondary hover:text-accent transition-colors text-xs"
                >
                  {brand.email}
                </a>
              </div>
              <ul className="mt-5 space-y-1.5">
                {brand.services.map((service) => (
                  <li key={`${brand.name}-${service.label}`}>
                    <Link
                      href={service.href}
                      className="text-sm text-text-secondary hover:text-accent transition-colors"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

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
            © {new Date().getFullYear()} {siteConfig.legalName} & {siteConfig.secondaryBrand.name}. All rights reserved. · {siteConfig.owner}, Owner
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
