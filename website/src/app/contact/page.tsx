import type { Metadata } from "next";
import { FadeUp } from "@/components/animations";
import { services, siteConfig } from "@/data/site";
import { telHref } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

/**
 * /contact - hero + two-column grid (form on left, info card on right).
 * Form posts to /api/contact (Resend).
 */

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call (603) 660-4644 or email IntegrityChimney1@gmail.com. We answer the phone in Bow, NH. If we miss, we call back within four business hours.",
  openGraph: {
    title: "Contact Integrity Chimney Services LLC | Bow, NH",
    description:
      "Call, email, or fill out the form. Bow, NH chimney, masonry, and roofing. Four-hour callback guaranteed during business hours.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Integrity Chimney Services LLC | Bow, NH",
    description:
      "Call, email, or fill out the form. Bow, NH chimney, masonry, and roofing. Four-hour callback guaranteed during business hours.",
  },
};

const MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${siteConfig.address.city}, ${siteConfig.address.state}`,
)}&output=embed&hl=en`;

export default function ContactPage() {
  const serviceOptions = services.map((s) => s.name);

  return (
    <>
      {/* ============== Hero ============== */}
      <section
        className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
        style={{ background: "transparent" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 0%, rgba(184,115,51,0.10) 0%, rgba(10,10,10,0) 55%), radial-gradient(ellipse at 20% 100%, rgba(127,42,31,0.08) 0%, rgba(10,10,10,0) 50%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center md:px-8 lg:px-12">
          <FadeUp duration={0.5} distance={12}>
            <p className="text-eyebrow mb-4">CONTACT</p>
          </FadeUp>
          <FadeUp delay={0.1} duration={0.7} distance={20}>
            <h1
              className="text-display font-display font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Call, email, or send a message.
            </h1>
          </FadeUp>
          <FadeUp delay={0.25} duration={0.6} distance={16}>
            <p
              className="mx-auto mt-6 max-w-2xl text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {`We answer the phone first. If we miss your call, we call back within 4 business hours. Use the form below for non-urgent questions, real estate timelines, or anything you would rather put in writing.`}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============== Two-column ============== */}
      <section
        className="relative py-16 md:py-24"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-12">
          {/* LEFT: Form */}
          <div>
            <FadeUp duration={0.5} distance={12}>
              <p
                className="text-eyebrow mb-3"
                style={{ color: "var(--accent)" }}
              >
                SEND A MESSAGE
              </p>
            </FadeUp>
            <FadeUp delay={0.05} duration={0.6} distance={16}>
              <h2
                className="text-h2 font-display font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Tell us what is going on.
              </h2>
            </FadeUp>
            <FadeUp delay={0.15} duration={0.6} distance={14}>
              <p
                className="mt-3 text-sm md:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                A few details, a phone number we can reach you at, and we
                will follow up the same business day.
              </p>
            </FadeUp>

            <div className="mt-8">
              <ContactForm services={serviceOptions} />
            </div>
          </div>

          {/* RIGHT: Info card */}
          <div>
            <FadeUp delay={0.1} duration={0.6} distance={16}>
              <aside
                className="flex flex-col gap-6 rounded-md border p-6 md:p-8"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "rgba(184,115,51,0.20)",
                }}
              >
                <div>
                  <p
                    className="text-eyebrow mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    DIRECT LINES
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href={telHref(siteConfig.phone)}
                      className="group flex items-center gap-3"
                    >
                      <PhoneIcon />
                      <span
                        className="font-mono text-base tracking-wider transition-colors group-hover:text-accent md:text-lg"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {siteConfig.phone}
                      </span>
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="group flex items-center gap-3 break-all"
                    >
                      <MailIcon />
                      <span
                        className="text-sm transition-colors group-hover:text-accent md:text-base"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {siteConfig.email}
                      </span>
                    </a>
                  </div>
                </div>

                <div>
                  <p
                    className="text-eyebrow mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    BASED IN
                  </p>
                  <div
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-2"
                    style={{
                      background: "transparent",
                      borderColor: "rgba(184,115,51,0.20)",
                    }}
                  >
                    <PinIcon />
                    <span
                      className="font-mono text-sm tracking-wider"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {`${siteConfig.address.city}, ${siteConfig.address.state}`}
                    </span>
                  </div>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {`Serving ${siteConfig.address.region}: Concord, Hopkinton, Henniker, Loudon, Pembroke, Canterbury, and the surrounding towns.`}
                  </p>
                </div>

                <div>
                  <p
                    className="text-eyebrow mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    SERVICE AREA
                  </p>
                  <div
                    className="overflow-hidden rounded-md border"
                    style={{ borderColor: "rgba(184,115,51,0.18)" }}
                  >
                    <iframe
                      src={MAPS_EMBED_SRC}
                      title={`${siteConfig.address.city}, ${siteConfig.address.state} service area map`}
                      width="100%"
                      height="280"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen={false}
                      style={{ border: 0, display: "block" }}
                    />
                  </div>
                </div>
              </aside>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}

/* =============================================================
   Icons (inline, currentColor, accent-tinted)
   ============================================================= */

function PhoneIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 items-center justify-center rounded-md"
      style={{
        background: "rgba(184,115,51,0.12)",
        color: "var(--accent)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
      </svg>
    </span>
  );
}

function MailIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 items-center justify-center rounded-md"
      style={{
        background: "rgba(184,115,51,0.12)",
        color: "var(--accent)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3 7 12 13 21 7" />
      </svg>
    </span>
  );
}

function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "var(--accent)" }}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
