/**
 * Root opengraph-image.tsx - site-level OG card.
 * 1200×630, brand-locked palette (Heritage Brick + Hearth Copper on Granite Slate).
 *
 * Per Stage 1F spec, hardcoded hex values are permitted ONLY inside
 * opengraph-image.tsx files (ImageResponse rendering needs literal colors).
 * Palette: bg-base #0a0a0a, primary #7F2A1F, accent #B87333,
 *          text #f5f5f5, granite #2F3E46, mortar #E9E2D4.
 */

import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Integrity Chimney Services LLC. Bow, NH chimney, masonry, and roofing.";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #2F3E46 60%, #7F2A1F 110%)",
          color: "#f5f5f5",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#B87333",
            display: "flex",
          }}
        >
          Bow, NH · Chimney · Masonry · Roofing
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 1000,
              color: "#f5f5f5",
              display: "flex",
            }}
          >
            One craftsman who answers the phone.
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#E9E2D4",
              lineHeight: 1.25,
              maxWidth: 950,
              display: "flex",
            }}
          >
            Owner-operated chimney, masonry, and roofing across central New Hampshire.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #B87333",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#f5f5f5",
              display: "flex",
            }}
          >
            Integrity Chimney Services LLC
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#B87333",
              letterSpacing: 4,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            integritychimney.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
