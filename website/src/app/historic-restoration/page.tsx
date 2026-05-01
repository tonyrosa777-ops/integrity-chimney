import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { siteConfig, founder, testimonials } from "@/data/site";
import { telHref } from "@/lib/utils";

/**
 * /historic-restoration - flagship hub.
 *
 * Source: market-intelligence.md §1 (heritage stock density), §9 Do #1
 * (own historic restoration), §9 Exploit #5 (only Chimney Savers VT and
 * Steppingstones Masonry credibly claim this in NH; both have material
 * weaknesses Integrity exploits). The differentiation play.
 */

export const metadata: Metadata = {
  title: "Historic Chimney & Masonry Restoration in NH",
  description:
    "Lime mortar repointing, Rumford fireplace rebuilds, and beehive bake oven restoration on Federal-era and pre-1900 NH homes. Bow, Henniker, Hopkinton.",
  openGraph: {
    title:
      "Historic Chimney & Masonry Restoration in NH | Integrity Chimney Services",
    description:
      "NPS Preservation Brief 2 standards. Type O lime mortar, period brick, Rumford geometry. Owner-operated by a fifteen-year Bow craftsman.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Historic Chimney & Masonry Restoration in NH | Integrity Chimney Services",
    description:
      "NPS Preservation Brief 2 standards. Type O lime mortar, period brick, Rumford geometry. Owner-operated by a fifteen-year Bow craftsman.",
  },
};

const SPECIALTIES = [
  {
    eyebrow: "Lime Mortar",
    title: "Lime Mortar, Not Portland Cement",
    body: "Pre-1900 brick is soft. Portland cement is harder than the brick around it, traps moisture, and spalls historic masonry over a single freeze cycle. We use Type O lime mortar matched to the existing courses, hand-mixed on site. Reference: NPS Preservation Brief 2 (Repointing Mortar Joints in Historic Masonry Buildings).",
  },
  {
    eyebrow: "Rumford Fireplace",
    title: "Rumford Fireplace Specialty",
    body: "Tall, shallow, angled firebacks designed by Count Rumford in 1796. The original New England fireplace geometry. Restoring a butchered Rumford means rebuilding the firebox to the original proportions so it draws and radiates heat instead of smoking the room. We rebuild from photographs and the 1796 ratios.",
  },
  {
    eyebrow: "Beehive Bake Oven",
    title: "Beehive Bake Oven Restoration",
    body: "Domed brick ovens built into the back of center chimneys on saltboxes and capes. Most are collapsed, sealed up, or rebuilt with the wrong mortar. We rebuild the dome by hand, reset the floor brick on the original arch, and use lime mortar so the oven heats evenly and lasts another two centuries.",
  },
];

const TOWNS = [
  { name: "Bow", note: "Center chimney saltboxes along Route 3A, 1780 to 1840" },
  { name: "Henniker", note: "Federal-era farmhouses, Type O work documented across our portfolio" },
  { name: "Hopkinton", note: "Pre-1850 colonials and capes, dense pre-1900 stock" },
  { name: "Canterbury", note: "Shaker-period brick, 1797 onward, lime mortar standard" },
  { name: "Pembroke", note: "1820s mill-village colonials and Federals" },
  { name: "Concord", note: "1810 to 1900 brick stack work in the historic districts" },
  { name: "Loudon", note: "Cape and saltbox restoration, center chimneys" },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "On-site historic assessment",
    body: "Free. Owner-led visit, 60 to 90 minutes. We walk the chimney top to bottom, pull a mortar sample if appropriate, photograph existing conditions, and tell you what is original, what was butchered, and what we would do.",
  },
  {
    n: "02",
    title: "Photo documentation: before, during, after",
    body: "Every course of brick. Every joint raked out. Every dome rebuilt. Photo documentation goes in your file and a copy goes in the family archive. Restoration history matters when the next steward inherits the house.",
  },
  {
    n: "03",
    title: "Period-appropriate materials sourcing",
    body: "Type O lime mortar mixed on site. Period brick when ours is unsalvageable. Salvaged or hand-pressed brick matched to the existing courses. Mortar color matched, not painted on. Where possible, we reuse original brick after cleaning.",
  },
  {
    n: "04",
    title: "Final walkthrough and archive copy",
    body: "We walk the finished work with you on the roof and in the firebox. You get the full photo archive of the project on a drive or via shared link, plus a written summary of the work, materials, and warranty. The archive is yours forever.",
  },
];

const HISTORIC_TESTIMONIALS = testimonials.filter(
  (t) =>
    t.service === "Historic Fireplace & Masonry Restoration" ||
    /lime mortar|Type O|antique|1782|1797|1791|1804|1808|1820|beehive|rumford|federal/i.test(
      t.quote,
    ),
);

const FEATURED_TESTIMONIALS = HISTORIC_TESTIMONIALS.slice(0, 3);

const DIFFERENTIATORS = [
  {
    title: "We are central NH-based, not Vermont.",
    body: "Chimney Savers is the only other NH-facing operation that credibly claims historic restoration, and they run booked 4 to 8 weeks out from a Vermont base. Our trucks are on central New Hampshire rooftops every week. Most projects start within 3 weeks of the assessment.",
  },
  {
    title: "Chimney-first, not general masonry.",
    body: "Steppingstones Masonry covers stone walls and patios alongside chimneys. We are chimney-first by trade. Lime mortar, Rumford geometry, beehive ovens, center chimney restoration are the work, not a sideline.",
  },
  {
    title: "Documentation built for the next century.",
    body: "Every restoration we do leaves a photo archive in the homeowner's hands. When the house changes hands in 2050, the next steward inherits the proof of what was done, with what materials, and by whom.",
  },
];

export default function HistoricRestorationPage() {
  return (
    <>
      {/* ============== Hero (DARK) ============== */}
      <section
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
        style={{ background: "transparent" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(184,115,51,0.10) 0%, rgba(10,10,10,0) 55%), radial-gradient(ellipse at 80% 80%, rgba(127,42,31,0.12) 0%, rgba(10,10,10,0) 55%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">HISTORIC RESTORATION</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.7} distance={20}>
            <h1
              className="font-display text-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Lime mortar, center chimneys, and Federal-era fireboxes.
            </h1>
          </FadeUp>
          <FadeUp delay={0.25} duration={0.6} distance={16}>
            <p
              className="mx-auto mt-6 max-w-2xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Bow, Henniker, Hopkinton, Canterbury, and Pembroke are dense with pre-1900 housing stock. The chimneys, fireboxes, and beehive ovens in those homes were built with lime mortar and soft brick. Restoring them properly takes period-appropriate materials and a craftsman who knows the difference.
            </p>
          </FadeUp>
          <FadeUp delay={0.4} duration={0.6} distance={14}>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/booking" variant="primary">
                Book Inspection
              </Button>
              <Link
                href="#process"
                className="inline-flex items-center justify-center rounded-md border border-accent px-6 py-3 font-mono text-sm uppercase tracking-wider text-accent transition-all duration-200 hover:bg-accent hover:text-bg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                See Our Process
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============== What Historic Restoration Means (LIGHT) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--aged-mortar)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p
              className="text-eyebrow mb-3"
              style={{ color: "var(--primary)" }}
            >
              WHAT HISTORIC RESTORATION ACTUALLY MEANS
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              Three things every pre-1900 NH chimney needs done right.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} duration={0.6} distance={14}>
            <p
              className="mt-4 max-w-2xl text-base md:text-lg"
              style={{ color: "rgba(47,62,70,0.80)" }}
            >
              Restoration is not just sweeping or repointing. It is choosing the right mortar for the brick, restoring original geometry to the firebox, and rebuilding ovens that have been sealed shut for half a century.
            </p>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {SPECIALTIES.map((card, idx) => (
              <FadeUp
                key={card.title}
                delay={0.05 + idx * 0.08}
                duration={0.6}
                distance={16}
              >
                <article
                  className="flex h-full flex-col rounded-md border p-6 md:p-8"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    borderColor: "rgba(127,42,31,0.20)",
                  }}
                >
                  <p
                    className="font-mono text-[0.7rem] uppercase tracking-[0.12em]"
                    style={{ color: "var(--primary)" }}
                  >
                    {card.eyebrow}
                  </p>
                  <h3
                    className="mt-3 font-display text-h3 font-semibold"
                    style={{ color: "var(--granite-slate)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mt-4 text-sm leading-relaxed md:text-base"
                    style={{ color: "rgba(47,62,70,0.85)" }}
                  >
                    {card.body}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Where We Work (DARK) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">WHERE WE WORK</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              The towns with the densest pre-1900 housing stock.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} duration={0.6} distance={14}>
            <p
              className="mt-4 max-w-2xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Central New Hampshire was settled in waves between 1730 and 1850. The center-chimney capes and Federal-era farmhouses still standing today were built with lime mortar and need lime mortar to stay standing.
            </p>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {TOWNS.map((t, idx) => (
              <FadeUp
                key={t.name}
                delay={0.05 + idx * 0.05}
                duration={0.5}
                distance={12}
              >
                <article
                  className="flex h-full flex-col rounded-md border p-5"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(184,115,51,0.20)",
                  }}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-2 w-2 shrink-0 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <h3
                      className="font-display text-h4 font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.name}
                      <span
                        className="ml-2 font-mono text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        NH
                      </span>
                    </h3>
                  </div>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t.note}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Our Process (LIGHT) ============== */}
      <section
        id="process"
        className="relative py-20 md:py-28"
        style={{ background: "var(--aged-mortar)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p
              className="text-eyebrow mb-3"
              style={{ color: "var(--primary)" }}
            >
              OUR PROCESS
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              Four steps. Documented end to end.
            </h2>
          </FadeUp>

          <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <FadeUp
                key={step.n}
                delay={0.05 + idx * 0.08}
                duration={0.6}
                distance={14}
              >
                <li
                  className="flex h-full flex-col rounded-md border p-6 md:p-8"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    borderColor: "rgba(127,42,31,0.20)",
                  }}
                >
                  <span
                    className="font-mono text-xs tracking-[0.16em]"
                    style={{ color: "var(--primary)" }}
                  >
                    STEP {step.n}
                  </span>
                  <h3
                    className="mt-3 font-display text-h3 font-semibold"
                    style={{ color: "var(--granite-slate)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-4 text-sm leading-relaxed md:text-base"
                    style={{ color: "rgba(47,62,70,0.85)" }}
                  >
                    {step.body}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* ============== Founder Credibility (DARK) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 px-6 md:px-8 lg:grid-cols-[0.55fr_1fr] lg:gap-14 lg:px-12">
          <FadeUp duration={0.5} distance={14}>
            <div
              aria-hidden="true"
              className="flex aspect-[4/5] w-full items-center justify-center rounded-md border"
              style={{
                background: "var(--bg-card)",
                borderColor: "rgba(184,115,51,0.20)",
              }}
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <span
                  className="font-mono text-xs tracking-[0.18em]"
                  style={{ color: "var(--accent)" }}
                >
                  KEVIN FREDRICKSON
                </span>
                <span
                  className="font-display text-h2 font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  KF
                </span>
                <span
                  className="font-mono text-[0.65rem] uppercase tracking-[0.16em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Owner & Lead Craftsman
                </span>
              </div>
            </div>
          </FadeUp>

          <div>
            <FadeUp duration={0.5} distance={12}>
              <p className="text-eyebrow mb-3">CRAFTSMAN ON RECORD</p>
            </FadeUp>
            <FadeUp delay={0.1} duration={0.6} distance={16}>
              <h2
                className="font-display text-h2 font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {founder.yearsExperience}+ years on central NH chimneys.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2} duration={0.6} distance={14}>
              <p
                className="mt-4 text-base leading-relaxed md:text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                {founder.name} has spent his career on roofs and in fireboxes between Bow and the Lakes Region. The pre-1900 work is where the craft lives. He has rebuilt Federal fireboxes in Henniker, beehive ovens in Hopkinton, and Rumford geometry in 1808 colonials in Pembroke.
              </p>
            </FadeUp>
            <FadeUp delay={0.3} duration={0.6} distance={14}>
              <ul
                className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
                style={{ color: "var(--text-secondary)" }}
              >
                {founder.credentials.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    {c}
                  </li>
                ))}
                <li className="flex items-start gap-2 text-sm">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  Pursuing NH Preservation Alliance membership
                </li>
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ============== Testimonials (LIGHT) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--aged-mortar)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p
              className="text-eyebrow mb-3"
              style={{ color: "var(--primary)" }}
            >
              ON RECORD
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              Owners of Federal, Cape, and saltbox houses talking about the work.
            </h2>
          </FadeUp>

          {FEATURED_TESTIMONIALS.length === 0 ? (
            <p
              className="mt-8 text-sm"
              style={{ color: "rgba(47,62,70,0.7)" }}
            >
              Historic project testimonials are filed in the project archive. Reach out for case-study photos.
            </p>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {FEATURED_TESTIMONIALS.map((t, idx) => (
                <FadeUp
                  key={`${t.name}-${t.date}`}
                  delay={0.05 + idx * 0.08}
                  duration={0.6}
                  distance={16}
                >
                  <figure
                    className="flex h-full flex-col rounded-md border p-6 md:p-8"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      borderColor: "rgba(127,42,31,0.20)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="font-display text-h2"
                      style={{ color: "rgba(127,42,31,0.40)", lineHeight: 1 }}
                    >
                      &ldquo;
                    </span>
                    <blockquote
                      className="mt-3 text-sm leading-relaxed md:text-base"
                      style={{ color: "rgba(47,62,70,0.90)" }}
                    >
                      {t.quote}
                    </blockquote>
                    <figcaption
                      className="mt-5 border-t pt-4 font-mono text-[0.7rem] uppercase tracking-[0.12em]"
                      style={{
                        borderColor: "rgba(127,42,31,0.20)",
                        color: "var(--primary)",
                      }}
                    >
                      {t.name} &middot; {t.town} &middot; {t.service}
                    </figcaption>
                  </figure>
                </FadeUp>
              ))}
            </div>
          )}

          <FadeUp delay={0.3} duration={0.5} distance={12}>
            <div className="mt-10">
              <Link
                href="/testimonials"
                className="font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:text-primary"
                style={{ color: "var(--granite-slate)" }}
              >
                Read more testimonials &rarr;
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============== Why Us, Not Them (DARK) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-3">WHY US, NOT THEM</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={16}>
            <h2
              className="font-display text-h2 font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Three short reasons the historic work lives here.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} duration={0.6} distance={14}>
            <p
              className="mt-4 max-w-2xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              The two other operations claiming NH historic restoration are based in Vermont or work general masonry. Both are honest companies. Both have constraints. Here is the honest comparison.
            </p>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {DIFFERENTIATORS.map((d, idx) => (
              <FadeUp
                key={d.title}
                delay={0.05 + idx * 0.08}
                duration={0.6}
                distance={14}
              >
                <article
                  className="flex h-full flex-col rounded-md border p-6 md:p-8"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(184,115,51,0.20)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm"
                    style={{
                      background: "rgba(184,115,51,0.12)",
                      color: "var(--accent)",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <h3
                    className="mt-4 font-display text-h4 font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {d.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {d.body}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Final CTA (LIGHT) ============== */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--aged-mortar)" }}
      >
        <div className="mx-auto w-full max-w-4xl px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p
              className="text-eyebrow mb-4"
              style={{ color: "var(--primary)" }}
            >
              YOUR HOUSE WAS BUILT IN 1798
            </p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.6} distance={18}>
            <h2
              className="font-display text-display font-semibold"
              style={{ color: "var(--granite-slate)" }}
            >
              Restore it once. Document it forever.
            </h2>
          </FadeUp>
          <FadeUp delay={0.25} duration={0.6} distance={14}>
            <p
              className="mx-auto mt-5 max-w-2xl text-base md:text-lg"
              style={{ color: "rgba(47,62,70,0.85)" }}
            >
              Free historic assessment. Owner-led visit. Photo archive in your hands at the end of every project.
            </p>
          </FadeUp>
          <FadeUp delay={0.4} duration={0.6} distance={14}>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/booking" variant="primary">
                Book Inspection
              </Button>
              <a
                href={telHref(siteConfig.phoneTel)}
                className="inline-flex items-center justify-center rounded-md border px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-200"
                style={{
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                }}
              >
                Call {siteConfig.phone}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
