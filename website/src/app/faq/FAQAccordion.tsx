"use client";

import * as Accordion from "@radix-ui/react-accordion";

type FaqItem = { q: string; a: string; category?: string };

type FAQAccordionProps = {
  items: FaqItem[];
  groupId: string;
};

/**
 * Radix-based accordion with animated chevron on expand.
 * Multiple items can be open at once. Mobile-first.
 */
export function FAQAccordion({ items, groupId }: FAQAccordionProps) {
  return (
    <Accordion.Root
      type="multiple"
      className="flex flex-col gap-3"
      aria-label={`${groupId} questions`}
    >
      {items.map((item, idx) => {
        const value = `${slugify(groupId)}-${idx}`;
        return (
          <Accordion.Item
            key={value}
            value={value}
            className="overflow-hidden rounded-md border"
            style={{
              background: "var(--bg-card)",
              borderColor: "rgba(184,115,51,0.18)",
            }}
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger
                className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[rgba(184,115,51,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base md:px-6 md:py-5"
              >
                <span
                  className="font-display text-base font-semibold md:text-lg"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.q}
                </span>
                <Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="faq-accordion-content overflow-hidden">
              <div
                className="px-5 pb-5 text-sm leading-relaxed md:px-6 md:pb-6 md:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.a}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}

      <style>{`
        .faq-accordion-content[data-state="open"] {
          animation: faq-accordion-down 240ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .faq-accordion-content[data-state="closed"] {
          animation: faq-accordion-up 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes faq-accordion-down {
          from { height: 0; opacity: 0; }
          to { height: var(--radix-accordion-content-height); opacity: 1; }
        }
        @keyframes faq-accordion-up {
          from { height: var(--radix-accordion-content-height); opacity: 1; }
          to { height: 0; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-accordion-content[data-state="open"],
          .faq-accordion-content[data-state="closed"] {
            animation: none;
          }
        }
      `}</style>
    </Accordion.Root>
  );
}

function Chevron() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180"
      style={{ color: "var(--accent)" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
