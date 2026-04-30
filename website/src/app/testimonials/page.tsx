import type { Metadata } from "next";
import { Suspense } from "react";
import { FadeUp } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { testimonials } from "@/data/site";
import { TestimonialsGrid } from "./TestimonialsGrid";

/**
 * /testimonials - featured pull-quote, paginated grid (9 per page, 3x3),
 * pagination via ?page=N, optional ?service=X filter (ungated for now).
 */

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "36 chimney projects, 36 referrals. What clients across Bow, Concord, Henniker, Hopkinton, and central NH say about working with Integrity Chimney Services.",
};

export default function TestimonialsPage() {
  const featured = testimonials[0];

  return (
    <>
      {/* ============== Hero ============== */}
      <section
        className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
        style={{ background: "var(--bg-base)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(184,115,51,0.10) 0%, rgba(10,10,10,0) 55%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">CLIENT WORD OF MOUTH</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.7} distance={20}>
            <h1
              className="text-display font-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              36 chimney projects, 36 referrals.
            </h1>
          </FadeUp>
          <FadeUp delay={0.25} duration={0.6} distance={16}>
            <p
              className="mx-auto mt-6 max-w-2xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Real names, real towns, real work. Every quote below comes
              from a homeowner, realtor, or property manager we have served
              across central New Hampshire.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============== Featured pull-quote ============== */}
      {featured ? (
        <section
          className="relative py-12 md:py-16"
          style={{ background: "var(--bg-elevated)" }}
        >
          <div className="mx-auto max-w-[920px] px-6 md:px-8 lg:px-12">
            <FadeUp duration={0.6} distance={16}>
              <figure
                className="relative rounded-md border p-8 md:p-12"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "rgba(184,115,51,0.22)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="font-display absolute left-4 top-2 select-none text-7xl leading-none md:left-6 md:top-3 md:text-8xl"
                  style={{ color: "rgba(184,115,51,0.18)" }}
                >
                  &ldquo;
                </span>
                <p
                  className="text-eyebrow mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  {featured.service}
                </p>
                <blockquote
                  className="font-display relative text-xl italic md:text-2xl lg:text-3xl"
                  style={{ color: "var(--text-primary)", lineHeight: 1.35 }}
                >
                  {featured.quote}
                </blockquote>
                <figcaption
                  className="mt-6 font-mono text-xs uppercase tracking-wider md:text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {`${featured.name} · ${featured.town}`}
                </figcaption>
              </figure>
            </FadeUp>
          </div>
        </section>
      ) : null}

      {/* ============== Paginated grid (client) ============== */}
      <section
        className="relative py-16 md:py-24"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <Suspense
            fallback={
              <div
                className="text-center font-mono text-xs uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Loading testimonials...
              </div>
            }
          >
            <TestimonialsGrid items={testimonials} />
          </Suspense>
        </div>
      </section>

      {/* ============== Bottom CTA ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-[820px] px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">YOUR TURN</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="text-h2 font-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Book the visit.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} duration={0.6} distance={14}>
            <p
              className="mx-auto mt-5 max-w-xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Free estimate over $500. Same-week scheduling on real estate
              transactions. Photos at every step, sent to you the same day.
            </p>
          </FadeUp>
          <FadeUp delay={0.3} duration={0.6} distance={14}>
            <div className="mt-8 flex justify-center">
              <Button href="/booking" variant="primary">
                Book Inspection
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
