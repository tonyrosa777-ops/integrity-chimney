/**
 * generate-gallery.mjs
 *
 * fal.ai gallery generation for Integrity Chimney Services LLC.
 * 14 distinct prompts grounded in design-system.md Section 6.
 * Run from website/: node scripts/generate-gallery.mjs
 *
 * Requires FAL_KEY in .env.local (loaded via dotenv).
 * Outputs to website/public/images/gallery/{slug}.jpg
 * Writes a manifest at website/public/images/gallery/manifest.json
 */

import { fal } from "@fal-ai/client";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

loadEnv({ path: path.join(projectRoot, ".env.local") });

if (!process.env.FAL_KEY) {
  console.error("FAL_KEY not set. Aborting.");
  process.exit(1);
}

fal.config({ credentials: process.env.FAL_KEY });

const outputDir = path.join(projectRoot, "public", "images", "gallery");
await fs.mkdir(outputDir, { recursive: true });

const baseStyle =
  "documentary photojournalism, natural light, warm side-light, slight copper-brick color grade, subtle film grain, sharp focus, photorealistic, no text, no watermark, no signs, no labels, no readable lettering";

const prompts = [
  {
    slug: "01-spalled-brick-before",
    title: "Spalled brick before repointing",
    category: "masonry",
    aspect: "square_hd",
    prompt: `Macro detail of a weathered red brick chimney with severely spalled brick faces and crumbling mortar joints, lime dust visible, overcast daylight, ${baseStyle}, sharp focus on mortar deterioration`,
  },
  {
    slug: "02-repointed-brick-after",
    title: "Repointed brick after",
    category: "masonry",
    aspect: "square_hd",
    prompt: `Macro detail of a freshly repointed red brick chimney with crisp clean cream-colored lime mortar joints, new construction finish, soft daylight, ${baseStyle}`,
  },
  {
    slug: "03-chimney-sweep-rooftop",
    title: "Chimney sweep on rooftop",
    category: "chimney",
    aspect: "landscape_16_9",
    prompt: `Wide environmental shot of a craftsman in worn workwear and gloves cleaning a red brick chimney from a New England rooftop, chimney brush mid-stroke, autumn foliage in background, golden hour light, ${baseStyle}`,
  },
  {
    slug: "04-stainless-liner-install",
    title: "Stainless steel liner installation",
    category: "chimney",
    aspect: "landscape_16_9",
    prompt: `Mid-shot of a stainless steel 316Ti chimney liner being carefully lowered into a brick flue from rooftop perspective, liner gleaming silver, weathered grey shingles surrounding, overcast natural light, ${baseStyle}`,
  },
  {
    slug: "05-lime-mortar-hand",
    title: "Lime mortar repointing close-up",
    category: "historic",
    aspect: "portrait_4_3",
    prompt: `Close-up of hands in leather work gloves applying buttered lime mortar to a handmade-brick course with a period steel trowel, dust-mote backlight, shallow macro depth of field, cinematic warm side-light, ${baseStyle}`,
  },
  {
    slug: "06-polished-copper-cap",
    title: "Polished copper chimney cap",
    category: "chimney",
    aspect: "portrait_4_3",
    prompt: `A polished copper chimney cap freshly installed atop a red brick chimney, golden hour sunlight catching the metal surface, weathered roof shingles below, mature oak silhouettes in background, ${baseStyle}`,
  },
  {
    slug: "07-aerial-cape-roofline",
    title: "Aerial New England Cape with center chimney",
    category: "roofing",
    aspect: "landscape_16_9",
    prompt: `Drone overhead view of an autumn New Hampshire colonial Cape with full asphalt roof, central red brick chimney, copper flashing visible, surrounded by orange and yellow autumn trees, soft afternoon light, ${baseStyle}`,
  },
  {
    slug: "08-broken-crown-before",
    title: "Cracked chimney crown before",
    category: "chimney",
    aspect: "portrait_4_3",
    prompt: `Mid-shot of a crumbling chimney crown with deep cracks and missing mortar at the top of a tall red brick chimney, blue sky background, harsh natural midday light, sharp focus on damaged concrete cap, ${baseStyle}`,
  },
  {
    slug: "09-rebuilt-crown-after",
    title: "Rebuilt chimney crown after",
    category: "chimney",
    aspect: "portrait_4_3",
    prompt: `Mid-shot of a freshly rebuilt chimney crown with smooth poured concrete cap and crisp drip edge atop a red brick chimney, soft afternoon natural light, fine workmanship visible, ${baseStyle}`,
  },
  {
    slug: "10-beehive-bake-oven",
    title: "Restored historic beehive bake oven",
    category: "historic",
    aspect: "portrait_4_3",
    prompt: `Interior shot of an 18th-century brick beehive bake oven inside a colonial Federal-style fireplace, warm hearth-fire glow inside the dome, restored brickwork, antique iron fireplace tools visible, cinematic warm side-light, ${baseStyle}`,
  },
  {
    slug: "11-craftsman-ladder-approach",
    title: "Craftsman approaching chimney via ladder",
    category: "chimney",
    aspect: "landscape_16_9",
    prompt: `A craftsman in workwear and tool belt walking up an extension ladder toward a red brick chimney on a New England Cape roof, copper cap visible at top, autumn afternoon light, slight haze, ${baseStyle}`,
  },
  {
    slug: "12-flue-inspection-camera",
    title: "Level 2 flue inspection camera",
    category: "inspection",
    aspect: "portrait_4_3",
    prompt: `Macro close-up of a gloved hand holding a small chimney inspection camera at the opening of a brick flue, the camera screen glowing softly showing brick-flue interior, a clipboard at the bottom edge, natural daylight, ${baseStyle}`,
  },
  {
    slug: "13-historic-chimney-rebuild",
    title: "Historic chimney rebuild on Federal-style home",
    category: "historic",
    aspect: "landscape_16_9",
    prompt: `Wide environmental shot of a red brick chimney being rebuilt course by course on a colonial Federal-style white clapboard home, partial wooden scaffolding visible, late afternoon golden light, autumn New Hampshire setting, ${baseStyle}`,
  },
  {
    slug: "14-wood-stove-insert",
    title: "Wood-stove insert with stainless liner",
    category: "chimney",
    aspect: "portrait_4_3",
    prompt: `A black cast-iron wood-burning stove insert installed inside a historic red-brick fireplace, stainless steel liner connecting upward into the flue, warm orange ember glow inside the firebox, period iron hearth tools beside it, cinematic warm side-light, ${baseStyle}`,
  },
];

console.log(`Generating ${prompts.length} gallery images via fal.ai...\n`);

const manifest = [];
let okCount = 0;
let failCount = 0;

for (const p of prompts) {
  process.stdout.write(`[${p.slug}] `);
  const t0 = Date.now();
  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input: {
        prompt: p.prompt,
        image_size: p.aspect,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        enable_safety_checker: true,
        output_format: "jpeg",
      },
      logs: false,
    });

    const url = result?.data?.images?.[0]?.url;
    if (!url) {
      throw new Error("no image URL in response");
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = `${p.slug}.jpg`;
    await fs.writeFile(path.join(outputDir, filename), buf);

    manifest.push({
      slug: p.slug,
      title: p.title,
      category: p.category,
      aspect: p.aspect,
      file: `/images/gallery/${filename}`,
      bytes: buf.byteLength,
    });
    okCount++;
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`OK (${(buf.byteLength / 1024).toFixed(0)} KB, ${elapsed}s)`);
  } catch (err) {
    failCount++;
    console.log(`FAIL: ${err?.message ?? err}`);
  }
}

await fs.writeFile(
  path.join(outputDir, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log(`\nDone. ${okCount} ok, ${failCount} failed.`);
console.log(`Manifest: ${path.join(outputDir, "manifest.json")}`);
