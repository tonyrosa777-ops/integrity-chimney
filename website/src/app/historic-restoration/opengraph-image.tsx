/**
 * /historic-restoration opengraph-image.tsx - heritage flagship OG card.
 * 1200×630.
 */

import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Historic chimney restoration on NH heritage homes. Lime mortar, Rumford, beehive ovens.";

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
            "linear-gradient(135deg, #0a0a0a 0%, #2F3E46 55%, #7F2A1F 120%)",
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
          Historic Restoration
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#f5f5f5",
              display: "flex",
            }}
          >
            Historic Chimney Restoration
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#E9E2D4",
              lineHeight: 1.3,
              maxWidth: 980,
              display: "flex",
            }}
          >
            Lime mortar repointing, Rumford fireplaces, and beehive bake ovens on NH heritage stock.
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
            NH Heritage Stock
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
