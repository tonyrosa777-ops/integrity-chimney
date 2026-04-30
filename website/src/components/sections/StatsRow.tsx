/**
 * StatsRow.tsx - 3 CountUp stats. Light-elevated tone (aged-mortar).
 * Pulled from siteConfig + testimonials + serviceAreas counts.
 */

"use client";

import { motion } from "framer-motion";
import { CountUp, FadeUp, StaggerContainer, staggerItem } from "@/components/animations";
import { serviceAreas, siteConfig, testimonials } from "@/data/site";

type Stat = {
  end: number;
  suffix: string;
  label: string;
  detail: string;
};

export function StatsRow() {
  const stats: Stat[] = [
    {
      end: siteConfig.yearsExperience,
      suffix: "+",
      label: "Years on Bow rooftops",
      detail: `Owner-operated since ${siteConfig.founded}. Kevin Fredrickson on every job.`,
    },
    {
      end: testimonials.length,
      suffix: "+",
      label: "5-star inspections logged",
      detail: "Photographed reports, written next-day. Every visit, every flue.",
    },
    {
      end: serviceAreas.length,
      suffix: "",
      label: "Central NH towns covered",
      detail: "Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke. Same-week scheduling.",
    },
  ];

  return (
    <section
      aria-labelledby="stats-heading"
      className="relative w-full bg-aged-mortar py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <FadeUp delay={0} duration={0.6} distance={18}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow mb-4 text-primary">By the numbers</p>
            <h2
              id="stats-heading"
              className="font-display text-h1 text-granite-slate"
              style={{ fontWeight: 600 }}
            >
              The kind of record only a small crew that shows up can build.
            </h2>
          </div>
        </FadeUp>

        <StaggerContainer
          staggerDelay={0.18}
          className="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="flex flex-col items-center rounded-lg border border-primary/15 bg-white/70 p-7 text-center shadow-sm md:p-9"
            >
              <CountUp
                end={stat.end}
                suffix={stat.suffix}
                duration={1.8}
                className="font-display text-5xl text-primary md:text-6xl lg:text-7xl"
              />
              <p
                className="font-mono mt-3 text-xs uppercase tracking-[0.14em] text-accent md:text-sm"
              >
                {stat.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-granite-slate/80 md:text-base">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default StatsRow;
