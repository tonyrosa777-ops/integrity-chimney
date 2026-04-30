import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { CountUp } from "@/components/animations/CountUp";
import { Button } from "@/components/ui/Button";
import { founder, siteConfig, testimonials } from "@/data/site";

/**
 * /about - Founder story, credentials, stats, historical-restoration testimonials,
 * final CTA. All copy from `@/data/site`. Mobile-first.
 */

export const metadata: Metadata = {
  title: "About Kevin Fredrickson",
  description:
    "Meet Kevin Fredrickson. Owner-operator, fifteen years on Bow rooftops, fully insured. Answers the phone, climbs the roof, writes the quote himself.",
  openGraph: {
    title: "About Kevin Fredrickson | Integrity Chimney Services LLC",
    description:
      "Owner-operator from Bow, NH. Fifteen years of chimney, masonry, and roofing on central New Hampshire homes. The craftsman behind the company.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Kevin Fredrickson | Integrity Chimney Services LLC",
    description:
      "Owner-operator from Bow, NH. Fifteen years of chimney, masonry, and roofing on central New Hampshire homes. The craftsman behind the company.",
  },
};

const HISTORIC_SERVICES = new Set([
  "Historic Fireplace & Masonry Restoration",
  "Full Masonry & Chimney Repair",
  "Stainless Steel Chimney Liner",
  "Crown Repair",
]);

function pickFeaturedTestimonials(count: number) {
  const filtered = testimonials.filter((t) =>
    HISTORIC_SERVICES.has(t.service),
  );
  return filtered.slice(0, count);
}

export default function AboutPage() {
  const featured = pickFeaturedTestimonials(5);
  const founderHasBio = Boolean(founder.bio && founder.bio.trim().length > 0);
  const paragraphs = founderHasBio
    ? founder.bio
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      {/* ============== Hero ============== */}
      <section
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
        style={{ background: "var(--bg-base)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(184,115,51,0.08) 0%, rgba(10,10,10,0) 55%), radial-gradient(ellipse at 80% 80%, rgba(127,42,31,0.10) 0%, rgba(10,10,10,0) 50%)",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 md:grid-cols-[1.2fr_0.8fr] md:gap-16 md:px-8 lg:px-12">
          <div>
            <FadeUp duration={0.5} distance={12}>
              <p className="text-eyebrow mb-4">
                {`MEET ${founder.name.toUpperCase()} · ${founder.title.toUpperCase()}`}
              </p>
            </FadeUp>
            <FadeUp delay={0.1} duration={0.7} distance={20}>
              <h1
                className="text-display font-display font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                The owner answers the phone. The owner climbs the roof.
              </h1>
            </FadeUp>
            <FadeUp delay={0.25} duration={0.6} distance={16}>
              <p
                className="mt-6 max-w-xl text-base md:text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                {`Owner-operated out of ${siteConfig.address.city}, ${siteConfig.address.state}. ${siteConfig.yearsExperience}+ years on central New Hampshire chimneys, masonry, and roofs. No call center, no subcontractor, no sales rep with a clipboard.`}
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.2} duration={0.7} distance={24}>
            <FounderPhoto src={founder.photo} alt={founder.name} />
          </FadeUp>
        </div>
      </section>

      {/* ============== Founder story ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-[820px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">THE STORY</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="text-h2 font-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Why this company exists
            </h2>
          </FadeUp>

          <div className="mt-8 space-y-6">
            {founderHasBio ? (
              paragraphs.map((p, i) => (
                <FadeUp
                  key={i}
                  delay={0.2 + i * 0.08}
                  duration={0.6}
                  distance={14}
                >
                  <p
                    className="text-base leading-relaxed md:text-lg"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {p}
                  </p>
                </FadeUp>
              ))
            ) : (
              <FadeUp delay={0.2} duration={0.6} distance={14}>
                <div
                  className="rounded-md border border-dashed p-6"
                  style={{
                    borderColor: "rgba(184,115,51,0.35)",
                    background: "var(--bg-card)",
                  }}
                >
                  <p
                    className="text-sm md:text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {`Coming soon. We are writing ${founder.name}'s full story. In the meantime, call ${siteConfig.phone} and Kevin will tell you himself.`}
                  </p>
                </div>
              </FadeUp>
            )}
          </div>
        </div>
      </section>

      {/* ============== Stats row ============== */}
      <section
        className="relative py-16 md:py-20"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-[1100px] px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            <StatBlock
              value={founder.yearsExperience}
              suffix="+"
              label="Years owner-operated"
            />
            <StatBlock value={36} label="Chimney projects, 36 referrals" />
            <StatBlock value={24} suffix="hr" label="Callback SLA" />
            <StatBlock value={5} suffix="-yr" label="Workmanship guarantee" />
          </div>
        </div>
      </section>

      {/* ============== Credentials ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-[1100px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">CREDENTIALS</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="text-h2 font-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              What we carry, what we promise
            </h2>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
            {founder.credentials.map((credential, i) => (
              <FadeUp
                key={credential}
                delay={i * 0.05}
                duration={0.5}
                distance={10}
              >
                <div
                  className="flex items-start gap-3 rounded-md border px-5 py-4"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(184,115,51,0.18)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  <span
                    className="text-sm md:text-base"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {credential}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Featured testimonials (historic angle) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-[1100px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">HISTORIC RESTORATION CLIENTS</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="text-h2 font-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Lime mortar, period brick, beehive ovens
            </h2>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {featured.map((t, i) => (
              <FadeUp
                key={`${t.name}-${t.date}`}
                delay={i * 0.08}
                duration={0.6}
                distance={14}
              >
                <figure
                  className="flex h-full flex-col gap-4 rounded-md border p-6 md:p-7"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(184,115,51,0.18)",
                  }}
                >
                  <p
                    className="text-eyebrow"
                    style={{ color: "var(--accent)" }}
                  >
                    {t.service}
                  </p>
                  <blockquote
                    className="font-display text-base italic md:text-lg"
                    style={{ color: "var(--text-primary)" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption
                    className="mt-auto text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {`${t.name} · ${t.town}`}
                  </figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Final CTA ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-[820px] px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">READY WHEN YOU ARE</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="text-h2 font-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {`Book ${founder.name.split(" ")[0]} for the visit.`}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} duration={0.6} distance={14}>
            <p
              className="mx-auto mt-5 max-w-xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Free estimate on any repair quoted over $500. Same-week
              scheduling for real estate transactions. No deposits over $1,000
              until the day work begins.
            </p>
          </FadeUp>
          <FadeUp delay={0.3} duration={0.6} distance={14}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href="/booking" variant="primary">
                Book Inspection
              </Button>
              <Link
                href="/contact"
                className="font-mono text-sm uppercase tracking-wider hover:opacity-80"
                style={{ color: "var(--accent)" }}
              >
                Or send us a message
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

/* =============================================================
   Sub-components
   ============================================================= */

function StatBlock({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <FadeUp duration={0.5} distance={12}>
      <div
        className="rounded-md border p-5 md:p-6"
        style={{
          background: "var(--bg-card)",
          borderColor: "rgba(184,115,51,0.18)",
        }}
      >
        <div
          className="font-display text-4xl font-semibold md:text-5xl"
          style={{ color: "var(--accent)" }}
        >
          <CountUp end={value} suffix={suffix ?? ""} />
        </div>
        <p
          className="mt-2 text-xs uppercase tracking-wider md:text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </p>
      </div>
    </FadeUp>
  );
}

function FounderPhoto({ src, alt }: { src: string; alt: string }) {
  if (src && src.length > 0) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="aspect-[4/5] w-full rounded-md object-cover"
        style={{ background: "var(--bg-card)" }}
      />
    );
  }
  return (
    <div
      className="relative flex aspect-[4/5] w-full items-end justify-center overflow-hidden rounded-md border"
      style={{
        background:
          "linear-gradient(180deg, rgba(127,42,31,0.18) 0%, rgba(184,115,51,0.10) 60%, rgba(20,20,20,0.85) 100%)",
        borderColor: "rgba(184,115,51,0.25)",
      }}
      aria-label={`${alt} portrait placeholder`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(184,115,51,0.18) 0%, rgba(10,10,10,0) 60%)",
        }}
      />
      <div className="relative z-10 px-6 py-6 text-center">
        <p
          className="font-mono text-xs uppercase tracking-[0.16em]"
          style={{ color: "var(--text-secondary)" }}
        >
          Portrait coming soon
        </p>
        <p
          className="mt-2 font-display text-lg"
          style={{ color: "var(--text-primary)" }}
        >
          {alt}
        </p>
      </div>
    </div>
  );
}
