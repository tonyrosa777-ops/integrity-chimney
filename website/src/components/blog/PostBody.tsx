/**
 * PostBody - Portable Text renderer for blog posts.
 * Server-component-safe.
 *
 * Custom renderers:
 *   - h2/h3: auto-generated id from text content for TOC anchor links.
 *   - image: Next/Image via the urlFor builder.
 *   - codeBlock: fenced <pre><code>.
 *   - simpleTable: <table> wrapped for horizontal scroll on small screens.
 */

import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractText(children: unknown): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    const props = (children as { props?: { children?: unknown } }).props;
    return extractText(props?.children);
  }
  return "";
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => {
      const id = slugifyHeading(extractText(children));
      return (
        <h2
          id={id}
          className="font-display mt-12 scroll-mt-32 text-h2 text-text-primary"
          style={{ fontWeight: 600 }}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const id = slugifyHeading(extractText(children));
      return (
        <h3
          id={id}
          className="font-display mt-10 scroll-mt-32 text-h3 text-text-primary"
          style={{ fontWeight: 600 }}
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4
        className="font-display mt-8 text-h4 text-text-primary"
        style={{ fontWeight: 600 }}
      >
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-base leading-[1.75] text-text-secondary">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-accent pl-5 italic text-text-secondary">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-5 text-text-secondary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-text-secondary">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-sm text-accent">
        {children}
      </code>
    ),
    underline: ({ children }) => <u>{children}</u>,
    link: ({ value, children }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const openInNewTab = Boolean(
        (value as { openInNewTab?: boolean } | undefined)?.openInNewTab,
      );
      return (
        <a
          href={href}
          {...(openInNewTab
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-text-primary"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const v = value as
        | {
            asset?: { _id?: string; url?: string };
            alt?: string;
            caption?: string;
          }
        | undefined;
      if (!v?.asset) return null;
      const src = urlFor(v).width(1600).quality(85).url();
      if (!src) return null;
      return (
        <figure className="mt-8 overflow-hidden rounded-lg border border-text-primary/10">
          <div className="relative aspect-[16/9] w-full bg-bg-elevated">
            <Image
              src={src}
              alt={v.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
            />
          </div>
          {v.caption ? (
            <figcaption className="bg-bg-card px-5 py-3 text-sm text-text-muted">
              {v.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    codeBlock: ({ value }) => {
      const v = value as { language?: string; code?: string } | undefined;
      if (!v?.code) return null;
      return (
        <pre className="mt-6 overflow-x-auto rounded-lg border border-text-primary/10 bg-bg-elevated p-4 font-mono text-sm leading-relaxed text-text-primary">
          <code data-language={v.language ?? "text"}>{v.code}</code>
        </pre>
      );
    },
    simpleTable: ({ value }) => {
      const v = value as
        | {
            caption?: string;
            rows?: Array<{ cells?: string[] }>;
          }
        | undefined;
      const rows = v?.rows ?? [];
      if (rows.length === 0) return null;
      const [headerRow, ...bodyRows] = rows;
      return (
        <div className="mt-6 overflow-x-auto rounded-lg border border-text-primary/10">
          <table className="min-w-full divide-y divide-text-primary/10 text-sm">
            {headerRow?.cells ? (
              <thead className="bg-bg-elevated">
                <tr>
                  {headerRow.cells.map((cell, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-4 py-3 text-left font-mono text-[0.7rem] uppercase tracking-[0.1em] text-accent"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody className="divide-y divide-text-primary/10">
              {bodyRows.map((row, ri) => (
                <tr key={ri}>
                  {(row.cells ?? []).map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-3 text-text-secondary"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {v?.caption ? (
            <p className="bg-bg-card px-4 py-2 text-xs text-text-muted">
              {v.caption}
            </p>
          ) : null}
        </div>
      );
    },
  },
};

export type PostBodyProps = {
  value: PortableTextBlock[] | undefined | null;
};

export function PostBody({ value }: PostBodyProps) {
  if (!value || value.length === 0) {
    return (
      <p className="mt-6 text-text-muted">
        This post is being prepared. Check back soon.
      </p>
    );
  }
  return <PortableText value={value} components={components} />;
}

export default PostBody;
