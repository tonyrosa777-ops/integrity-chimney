"use client";

/**
 * EmberDriftCanvas.tsx - Integrity Chimney Services LLC
 * Animation: ember drift over hearth stone (design-system.md §6, locked)
 * Heat rising off a worked stack at end of day: copper-cored, brick-edged.
 * Pure Canvas 2D + requestAnimationFrame. No three.js, no GSAP.
 * Honors prefers-reduced-motion (Pattern #51) - single static gradient fallback.
 */

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
};

interface Ember {
  /** spawn x: used as wander axis center */
  baseX: number;
  /** vertical position (drifts upward) */
  y: number;
  /** radius in CSS pixels */
  r: number;
  /** upward drift speed in px/s */
  vy: number;
  /** horizontal sin-wander amplitude in px */
  amp: number;
  /** sin-wander period in seconds */
  period: number;
  /** phase offset (radians) */
  phase: number;
  /** lifetime in seconds */
  life: number;
  /** age in seconds */
  age: number;
}

/** Hearth Copper hot core (--accent) */
const COPPER: [number, number, number] = [184, 115, 51];
/** Heritage Brick edge (--primary) */
const BRICK: [number, number, number] = [127, 42, 31];

/** Particle count by viewport (pattern #51 mobile motion cap). */
function particleCountFor(width: number): number {
  if (width < 768) return 12;        // mobile: 10-15 (chosen mid-range)
  if (width < 1280) return 25;       // tablet: 20-30
  return 50;                         // desktop: 40-60
}

/** Smooth ease curve for alpha: ease-in 0-15%, hold 15-75%, ease-out 75-100%. */
function lifeAlpha(progress: number): number {
  if (progress < 0.15) {
    const t = progress / 0.15;
    return t * t * (3 - 2 * t); // smoothstep in
  }
  if (progress > 0.75) {
    const t = (1 - progress) / 0.25;
    return t * t * (3 - 2 * t); // smoothstep out
  }
  return 1;
}

/** Random in [min, max). */
function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Spawn x with slight bias toward golden-ratio thirds.
 * 60% uniform across width, 40% biased to one of three columns.
 */
function spawnX(width: number): number {
  if (Math.random() < 0.4) {
    const phi = 0.618;
    const columns = [width * (1 - phi), width * 0.5, width * phi];
    const col = columns[Math.floor(Math.random() * columns.length)];
    return col + rand(-width * 0.06, width * 0.06);
  }
  return Math.random() * width;
}

function makeEmber(width: number, height: number, atSpawn = false): Ember {
  // Spawn region: bottom 30% of canvas height
  const ySpawnMin = height * 0.7;
  const ySpawnMax = height * 1.0;
  // If not at spawn (initial seed), distribute randomly through full height for warm fill
  const y = atSpawn ? rand(ySpawnMin, ySpawnMax) : rand(0, height);
  return {
    baseX: spawnX(width),
    y,
    r: rand(1, 3),
    vy: rand(6, 12),
    amp: rand(8, 15),
    period: rand(4, 7),
    phase: Math.random() * Math.PI * 2,
    life: rand(8, 12),
    age: atSpawn ? 0 : rand(0, 8),
  };
}

export function EmberDriftCanvas({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotionMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = reducedMotionMQ.matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = canvas.offsetWidth || window.innerWidth;
    let height = canvas.offsetHeight || window.innerHeight;
    let embers: Ember[] = [];
    let raf = 0;
    let lastTs = 0;
    let running = false;

    // Idle pause infrastructure
    let idleTimer: number | null = null;
    let visible = true;
    let inView = true;

    function setCanvasSize() {
      if (!canvas || !ctx) return;
      width = canvas.offsetWidth || window.innerWidth;
      height = canvas.offsetHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seedEmbers() {
      const count = particleCountFor(width);
      embers = [];
      for (let i = 0; i < count; i++) {
        embers.push(makeEmber(width, height, false));
      }
    }

    function drawStaticFallback() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Static gradient: Heritage Brick at bottom -> Hearth Copper at 8% alpha -> transparent
      const grad = ctx.createLinearGradient(0, height, 0, 0);
      grad.addColorStop(0, `rgba(${BRICK[0]},${BRICK[1]},${BRICK[2]},0.18)`);
      grad.addColorStop(0.35, `rgba(${COPPER[0]},${COPPER[1]},${COPPER[2]},0.08)`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    function drawEmber(e: Ember) {
      if (!ctx) return;
      const progress = e.age / e.life;
      const alpha = lifeAlpha(progress);
      if (alpha <= 0) return;

      // Sin-wave horizontal wander
      const omega = (Math.PI * 2) / e.period;
      const x = e.baseX + Math.sin(e.age * omega + e.phase) * e.amp;

      // Radial gradient: hot copper core -> brick edge -> transparent
      const r = e.r * 4; // outer halo radius (4x the core for soft falloff)
      const grad = ctx.createRadialGradient(x, e.y, 0, x, e.y, r);
      grad.addColorStop(0, `rgba(${COPPER[0]},${COPPER[1]},${COPPER[2]},${(0.95 * alpha).toFixed(3)})`);
      grad.addColorStop(0.7, `rgba(${BRICK[0]},${BRICK[1]},${BRICK[2]},${(0.45 * alpha).toFixed(3)})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, e.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    function tick(ts: number) {
      if (!ctx) return;
      if (!lastTs) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.05); // clamp to 50ms (avoid huge jumps)
      lastTs = ts;

      ctx.clearRect(0, 0, width, height);
      // Additive copper glow
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.age += dt;
        e.y -= e.vy * dt;
        // Respawn if expired or off-top
        if (e.age >= e.life || e.y < -10) {
          embers[i] = makeEmber(width, height, true);
          continue;
        }
        drawEmber(e);
      }

      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(tick);
    }

    function startLoop() {
      if (reduced) {
        drawStaticFallback();
        return;
      }
      if (running) return;
      running = true;
      lastTs = 0;
      raf = requestAnimationFrame(tick);
    }

    function stopLoop() {
      if (!running) return;
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function evaluateRunState() {
      if (reduced) {
        stopLoop();
        drawStaticFallback();
        return;
      }
      if (visible && inView) {
        startLoop();
      } else {
        stopLoop();
      }
    }

    // Debounced resize handler
    let resizeTimer: number | null = null;
    function onResize() {
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setCanvasSize();
        seedEmbers();
        if (reduced) drawStaticFallback();
      }, 150);
    }

    // Visibility change: pause when document hidden
    function onVisibilityChange() {
      visible = !document.hidden;
      if (visible) resetIdleTimer();
      evaluateRunState();
    }

    // Idle pause: pause loop after 30s with no interaction
    function resetIdleTimer() {
      if (idleTimer !== null) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        inView = false;
        evaluateRunState();
      }, 30_000);
    }
    function onUserActivity() {
      if (!inView) {
        inView = true;
        evaluateRunState();
      }
      resetIdleTimer();
    }

    function onReducedMotionChange(ev: MediaQueryListEvent) {
      reduced = ev.matches;
      evaluateRunState();
    }

    // Init
    setCanvasSize();
    seedEmbers();
    evaluateRunState();
    resetIdleTimer();

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("scroll", onUserActivity, { passive: true });
    window.addEventListener("click", onUserActivity, { passive: true });
    window.addEventListener("pointermove", onUserActivity, { passive: true });
    if (reducedMotionMQ.addEventListener) {
      reducedMotionMQ.addEventListener("change", onReducedMotionChange);
    }

    return () => {
      stopLoop();
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      if (idleTimer !== null) window.clearTimeout(idleTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onUserActivity);
      window.removeEventListener("click", onUserActivity);
      window.removeEventListener("pointermove", onUserActivity);
      if (reducedMotionMQ.removeEventListener) {
        reducedMotionMQ.removeEventListener("change", onReducedMotionChange);
      }
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: "block" }}
      />
      {/* Heat-shimmer SVG filter: bottom 50% of hero. Very low amplitude. */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full"
        aria-hidden="true"
        focusable="false"
        style={{ mixBlendMode: "overlay", opacity: 0.25 }}
      >
        <defs>
          <filter id="ember-heat-shimmer" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.014"
              numOctaves="2"
              seed="3"
            >
              <animate
                attributeName="baseFrequency"
                dur="9s"
                values="0.012;0.018;0.012"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="4" />
          </filter>
          <linearGradient id="ember-heat-gradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgb(127, 42, 31)" stopOpacity="0.18" />
            <stop offset="60%" stopColor="rgb(184, 115, 51)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="rgb(0, 0, 0)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#ember-heat-gradient)"
          filter="url(#ember-heat-shimmer)"
        />
      </svg>
    </div>
  );
}
