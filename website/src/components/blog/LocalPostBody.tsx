import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export type TocEntry = { id: string; text: string };

export function extractTocFromMarkdown(body: string): TocEntry[] {
  const out: TocEntry[] = [];
  const lines = body.split("\n");
  for (const line of lines) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) {
      const text = m[1].trim();
      if (text) out.push({ id: slugifyHeading(text), text });
    }
  }
  return out;
}

export function LocalPostBody({ body }: { body: string }) {
  return (
    <div className="prose-blog max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => {
            const text = String(
              Array.isArray(children) ? children.join("") : children ?? ""
            );
            const id = slugifyHeading(text);
            return (
              <h2
                id={id}
                className="font-display mt-12 text-h2 text-text-primary scroll-mt-32"
                style={{ fontWeight: 600 }}
              >
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = String(
              Array.isArray(children) ? children.join("") : children ?? ""
            );
            const id = slugifyHeading(text);
            return (
              <h3
                id={id}
                className="font-display mt-8 text-h3 text-text-primary scroll-mt-32"
                style={{ fontWeight: 600 }}
              >
                {children}
              </h3>
            );
          },
          p: ({ children }) => (
            <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
              {children}
            </p>
          ),
          a: ({ href, children }) => {
            const url = href ?? "#";
            const isInternal = url.startsWith("/") || url.startsWith("#");
            if (isInternal) {
              return (
                <Link
                  href={url}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                {children}
              </a>
            );
          },
          ul: ({ children }) => (
            <ul className="mt-5 list-disc space-y-2 pl-6 text-base text-text-secondary md:text-lg">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-5 list-decimal space-y-2 pl-6 text-base text-text-secondary md:text-lg">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-8 rounded-md border-l-4 border-accent bg-bg-card px-6 py-4 text-base italic leading-relaxed text-text-secondary md:text-lg">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isBlock = (className ?? "").includes("language-");
            if (isBlock) {
              return (
                <pre className="mt-5 overflow-x-auto rounded-md bg-bg-elevated p-4 font-mono text-sm text-text-primary">
                  <code>{children}</code>
                </pre>
              );
            }
            return (
              <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-[0.9em] text-text-primary">
                {children}
              </code>
            );
          },
          strong: ({ children }) => (
            <strong className="font-semibold text-text-primary">
              {children}
            </strong>
          ),
          hr: () => <hr className="my-12 border-text-primary/10" />,
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
