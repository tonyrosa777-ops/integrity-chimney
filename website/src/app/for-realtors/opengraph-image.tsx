/**
 * /for-realtors opengraph-image.tsx - realtor B2B OG card.
 * 1200×630.
 */

import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Level 2 chimney inspection for real estate transactions. $295, 24-hour PDF report.";

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
            "linear-gradient(135deg, #0a0a0a 0%, #2F3E46 65%, #B87333 130%)",
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
          For Realtors · NHAR-Aligned
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.0,
              color: "#f5f5f5",
              display: "flex",
            }}
          >
            $295 · 24-Hour PDF
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
            Level 2 chimney inspections built for closing dates. Same-week scheduling across central NH.
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
            integritychimney.com/for-realtors
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
