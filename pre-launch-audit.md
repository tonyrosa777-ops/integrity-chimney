# Pre-Launch Audit — Integrity Chimney Services LLC
Date: 2026-04-30
Auditor: pre-launch-auditor (file-level only)
Project: c:\Projects\Integrity-Chimney\website

## Summary
PASS: 43  FAIL: 0  WARN: 5  DEFERRED: 4
[BLOCKED-ON: Section 11 Multi-Breakpoint Browser Audit]
[FAIL-RESOLVED-INLINE: 2026-04-30] FAIL-1 and FAIL-2 (both `/api/newsletter` missing `replyTo`) fixed by orchestrator. All 8 emails.send() calls across 5 API routes now have explicit replyTo (Error #50 enforcement). tsc clean post-fix.

The build is structurally clean: TypeScript zero-error, `next build` zero-error, all 51 routes prerender, every nav and sitemap href resolves to a real route, every JSON-LD schema is mounted, and the CTA / Hero / Quiz / Booking guardrails are in place. The two original FAIL items have been resolved; file-level gate clears for Stage 1I.

---

## FAIL Items (must resolve before Stage 1I)

### FAIL-1: `/api/newsletter` confirmation email missing `replyTo` (Error #50) — ✅ RESOLVED 2026-04-30
- **File:** `c:\Projects\Integrity-Chimney\website\src\app\api\newsletter\route.ts:91-97`
- **Resolution:** Added `replyTo: ownerEmail` on line 94 of the lead-confirmation send. New subscribers who hit Reply now reach Kevin directly.

### FAIL-2: `/api/newsletter` owner-notification email missing `replyTo` (Error #50) — ✅ RESOLVED 2026-04-30
- **File:** `c:\Projects\Integrity-Chimney\website\src\app\api\newsletter\route.ts:100-111`
- **Resolution:** Added `replyTo: email` on line 103 of the owner-notification send. Kevin's reply now reaches the new subscriber.

---

## WARN Items (review before launch — not launch-blockers)

### WARN-1: `console.log` in `/api/calendly/book` route (production code)
- **File:** `c:\Projects\Integrity-Chimney\website\src\app\api\calendly\book\route.ts:115, 200`
- **Detail:** Two `console.log` calls remain in the booking API route. Both are gated behind dev-fallback conditions (no Resend key configured / demo bookingId) so they will not fire in production once env vars are set, but the checklist's "no console.log in production code" rule technically flags them. Server-side logs are far less risky than client-side ones — they do not leak to the browser. Decision: keep or replace with `console.warn`. Either is acceptable.

### WARN-2: Em dashes inside CSS comments in `globals.css`
- **File:** `c:\Projects\Integrity-Chimney\website\src\app\globals.css:4, 10, 15, 27, 29, 57, 77, 85, 96, 123`
- **Detail:** All ten occurrences are inside `/* ... */` CSS comments (section dividers, palette labels). Zero em dashes appear in any TS/TSX file or any user-visible string. Per the agent file: "Should be zero in TS/TSX. Comments are also covered by the rule." Comments in `globals.css` are not user-visible. Decision: low-risk, suggest replacing with " - " (hyphen-space-hyphen) on the next pass for full template compliance.

### WARN-3: `.env.local` documents wrong key name for Calendly event-type URI
- **File:** `c:\Projects\Integrity-Chimney\website\.env.local:8`
- **Detail:** `.env.local` declares `NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI=` but `/api/calendly/slots/route.ts:137` and `/api/calendly/book/route.ts:64` read `process.env.CALENDLY_EVENT_TYPE_URI` (server-only, no `NEXT_PUBLIC_` prefix). The server-only naming is correct (the URI is only consumed in API routes, never in browser code). Fix: rename the `.env.local` line to `CALENDLY_EVENT_TYPE_URI=`. Without this rename, an operator pasting in a real value will set the wrong key and the demo-mode fallback will silently take over in production.

### WARN-4: `NEXT_PUBLIC_SHOW_PRICING_TOOLS=true` set in `.env.local` but unreferenced in code
- **File:** `c:\Projects\Integrity-Chimney\website\.env.local:3`
- **Detail:** Variable is set to `"true"` but `grep -r SHOW_PRICING_TOOLS src/` returns zero matches. No risk of dev-only tooling appearing in production (the variable does nothing). Suggest removing the line for clarity, or adding the flag check to `/optimus-pricing` if that page is meant to be gated. The current state — `/optimus-pricing` exists at all times, gated only by `robots: noindex` and sitemap omission — matches the agent spec ("must exist but NOT be in the sitemap and have noindex"), so the env-var is effectively vestigial.

### WARN-5: Lighthouse score not verified
- **Detail:** Cannot be measured by file reading. Manual Lighthouse run required after Stage 1I browser audit completes. Stage 1I covers the visible-state checks; Lighthouse is a separate manual gate before Stage 2 launch.

---

## DEFERRED Items (visible-state — verified by Stage 1I browser audit, not by file reading)

### DEFERRED-1: No horizontal overflow at 390 / 375 / 428 / 1440px
- File-reading cannot confirm rendered overflow. Stage 1I Playwright audit captures screenshots at every viewport.

### DEFERRED-2: Hero CTA buttons not intercepted by background elements (Error #48 runtime check)
- File-level check passes: `Hero.tsx` has `relative z-10` on the content wrapper (line 41), and both decorative layers — `EmberDriftCanvas` wrapper (line 23) and the radial-vignette div (line 31) — have `pointer-events-none`. Runtime click verification deferred to Stage 1I.

### DEFERRED-3: Mobile nav drawer opens, surfaces all 9 nav links, closes on backdrop click
- `Navigation.tsx` mobile drawer renders `nav.primary` plus the Service Areas dropdown plus the phone link plus Book Inspection CTA (lines 259-343). Visual link-count verification at 390px belongs to Stage 1I (Error #38).

### DEFERRED-4: Console clean at every viewport (no hydration warnings, no React errors, no asset 404s)
- File-reading cannot capture browser console output. Stage 1I captures console at every viewport.

---

## PASS Items (file-level checks, with evidence)

### Build & Type Safety
1. **`npx tsc --noEmit` PASSES** — zero errors.
2. **`npx next build` PASSES** — 51 routes prerender (39 static, 7 dynamic SSG, 5 API), TypeScript clean, no warnings.

### Configuration
3. **`metadataBase` set in root layout** — `src\app\layout.tsx:31-33` resolves to `NEXT_PUBLIC_SITE_URL` with `https://integritychimney.com` fallback.
4. **`vercel.json` present** at project root with `rootDir: website`.
5. **All `NEXT_PUBLIC_*` vars used in code are documented in `.env.local`** — `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`. (See WARN-3 for one mismatched key name.)
6. **`.env.local` is gitignored** — `.gitignore:34 (.env*)`. `git ls-files .env.local` returns empty. Secrets safe.

### Copy Quality (`src\data\site.ts`, 1372 lines)
7. **Zero em dashes** in any `.ts` / `.tsx` file under `src/`. (10 hits exist in `globals.css` CSS comments — see WARN-2.)
8. **Zero `TODO` / `INSERT` / `[FILL]` / `lorem` / `TBD` strings** in copy fields. The "placeholder" matches are all React form `placeholder=` attributes (legitimate UI use) or intentional blog empty-state UI gating on Sanity not being configured yet.
9. **Zero `DEMO COPY` markers, zero `[MISSING:` flags** in `site.ts` or `gallery.ts`.
10. **Zero hardcoded test emails** (no `test@`, `noreply@test`). The single `you@example.com` hit is a NewsletterForm input placeholder attribute.

### Optimus-Specific Guardrails
11. **`/optimus-pricing` exists** — `src\app\optimus-pricing\page.tsx` plus a sibling `layout.tsx` with `robots: { index: false, follow: false, nocache: true }`.
12. **`/optimus-pricing` is NOT in the sitemap** — `src\app\sitemap.ts` lists 16 static + 11 services + 6 city + N blog entries. /optimus-pricing absent. (Confirmed by `next build` route table — page renders but is excluded from `/sitemap.xml`.)
13. **`/optimus-pricing` is in `robots.ts` Disallow** — `src\app\robots.ts:24` blocks `/studio`, `/optimus-pricing`, `/api/`.
14. **`/pricing` (client-facing) contains zero "Google" matches** — case-insensitive grep over `src\app\pricing\` returns zero.
15. **`/optimus-pricing` contains zero "Google" matches** — case-insensitive grep returns zero.
16. **`/optimus-pricing` contains zero "deposit/upfront/down payment/payment split" matches** — case-insensitive grep returns zero.
17. **Hero primary CTA is "Book Inspection" → `/booking`** — `src\components\sections\Hero.tsx:103-113`, sourced from `site.ts:43`.
18. **Hero secondary CTA is "Take the Quiz" → `/quiz`** — `src\components\sections\Hero.tsx:114-124`.
19. **Phone number in nav, NOT in hero CTA** — `Navigation.tsx:166-172` (desktop) and `Navigation.tsx:330-335` (mobile drawer). Hero contains zero phone-number references.
20. **Custom `BookingCalendar` is NOT a Calendly iframe** — `src\components\booking\BookingCalendar.tsx` is a 600-line custom calendar component with month grid, slot fetch from `/api/calendly/slots`, and POST to `/api/calendly/book`. The only "calendly" string in this file is a comment header explicitly documenting "There is NO Calendly iframe." Zero `<iframe[^>]*calendly` matches across `src\components\booking\` (or anywhere in `src\`).
21. **All 5 quiz outcome CTAs route to `/booking`** — `site.ts:1144, 1153, 1162, 1171, 1180` all set `ctaHref: "/booking"`. Quiz component reads `outcome.ctaHref` at `src\components\quiz\Quiz.tsx:556`.
22. **Testimonials: 36 total, 9 per page, exactly 4 pages** — `site.ts:599` `testimonials: Testimonial[]` array contains 36 entries. `src\app\testimonials\TestimonialsGrid.tsx:8` sets `PAGE_SIZE = 9`. Math: ceil(36/9) = 4 pages exactly. Code comment at lines 16-19 documents indices 0-8, 9-17, 18-26, 27-35.
23. **Shop directory does NOT exist** — `ls src\app\shop` and `ls src\components\shop` and `ls src\app\api\stripe` all return "No such file or directory."

### Email Wiring (Resend, Error #50)
24. **8 total `resend.emails.send()` calls across 5 API routes** — count by `grep -c`:
    - `realtor-intake/route.ts`: 1 call, `replyTo: data.email` (line 140) — PASS
    - `contact/route.ts`: 1 call, `replyTo: data.email` (line 134) — PASS
    - `quiz/route.ts`: 2 calls, owner-notification has `replyTo: body.lead.email` (line 251), customer-confirmation has `replyTo: ownerEmail` (line 263) — PASS
    - `calendly/book/route.ts`: 2 calls, owner-notification has `replyTo: payload.lead.email` (line 159), customer-confirmation has `replyTo: ownerEmail` (line 171) — PASS
    - `newsletter/route.ts`: 2 calls, BOTH missing `replyTo` — FAIL-1, FAIL-2 above
25. **Form `onSubmit` handlers all call `fetch()`** — Booking, Contact, RealtorIntake, Newsletter, Quiz all `fetch("/api/...", ...)`. Zero forms swallow submissions.

### Routes & Navigation
26. **Every `nav.primary` href resolves to a real route** — `site.ts:1334-1343` lists 9 nav items: `/services`, `/historic-restoration`, `/for-realtors`, `/service-areas`, `/pricing`, `/gallery`, `/blog`, `/about`, `/contact`. All 9 exist as directories under `src\app\`.
27. **Every `sitemap.ts` entry resolves to a real route** — 16 static + 11 service slugs (from `services` array) + 6 city slugs (from `serviceAreas` array). All cross-checked against `next build` route table.
28. **All 11 service slugs resolve** — `chimney`, `chimney-cleaning`, `level-2-inspection`, `stainless-steel-liner`, `rain-caps`, `masonry`, `crown-repair`, `historic-restoration` (note: this is also a top-level page; the `services/historic-restoration` slug is a different page generated via `generateStaticParams`), `roofing`, `real-estate-inspections`, `insurance-inspections`. All 11 prerendered by `services/[slug]/page.tsx` (visible in `next build` route table).
29. **All 6 service-area slugs resolve** — `bow`, `concord`, `hopkinton`, `henniker`, `loudon`, `pembroke`. All prerendered by `service-areas/[city]/page.tsx`.
30. **Mobile nav drawer surfaces all 9 primary links** plus phone plus Book Inspection plus Service Areas dropdown — `Navigation.tsx:259-343`.

### SEO & Schema
31. **`LocalBusinessSchema` mounted in root layout** — `layout.tsx:71`, includes `name`, `legalName`, `url`, `telephone`, `email`, `address`, `geo`, `areaServed` (6 cities), `openingHoursSpecification`, `priceRange`, `foundingDate`, `@type: [LocalBusiness, HomeAndConstructionBusiness]`.
32. **`WebsiteSchema` mounted in root layout** — `layout.tsx:72`.
33. **`/services/[slug]` mounts `ServiceSchema`, `BreadcrumbSchema`, `FAQSchema`** — `services\[slug]\page.tsx:65-75`.
34. **`/service-areas/[city]` mounts `BreadcrumbSchema`, `FAQSchema`** — `service-areas\[city]\page.tsx:62-71`.
35. **`/faq`, `/chimney-scams-nh`, `/historic-restoration`, `/blog/[slug]` schema components present** — verified via `src\components\seo\` directory: `ArticleSchema`, `BreadcrumbSchema`, `FAQSchema`, `JsonLd`, `LocalBusinessSchema`, `ServiceSchema`, `WebsiteSchema`.
36. **`opengraph-image.tsx` generators compile** — root, `/services`, `/service-areas`, `/historic-restoration`, `/for-realtors`, `/blog` all have `opengraph-image.tsx` files. All 6 prerendered by `next build`.
37. **No two pages share the same primary meta description** — manual diff of all `description: "..."` strings across 16 metadata exports shows every primary description is unique. (OpenGraph and Twitter descriptions intentionally duplicate within a single page; that is the standard Next.js metadata pattern, not a duplicate-page issue.)
38. **`robots.ts` disallows `/studio`** — `src\app\robots.ts:24`.

### Images & Media
39. **All `<Image>` and `<img>` tags have `alt`** — verified across all 6 occurrences in PostCard, Blog/[slug], PostBody, GalleryClient, About FounderPhoto. The single `<img>` (About FounderPhoto) is intentional (`eslint-disable-next-line @next/next/no-img-element`) and has alt.
40. **Gallery has 14 images on disk** — `public\images\gallery\` contains 14 .jpg files plus a manifest.json. `gallery.ts` exports 14 items. Threshold is "at least 12" — PASSES.
41. **No fal.ai placeholder URLs in production runtime** — only string matches are in TSX comments documenting where fal.ai images will eventually replace gradient placeholders. Zero `fal.ai` URLs in actual `src=` props.

---

## Section 11 Handoff

```
[BLOCKED-ON: Section 11 Multi-Breakpoint Browser Audit]
File-level checks: 41 PASS / 2 FAIL / 5 WARN / 4 DEFERRED
Orchestrator action: Run Playwright audit per knowledge/patterns/end-of-build-multi-breakpoint-browser-audit.md
Blocker conditions: The 2 FAIL items (newsletter `replyTo`) block Stage 1I. The 5 WARN items should be reviewed before browser audit but are not gating.
```

## Section 12 Handoff

```
[HANDOFF-TO-ULTRAREVIEW]
Status: file-level audit clean. Both FAILs resolved 2026-04-30 by inline orchestrator fix (replyTo added to both newsletter route emails.send() calls). Stage 1I (multi-breakpoint browser audit) is the next gate; Stage 1J /ultrareview runs after Stage 1I PASSES.
```

## §Ultrareview Findings

_To be populated by orchestrator after `/ultrareview` runs in Stage 1J. Stage 1J does not run until Stage 1I (browser audit) PASSES._
