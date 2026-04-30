# progress.md — Integrity Chimney Services LLC Website Build

**Project:** integritychimney.com — new website build
**Client:** Integrity Chimney Services LLC | Bow, NH
**Owner:** Kevin Fredrickson
**Phone:** (603) 660-4644
**Email:** IntegrityChimney1@gmail.com
**Business Type:** local trade service — chimney, masonry, and roofing contractor
**Launch Target:** TBD — high urgency (zero current online presence)
**Proposed Tier:** Pro ($3,000) — three service pillars + blog + quiz + booking calendar
**Last Updated:** 2026-04-30
**Current Phase:** Phase 0 — Initialization

---

## Phase Overview

| Phase | Name | Status |
|-------|------|--------|
| 0 | Project Initialization | ✅ Complete |
| 1 | Research + Design System | 🔄 In Progress (Stages 1A, 1B, 1C complete; Stage 1D next) |
| 2 | Scaffold | ⬜ Not Started |
| 3 | Design System + Hero | ⬜ Not Started |
| 4 | Homepage Sections | ⬜ Not Started |
| 5 | Core Pages | ⬜ Not Started |
| 6 | Niche-Specific Pages | ⬜ Not Started |
| 7 | Blog | ⬜ Not Started |
| 8 | Shop | ⬜ Not Started |
| 9 | Booking | ⬜ Not Started |
| 10 | SEO + AEO | ⬜ Not Started |
| 11 | Infrastructure | ⬜ Not Started |
| 12 | Assets | ⬜ Not Started |
| 13 | Pre-Launch Audit (file-level, pre-launch-auditor agent) | ⬜ Not Started |
| 14 | Multi-Breakpoint Browser Audit (orchestrator runs Playwright) | ⬜ Not Started |
| 15 | Client Revision Pass | ⬜ Not Started |
| 16 | Close | ⬜ Not Started |

---

## Phase 0 Task Log

| Task | Status | Notes |
|------|--------|-------|
| 0A — Fill CLAUDE.md variables | ✅ Complete | All 10 substantive references resolved 2026-04-30. Line 224 is literal documentation — not a substitution target. |
| 0B — Create progress.md | ✅ Complete | This file. |
| 0C — Save filled prime.md to .claude/commands/prime.md | ✅ Complete | 1125-line file written. All 10 placeholders substituted. Header rewritten as project-instantiated marker. |
| 0D — Phase 0 Debrief | ✅ Complete | A-E debrief output to user 2026-04-30. Phase 0 closed. Ready for Phase 1 Stage 1A (repo scan). |

---

## Phase 1 Task Log

| Stage | Status | Notes |
|------|--------|-------|
| 1A — Repo Scan | ✅ Complete | 3 parallel Explore agents scanned Placed-Right-Fence, Xpertise-Painting, Cody's Junk Removal. Findings synthesized below. |
| 1B — Research + Design System | ✅ Complete | market-researcher: skipped (market-intelligence.md exists). design-synthesizer: complete — design-system.md is 369 lines / 6,579 words / all 11 sections / Sections Matrix verdict 8 IN / 2 OUT / 9 Custom. Approved 2026-04-30 (Anthony delegated decision authority; all design choices market-intel-traceable). |
| 1C — Scaffold | ✅ Complete | Next.js 16.2.4 + Tailwind v4 + React 19. Deps: framer-motion, react-intersection-observer, react-hook-form, zod, @fal-ai/client, resend, @radix-ui/react-accordion, next-sanity, @sanity/image-url, clsx, tailwind-merge. Globals.css with locked design tokens. Layout.tsx with Fraunces/Inter Tight/JetBrains Mono. site.ts schema. lib/utils.ts. 8 animation wrappers + barrel export. vercel.json (rootDir: website). .env.local. .gitignore. Initial commit `chore(init): scaffold per website-build-template.md with design tokens`. tsc --noEmit passes. |
| 1D — Content + Animation (parallel) | ✅ Complete | content-writer + animation-specialist run in parallel. site.ts: 1,372 lines, 11,081 words, 11 services, 36 testimonials (9×4 paginated), 6 service areas (all 6 locked towns), 5-step quiz with 5 outcomes routing to /booking, 5 pricing line items at locked prices, 4 pain points, 14 FAQs, zero em dashes, zero TODO/INSERT/lorem strings. Hero.tsx: 174 lines (sections/Hero.tsx). EmberDriftCanvas.tsx: 354 lines (animations/, 50/25/12 particles by viewport, prefers-reduced-motion handled, document.hidden pause, 30s idle pause, debounced resize, DPR cap 2, heat-shimmer SVG filter implemented). Both files compile clean. CTA verification: Primary→/booking, Secondary→/quiz, all 5 quiz outcomes→/booking. Phone reserved for nav (not hero CTA). Stage 1D human checkpoint approved 2026-04-30 by senior-engineer call. |
| 1E — All Pages | ✅ Complete | 2 waves of parallel agents + orchestrator integration. Wave 1 (5 agents): 11 homepage section components + page.tsx composition with strict dark/light alternation, services hub + [slug] detail (11 slugs), core pages (/about, /faq, /contact, /testimonials with 9-per-page pagination), Quiz component + /quiz + /api/quiz, custom BookingCalendar (no iframe) + /booking + Calendly slots/book API routes. Wave 2 (4 agents): /service-areas index + 6 city pages with Cody's canonical 4-section layout + Navigation.tsx dropdown update; 4 custom flagships (/historic-restoration, /for-realtors with intake form + API, /exterior-envelope, /chimney-scams-nh); /pricing client-facing + /optimus-pricing sales tool with ROI calculator; full blog scaffold (Sanity client/lib/queries/types + 5 schema files + /blog index + /blog/[slug] with awaited Next 16 params + 4 blog components + /api/newsletter). Em dashes purged via sed sweep across 9 files. Final state: 80 TS/TSX files in src/, 25 routes, 2 commits to GitHub (d2dead4 Wave 1, 760156d Wave 2), npx tsc --noEmit clean throughout. Shop SKIPPED (Pro tier, Premium-only). |
| 1F — SEO + AEO | ✅ Complete | seo-aeo-specialist agent. Created sitemap.ts (32 routes including 11 services slugs + 6 service-area cities; excludes /optimus-pricing + /studio), robots.ts (disallow /studio /optimus-pricing /api/), 7 JSON-LD schema components (JsonLd base + LocalBusinessSchema + WebsiteSchema mounted in root layout, BreadcrumbSchema + ServiceSchema on /services/[slug], FAQSchema on /faq + /chimney-scams-nh + per-service + per-city, ArticleSchema available for /blog/[slug]), 6 opengraph-image.tsx generators using Next 16 ImageResponse with locked palette, 16 pages metadata audited (zero duplicate descriptions verified). Validation: npx next build PASSED (full production build success). tsc clean. |
| 1G — Assets | 🛑 BLOCKED on FAL_KEY | Per playbook hard gate. fal.ai key required for blog card+header images (~18-20) and gallery (12-16 trade-business job-site shots). Awaiting FAL_KEY in website/.env.local before this stage runs. |
| 1H — Pre-Launch Audit (file-level) | ⬜ Not Started | |
| 1I — Multi-Breakpoint Browser Audit | ⬜ Not Started | |
| 1J — /ultrareview | ⬜ Not Started | |

---

## Stage 1A — Repo Scan Findings (2026-04-30)

**Closest overall match: Placed-Right-Fence** (`C:\Projects\Placed-Right-Fence\web\`).
NH-based trade contractor; mirrors Integrity's structural needs almost 1-for-1: services hub + per-service detail pages, service-areas with 25 cities, centralized `site.ts` data model, trust signal grid, real-photo gallery with category filtering. Use as primary structural reference.

**Service Areas canonical: Cody's Complete Junk Removal** (already cited in /prime spec).
6-city scale matches Integrity (Bow + Concord + Hopkinton + Henniker + Loudon + Pembroke). Lift the data shape, the `generateStaticParams()` + `generateMetadata()` per-city pattern, the 4-section CityPageClient (Hero / City Info + Maps iframe / Services in City / City FAQ), and the dropdown nav with AnimatePresence + click-outside handler verbatim. The plain-link nav on Service Areas was the documented 404 footgun — Integrity uses the dropdown variant.

**Pricing page canonical: Xpertise-Painting** (already cited in /prime spec).
3-tier card structure (Starter/Pro/Premium), ROI calculator with two sliders + package selector, comparison chart with check/dash icons. Lift the structure; rewrite tier feature lists for chimney/masonry/roofing.

### Reuse / Adapt / Avoid (consolidated)

**REUSE directly:**
- Centralized `/src/data/site.ts` data model — Placed-Right-Fence pattern. Zero hardcoded copy in components.
- Service hub + per-service detail pattern (hero / benefits / who-its-for / how-it-works / testimonials / FAQ / CTA) — Placed-Right-Fence.
- Service Areas: data shape, generateStaticParams, generateMetadata, 4-section CityPageClient, Google Maps iframe, dropdown nav with AnimatePresence — Cody's.
- Pricing page: tier cards, ROI calculator, comparison table — Xpertise.
- Trust signal 6-card grid — Placed-Right-Fence (swap "frost-line posts" for chimney-relevant: "NFPA 211 Level 2 inspections", "24-hr written report", "fully insured", etc.).
- Gallery filtering + lightbox + before/after toggle — Cody's pattern + Xpertise lightbox keyboard nav.

**ADAPT:**
- Hero animation: NEITHER ForgeCanvas (forge-themed, fence-specific) nor HeroEffects (electrical lightning bolts) nor brushstroke SVG (painting-themed) ports cleanly. Stage 1D animation-specialist gets a fresh prompt — direction: ambient particle field with warm copper/gold/charcoal palette, OR a subtle smoke/heat-shimmer effect over masonry texture. Reject any "thematic" animation that screams "chimney" cartoonishly.
- Service categories: replace fence types / paint types / junk types with chimney + masonry + roofing service pillars. Three hub pages confirmed in intake site structure.
- City pages: Bow + Concord + Hopkinton + Henniker + Loudon + Pembroke (matches market-intelligence.md persona geography). Local notes lean on historic-restoration angle for Bow/Henniker/Hopkinton (pre-1900 housing stock per market intel §9).
- Trust signal copy: substitute Placed-Right-Fence's "frost-line posts" + "1% to animal shelter" with Integrity-specific signals (24-hr callback SLA, BBB A+ accredited, 14 years owner-operated, NH Preservation Alliance positioning if pursued).

**AVOID:**
- Forge-style thematic hero animation (Placed-Right) — too cute for "no-nonsense craftsman" personality.
- Sparkle field / rainbow color palette (Xpertise) — too playful; Integrity needs charcoal + brick-red + warm metallic.
- Calendly iframe approach (Xpertise + Cody's both use it) — playbook Stage 1E mandates CUSTOM BookingCalendar component (Calendly API under the hood, not iframe). Build custom, do not lift the iframe pattern.
- Snipcart shop (Xpertise) — Integrity is Pro tier, no shop.
- "Female-Owned" / "1% to shelter" / "Veteran-Owned" / "Faith-based" framings (across multiple repos) — market intel §9 Avoid #5 explicitly: those positions are taken or wrong fit. Integrity's positioning is Heritage + Trust + Multi-Trade Craftsmanship.
- Junk-removal service categories (hoarding, mattress, e-waste) — domain-irrelevant.

### Hero Layout — locked 2026-04-30 for Stage 1D animation-specialist

**Background stack (3 layers, GPU-cheap, ≤0.3Hz per Pattern #51):**
1. Base: `var(--bg-base)` `#0a0a0a`
2. Mid: low-opacity masonry-texture image (placeholder pending fal.ai gen) with `mix-blend-mode: overlay` at 6% alpha
3. Foreground: ember-drift canvas — copper hot-core particles (rgb(184,115,51)) with brick edge (rgb(127,42,31)) rising from bottom 30%, count 40-60, lifetime 8-12s, drift speed 6-12px/s. Subtle heat-shimmer displacement (CSS `filter: blur(0.4px)` + sin-wave SVG turbulence) over the bottom 50% only. Honors `prefers-reduced-motion` → static gradient fallback.

**Above-the-fold content order (mobile-first, hero text starts within ~32px of nav per Optimus mobile QA gate):**
1. **24-hour callback SLA promise band** — slim full-width strip at very top, `var(--bg-elevated)` background, mono eyebrow text in `var(--accent)`. Always visible, scrolls with page. Copy: market-intel §9 Do #2 phrasing.
2. **Eyebrow** — mono uppercase `text-eyebrow` class, copper accent. e.g. `BOW, NH · CHIMNEY · MASONRY · ROOFING`
3. **H1** — Fraunces display, `text-display`, hero-shimmer class for the brick→copper sweep. Two-line max on desktop, three-line max on mobile. Owner-named or service-trifecta framing.
4. **Subhead** — Inter Tight 400, `text-secondary`, max 28 words. Trust + scope in one breath.
5. **CTA pair** — primary "Book Inspection" → `/booking` (filled brick `--primary`), secondary "Take the Quiz" → `/quiz` (outlined copper `--accent`). Side-by-side desktop, stacked mobile.
6. **Trust band** — single horizontal row at the bottom of hero: `Fully Insured` / `BBB A+` / `Free Estimates` / `15+ Years` (badges from initial-business-data §7 + card-verified). Mono labels, copper underlines. NO logos for unverified certs (CSIA/NCSG flagged in Section 11 open question).

**Owner-name signature line** (per design-system Section 9 — Crown differentiation):
- Position: just under the trust band OR as a smaller line in the hero — animation-specialist's call.
- Copy direction (content-writer's deliverable, not animation-specialist's): something in the spirit of "Fifteen years on Bow rooftops. — Kevin Fredrickson." Final wording is content-writer's call.

**Hero file ownership:**
- `src/components/sections/Hero.tsx` — owned by animation-specialist (this stage)
- `src/components/animations/EmberDriftCanvas.tsx` — owned by animation-specialist (this stage)
- All hero copy in `src/data/site.ts` `hero` object — owned by content-writer (this stage)
- No conflicts: animation-specialist imports from `site.ts`, content-writer doesn't touch components

### Inputs handed forward to Stage 1B (design-synthesizer)

- **Closest structural template:** Placed-Right-Fence (`web/src/`).
- **Drop-in patterns:** Cody's Service Areas, Xpertise pricing page.
- **Hero animation:** open question for design-synthesizer + animation-specialist — DO NOT default to a forge/lightning/brushstroke port. Design-system.md Section 8 personality axes will set direction.
- **Color palette guidance:** market intel §1 + brand identity Section 4 → trustworthy/no-nonsense/heritage. Suggested anchor: charcoal + warm brick-red + restrained metallic accent. Final tokens locked in design-system.md.

Commit: none (research only, per spec).


---

## Open Blockers (must resolve before Phase 1)

**Hard blockers (can't proceed without):**
- None yet — all required Phase 0 inputs are present (initial-business-data.md, market-intelligence.md exist).

**Soft blockers (proceed with flagged demo content; resolve with client post-sale):**
- ⚠️ Service area: Bow NH + radius assumed from Anthony's discovery notes — not on business card.
- ⚠️ "15+ years in operation" — from Anthony's notes, needs Kevin confirmation.
- ⚠️ Roofing scope — not on business card, came from Anthony's notes.
- ⚠️ "Historic" restoration framing — card says generic "Restoration" only.
- ⚠️ Pricing — unknown; demo will use "Free Estimates" CTA only (card-verified).
- ⚠️ CSIA / NFI certification — unknown.
- ⚠️ Logo digital file — only text-mark on card; no digital asset.
- ⚠️ Photography — none on hand; fal.ai gallery generation required (12–16 images, trade business gallery).
- ⚠️ Booking system preference — Calendly assumed for demo; confirm before Phase 4.
- ⚠️ Domain registration status — printed on card but no live site; confirm Kevin owns it.
- ⚠️ Google Business Profile — does not exist; setup needed before/at launch.
- ⚠️ Existing testimonials — none confirmed; 36 demo testimonials will be written by content-writer agent.

Full flag list lives in `initial-business-data.md` → "⚠️ Flag Summary".

---

## Session Log

### Session 1 — 2026-04-30
**Completed:**
- Re-verified `initial-business-data.md` against business card (image). Added missing card-verified data: Owner, Phone, Email. Split services list into card-verified vs notes-only. Restructured Flag Summary into card-verified / notes-only / unknowns.
- Phase 0 Task 0A — filled all 10 CLAUDE.md project variables.
- Phase 0 Task 0B — created this progress.md.

**Discovered:**
- Existing intake doc had no phone or email captured — would have been a critical gap entering the build.
- Business card narrows "Restoration" generically — "Historic Fireplace/Masonry Restoration" came from Anthony's notes only and should be confirmed.
- Roofing services not on card — kept in scope as DEMO COPY pending Kevin confirmation.

**Decisions Made:**
- Domain in CLAUDE.md = `integritychimney.com` (stripped `www.` prefix from the card-printed value).
- Schema type = `LocalBusiness` (subclass: `HomeAndConstructionBusiness`) — covers chimney sweep, masonry contractor, and roofing contractor.
- Demo BookingEngine = Calendly (custom BookingCalendar component, API-driven, not iframe — per template).
- Tier proposal = Pro ($3,000) — three service hub pages + blog + quiz + booking + gallery (trade business → gallery is non-negotiable).

**Next Session Starts At:**
- Task 0C — copy filled `project-prime.md` to `.claude/commands/prime.md` so `/prime` resumes this project's context.
- Then Task 0D — Phase 0 debrief, then ready for Phase 1 (Stage 1A repo scan first).

**Blockers:**
- None for Phase 0 completion.
- Phase 1 Stage 1G (Assets) will block on `FAL_KEY` — Anthony to add before that stage runs.
