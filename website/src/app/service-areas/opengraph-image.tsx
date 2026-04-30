/**
 * /service-areas opengraph-image.tsx - service-areas hub OG card.
 * 1200×630.
 */

import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Central NH coverage: Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke";

const CITIES = [
  "Bow",
  "Concord",
  "Hopkinton",
  "Henniker",
  "Loudon",
  "Pembroke",
] as const;

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
            "linear-gradient(135deg, #0a0a0a 0%, #2F3E46 70%, #B87333 130%)",
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
          Central NH Coverage
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: 28 }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#f5f5f5",
              display: "flex",
            }}
          >
            Six towns we know by name and by chimney.
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
            }}
          >
            {CITIES.map((c) => (
              <div
                key={c}
                style={{
                  fontSize: 22,
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: 4,
                  color: "#E9E2D4",
                  border: "1px solid #B87333",
                  padding: "8px 18px",
                  borderRadius: 6,
                  display: "flex",
                }}
              >
                {c}, NH
              </div>
            ))}
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
            integritychimney.com/service-areas
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
