/**
 * Sanity image-url helper. Returns a builder that components chain on
 * (e.g. urlFor(image).width(1200).height(630).url()).
 *
 * Graceful: if Sanity is not configured, returns a builder-shaped stub whose
 * .url() yields an empty string so callers can fall back to placeholder UI
 * without crashing.
 */

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import {
  sanityProjectId,
  sanityDataset,
  isSanityConfigured,
} from "./client";

const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId: sanityProjectId, dataset: sanityDataset })
  : null;

type ChainableBuilder = {
  width: (n: number) => ChainableBuilder;
  height: (n: number) => ChainableBuilder;
  fit: (mode: string) => ChainableBuilder;
  quality: (n: number) => ChainableBuilder;
  auto: (mode: string) => ChainableBuilder;
  url: () => string;
};

const stubBuilder: ChainableBuilder = {
  width: () => stubBuilder,
  height: () => stubBuilder,
  fit: () => stubBuilder,
  quality: () => stubBuilder,
  auto: () => stubBuilder,
  url: () => "",
};

export function urlFor(source: SanityImageSource | null | undefined) {
  if (!builder || !source) return stubBuilder;
  return builder.image(source);
}
