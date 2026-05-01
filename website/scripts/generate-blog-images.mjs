/**
 * generate-blog-images.mjs
 * 20 fal.ai images for the blog: 1 card (16:9) + 1 header (16:9 wider) per article.
 * All prompts distinct, grounded in design-system.md Section 6 photography style.
 * Run from website/: node scripts/generate-blog-images.mjs
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

const outputDir = path.join(projectRoot, "public", "images", "blog");
await fs.mkdir(outputDir, { recursive: true });

const baseStyle =
  "documentary photojournalism, natural light, warm side-light, slight copper-brick color grade, subtle film grain, sharp focus, photorealistic, no text, no watermark, no signs, no labels, no readable lettering";

// Each article gets a card image (preview) + a header image (article hero).
// Prompts are visually distinct WITHIN each article AND across all articles.
const prompts = [
  // 01 — chimney sweep cost NH
  {
    slug: "01-sweep-cost-card",
    aspect: "landscape_16_9",
    prompt: `Close-up of a worn leather work glove holding a folded paper invoice and a chimney sweep brush handle on a wooden workbench, autumn light through a window, ${baseStyle}`,
  },
  {
    slug: "01-sweep-cost-header",
    aspect: "landscape_16_9",
    prompt: `Wide environmental shot of a craftsman in workwear emerging from a New England Cape attic hatch with a sweep brush over his shoulder, soft afternoon light filtering through dormer windows, ${baseStyle}`,
  },

  // 02 — Level 2 inspection
  {
    slug: "02-level2-card",
    aspect: "landscape_16_9",
    prompt: `Top-down macro view of a tablet displaying a chimney inspection PDF report on a kitchen counter beside a clipboard, brick chimney visible blurred in the background, soft natural daylight, ${baseStyle}`,
  },
  {
    slug: "02-level2-header",
    aspect: "landscape_16_9",
    prompt: `Mid-shot of a craftsman lowering a chimney inspection camera on a flexible cable down into a brick flue from a rooftop, the camera's small screen glowing softly with brick interior visible, overcast natural daylight, ${baseStyle}`,
  },

  // 03 — stainless steel liner
  {
    slug: "03-ss-liner-card",
    aspect: "landscape_16_9",
    prompt: `Macro detail of a stainless steel 316Ti chimney liner section coiled on a concrete patio next to a brick chimney base, stainless surface gleaming subtly, golden hour light, ${baseStyle}`,
  },
  {
    slug: "03-ss-liner-header",
    aspect: "landscape_16_9",
    prompt: `Wide environmental shot of two craftsmen on a New England rooftop guiding a long stainless steel chimney liner as it descends into a tall red brick chimney, autumn foliage background, soft afternoon light, ${baseStyle}`,
  },

  // 04 — lime mortar vs portland
  {
    slug: "04-lime-mortar-card",
    aspect: "landscape_16_9",
    prompt: `Macro side-by-side comparison: left half shows softly weathered cream-colored lime mortar joints in handmade red brick, right half shows hard grey portland cement in modern brick, natural overcast daylight, ${baseStyle}`,
  },
  {
    slug: "04-lime-mortar-header",
    aspect: "landscape_16_9",
    prompt: `Wide environmental shot of a Federal-era 1798 white clapboard New Hampshire home with a tall central red brick chimney, surrounded by mature oaks turning autumn gold, late afternoon side-light, ${baseStyle}`,
  },

  // 05 — chimney fire warning signs
  {
    slug: "05-fire-signs-card",
    aspect: "landscape_16_9",
    prompt: `Macro close-up of thick black creosote glaze coating the inside wall of a brick chimney flue, photographed through a chimney inspection camera with subtle depth of field, soft side-lit, ${baseStyle}`,
  },
  {
    slug: "05-fire-signs-header",
    aspect: "landscape_16_9",
    prompt: `Wide dramatic environmental shot of a New Hampshire winter night with snow on the rooftops, glowing windows of a Cape, and a tall brick chimney releasing thin grey smoke against a deep blue twilight sky, no flames visible, atmospheric and quiet, ${baseStyle}`,
  },

  // 06 — selling home NH chimney
  {
    slug: "06-pre-sale-card",
    aspect: "landscape_16_9",
    prompt: `Mid-shot of a real estate For Sale sign in a snow-dusted front yard with a New England colonial home in the background, brick chimney visible above the roofline, late winter morning light, ${baseStyle}`,
  },
  {
    slug: "06-pre-sale-header",
    aspect: "landscape_16_9",
    prompt: `Environmental shot of a realtor in a wool coat and a homeowner couple standing in a snowy driveway looking up at a tall red brick chimney on a colonial home, neutral gestures, soft winter overcast light, ${baseStyle}`,
  },

  // 07 — federal-era center chimneys
  {
    slug: "07-federal-card",
    aspect: "landscape_16_9",
    prompt: `Architectural close-up of a massive central red brick chimney rising through the cedar-shake roof of a 1780s Federal-era New Hampshire colonial home, the brick weathered to a deep umber, late afternoon golden light, ${baseStyle}`,
  },
  {
    slug: "07-federal-header",
    aspect: "landscape_16_9",
    prompt: `Wide architectural environmental shot of a 1798 Federal-era New Hampshire white clapboard home, two-story symmetrical facade, twelve-over-twelve windows, central brick chimney prominent, mature stone wall in the foreground, autumn side-light, ${baseStyle}`,
  },

  // 08 — Rumford fireplace
  {
    slug: "08-rumford-card",
    aspect: "landscape_16_9",
    prompt: `Interior macro shot of a tall narrow Rumford fireplace firebox with angled brick rear wall, small warm fire burning in a colonial parlor, period iron andirons, cinematic warm side-light, ${baseStyle}`,
  },
  {
    slug: "08-rumford-header",
    aspect: "landscape_16_9",
    prompt: `Wide interior environmental shot of a restored colonial parlor with a tall narrow Rumford fireplace as the centerpiece, wide-plank pine floors, period furnishings, hearth fire glowing warmly, soft late afternoon light through small-pane windows, ${baseStyle}`,
  },

  // 09 — crown vs cap
  {
    slug: "09-crown-cap-card",
    aspect: "landscape_16_9",
    prompt: `Top-down close-up of a freshly poured concrete chimney crown with a polished copper rain cap mounted above the flue opening, blue sky background, sharp natural daylight, ${baseStyle}`,
  },
  {
    slug: "09-crown-cap-header",
    aspect: "landscape_16_9",
    prompt: `Mid-shot from a rooftop of a craftsman troweling fresh concrete onto the top of a tall red brick chimney to form a new crown, copper cap pieces laid out on the shingle nearby, warm afternoon side-light, ${baseStyle}`,
  },

  // 10 — ice dams chimney flashing
  {
    slug: "10-ice-dams-card",
    aspect: "landscape_16_9",
    prompt: `Close-up of thick icicles hanging from a copper chimney flashing where the brick chimney meets a snowy New England roof, late winter light, sharp focus on the ice formation, ${baseStyle}`,
  },
  {
    slug: "10-ice-dams-header",
    aspect: "landscape_16_9",
    prompt: `Wide architectural shot of a snow-covered New Hampshire colonial roof with prominent ice dams along the eaves, a tall red brick chimney rising through the roof with copper flashing visible, deep winter light, ${baseStyle}`,
  },
];

console.log(`Generating ${prompts.length} blog images via fal.ai...\n`);

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
    if (!url) throw new Error("no image URL in response");

    const res = await fetch(url);
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = `${p.slug}.jpg`;
    await fs.writeFile(path.join(outputDir, filename), buf);

    manifest.push({
      slug: p.slug,
      aspect: p.aspect,
      file: `/images/blog/${filename}`,
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
