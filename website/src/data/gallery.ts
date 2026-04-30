/**
 * gallery.ts - Single source of truth for /gallery page images.
 * Generated 2026-04-30 via fal-ai/flux-pro/v1.1 from prompts grounded
 * in design-system.md Section 6. Real photography swap-in: replace
 * file paths in /public/images/gallery/ with photographer's deliverables.
 */

export type GalleryCategory =
  | "chimney"
  | "masonry"
  | "roofing"
  | "historic"
  | "inspection";

export type GalleryAspect = "square_hd" | "landscape_16_9" | "portrait_4_3";

export type GalleryItem = {
  slug: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  aspect: GalleryAspect;
  file: string;
  width: number;
  height: number;
  pairWith?: string; // slug of the other half of a before/after pair
};

export const galleryItems: GalleryItem[] = [
  {
    slug: "01-spalled-brick-before",
    title: "Spalled brick, before repointing",
    caption:
      "Decades of freeze-thaw cycles in central NH break down old soft mortar. We document the condition before we touch a single joint.",
    category: "masonry",
    aspect: "square_hd",
    file: "/images/gallery/01-spalled-brick-before.jpg",
    width: 1024,
    height: 1024,
    pairWith: "02-repointed-brick-after",
  },
  {
    slug: "02-repointed-brick-after",
    title: "Repointed brick, after",
    caption:
      "Type O lime mortar applied joint by joint. The character of the original brickwork is preserved. The chimney is good for another century.",
    category: "masonry",
    aspect: "square_hd",
    file: "/images/gallery/02-repointed-brick-after.jpg",
    width: 1024,
    height: 1024,
    pairWith: "01-spalled-brick-before",
  },
  {
    slug: "03-chimney-sweep-rooftop",
    title: "Sweep in progress, Bow",
    caption:
      "Top-down brushing with a HEPA vacuum at the firebox. Drop cloths on every floor between. We leave the home cleaner than we found it.",
    category: "chimney",
    aspect: "landscape_16_9",
    file: "/images/gallery/03-chimney-sweep-rooftop.jpg",
    width: 1280,
    height: 720,
  },
  {
    slug: "04-stainless-liner-install",
    title: "316Ti stainless liner, install day",
    caption:
      "Smooth-wall 316Ti dropped into a turn-of-the-century flue, anchored at the cap and connector. Lifetime warranty against corrosion.",
    category: "chimney",
    aspect: "landscape_16_9",
    file: "/images/gallery/04-stainless-liner-install.jpg",
    width: 1280,
    height: 720,
  },
  {
    slug: "05-lime-mortar-hand",
    title: "Lime mortar, by hand",
    caption:
      "Period-appropriate Type O lime mortar applied with a trowel matched to the original 18th-century joint width. Portland cement is never used on pre-1900 brick.",
    category: "historic",
    aspect: "portrait_4_3",
    file: "/images/gallery/05-lime-mortar-hand.jpg",
    width: 768,
    height: 1024,
  },
  {
    slug: "06-polished-copper-cap",
    title: "Custom copper cap, golden hour",
    caption:
      "Standing-seam copper cap fabricated to fit the exact crown footprint. It will patina to a deep umber over the next decade and outlast the roof.",
    category: "chimney",
    aspect: "portrait_4_3",
    file: "/images/gallery/06-polished-copper-cap.jpg",
    width: 768,
    height: 1024,
  },
  {
    slug: "07-aerial-cape-roofline",
    title: "Cape rooftop, autumn inspection",
    caption:
      "Aerial view of an Exterior Envelope inspection: the chimney, roof, valleys, and flashing all sized up in a single visit. One quote, one warranty.",
    category: "roofing",
    aspect: "landscape_16_9",
    file: "/images/gallery/07-aerial-cape-roofline.jpg",
    width: 1280,
    height: 720,
  },
  {
    slug: "08-broken-crown-before",
    title: "Cracked crown, before",
    caption:
      "When the crown lets water in, every freeze drives the cracks deeper. This is what triggers most of the structural rebuilds we get called for.",
    category: "chimney",
    aspect: "portrait_4_3",
    file: "/images/gallery/08-broken-crown-before.jpg",
    width: 768,
    height: 1024,
    pairWith: "09-rebuilt-crown-after",
  },
  {
    slug: "09-rebuilt-crown-after",
    title: "Rebuilt crown, after",
    caption:
      "New crown with proper drip edge and a 30-year sealant under the cap. Water sheds away from the brick, not into it.",
    category: "chimney",
    aspect: "portrait_4_3",
    file: "/images/gallery/09-rebuilt-crown-after.jpg",
    width: 768,
    height: 1024,
    pairWith: "08-broken-crown-before",
  },
  {
    slug: "10-beehive-bake-oven",
    title: "Beehive bake oven, restored",
    caption:
      "An 18th-century beehive bake oven brought back to working order in a Henniker Federal. Original brick, period-correct dome, ready for the first loaf.",
    category: "historic",
    aspect: "portrait_4_3",
    file: "/images/gallery/10-beehive-bake-oven.jpg",
    width: 768,
    height: 1024,
  },
  {
    slug: "11-craftsman-ladder-approach",
    title: "On the way up",
    caption:
      "Every job begins from the roof, not from a clipboard in the kitchen. We climb up first, take photos, then explain what we found.",
    category: "chimney",
    aspect: "landscape_16_9",
    file: "/images/gallery/11-craftsman-ladder-approach.jpg",
    width: 1280,
    height: 720,
  },
  {
    slug: "12-flue-inspection-camera",
    title: "Level 2 inspection in progress",
    caption:
      "A Level 2 inspection means a camera goes down every flue. Real estate clients get a written PDF report with photos within 24 hours of the visit.",
    category: "inspection",
    aspect: "portrait_4_3",
    file: "/images/gallery/12-flue-inspection-camera.jpg",
    width: 768,
    height: 1024,
  },
  {
    slug: "13-historic-chimney-rebuild",
    title: "Center chimney rebuild, Federal-era",
    caption:
      "A complete center chimney rebuild on a 1782 Federal in Hopkinton. Salvaged original brick where possible, period-matched replacements where not.",
    category: "historic",
    aspect: "landscape_16_9",
    file: "/images/gallery/13-historic-chimney-rebuild.jpg",
    width: 1280,
    height: 720,
  },
  {
    slug: "14-wood-stove-insert",
    title: "Wood-stove insert, lined and ready",
    caption:
      "An EPA-rated insert dropped into a historic firebox with a fresh stainless liner. Modern heating efficiency without losing the original hearth.",
    category: "chimney",
    aspect: "portrait_4_3",
    file: "/images/gallery/14-wood-stove-insert.jpg",
    width: 768,
    height: 1024,
  },
];

export const galleryCategories: Array<{
  id: GalleryCategory | "all";
  label: string;
}> = [
  { id: "all", label: "All Work" },
  { id: "chimney", label: "Chimney" },
  { id: "masonry", label: "Masonry" },
  { id: "roofing", label: "Roofing" },
  { id: "historic", label: "Historic Restoration" },
  { id: "inspection", label: "Inspections" },
];
