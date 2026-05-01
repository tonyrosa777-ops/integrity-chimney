/**
 * GlobalEmberLayer.tsx
 * Wraps EmberDriftCanvas in a viewport-fixed background layer mounted
 * once in root layout. Particles render across every dark section that
 * has a transparent background; light sections (bg-aged-mortar) cover
 * it. One canvas, one rAF loop, every dark surface gets atmosphere.
 *
 * z-0, pointer-events-none, ARIA-hidden. opacity tuned so it sits
 * under content without competing with type contrast.
 */

import { EmberDriftCanvas } from "./EmberDriftCanvas";

export function GlobalEmberLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.85 }}
    >
      <EmberDriftCanvas className="absolute inset-0 h-full w-full" />
    </div>
  );
}
