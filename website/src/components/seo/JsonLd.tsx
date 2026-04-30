/**
 * JsonLd.tsx - base server-rendered JSON-LD <script> tag.
 *
 * Renders the structured data inline in the page's HTML so search engines and
 * AI engines (ChatGPT, Perplexity, Claude) read it during the initial crawl
 * without needing to execute client JS. React 19 streaming-safe.
 *
 * Use directly when you have an arbitrary schema.org payload, or use one of
 * the typed wrappers (LocalBusinessSchema, BreadcrumbSchema, FAQSchema, etc.)
 * which compose this component with the right shape.
 */

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- structured-data injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
