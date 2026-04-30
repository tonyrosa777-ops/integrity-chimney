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
| 1 | Research + Design System | 🔄 In Progress (Stage 1A complete; Stage 1B next) |
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
| 1C — Scaffold | 🔄 In Progress | Orchestrator-direct (no agents). Reading template Stack section, then create-next-app, then deps, tokens, site.ts, dirs, animations, vercel.json, .env.local, initial commit. |
| 1D — Content + Animation (parallel) | ⬜ Not Started | |
| 1E — All Pages | ⬜ Not Started | |
| 1F — SEO + AEO | ⬜ Not Started | |
| 1G — Assets | ⬜ Not Started | Will block on FAL_KEY |
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
