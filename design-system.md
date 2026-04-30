# design-system.md
## Integrity Chimney Services LLC — Brand Constitution

**Tier:** Pro ($3,000) — three service hub pages (Chimney, Masonry, Roofing) + blog + quiz + booking calendar + gallery. No shop.
**Site structure:** Single domain, three service hubs, three custom landing pages (`/historic-restoration`, `/for-realtors`, `/exterior-envelope`).
**Theme decision:** **Dark theme** — `--bg-base: #0a0a0a` and `--bg-elevated: #141414` retained from Optimus standard, with brand primary and accent overlaid. Rationale: a dark base lets soot/forge/copper colors read as premium and editorial; a light base would push the palette toward "rustic country contractor" which competes with no one and concedes the luxury floor required by the Optimus Positioning Rule (build-log Pattern #49).
**Last updated:** 2026-04-30.

---

## Section 1 — Brand Identity Statement

Integrity Chimney Services is a fifteen-year-old, owner-operated, fully-insured central New Hampshire trade company whose competitive identity is **Heritage + Trust + Multi-Trade Craftsmanship**: the only chimney/masonry/roofing contractor physically based in Bow that openly markets historic restoration on pre-1900 colonial center-chimney homes alongside same-week real-estate Level 2 inspections and integrated chimney-plus-roof "exterior envelope" service. Within five seconds of landing, a visitor — whether the 38-year-old Bow Cape owner with a creosote smell, the buyer's agent with a 14-day inspection window, or the Henniker Federal-house couple guarding lime-mortar joints — must feel three things: *this is a serious craftsman*, *this is a local human who answers the phone*, and *this person has touched houses older than my grandparents*. This is **not** a faith-branded family operation (owned by Crown and Admiralty), **not** a veteran-owned showroom (owned by Ceaser), and **not** a cheap-sweep cold-call shop (poisoned across the entire NH category). It is a heritage-modern, mortar-and-copper trade brand built on operational reliability — a 24-hour callback SLA, same-day photo reports, published "starting at" prices — that fixes the documented review-damage of unreturned voicemails and unfinished caps and replaces it with the reputation the underlying 15-year work record actually deserves.

*Sources: market-intelligence.md §1 Executive Summary; §2 Personas; §3 Competitor Analysis (Crown, Ceaser, Admiralty positioning); §9 Strategic Recommendations (Avoid #5 — veteran/faith claimed); initial-business-data.md §1 (15+ years, fully insured, Bow base) and §4 (brand values: Integrity, craftsmanship, reliability, transparency).*

---

## Section 2 — Color Palette

The palette is derived from market-intelligence.md §8 ("Granite Slate / Heritage Brick / Hearth Copper / Aged Mortar / Ironwork Black"), validated against the competitor color audit (Crown bright-red, Anything brick-red, Ceaser burgundy/cream/gold, Black Moose forest-green, Soot Solutions faded-blue, Pro Roofers navy/red), and adapted to the **dark-theme** baseline mandated by the Optimus build template (template line 35–42, build-log Pattern #51).

**Differentiation logic:** the dominant chimney-category colors are bright reds (Crown, Anything, Fire N' Stone) and burgundy/gold (Ceaser). A deep blue-grey ("Granite Slate") lands in unowned territory, evokes NH bedrock and heritage iron, and gives a dark base on which **Heritage Brick** accents and a **Hearth Copper** highlight read as authentic masonry — not as a generic contractor red. Charcoal + warm brick-red + restrained metallic copper (the Stage 1A floated direction) is **CONFIRMED** here with specific token mappings.

| CSS Custom Property | Hex / RGBA | Usage Rule |
|---|---|---|
| `--primary` | `rgb(127, 42, 31)` (`#7F2A1F` "Heritage Brick") | Section accent backgrounds, primary CTAs, brand banners, link underlines, hero shimmer climax color, animation particle warm-band. The dominant brand red — used for moments of emphasis and conversion, never as a full page background. |
| `--primary-muted` | `rgba(127, 42, 31, 0.6)` | Hover-state borders on cards and buttons; faded brand-red used in dividers, decorative SVG strokes, gradient mid-stops. Per template line 461. |
| `--accent` | `rgb(184, 115, 51)` (`#B87333` "Hearth Copper") | Eyebrow labels, icon tints, animation particle highlight, hero shimmer sweep middle color (template line 268), trust-badge metallic edges, "starting at" price chip outlines. The premium-signal copper — used sparingly, never as a button fill except on the secondary CTA hover state. |
| `--bg-base` | `#0a0a0a` | Page background — Optimus standard, retained per template line 35. Reads as soot/iron and lets brick + copper sing. |
| `--bg-elevated` | `#141414` | Section alternation background, used on every other section per build-log Pattern #8 (homepage dark/light section rhythm). |
| `--bg-card` | `#1a1a1a` | Card surfaces (service cards, testimonial cards, blog post cards, pricing tier cards). Optimus standard. |
| `--text-primary` | `#f5f5f5` | All headings and body copy on dark backgrounds (build-log Error #29 — never substitute brand color for headings). |
| `--text-secondary` | `rgba(245, 245, 245, 0.7)` | Body paragraph copy, sub-headlines, card body text, form labels. |
| `--text-muted` | `rgba(245, 245, 245, 0.4)` | Eyebrow micro-copy, captions, footer fine print, disabled states, photo credits. |

**Supplementary brand colors** (used in JSX/Tailwind via arbitrary values, NOT new tokens — keeps the 9-token contract clean):
- `#2F3E46` "Granite Slate" — used on the light-stage Calendly section per build-log Pattern #52 and on the realtor PDF deliverable cover. Not a primary site token because the dark theme already carries the heritage gravity.
- `#E9E2D4` "Aged Mortar" — used as the cream wash for the Calendly light stage and for printable materials only.

*Sources: market-intelligence.md §8 (specific hex codes proposed); §3 (competitor color audit); §9 Avoid #2 (no stock photo, by extension no generic red-on-white contractor template); website-build-template.md lines 27–67 (token names and dark-theme baseline); build-log.md Pattern #49 (luxury-modern positioning rule), Pattern #51 (gradient backgrounds), Pattern #52 (light-stage section), Error #29 (headings use --text-primary, never brand color).*

---

## Section 3 — Typography System

The category typography audit (market-intelligence.md §8) shows Crown using slab serif, Anything Chimney using generic Open Sans/Lato, Ceaser using "modern serif headlines + sans body" (rated best-in-NH), Chimney Savers VT on modern sans + serif accent. Steppingstones Masonry uses serif for its heritage positioning. The differentiation move is to claim **a real serif display face with editorial presence** — not a slab serif (Crown), not a default sans (Anything), not Inter (Chimney Savers, the same default everyone defaults to). The frontend-design.md skill explicitly forbids Inter/Roboto/Arial as default choices.

| Role | Font | Source | Weights | Use |
|---|---|---|---|---|
| `font-display` | **Fraunces** (variable, soft-modulated transitional serif) | Google Fonts: `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,800;1,9..144,400&display=swap` | 400, 600, 800; italic 400 | All H1–H4 (`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-h4` per template line 77–82). Hero H1 uses `hero-shimmer font-display text-display` (template line 84, build-log Error #42 fix). Italic 400 used for editorial pull-quotes and historic-project case-study captions. |
| `font-body` | **Söhne** alternative — **Inter Tight** (NOT default Inter — narrower, sharper, less generic) | Google Fonts: `https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap` | 400, 500, 600, 700 | Paragraph copy, navigation, buttons, form inputs, card bodies, blog body, FAQ answers. |
| `font-mono` | **JetBrains Mono** | Google Fonts: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap` | 400, 500, 600 | Eyebrow micro-labels ("HISTORIC RESTORATION /", "FOR REALTORS /"), price chips ("$295 — 24-HR REPORT"), service-card meta ("LEVEL 2 INSPECTION · NH"), footer columns, technical labels (NFPA-211, 316Ti liner, etc.). Reinforces the trade-craftsman + technical-precision personality. |

**Typography scale** — uses the template's clamp-based scale verbatim (build-log Pattern #34 — clamp-based responsive type scale is mandatory in Phase 1 globals.css):

```css
.text-display { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; }   /* Hero H1 */
.text-h1      { font-size: clamp(2rem, 4vw, 3rem);   line-height: 1.15; }
.text-h2      { font-size: clamp(1.5rem, 3vw, 2.25rem); line-height: 1.2; }
.text-h3      { font-size: clamp(1.25rem, 2.5vw, 1.75rem); line-height: 1.25; }
.text-h4      { font-size: clamp(1.1rem, 2vw, 1.35rem); line-height: 1.3; }
```

Body base 16px / 1.65 line-height; mono labels 0.75rem / 1.4 / +0.08em letter-spacing / uppercase. Hero shimmer (template line 263–286) flows: `--text-primary → --primary (Heritage Brick) → --text-primary → --accent (Hearth Copper) → --text-primary` for a brick-to-copper sweep that reinforces the masonry-to-metalwork brand story.

*Sources: market-intelligence.md §8 (competitor type audit + recommended pairings — Playfair, Inter); frontend-design.md (forbids Inter/Roboto/Arial as generic defaults — Fraunces and Inter Tight chosen as differentiated alternatives); build-log Pattern #34 (clamp scale mandatory), Error #42 (text-h1 utility must exist); website-build-template.md lines 70–86.*

---

## Section 4 — Spacing & Layout System

Standard Optimus values from website-build-template.md lines 44–52 are used verbatim — no industry reason to deviate, and build-log Error #39 documents the catastrophic page-collapse bug when these tokens are not declared. Container widths and section padding follow build-log Pattern #51 (luxury gradient backgrounds — every section is a gradient with subtle motion, never a flat solid).

**Spacing scale (CSS variables — declared in globals.css :root):**

```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
```

**Containers:**
- Site container: `max-w-7xl mx-auto px-6 md:px-8 lg:px-12`
- Editorial / blog body container: `max-w-3xl mx-auto px-6` (long-form readability per market-intelligence.md §8 "long-form scroll on service pages")
- Hero / case-study split: `max-w-[1320px]` (slightly wider than 7xl to give masonry hero photography breathing room)

**Section vertical padding:**
- Desktop: `py-24 md:py-28` for primary sections; `py-16 md:py-20` for testimonial/teaser bands
- Mobile: `py-16` minimum; hero override `min-h-[100dvh]` with `items-start pt-24 md:pt-40` per build-log Error #25 + Workflow note (hero mobile padding rule)

**Card padding:** `p-6 md:p-8` for service cards, blog cards, pricing cards; `p-8 md:p-10` for case-study cards (historic restoration project cards run larger because they carry more photography).

**Grid:**
- Service cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
- Case studies: `grid grid-cols-1 lg:grid-cols-2 gap-8`
- Testimonials: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` with **36 total testimonials, 9 per page** (build-log Error #31 — perfect 3×3 fill, no orphan rows)
- Service-area chips (Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke): `flex flex-wrap gap-3`
- Footer: 4 columns desktop, 2 columns tablet, 1 column mobile

**Gutters:** `gap-6 md:gap-8` standard; `gap-4` only on dense chip rows.

**Scroll padding:** Per template lines 54–64 and build-log Error #49 / Pattern #43, `html { scroll-padding-top }` is set at 96/112/128px across mobile/sm/lg breakpoints — non-negotiable Phase 1 setup.

*Sources: website-build-template.md lines 44–86; build-log.md Error #25, Error #31, Error #39, Error #42, Error #49, Pattern #34, Pattern #43, Pattern #51; market-intelligence.md §8 (long-form scroll requirement).*

---

## Section 5 — Component Style Rules

Component shapes are derived from Section 8 personality axes (Trade-craftsman / Heritage-modern / Direct-no-nonsense): squared-but-not-sharp corners, modest border weight, no toy-like roundness, no maximalist shadows. Buttons feel **stamped, not gradient-balloon**.

**Buttons**

| Variant | Shape | Size | States |
|---|---|---|---|
| Primary | `rounded-md` (6px), `px-6 py-3`, full font-mono uppercase tracking | base 0.875rem / lg 1rem | Default: `--primary` Heritage Brick fill, `--text-primary` text. Hover: lift 2px, brightness 1.08, copper underline appears. Active: brightness 0.92. Focus: 2px `--accent` ring with 4px offset. |
| Secondary | `rounded-md`, `px-6 py-3`, `border border-[var(--accent)]` | base 0.875rem | Default: transparent fill, `--accent` Hearth Copper text + border. Hover: fill becomes `rgba(184,115,51,0.08)`, copper border brightens. |
| Ghost | `rounded-md`, `px-4 py-2`, no border | base 0.875rem | Default: `--text-secondary` text. Hover: `--text-primary` text + underline animates left-to-right. Used in nav, footer, blog meta. |
| Sticky-mobile-call (per market-intelligence.md §7 Above-Fold req #3) | Pill `rounded-full`, `py-3 px-5`, fixed bottom-right | mobile only | Always Heritage Brick fill, white phone-icon + "(603) 660-4644". Persistent on every page on mobile, NEVER on desktop. |

**Cards**

- Surface: `bg-[var(--bg-card)]` `rounded-xl` (12px) `border border-white/5` `p-6 md:p-8`
- Hover: border becomes `--primary-muted` per template line 461, subtle 2px lift, copper underline appears beneath card title
- Service cards include a top-left mono eyebrow ("CHIMNEY", "MASONRY", "ROOFING", "HISTORIC", "REALTORS") and a bottom-right copper arrow icon
- Case-study cards (historic restoration) include a 4:3 hero image at top, then `p-8 md:p-10`, with optional sepia archival overlay on photo on hover
- Testimonial cards: italic Fraunces 400 quote, attribution in mono; thin Heritage-Brick rule above attribution

**Form inputs**

- `rounded-md` `bg-[var(--bg-elevated)]` `border border-white/10` `px-4 py-3` `text-[var(--text-primary)]` placeholder `text-[var(--text-muted)]`
- Focus: border becomes `--accent`, soft inset glow `0 0 0 3px rgba(184,115,51,0.15)`
- Error state: border becomes Heritage Brick, error message in mono 0.75rem below
- Mono uppercase labels above each input ("PHONE", "ZIP CODE", "SERVICE TYPE", "TARGET CLOSING DATE")

**Navigation**

- Fixed top, dark `bg-[var(--bg-base)]/85 backdrop-blur-md`, `border-b border-white/5`
- Logo wordmark left, primary links center, "Call (603) 660-4644" CTA right
- Mobile drawer: full-height slide-in, `bg-[var(--bg-base)]`, link list in Fraunces 600, every desktop link present in mobile per build-log Error #38
- Desktop "More" overflow per build-log Pattern #27 if link count exceeds 5 visible (Historic / Realtors / Exterior Envelope / Blog / Gallery / Contact = potential overflow candidate)

**Trust bar** (homepage above-fold per market-intelligence.md §7 #6)

- Horizontal row of monochrome SVG logos: BBB A+, NH Preservation Alliance (pursue), CSIA (pursue), 15+ YEARS, FULLY INSURED, FREE ESTIMATES
- White at 60% opacity; copper accent on hover; mono caption beneath each

*Sources: website-build-template.md lines 88–145, line 461; build-log Pattern #27 (More overflow), Pattern #51 (gradient backgrounds), Error #38 (mobile drawer link parity), Error #41 (CTA routing — primary → /booking, secondary → /quiz); market-intelligence.md §7 (above-fold requirements + trust hierarchy + CTA strategy).*

---

## Section 6 — Photography & Media Direction

Market-intelligence.md §8 is unambiguous: "All real photography. No stock." The category visual moat is documentary-style real job-site photography, exactly the asset Chimney Savers VT and Ceaser ride to category-leader status. For the demo build, **fal.ai generation is the substitute** per build-log Pattern #4 + Pattern #38 (FLUX Pro v1.1, prompts must describe scene without text — AI garbles characters), generating 12–16 images covering the required shot types below. Real photography commissioned post-launch.

**Required shot types (for fal.ai generation queue, then real-photography refresh)**

1. **Hero — Bow center-chimney rooftop at golden hour.** Wide environmental: weathered Cape silhouetted by mature oaks, brick chimney with copper cap catching last light, Kevin's silhouette working at the stack. 16:9. Used on homepage hero only.
2. **Historic restoration close-up — lime mortar joint.** Macro-detail: hand applying buttered lime mortar to handmade-brick course, period trowel visible, dust-mote backlight. 3:2. Used on `/historic-restoration` hero.
3. **Realtor / Level 2 inspection — flue camera in hand.** Mid-shot: gloved hand holding inspection camera at flue opening, screen visible with brick-flue interior, clipboard with PDF report alongside. 16:9. Used on `/for-realtors` hero.
4. **Exterior envelope — chimney + roofline together.** Drone-perspective: full home roof + chimney + flashing visible in single frame, autumn NH foliage. 16:9. Used on `/exterior-envelope` hero.
5. **Service hub heroes (Chimney / Masonry / Roofing).** One environmental wide each — Chimney: wood-stove insert with stainless liner installed; Masonry: rebuilt center chimney from grade up; Roofing: architectural shingle replacement on Hopkinton Cape. 16:9 each.
6. **Gallery / before-after pairs (4 minimum).** 1:1 each, paired left/right: spalled brick → repointed; broken crown → rebuilt crown; corroded liner → SS 316Ti install; aged copper cap → polished copper cap. Used on Gallery page.
7. **Trust / about — Kevin portrait.** 4:3, environmental near his work truck or at a job-site stack, jacket and gloves, neutral expression. Used on About page and footer "Meet Kevin" teaser.
8. **Editorial / blog headers.** Atmospheric — frost on a brick crown at sunrise, hand sketching a Rumford fireplace plan, archival-feel rolled blueprint of a colonial center chimney. 3:2.

**Mood & processing**

- **Documentary, natural light, warm side-light** preferred. Slight warm grade toward copper/brick. Subtle film grain (8–12% in ImageMagick output) — never aggressive.
- Shadows preserve detail; no crushed blacks. Mortar texture must remain legible at any zoom.
- Overlay treatment: 30–40% `--bg-base` gradient from bottom on all hero photos to seat headlines; on historic case-study hovers, an optional sepia/desaturation overlay at 40% opacity recalls archival heritage without becoming kitsch.

**Aspect ratios**

| Surface | Ratio |
|---|---|
| Hero (homepage + hubs + custom landing) | 16:9 |
| Case studies / blog headers | 3:2 |
| Service cards | 4:3 |
| Gallery / before-after pairs | 1:1 |
| Testimonial photo (optional, owner-with-customer) | 4:3 |
| Logo / icon | 1:1 |

**Video rules**

- Homepage hero **may** include a 6–10s silent looping background — Kling AI per build-log Pattern #5 — of Kevin walking toward a Bow chimney with tools, copper cap glinting. **Autoplay: yes. Muted: yes. Captions: not needed (silent narrative). Fallback image: hero #1 above, with `prefers-reduced-motion` degrading to static (build-log Pattern #51 accessibility clause).**
- Realtor page **should** include a 30–45s narrated "What's in your Level 2 inspection report" walkthrough. Captions: yes (mandatory). Autoplay: no (user-initiated). Fallback: animated PDF preview SVG.
- Historic restoration page **may** carry a 60–90s case-study reel with VO. Captions: yes. Autoplay: no.

**Prohibited content**

1. Stock photos of generic fires, generic chimneys, generic men in hard hats (market-intelligence.md §9 Avoid #2).
2. Smiling-model fake-tradesman imagery (Crown/Anything tier — pattern we are differentiating from).
3. Cartoon flame logos, mascot moose, mascot soot-fairies, any anthropomorphized chimney character.
4. Any imagery of soldiers, flags, or military iconography (would conflict with avoided "veteran-owned" positioning per market-intelligence.md §9 Avoid #5).
5. Any imagery of crosses, prayer hands, or scriptural references (would conflict with avoided "faith-based" positioning per same source).
6. Text baked into AI-generated images (build-log Pattern #38 — fal.ai garbles letterforms).
7. Purple-gradient-on-white aesthetics (frontend-design.md explicit anti-pattern).

**Animation direction (locked here, handed to animation-specialist agent)**

The Stage 1A repo scan rejected ForgeCanvas (too thematic — stolen from Witt's Restoration), HeroEffects lightning (wrong semantic — electric not masonry), and brushstroke SVG (painting-coded — Xpertise). Personality axes (Section 8) point to **industrial × organic hybrid**. Recommended hero animation: **"Ember Drift over Hearth Stone"** — a slow rAF canvas particle system of warm copper-and-brick embers rising from the bottom 30% of the hero canvas with a subtle hearth-shimmer heat distortion above (sin-wave displacement, low amplitude, GPU-cheap), atop a static photographic hero plate (shot #1 above). Particles use `--accent` (copper) at hot core and `--primary` (brick) at edge; spawn rate 0.8/frame; lifespan 4–6s; fade exponentially as they reach the top third. Honors `prefers-reduced-motion` by freezing to a single ember layer at low opacity (build-log Pattern #51 + Error #11 mobile-cap rule). **Not a forge animation, not lightning, not brushstrokes** — it is heat rising off a worked stack at the end of the day. Final shape and parameters are the animation-specialist agent's call; this section sets the brief.

*Sources: market-intelligence.md §8 (real photography mandate, layout style "heritage-modern, generous whitespace, large-format photography"); §9 Avoid #2 (no stock), Avoid #5 (no veteran/faith); §7 #7 (authentic Kevin photo); initial-business-data.md §7 (no photos available — fal.ai generation required for demo); build-log Pattern #4 (fal.ai), Pattern #5 (Kling), Pattern #38 (no text in AI images), Pattern #51 (motion accessibility), Error #11 (mobile motion cap).*

---

## Section 7 — Tone of Voice

Five writing principles, derived from the audience language bank in market-intelligence.md §2 (real verbatim NH homeowner reviews), the buyer-blocker list (§2), and Kevin's own brand-personality framing in initial-business-data.md §4 ("trustworthy, direct, skilled, no-nonsense — a craftsman who lets the work speak").

**1. Plainspoken, never marketing-stuffed.**
*Rule:* Write the way Kevin would say it on the phone. No "leverage," no "solutions partner," no "passionate about excellence." Short sentences. Specific verbs.
*Before (real Crown Chimney homepage tone):* "Family, faith, and a fiery resolve to deliver world-class chimney solutions."
*After:* "Fifteen years on Bow rooftops. We answer the phone, show up when we said, and tell you what your chimney actually needs."

**2. Specific over general — name the brick, name the year, name the town.**
*Rule:* Never say "old homes." Say "1798 Cape." Never say "central NH." Say "Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke." Specificity is the trust signal.
*Before (Anything Chimney generic):* "We service homes throughout New Hampshire."
*After:* "We work the houses Bow's been heating since the 1700s — center chimneys, Rumford fireplaces, beehive bake ovens — and the Capes Hopkinton built last decade. Same care, different mortar."

**3. Acknowledge the fear, don't perform around it.**
*Rule:* The buyer is afraid of chimney fire and afraid of being scammed (market-intelligence.md §2 blockers #1 and #3). Name the fear; don't paper over it.
*Before (typical category):* "Trust the experts at Acme Chimney for all your needs!"
*After:* "If a sweep cold-called you for $49 and now wants $2,000 for a liner, you're being scammed. We don't cold-call. Call (603) 660-4644 and we'll tell you in five minutes whether you actually need work."

**4. Show the work, don't claim the work.**
*Rule:* Replace adjectives with photos and process. "Skilled" is a claim; a before-and-after slider with a captioned mortar joint is proof. Every page that makes a quality claim must be paired with a documented job artifact.
*Before:* "Master craftsmen with decades of historic experience."
*After:* "[Photo: 1812 Henniker stack repointed in Type O lime mortar, July 2024 — drone before / drone after.] Lime mortar costs us 30–50% more than Portland. Pre-1900 brick needs it. We use it because the brick comes apart if we don't."

**5. Direct CTAs in the language of the moment.**
*Rule:* Different page = different urgency. The realtor page CTA is not the historic-restoration page CTA. Match the verb to the buying trigger.
*Before (universal generic):* "Contact us today!"
*After:* Homepage: "Call (603) 660-4644 — Free Estimate." Realtor: "Schedule the Level 2 — 24-hour written report." Historic: "Schedule a site visit — free heritage assessment." Roofing: "Get the chimney + roof inspection — one truck, one quote."

**Cross-cutting rule (build-log content standard, Apr 2026):** never use em dashes (—) inside testimonial bodies — they're an AI tell. Use periods, commas, or honest line breaks. Em dashes in marketing copy (this document, hero copy, body sections) are fine; em dashes in **fabricated testimonial voices** are forbidden.

*Sources: market-intelligence.md §2 (audience language bank, blocker list); §9 Avoid #1 (don't compete on price), Avoid #4 (don't cold-call); §7 (CTA strategy per page); initial-business-data.md §4 (tone: trustworthy, direct, skilled, no-nonsense); build-log Workflow improvement (em dash rule, Apr 2026).*

---

## Section 8 — Brand Personality Axes

Three axes, each calibrated against the competitor-positioning grid (market-intelligence.md §3) and the audience expectations from §2. These axes feed directly to the animation-specialist agent for hero animation selection.

**Axis 1 — Tradesman precision vs. Editorial heritage**
```
Tradesman precision  ◄━━━━━━━━●━━━━━━━━━━► Editorial heritage
                              (slightly left of center)
```
Position rationale: Kevin is a craftsman first; the heritage frame is the *why*, not the *what*. The site reads as a working trade brand that happens to know lime mortar — not a Strawbery Banke museum site. Headlines lean editorial (Fraunces serif), but body copy and CTAs lean tradesman (Inter Tight, mono labels, "starting at $295"). *Source: initial-business-data.md §4 personality + market-intelligence.md §3 Steppingstones positioning (too far right) + Crown positioning (too far left).*

**Axis 2 — Quiet (one-truck owner-operator) vs. Grand (showroom + crew)**
```
Quiet ◄━━━━━●━━━━━━━━━━━━━━━► Grand
       (left-of-center, but not extreme)
```
Position rationale: Kevin is owner-operated. Ceaser is grand (showroom, 1,000+ reviews, multi-tech). Crown is grand (deep crew, full affiliations bar). Integrity's strength is the *intimate "you'll deal with Kevin himself"* signal — but it cannot read as so quiet that it triggers the "fly-by-night" fear (market-intelligence.md §2 blocker #2). Visual translation: generous whitespace and editorial pacing (signals confidence), but never multi-column "team page" merchandising. Hero feels personal; trust bar feels professional. *Source: market-intelligence.md §3 (Crown/Ceaser scale comparison); §7 trust hierarchy #1 ("Owner photo with name — single largest trust signal").*

**Axis 3 — Restrained vs. Dramatic (visual energy)**
```
Restrained ◄━━━━━━━━━━●━━━━━━━━━━━━━► Dramatic
                       (center-left)
```
Position rationale: the category default (Crown's bright reds, Anything's button-grids, Fire N' Stone's flame logo) is **over-dramatic and cheap**. Soot Solutions and Granite State are **too restrained and read as dead**. Integrity sits center-left: dark theme + serif display + ember-drift hero animation create gravity and atmosphere without resorting to flame imagery or red shouting. Animation-specialist read: this position rules out big lightning/forge/electric drama. It calls for slow, ambient, masonry-grounded motion. *Source: market-intelligence.md §8 competitor design audit; build-log Pattern #51 "max 3 active motion layers, GPU-cheap, ≤0.3Hz."*

These three axes together = **industrial-utilitarian hybridized with organic-natural**, dark-themed, editorially typeset, ember-paced. Confirmed against Optimus Positioning Constraint (luxury-modern-2026-conversion family); none of the prohibited directions (brutalist/raw, retro-futuristic, playful, art-deco maximalist, soft pastel) is approached.

*Sources: market-intelligence.md §2, §3, §7, §8; initial-business-data.md §4; build-log Pattern #49, Pattern #51; design-synthesizer.md Optimus Positioning Constraint.*

---

## Section 9 — Competitor Differentiation Statement

**vs. Crown Chimney (Hooksett, faith-family-affiliations bar, 164 reviews, the existing default Bow recommendation).**
Where Crown leans on a slab-serif "Family, Faith, and a Fiery Resolve" header with bright-red brand color and a deep affiliations bar, Integrity uses **Fraunces editorial serif** on a **dark Granite-Slate-and-Heritage-Brick palette** with a single owner-named hero ("Fifteen years on Bow rooftops. — Kevin Fredrickson") and no faith framing. Crown answers "we're a big family operation"; Integrity answers "you'll deal with Kevin." Crown's homepage is desktop-first WordPress with adequate mobile; Integrity's is mobile-first dark-theme with sticky-call CTA, scroll-padding-top per template, and a heritage-modern layout that no NH chimney company currently runs. Crown publishes no pricing; Integrity publishes "starting at $219 / $295 / $2,495 / $495 / $895" with the 24-hour callback SLA. The differentiation is not that we look "better" — it is that **Crown sells a family**, and we sell **a craftsman with a phone that gets answered and a written report by tomorrow**. *Source: market-intelligence.md §3 Crown analysis; §9 Do #2, #3, #6.*

**vs. Anything Chimney (Auburn, transparent pricing, "Book Online Now," 4.9★ HomeAdvisor).**
Anything Chimney is the pricing-transparency wedge — the only NH player with published prices and online booking. Their visual design is "2014 dense button grid" (market-intelligence.md §8). Integrity matches their pricing transparency wedge (we publish "starting at" too) but **leapfrogs the design tier entirely** with editorial serif typography, dark cinematic theme, large-format documentary photography, and an ember-drift atmospheric hero. Anything's site is functional; Integrity's site is *atmospheric and modern in a category that does not produce atmospheric and modern*. Anything has no historic restoration positioning; Integrity owns it. Anything has no realtor portal; Integrity ships `/for-realtors`. Where Anything wins on transactional sweep-cost search, Integrity wins on the *upgrade* search ("historic chimney restoration NH," "Level 2 inspection 24-hour report," "chimney plus roof contractor NH") — precisely the 4 keywords market-intelligence.md §6 says are unowned. *Source: market-intelligence.md §3 Anything analysis; §6 unowned long-tail keywords; §8 design audit.*

**vs. Ceaser Chimney (Manchester, veteran-owned, showroom, 1,036 reviews, design rated 8/10 — best-in-NH).**
Ceaser is the most dangerous competitor visually and they have already co-opted the word "integrity" in their copy ("built on a belief in integrity"). Where Ceaser uses **burgundy/cream/gold + modern serif + grand showroom photography + veteran-owned positioning**, Integrity uses **Heritage-Brick/Hearth-Copper on dark Soot-Black + Fraunces serif + owner-on-roof documentary photography + heritage-craftsman positioning** — explicitly **not** veteran-owned (per market-intelligence.md §9 Avoid #5; the territory is taken). Ceaser's copy says "veteran-owned, full-service, integrity"; Integrity's homepage says "Integrity isn't a marketing word. It's our last name." (market-intelligence.md §9 Exploit #1). Ceaser's grand showroom signals "we are big"; Integrity's owner-named hero signals "you will work with the person who owns the brand." Where Ceaser cannot service pellet appliances or metal roofs (their documented gaps), Integrity can — and our service-area chips (Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke) emphasize the central-NH small-town footprint that Ceaser's Manchester address does not own. *Source: market-intelligence.md §3 Ceaser analysis; §9 Exploit #1; Avoid #5.*

---

## Section 10 — Design Anti-Patterns (The Prohibited List)

1. **Do not use bright fire-engine red (`#D62828`, `#C0392B`, `#E63946` family).** This is Crown / Anything / Fire N' Stone territory and reads cheap. Heritage Brick `#7F2A1F` is sophisticated; pure red is not. *Source: market-intelligence.md §8 competitor color audit.*
2. **Do not use Inter or Roboto as the body font.** Frontend-design.md explicitly forbids. Inter Tight (a different family with sharper letterforms) is the substitute; default Inter is the generic-AI-design tell. *Source: frontend-design.md ¶3.*
3. **Do not use slab serifs (Roboto Slab, Arvo, Bree Serif, Rockwell).** Crown uses slab; we differentiate with a transitional contemporary serif (Fraunces). *Source: market-intelligence.md §8.*
4. **Do not use a flame, fire, or moose mascot.** Fire N' Stone has the flame; Black Moose has the moose. Heritage-craft positioning carries no mascot. The wordmark stands alone. *Source: market-intelligence.md §3.*
5. **Do not use stock photography of generic fires, generic chimneys, or smiling-model "tradesmen."** Real photography is the easiest moat in this category and the hardest to fake. fal.ai generation only as demo placeholder per build-log Pattern #4 + Pattern #38 (no text in images). *Source: market-intelligence.md §9 Avoid #2.*
6. **Do not display veteran-owned, military, or scriptural iconography or copy.** Ceaser owns veteran; Crown/Admiralty own faith; both lanes are claimed. *Source: market-intelligence.md §9 Avoid #5.*
7. **Do not use any flat-solid section background.** Every section is a gradient with subtle motion per build-log Pattern #51 (luxury gradient backgrounds rule). Static-gradient exceptions for blog body / legal / FAQ / pricing comparison only. *Source: build-log Pattern #51.*
8. **Do not place a photo in the hero composition.** Hero is text + animation overlay on photographic plate background; a foreground photo slot is forbidden per build-log Error #28 + Hero Architecture Rule. The Kevin-portrait belongs on the About section, not the hero. *Source: build-log Error #28.*
9. **Do not use brand color (`--primary` Heritage Brick) as a heading color on dark backgrounds.** All headings use `--text-primary` per build-log Error #29; brand color is reserved for accents, CTAs, hover lifts, and shimmer mid-stops. *Source: build-log Error #29.*
10. **Do not use em dashes inside fabricated testimonials.** Em dash is an AI/copywriter tell; humans rarely type them. Period or comma instead. *Source: build-log Workflow improvement Apr 2026 (em dash rule).*
11. **Do not show "starting at" prices below the floor anchor.** Sweep starts at $219 (above Anything Chimney's $199 anti-scam floor); Level 2 starts at $295. Pricing below those numbers triggers the scam-suspicion fear pattern documented in market-intelligence.md §2 blocker #1. *Source: market-intelligence.md §4 anchoring + §9 Avoid #1.*
12. **Do not request deposits >$1,000 on the website forms or any pricing copy.** Deposit fear is a documented buying blocker (market-intelligence.md §2 blocker #3); the homepage promise is "no deposits over $1,000 until day-of-start." *Source: market-intelligence.md §9 Avoid #3.*
13. **Do not promise "lowest price." Promise the 24-hour callback and the same-day photo report instead.** Price-low positioning is a category trap; SLA-based promises are the unowned wedge. *Source: market-intelligence.md §5 Gap 1, Gap 8.*
14. **Do not run an Instagram feed embed.** GBP doesn't exist yet, IG handle is unknown (initial-business-data.md §7), and Behold.so requires an active feed (build-log Pattern #30 — IG feed is optional). Empty-feed fallback is a worse signal than no embed at all. *Source: build-log Pattern #30; initial-business-data.md §7.*
15. **Do not embed a shop / e-commerce surface.** Shop is Premium-only ($5,500 tier); this is the Pro tier. All shop scaffolding stays out of the build, not behind a feature flag, since this is a pre-sale demo build (build-log Pattern #53 applies post-sale only). *Source: orchestrator brief; build-log Pattern #53.*
16. **Do not soften the corners past `rounded-xl` (12px) on cards or `rounded-md` (6px) on buttons.** Pill buttons and `rounded-3xl` cards drift toward "playful/toy-like" — explicitly prohibited dominant direction per Optimus Positioning Constraint. The exception is the sticky-mobile-call pill (functional necessity, not aesthetic choice). *Source: design-synthesizer.md Optimus Positioning Constraint; frontend-design.md.*

---

## Section 11 — Sections Matrix

### Base template features (Yes/No decisions — every row decided)

| Section | Include? | Notes |
|---|---|---|
| Shop (Stripe + Printful) | **No** | Premium-tier only ($5,500). Pro tier ($3,000) — orchestrator brief. No scaffolding kept; pre-sale demo, not a pivot-able client. |
| Blog (Sanity CMS) | **Yes (always)** | Required by template. Anchor for the 12-post historic-restoration content plan in market-intelligence.md §9 Exploit #5. Drives "historic chimney restoration NH" + 4 unowned long-tails (§6). |
| Quiz / Lead capture | **Yes** | Pro-tier inclusion per orchestrator brief. Quiz framing: "Find Your Chimney Service" — 5 questions (year built, fuel type, last cleaned, primary concern, transaction status) → routes to Sweep, Inspection, Liner, Historic Restoration, or Realtor Level 2. Build-log Pattern #29 (scored quiz lead funnel). |
| Booking widget (Calendly) | **Yes (always)** | Required by template. Embedded on `/booking` and inline on quiz results screen. Light-stage section per build-log Pattern #52 (dark-brand site needs ivory Calendly stage). |
| Google Maps embed | **Yes** | Free iframe (`maps.google.com/maps?q=Bow,NH&output=embed`) per build-log Pattern #11. Used on Service Areas page and Contact page footer. Reinforces local-Bow positioning (market-intelligence.md §9 Exploit #3). |
| Instagram feed | **No** | No IG handle confirmed in initial-business-data.md §7; no GBP. Empty-feed fallback is worse trust signal than no embed. Behold.so optional per build-log Pattern #30; revisit post-launch when client provides handle. |
| Service area pages | **Yes** | **6 service-area pages** locked from Stage 1A repo scan: **Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke**. Each follows Cody's Junk Removal canonical pattern: hero with town-specific photo, town-specific intro paragraph, 3 service teasers, FAQ block, CTA. Bow page is flagship per market-intelligence.md §9 Exploit #3. |
| Pricing page | **Yes** | Critical conversion lever per market-intelligence.md §4 + §9 Do #3 (publish "starting at" prices). Follows Xpertise Painting canonical structure. Five line items: Sweep $219, Level 2 $295, SS Liner $2,495, Crown Repair $495, Multi-Flue Cap $895. Build-log Pattern #9 (3-tier anchoring) adapted to service tiers (Sweep / Inspection / Restoration). |
| Testimonials page | **Yes** | Threshold met: **36 testimonials** (build-log Error #31 — pagination 9 per page = perfect 3×3, 4 pages). 36 fabricated for demo per initial-business-data.md §7 (no testimonials on hand); each cites a real NH town from the §1 service-area list. Em dash rule enforced (Section 10 #10). |

### Custom features (Pro tier additions specific to this build)

| Custom Feature | Source (file + section) | Complexity estimate |
|---|---|---|
| `/historic-restoration` flagship hub | market-intelligence.md §5 Gap 2 + §9 Do #1 + Exploit #5; orchestrator brief | **Medium-High** — bespoke hero, 3–5 NH case-study CPT (Bow, Henniker, Hopkinton, Canterbury, Pembroke), lime-mortar-vs-Portland explainer, Rumford / beehive bake oven sub-page, NPS Preservation Brief 2 reference panel, before/after slider component (1:1 ratio gallery). 12+ images. |
| `/for-realtors` B2B landing page | market-intelligence.md §5 Gap 3 + §9 Do #5 + Exploit #4 | **Medium** — bespoke hero, "submit closing date" form (name, brokerage, address, target close date, flue count), $295 published price, branded PDF deliverable spec mock, trust bar with realtor-friendly trust signals (LAER Preferred Partner, NHAR-aligned), CTA "Schedule Level 2 — 24-hour written report." Form posts to lead intake. |
| `/exterior-envelope` bundle landing page | market-intelligence.md §5 Gap 4 + §9 Do #7 + Exploit #2; orchestrator brief | **Medium** — bespoke hero with drone-perspective composite, "Chimney + Roof + Flashing + Ice Dam" 4-point inspection list, $99 promotional anchor (waived against any subsequent work over $2K), single-quote / single-warranty messaging, comparison table vs. "two contractors" friction. |
| 24-hour callback SLA banner (homepage) | market-intelligence.md §5 Gap 1 + §9 Do #2 + §7 friction #1 | **Low** — static promise band above-the-fold ("We answer the phone. If we miss, we call back within 4 business hours — or your free estimate is on us."), with mono caption + copper underline. SMS-backstop (Twilio missed-call text-back) is a Phase-2 operational add, not a build dependency. |
| Service-area page set (6 towns) | initial-business-data.md §1 / orchestrator Stage 1A scan | **Medium** — Bow / Concord / Hopkinton / Henniker / Loudon / Pembroke. Bow is flagship; others templated. Each gets unique hero copy, town fact panel (founding year, housing-stock note), 3 service teasers, town-specific FAQ block, Maps embed. |
| "Find Your Chimney Service" 5-question quiz | market-intelligence.md §2 personas + §7 CTA strategy + build-log Pattern #29 | **Medium** — Build-log Pattern #29 scaffold; 5 Q's, 5 routed outcomes (Sweep / Level 1 Insp / Level 2 Realtor / Liner / Historic Restoration); inline BookingCalendar on results; client-only Resend notification of quiz answers; no email gate before result (Calendly captures email at booking). |
| Calendly light-stage section (Pattern #52) | build-log Pattern #52 (Calendly dark-mode textColor incomplete — Error #52) | **Low** — booking page wraps Calendly iframe in `#F5F0EB` ivory section with white widget surface, Granite-Slate body text, copper active border. Hero stays dark above; "step into the light" transition is intentional. |
| Chimney-scam education content asset | market-intelligence.md §5 Gap 6 + §9 Exploit #1 | **Low-Medium** — long-form `/chimney-scams-nh` page; HowTo schema; "We do not cold-call" verification banner; cross-links to Pricing and Contact. Reinforces the "Integrity" brand-name claim. |
| Pricing "Starting At" structured pricing page | market-intelligence.md §4 + §9 Do #3 | **Low** — Five line items in Xpertise Painting card layout; each card has price, what's included, what's not, CTA. Disclaimer band: "Final price after on-site assessment. Free estimates over $500." |
| 12-post historic-restoration blog content plan | market-intelligence.md §9 Exploit #5 | **Out of scope for Phase 1 build** — content-writer agent task. Build supplies the Sanity CMS, blog index, blog post template, and 3–6 launch posts (one per service-area page); remaining 6–9 posts shipped post-launch. |

**Sections Matrix verdict counts:**
- **IN: 8** (Blog, Quiz, Booking, Google Maps, Service Areas, Pricing, Testimonials, plus the always-on Booking widget)
- **OUT: 2** (Shop, Instagram feed)
- **Custom: 9** (Historic Restoration hub, For-Realtors, Exterior Envelope, 24-hr SLA banner, 6-town Service Area set, Quiz, Calendly light stage, Chimney-scams asset, Pricing "starting at" structure)

Note: the 6-town Service Area set is counted as a single custom item in the Custom row but represents 6 page templates. Pricing page is counted as both a base "Yes" and a custom item because the *structure* (published "starting at" with the specific 5 line items + 24-hour callback overlay) is bespoke beyond the base template's pricing scaffold.

---

## Validation Self-Check

- [x] All 11 section headers present.
- [x] Section 2: all 9 CSS custom property tokens have hex/rgba values, all cite sources, dark-theme decision flagged explicitly.
- [x] Section 8: exactly 3 axes with position markers in the prescribed `[Pole A] ◄━━●━━► [Pole B]` format.
- [x] Section 11: every base-template row has Yes or No (no blanks); custom feature table is fully populated.
- [x] Every decision cites at least one source document and section.
- [x] No "TBD," "TODO," or blank subsections.
- [x] Optimus Positioning Constraint: industrial-utilitarian × organic-natural hybrid is within the allowed family; no prohibited direction (brutalist, retro-futuristic, playful, art-deco maximalist, soft pastel) approached.
- [x] Confidence-threshold check: zero sections required `⚠️ LOW CONFIDENCE` flags. Market-intelligence.md is dense (81 KB, 14+ pages of structured research) and supports every decision made here.

**Conflict log:** No client-vs-research conflicts surfaced during synthesis. The client's stated "trustworthy, direct, skilled, no-nonsense" personality (initial-business-data.md §4) aligns cleanly with the research-driven Heritage + Trust + Multi-Trade Craftsmanship positioning (market-intelligence.md §9). The client provided no brand colors or fonts (initial-business-data.md §4 marked ⚠️ NOT FOUND), so the palette and typography are research-derived without conflict.

**Open questions for human review (not blocking):**
1. CSIA / NCSG / NEACHP certification status — used in trust-bar Section 5 and Section 9 but currently `⚠️ NOT FOUND` in initial-business-data.md §7. If Kevin is not certified, the trust-bar logos for those affiliations must be removed before launch and the affiliations bar simplified to BBB A+ / Fully Insured / 15+ Years / Free Estimates. Pursuing certifications is a market-intelligence.md §7 trust-hierarchy recommendation.
2. NH Preservation Alliance directory membership — referenced in Section 1 and Section 9 as a positioning lever. The recommendation is to *pursue* this membership immediately (market-intelligence.md §9 Do #4); if Kevin declines or the application is rejected, Historic Restoration positioning still holds but the trust-bar Alliance logo is removed.
3. Real photography commission timing — fal.ai placeholder set is the demo build; Section 6 calls for a one-day Concord-photographer shoot post-sale. Timing and budget for that shoot are post-launch decisions.
