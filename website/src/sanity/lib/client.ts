/**
 * Sanity client. Reads project ID and dataset from public env vars
 * so the client is shared between server components and (future) preview hooks.
 *
 * Graceful degradation: if env vars are missing, `isSanityConfigured` is false
 * and `sanityClient` is null. Callers MUST check `isSanityConfigured` (or use
 * the `sanityFetch` helper) before issuing GROQ queries so the site does not
 * crash in environments where Sanity is not yet wired up.
 *
 * Cached: useCdn = true. The CDN serves stale-while-revalidate, which is
 * exactly what a marketing blog wants - fast reads, eventual consistency.
 */

import { createClient, type SanityClient } from "next-sanity";

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const sanityApiVersion = "2024-01-01";

export const isSanityConfigured: boolean = sanityProjectId.length > 0;

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
    })
  : null;

/**
 * Issue a GROQ query against Sanity. Returns `fallback` (default `null`) when
 * Sanity is not configured or the request errors. Never throws - this is the
 * single chokepoint that lets pages render an empty state instead of a 500.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T | null = null,
): Promise<T | null> {
  if (!sanityClient) return fallback;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (err) {
    console.error("[sanity] fetch error:", err);
    return fallback;
  }
}
