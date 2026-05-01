/**
 * GlobalEmberLayer.tsx
 * Wraps EmberDriftCanvas in a viewport-fixed background layer mounted
 * once in root layout. Particles render ONLY in the side gutters
 * around the centered content column, never under text or content.
 *
 * The CSS mask cuts a transparent vertical strip through the center
 * of the canvas where content lives (max-width ~1200px). On viewports
 * narrower than ~1320px (typical mobile + tablet), the entire canvas
 * is transparent and no embers show: by design, since there's no
 * empty gutter on those viewports anyway.
 *
 * Result: embers drift in the empty side margins on desktop and never
 * compete with text for visual attention.
 */

import { EmberDriftCanvas } from "./EmberDriftCanvas";

const GUTTER_MASK =
  "linear-gradient(to right, " +
  "black 0, " +
  "black calc(50vw - 660px), " +
  "transparent calc(50vw - 600px), " +
  "transparent calc(50vw + 600px), " +
  "black calc(50vw + 660px), " +
  "black 100%)";

export function GlobalEmberLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        opacity: 1,
        WebkitMaskImage: GUTTER_MASK,
        maskImage: GUTTER_MASK,
      }}
    >
      <EmberDriftCanvas className="absolute inset-0 h-full w-full" />
    </div>
  );
}
