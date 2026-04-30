"use client";

/**
 * TableOfContents - generated from H2 headings in a post body.
 * Sticky on desktop; highlights the active section as the reader scrolls.
 *
 * Inputs are computed server-side and passed in as a list of { id, text }.
 * (We extract these from the raw Portable Text blocks on the page.)
 */

import { useEffect, useState } from "react";

export type TocEntry = { id: string; text: string };

export type TableOfContentsProps = {
  entries: TocEntry[];
};

export function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(
    entries[0]?.id ?? null,
  );

  useEffect(() => {
    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 1] },
    );

    entries.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto"
    >
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
        On this page
      </p>
      <ul className="mt-4 space-y-2 border-l border-text-primary/10">
        {entries.map(({ id, text }) => {
          const isActive = id === activeId;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={[
                  "block border-l-2 -ml-px py-1 pl-4 text-sm transition-colors",
                  isActive
                    ? "border-accent text-text-primary"
                    : "border-transparent text-text-muted hover:text-text-secondary",
                ].join(" ")}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TableOfContents;
