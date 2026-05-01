/**
 * site.ts: Single source of truth for all site copy.
 * Filled by the content-writer agent in Stage 1D.
 * Components MUST import from here. Zero hardcoded strings in components.
 *
 * Voice: trustworthy, direct, skilled, no-nonsense craftsman.
 * Source map: market-intelligence.md §2 (audience), §7 (triggers/blockers),
 * §8 (verbatim quotes), §9 (strategy); design-system.md §7 (tone), §11 (matrix);
 * initial-business-data.md (card-verified facts).
 */

export const siteConfig = {
  name: "Integrity Chimney Services LLC",
  legalName: "Integrity Chimney Services LLC",
  shortName: "Integrity Chimney",
  domain: "integritychimney.com",
  url: "https://integritychimney.com",
  owner: "Kevin Fredrickson",
  phone: "(603) 660-4644",
  phoneTel: "+16036604644",
  email: "IntegrityChimney1@gmail.com",
  address: {
    city: "Bow",
    state: "NH",
    region: "Central New Hampshire",
  },
  founded: 2010,
  yearsExperience: 15,
  socials: {
    instagram: "",
    facebook: "",
  },
  // Sister brand owned by Kevin Fredrickson, surfaced inline on the same domain.
  // Source: prospect's own Claude mockup (integrity-combined HTML), 2026-05-01.
  secondaryBrand: {
    name: "Integrity Exteriors NH",
    legalName: "Integrity Exteriors NH",
    shortName: "Integrity Exteriors",
    focus: "Siding & Roofing",
    phone: "(603) 568-9292",
    phoneTel: "+16035689292",
    email: "integrityexteriors603@gmail.com",
    tagline: "Siding and roofing done right. Quality materials, clean installs, lasting protection.",
  },
} as const;

/* =============================================================
   Hero (homepage)
   ============================================================= */
export const hero = {
  eyebrow: "CENTRAL NEW HAMPSHIRE · CHIMNEY · MASONRY · ROOFING",
  headline: "Chimney. Masonry. Roofing. One craftsman who answers the phone.",
  subheadline:
    "Owner-operated. Fully insured. Free estimates across Bow, Concord, Hopkinton, Henniker, Loudon, and Pembroke. Same-week scheduling for transactions under contract.",
  primaryCTA: { label: "Book Inspection", href: "/booking" },
  secondaryCTA: { label: "Take the Quiz", href: "/quiz" },
  trustBadges: [
    "Fully Insured",
    "BBB A+ Accredited",
    "Free Estimates",
    "Owner-Operated",
  ],
};

/* =============================================================
   Promise / SLA Banner: homepage above-the-fold
   Source: market-intelligence.md §9 Do #2, 24-hour callback SLA
   ============================================================= */
export const promise = {
  headline: "We answer the phone.",
  body: "If we miss your call, we call back within 4 business hours. If we don't, your free estimate is on us.",
  guarantee:
    "No deposits over $1,000 until the day work begins. Final invoice on completion.",
};

/* =============================================================
   Pain Points (4 cards, empathy-first, no CTA)
   Source: market-intelligence.md §2 buyer blockers + §7 friction points
   ============================================================= */
export const painPoints: Array<{ emoji: string; title: string; body: string }> = [
  {
    emoji: "🔥",
    title: "You smell creosote and the kids are upstairs.",
    body: "Wood stove drafted poorly during the last storm. There's a stain on the ceiling near the chimney. You don't know if it's safe to light tonight, and the last guy you called never called back.",
  },
  {
    emoji: "📵",
    title: "The last contractor ghosted you.",
    body: "He came out, gave a fair quote, and then the texts and voicemails went unanswered. The job sits half-done on a sticky note. You need someone who picks up the phone the first time and shows up the day they said.",
  },
  {
    emoji: "💰",
    title: "Two quotes said repoint, two said tear it down.",
    body: "The price spread was thirty thousand dollars. One company told you the chimney has cracks they couldn't show you. You want a real assessment with photos you can see, not a sales pitch on your roof.",
  },
  {
    emoji: "📋",
    title: "Your closing date is in fourteen days.",
    body: "The home inspector flagged the chimney for further evaluation. The buyer's agent wants a Level 2 written report this week. You need a CSIA-aware sweep who can be on site this week and get a clean PDF to the lawyer.",
  },
];

/* =============================================================
   Services: three pillars + sub-services
   Site structure: /services hub + /services/[slug] detail pages
   ============================================================= */
export type Service = {
  slug: string;
  pillar: "chimney" | "masonry" | "roofing" | "exteriors";
  emoji: string;
  name: string;
  tagline: string;
  description: string;
  startingPrice: string;
  whatYouGet: string[];
  whoItsFor: string[];
  process: Array<{ step: number; title: string; body: string }>;
  faq: Array<{ q: string; a: string }>;
};
export const services: Service[] = [
  {
    slug: "chimney",
    pillar: "chimney",
    emoji: "🧱",
    name: "Chimney Services",
    tagline: "Sweeps, inspections, liners, caps, and rebuilds across central NH.",
    description:
      "Full-service chimney work from a $219 sweep to a full center chimney rebuild. We work wood-burning, pellet, and oil flues. Every visit ends with photos so you can see what we saw before you pay anything.",
    startingPrice: "Starting at $219",
    whatYouGet: [
      "Drop cloths down before any tool comes out",
      "HEPA vacuum cleanup, shoes off in the house",
      "Photo documentation of every flue and the roof access",
      "Written inspection sheet sent same day",
      "Free estimate on any repair quoted over $500",
    ],
    whoItsFor: [
      "Homeowners who heat with wood, pellet, or oil",
      "Buyers and sellers needing a Level 2 report",
      "Anyone who has had a chimney fire or smelled smoke in the room",
      "Owners of pre-1900 NH homes with center chimneys",
    ],
    process: [
      { step: 1, title: "Call answered", body: "Phone rings, Kevin or his crew picks up. If we miss, we call back within 4 business hours." },
      { step: 2, title: "Site visit and free estimate", body: "We come out, look at the chimney top to bottom, take photos, and write up what's needed and what isn't." },
      { step: 3, title: "Quote in writing", body: "You get a clear scope of work with line items. No surprises on the final invoice. No deposits over $1,000 until day-of-start." },
      { step: 4, title: "Work done clean", body: "Drop cloths, HEPA vac, shoes off in the house. We document every step with photos for your records." },
      { step: 5, title: "Final walk-through", body: "We show you the finished work, hand over the photo report, and bill on completion. Workmanship guarantee included." },
    ],
    faq: [
      { q: "How often should I clean my chimney?", a: "If you burn three or more cords of wood a year, once every season. Light use, once every two years if a Level 1 inspection clears it. We tell you the truth based on what we see, not what we want to sell." },
      { q: "What's the difference between Level 1 and Level 2?", a: "Level 1 is a visual check of accessible parts. Level 2 adds a camera scan of every flue and is required by NFPA 211 when you sell a home, change fuel, or after a chimney fire." },
      { q: "Do you service pellet and oil flues?", a: "Yes. Many NH companies skip oil and pellet. We don't. The furnace flue is often the dangerous one, and it's the one most often missed." },
      { q: "How fast can you get out for a real estate transaction?", a: "Most weeks we can be on site within 3 to 5 business days. The Level 2 written report is in your inbox within 24 hours of the visit. Email IntegrityChimney1@gmail.com with your closing date and we'll confirm." },
    ],
  },
  {
    slug: "chimney-cleaning",
    pillar: "chimney",
    emoji: "🧹",
    name: "Chimney Cleaning & Sweep",
    tagline: "$219 sweep with a Level 1 inspection and a written report.",
    description:
      "Top-down brushing, smoke chamber and shelf scraped, HEPA vacuum cleanup, and a Level 1 visual inspection of the firebox, smoke chamber, flue, crown, cap, and flashing. We send the inspection sheet by email the same day.",
    startingPrice: "Starting at $219",
    whatYouGet: [
      "Top-down brush sweep and smoke chamber scrape",
      "HEPA vacuum interior cleanup",
      "Level 1 visual inspection of all accessible parts",
      "Photo report of any concerns",
      "Written inspection sheet sent same day",
    ],
    whoItsFor: [
      "Homeowners burning wood or pellet through a NH winter",
      "Anyone preparing the chimney before first fire of the season",
      "Buyers wanting baseline maintenance after move-in",
    ],
    process: [
      { step: 1, title: "Schedule the visit", body: "Call (603) 660-4644 or book online. Most weeks we have an opening within 7 to 10 days." },
      { step: 2, title: "Sweep and inspect", body: "Drop cloths down, top-down brushing, smoke chamber scraped, HEPA vac. Roof access and cap checked. Photos along the way." },
      { step: 3, title: "Report and recommendations", body: "Same-day inspection sheet emailed. If we flag something, we explain it with photos. If nothing's wrong, we say so." },
    ],
    faq: [
      { q: "Why $219 instead of $99 like the cold-call guys?", a: "Anyone offering a $49 or $99 sweep is either losing money or planning to upsell you a $2,000 liner they made up. We don't cold-call. We don't run bait-and-switch. The $219 covers a real sweep, real inspection, and a written report." },
      { q: "Do I need to do anything before you arrive?", a: "Stop using the fireplace at least 24 hours before. Move anything fragile from the hearth. We bring drop cloths, vacuum, ladders, everything else." },
      { q: "How long does it take?", a: "About 60 to 90 minutes for a single flue. Multi-flue chimneys take longer. We'll tell you the timing when we book." },
    ],
  },
  {
    slug: "level-2-inspection",
    pillar: "chimney",
    emoji: "📋",
    name: "Level 2 Inspection",
    tagline: "$295 with a 24-hour written PDF report. Built for real estate transactions.",
    description:
      "NFPA 211 Level 2 inspection: every flue scanned with a video camera, roof access checked, firebox and smoke chamber documented, photos taken at each station. Branded PDF report delivered to your inbox within 24 hours of the visit. The standard for home sales, fuel changes, and post-chimney-fire evaluation.",
    startingPrice: "Starting at $295",
    whatYouGet: [
      "Video camera scan of every flue, top to bottom",
      "Roof, crown, cap, and flashing inspection",
      "Firebox, smoke chamber, and damper review",
      "Photo documentation at each inspection station",
      "Branded PDF written report within 24 hours",
      "Recommendations the lawyer and buyer can act on",
    ],
    whoItsFor: [
      "Realtors with a closing window of 10 to 14 days",
      "Sellers pre-empting buyer renegotiation",
      "Buyers told the chimney needs further evaluation",
      "Owners after a chimney fire or fuel change",
    ],
    process: [
      { step: 1, title: "Send us the closing date", body: "Email IntegrityChimney1@gmail.com or call (603) 660-4644 with the address and target closing. We confirm a slot the same day." },
      { step: 2, title: "On-site Level 2 inspection", body: "Roof access, video flue scan, firebox and smoke chamber review. Typical 60 to 90 minutes per flue." },
      { step: 3, title: "Branded PDF report in 24 hours", body: "Photos, findings, and recommendations in a clean PDF the lawyer can forward. We follow up by phone if anything in the report needs explaining." },
    ],
    faq: [
      { q: "How is this different from a Level 1?", a: "Level 1 is a visual check. Level 2 adds a video camera scan of every flue interior, plus inspection of accessible parts beyond the firebox. NFPA 211 requires Level 2 on home sales, fuel changes, and after a chimney fire." },
      { q: "Will the report hold up for the buyer's lawyer?", a: "Yes. The PDF is structured for real estate use: address, date, flue-by-flue findings, photos, and clear recommendations. Realtors across Bow, Concord, and Hopkinton already use these reports in transactions." },
      { q: "Can you do this fast for an under-contract property?", a: "Most weeks, yes. Same-week scheduling is the norm. Written report in your inbox within 24 hours of the inspection. Tell us the closing date and we work backwards." },
    ],
  },
  {
    slug: "stainless-steel-liner",
    pillar: "chimney",
    emoji: "🔩",
    name: "Stainless Steel Chimney Liner",
    tagline: "316Ti insulated liner installation, sized to your appliance.",
    description:
      "Insulated 316Ti stainless steel flexible liner sized to your wood stove, insert, oil furnace, or fireplace. Covers the full length of the flue, top plate sealed, cap properly attached. Backed by manufacturer warranty and our installation workmanship guarantee.",
    startingPrice: "Starting at $2,495",
    whatYouGet: [
      "316Ti stainless steel liner sized to your appliance",
      "Insulation wrap to meet UL 1777 clearance requirements",
      "Top plate, storm collar, and cap properly attached",
      "Photo documentation of every install station",
      "Manufacturer warranty and our workmanship guarantee",
    ],
    whoItsFor: [
      "Wood stove or pellet stove owners with a clay-tile chimney",
      "Oil furnace owners with a deteriorating flue liner",
      "Buyers needing a code-compliant install before fuel change",
      "Owners whose existing liner is cracked, corroded, or undersized",
    ],
    process: [
      { step: 1, title: "Measure and size", body: "We measure flue length, appliance outlet, and required clearance. We don't guess. The liner is ordered to your specs." },
      { step: 2, title: "Install with insulation", body: "Liner pulled top down, insulation wrap applied, top plate sealed, storm collar fitted, cap attached and torqued. Drop cloths and HEPA cleanup throughout." },
      { step: 3, title: "Test and document", body: "Smoke test, draft check, photo report. We show you the cap from the roof and walk you through what we installed." },
    ],
    faq: [
      { q: "Why stainless instead of cast-in-place?", a: "Stainless is faster, less disruptive, and the 316Ti grade holds up to wood, oil, and pellet for 25-plus years in NH freeze-thaw. Cast-in-place has its place on damaged flue tile, but for most jobs stainless is the right call." },
      { q: "What's covered under warranty?", a: "Manufacturer warranty on the liner itself (typically lifetime on 316Ti). Our workmanship guarantee covers the install for 5 years, transferable to a new owner if you sell." },
      { q: "How long does install take?", a: "One day for most single-flue installs. Two days if we're pairing with a crown rebuild or cap replacement." },
    ],
  },
  {
    slug: "rain-caps",
    pillar: "chimney",
    emoji: "🛡️",
    name: "Rain Caps & Multi-Flue Covers",
    tagline: "Stainless and copper caps that fit, last, and stay put.",
    description:
      "Single-flue stainless caps, multi-flue outside-mount covers, and custom copper caps sized to your chimney. Properly attached and sealed. Stops water, animals, and downdraft. Replaces the cheap cap the last guy left loose.",
    startingPrice: "Starting at $895 multi-flue, $295 single-flue",
    whatYouGet: [
      "Cap sized and fabricated for your specific chimney",
      "Stainless or custom copper options",
      "Properly torqued, sealed, and storm-collared",
      "Photo of the finished install from the roof",
      "Lifetime warranty on premium stainless and copper",
    ],
    whoItsFor: [
      "Homeowners with a missing, loose, or rusting cap",
      "Owners with animal entry into the flue",
      "Historic homes wanting copper that fits the architecture",
      "Anyone whose previous cap install was never properly attached",
    ],
    process: [
      { step: 1, title: "Measure on site", body: "We measure your chimney top so the cap fits the actual opening, not a stock template." },
      { step: 2, title: "Order or fabricate", body: "Stock stainless ships fast. Custom copper takes 2 to 4 weeks. We tell you up front." },
      { step: 3, title: "Install and document", body: "Cap fitted, sealed, torqued, photographed from the roof so you see exactly what was installed." },
    ],
    faq: [
      { q: "Why does cap install fail?", a: "Most failures we see are loose hardware or a cap that was sized for a different chimney. We measure, fit, torque, and photograph. The cap stays put." },
      { q: "Copper or stainless?", a: "Stainless is durable, lower cost, and disappears visually. Copper is a heritage signal, lasts a lifetime, and patinas to a green that looks right on a 1798 Cape. Both have lifetime warranties on premium grades." },
      { q: "Do caps stop animals?", a: "Yes. A properly fitted cap with screen mesh stops birds, raccoons, and squirrels. Animal entry is one of the most common calls we get in spring." },
    ],
  },
  {
    slug: "masonry",
    pillar: "masonry",
    emoji: "🪨",
    name: "Full Masonry & Chimney Repair",
    tagline: "Crown rebuilds, repointing, full chimney rebuilds, and historic restoration.",
    description:
      "Repointing with the right mortar, crown rebuilds with proper overhang and drip edge, partial and full chimney rebuilds from the roofline up. We use Portland for modern brick and Type O lime mortar for pre-1900 work. The brick comes apart if the mortar is wrong.",
    startingPrice: "Crown repair starting at $495. Repointing from $1,500. Rebuilds from $3,000.",
    whatYouGet: [
      "Right mortar for the brick, every time",
      "Crown built with proper overhang and drip edge",
      "Photos before, during, and after each course",
      "Workmanship guarantee, transferable on home sale",
      "Free estimate on any repair over $500",
    ],
    whoItsFor: [
      "Owners with spalling brick, crumbling crown, or open mortar joints",
      "Pre-1900 home owners needing lime mortar work",
      "Insurance claim repairs requiring documentation",
      "Anyone quoted a tear-down when a repoint would do",
    ],
    process: [
      { step: 1, title: "Honest assessment", body: "We tell you whether it's a repoint, a crown rebuild, or a full rebuild. With photos. No upsell pressure." },
      { step: 2, title: "Quote in writing", body: "Scope of work, mortar specification, timeline, price. Clear line items." },
      { step: 3, title: "Build it right", body: "Right mortar, right tooling, drop cloths and ground protection on every job. Photos at each course." },
      { step: 4, title: "Walk-through and warranty", body: "We hand over the photo log and the workmanship warranty. Final invoice on completion." },
    ],
    faq: [
      { q: "How do I know if it's repoint or rebuild?", a: "If the mortar is failing but the brick is sound, it's a repoint. If the brick is spalling and stepping back, the upper courses come off. We'll show you with photos so you can see for yourself." },
      { q: "Why does the right mortar matter?", a: "Pre-1900 brick is softer than modern Portland cement. Use Portland on a 1798 chimney and the mortar wins, the brick spalls, and you've made the repair worse than the failure. Lime mortar moves with the brick. We use it because the brick comes apart if we don't." },
      { q: "How long does a repoint last?", a: "On the right brick with the right mortar, 50 years or more. Workmanship guarantee covers our work for 5 years, transferable if you sell." },
    ],
  },
  {
    slug: "crown-repair",
    pillar: "masonry",
    emoji: "👑",
    name: "Chimney Crown Repair & Rebuild",
    tagline: "$495 crown seal. Full crown rebuilds with proper overhang and drip edge.",
    description:
      "Crown sealing for hairline cracks. Full crown rebuilds when the mortar is past saving. Built with proper overhang and a drip edge so water sheds away from the brick instead of into it. The crown is the chimney's roof. We build it like one.",
    startingPrice: "Starting at $495 seal. Full rebuild from $1,200.",
    whatYouGet: [
      "Crown evaluated with photos before any work",
      "Sealed with elastomeric crown coat or rebuilt with proper mix",
      "Overhang and drip edge built to shed water, not hold it",
      "Photo documentation of finished crown",
      "5-year workmanship guarantee, transferable on sale",
    ],
    whoItsFor: [
      "Homeowners with hairline cracks across the crown",
      "Owners with a flat or failed crown letting water in",
      "Anyone with water staining at the chimney base on the inside",
    ],
    process: [
      { step: 1, title: "Inspection with photos", body: "Roof access, crown photographed top down. We tell you whether a seal will hold or whether it's a rebuild." },
      { step: 2, title: "Seal or rebuild", body: "Hairline cracks get an elastomeric crown coat. Failed crowns come off and rebuild with the right mix." },
      { step: 3, title: "Document and warranty", body: "Final crown photographed and logged. Workmanship warranty issued in writing." },
    ],
    faq: [
      { q: "When does a seal hold and when do I need a rebuild?", a: "Hairline surface cracks seal well with an elastomeric coat. Cracks that go through the full crown thickness, missing chunks, or a flat crown without overhang need a rebuild. We show you the difference with photos." },
      { q: "What's the difference between crown and cap?", a: "The crown is the masonry slab on top of the chimney brick. The cap is the metal cover over the flue opening. Both stop water. Most chimneys need both done right." },
      { q: "How long does crown work take?", a: "A seal is a same-day job. A rebuild is 1 to 2 days depending on size and weather." },
    ],
  },
  {
    slug: "historic-restoration",
    pillar: "masonry",
    emoji: "🏛️",
    name: "Historic Fireplace & Masonry Restoration",
    tagline: "Lime mortar repointing, Rumford fireplace restoration, beehive bake oven work.",
    description:
      "Not every mason understands old homes. We've built our entire practice around proper technique, using materials that work with your home's age and character, not against it. Pre-1900 NH center chimneys, Federal-era fireplaces, Rumford rebuilds, and beehive bake oven restoration. Lime mortar over Portland on every pre-1900 joint. Period-appropriate brick where the originals are unsalvageable. Photos for your archive. We work the houses Bow has been heating since the 1700s.",
    startingPrice: "Project pricing. Free site visit and assessment.",
    whatYouGet: [
      "Proper lime-based mortar matching, never Portland cement, which damages historic brick",
      "Type O lime mortar matched to original joint composition",
      "Period-appropriate handmade brick where replacements are needed",
      "Rumford geometry preserved or restored to original specification",
      "Beehive bake oven dome and floor work",
      "Photo archive of every stage for your records",
      "Workmanship guarantee on heritage masonry",
    ],
    whoItsFor: [
      "Owners of pre-1900 colonial center-chimney homes",
      "Historic district properties in Bow, Henniker, Hopkinton, Canterbury",
      "Owners on heritage commissions or with NPS Preservation Brief 2 obligations",
      "Anyone whose 200-year-old brick was repointed in Portland and is now spalling",
    ],
    process: [
      { step: 1, title: "Site visit and assessment", body: "We come out, look at the brick, the mortar joints, the firebox geometry. Free assessment. Photos for your archive from day one." },
      { step: 2, title: "Mortar match and scope", body: "We test the existing mortar, match Type O lime to the original composition, and write a scope that respects the period of the building." },
      { step: 3, title: "Restoration work", body: "Joints raked out by hand on pre-1900 brick. New mortar buttered course by course. Rumford geometry rebuilt to original spec. Bake oven domes laid by hand." },
      { step: 4, title: "Archive and warranty", body: "Full photo log handed over. Workmanship warranty in writing. We're proud of the work and we want you to have the record." },
    ],
    faq: [
      { q: "Why lime mortar instead of Portland on a 1798 chimney?", a: "Pre-1900 handmade brick is softer than modern brick. Portland cement is harder than the brick. The mortar wins, the brick spalls, and a 50-year repointing job becomes a 10-year disaster. Lime moves with the brick. NPS Preservation Brief 2 is the standard reference. We follow it." },
      { q: "Do you do Rumford fireplaces?", a: "Yes. Rumford geometry, narrow throat, angled firebacks, the works. If it's a Federal-era fireplace, the original was almost certainly a Rumford or close to it. We restore to spec." },
      { q: "What about beehive bake ovens?", a: "Yes. The dome, floor, and side ash work. Bow, Henniker, and Hopkinton all have plenty of these. Most need the dome rebuilt and the floor reset. We've done them and we've got the photos." },
    ],
  },
  {
    slug: "roofing",
    pillar: "exteriors",
    emoji: "🏠",
    name: "Roofing Installation & Replacement",
    tagline: "Architectural and 3-tab shingle systems built for New England weather.",
    description:
      "Complete roof replacements and repair work for residential homes. Architectural shingles, 3-tab shingles, full tear-off and replacement, ice and water shield, ridge vent, drip edge, and proper step flashing where the chimney meets the roof. We install for the New England freeze-thaw climate, and we coordinate the chimney flashing on the same visit so the seal actually holds.",
    startingPrice: "Free roof inspection. Replacement quotes after on-site assessment.",
    whatYouGet: [
      "Architectural and 3-tab shingle installation with manufacturer warranty",
      "Full tear-off and replacement, deck repair where compromised",
      "Ice and water shield in valleys and around the chimney",
      "Ridge vent installation and proper drip edge",
      "Step flashing rebuilt where the chimney meets the roof",
      "Flashing repair and replacement on existing roofs",
    ],
    whoItsFor: [
      "Homeowners with an aging asphalt roof past 18 to 20 years",
      "Owners with leaks at the chimney that two roofers couldn't fix",
      "Owners pairing chimney work with roof work to save a visit",
      "Anyone with ice dam damage from a NH winter",
    ],
    process: [
      { step: 1, title: "Free roof inspection", body: "We come out, walk the roof, photograph the deck condition, flashing, valleys, and chimney intersection." },
      { step: 2, title: "Written quote", body: "Scope, materials, timeline, price. Clear line items. No deposit over $1,000 until day-of-start." },
      { step: 3, title: "Tear-off and replacement", body: "Strip to the deck where needed, ice and water shield, underlayment, architectural shingles, drip edge, ridge vent. Step flashing rebuilt at the chimney." },
      { step: 4, title: "Cleanup and walk-through", body: "Magnetic sweep of the lawn for nails. Final walk-through. Manufacturer warranty plus our workmanship guarantee." },
    ],
    faq: [
      { q: "Why pair roofing with chimney work?", a: "The chimney flashing is where most leaks start. If you replace the roof without rebuilding the flashing, the leak comes back in two years. Doing both at once means one visit, one warranty, and the seal lasts." },
      { q: "How long does a NH asphalt roof last?", a: "Architectural shingles in NH freeze-thaw, properly installed, last 25 to 30 years. Three-tab shingles run 18 to 22 years. Ice damage and improper flashing shorten both." },
      { q: "Do you handle insurance claims?", a: "Yes. We document the damage with photos, write the scope to match the loss, and work directly with adjusters where needed." },
    ],
  },
  {
    slug: "siding",
    pillar: "exteriors",
    emoji: "🏘️",
    name: "Siding Installation & Replacement",
    tagline: "Vinyl, fiber cement, wood, and engineered wood siding installed for New England weather.",
    description:
      "Premium siding installation and replacement under our sister brand, Integrity Exteriors NH. Vinyl, fiber cement (James Hardie), wood, and engineered wood. Full removal and disposal of existing siding, moisture barrier installation, and clean professional install. New siding improves curb appeal and adds lasting protection against moisture, wind, and the cold New England loves to throw at your house.",
    startingPrice: "Free written estimate. Project pricing after on-site measure.",
    whatYouGet: [
      "Vinyl, fiber cement (James Hardie), wood, or engineered wood siding",
      "Full removal and disposal of existing siding",
      "Moisture barrier installation behind the new siding",
      "Clean job site, before-and-after documentation",
      "Manufacturer warranty plus our workmanship guarantee",
    ],
    whoItsFor: [
      "Homeowners with aging vinyl that's faded, cracked, or detaching",
      "Owners upgrading to fiber cement (James Hardie) for fire and rot resistance",
      "Owners restoring wood siding on historic or older homes",
      "Anyone whose siding has visible water damage or failed flashing",
    ],
    process: [
      { step: 1, title: "Free on-site measure", body: "We come out, measure the elevations, photograph the existing siding and any underlying damage, and walk the project with you." },
      { step: 2, title: "Written estimate", body: "Materials, labor, timeline, price. Clear line items. No deposit over $1,000 until day-of-start." },
      { step: 3, title: "Tear-off and prep", body: "Old siding stripped and disposed of. Sheathing inspected. Moisture barrier installed. Any rot remediated before the new siding goes on." },
      { step: 4, title: "Install", body: "Vinyl, fiber cement, wood, or engineered wood per the scope. Trim, corners, and J-channel handled clean. Daily site cleanup." },
      { step: 5, title: "Walk-through and warranty", body: "Final walk-through with you. Photo documentation handed over. Manufacturer warranty plus our workmanship guarantee in writing." },
    ],
    faq: [
      { q: "Should I go with vinyl or fiber cement?", a: "Vinyl is the budget choice and lasts 20 to 30 years in NH. Fiber cement (James Hardie is the dominant brand) lasts 50+ years, resists fire and rot, and looks closer to wood. Cost runs roughly 2x vinyl. We install both, and we'll tell you straight what your house and budget call for." },
      { q: "Do you do partial siding repairs?", a: "Yes. Storm damage, rot remediation, single-elevation replacements. We're happy to do a section. Full re-sides are also routine." },
      { q: "What's the timeline for a full re-side?", a: "Most NH single-family homes run 1 to 2 weeks depending on size, weather, and material. We give you a target window in the written quote and update you if the schedule shifts." },
      { q: "Why is this under Integrity Exteriors NH instead of Integrity Chimney?", a: "Same owner, Kevin Fredrickson. Two specialized companies. Integrity Chimney handles chimneys and historic masonry. Integrity Exteriors NH handles siding and roofing. One standard either way." },
    ],
  },
  {
    slug: "real-estate-inspections",
    pillar: "chimney",
    emoji: "🏘️",
    name: "Real Estate Inspections",
    tagline: "Same-week scheduling, 24-hour written PDF report, $295 starting.",
    description:
      "Built for transactions on a clock. We schedule within the inspection window, deliver a Level 2 NFPA 211 inspection on site, and email a branded PDF report within 24 hours. Realtors in Bow, Concord, Hopkinton, and Henniker already use these reports to close cleanly without renegotiation.",
    startingPrice: "Starting at $295",
    whatYouGet: [
      "Same-week scheduling for under-contract properties",
      "NFPA 211 Level 2 inspection on site",
      "Branded PDF written report within 24 hours",
      "Photos of every flue, the roof access, and the firebox",
      "Phone follow-up to explain anything the lawyer flags",
    ],
    whoItsFor: [
      "Realtors with a 10 to 14 day inspection window",
      "Sellers preparing pre-listing inspections",
      "Buyers told to get further evaluation before close",
      "Insurance adjusters needing transaction-ready documentation",
    ],
    process: [
      { step: 1, title: "Send the closing date", body: "Email or call with property address and closing target. Confirmation same day." },
      { step: 2, title: "On-site Level 2", body: "Camera scan of every flue, roof access, firebox and smoke chamber, photos at each station." },
      { step: 3, title: "PDF in 24 hours", body: "Branded report emailed within 24 hours. Phone call to walk through findings if needed." },
    ],
    faq: [
      { q: "Can you really turn the report in 24 hours?", a: "Yes. Most reports are in your inbox the morning after the inspection. If we're going to miss 24 hours, we tell you the day of the visit." },
      { q: "Will the report stand up to a lawyer's review?", a: "It's structured for real estate use: address, date, inspector, flue-by-flue findings, photos, and clear recommendations. NH realtors and lawyers across Merrimack County use these reports in transactions." },
      { q: "What if the inspection turns up problems?", a: "We document them clearly with photos and recommendations. We don't editorialize. If repairs are needed, we'll quote them separately, but the report itself is the report. No pressure to use us for the repairs." },
    ],
  },
  {
    slug: "insurance-inspections",
    pillar: "chimney",
    emoji: "📑",
    name: "Insurance Inspections & Documentation",
    tagline: "Inspections and reports built for insurance carriers and adjusters.",
    description:
      "Documentation-first inspections for insurance claims, renewals, and underwriting requirements. Written report with photos, recommendations, and any code references the carrier needs. We work directly with adjusters when the claim involves chimney damage from storms, fire, or settlement.",
    startingPrice: "Starting at $295",
    whatYouGet: [
      "Carrier-ready written report with photos",
      "Direct communication with adjuster on file",
      "Code references where applicable (NFPA 211, IRC)",
      "Repair scope documented to match the loss",
    ],
    whoItsFor: [
      "Homeowners filing a claim for chimney damage",
      "Owners renewing policies with chimney inspection requirements",
      "Adjusters needing third-party documentation",
    ],
    process: [
      { step: 1, title: "Claim or carrier intake", body: "Call with the carrier, claim number, and address. We confirm scope before the visit." },
      { step: 2, title: "On-site inspection", body: "Full Level 2 documentation, claim-relevant photos, code references." },
      { step: 3, title: "Carrier-ready report", body: "PDF report sent to you and, with your permission, directly to the adjuster." },
    ],
    faq: [
      { q: "Do you work with all insurance carriers?", a: "Yes. We've worked with most major carriers operating in NH. The report format works for any of them." },
      { q: "Will my premium go up?", a: "Inspections themselves don't move premiums. Whether to file depends on the size of the claim against your deductible. We can document the loss either way." },
    ],
  },
];

/* =============================================================
   Pricing: "starting at" line items (market-intel §9 Do #3)
   ============================================================= */
export const pricing: Array<{
  service: string;
  price: string;
  includes: string[];
  excludes?: string[];
  href: string;
}> = [
  {
    service: "Chimney Sweep + Level 1 Inspection",
    price: "$219",
    includes: [
      "Top-down brush sweep",
      "Smoke chamber and shelf cleaning",
      "HEPA vacuum interior cleanup",
      "Level 1 visual inspection of accessible parts",
      "Same-day written inspection sheet by email",
    ],
    excludes: [
      "Repair work, repointing, or liner installation",
      "Camera scan of the flue interior (that's Level 2)",
    ],
    href: "/services/chimney-cleaning",
  },
  {
    service: "Level 2 Inspection (Real Estate)",
    price: "$295",
    includes: [
      "Video camera scan of every flue",
      "Roof, crown, cap, and flashing review",
      "Firebox, smoke chamber, and damper documentation",
      "Photo at each inspection station",
      "Branded PDF written report within 24 hours",
    ],
    excludes: [
      "Repair work or remediation (quoted separately)",
      "Multi-flue surcharge (additional flues at $75 each)",
    ],
    href: "/services/level-2-inspection",
  },
  {
    service: "Stainless Steel Liner",
    price: "$2,495",
    includes: [
      "316Ti stainless steel flexible liner",
      "Insulation wrap to UL 1777 clearance",
      "Top plate, storm collar, and cap properly attached",
      "Smoke test and draft check on completion",
      "Manufacturer warranty plus 5-year workmanship guarantee",
    ],
    excludes: [
      "Crown repair if needed (separate scope)",
      "Custom copper cap upgrade (separate scope)",
    ],
    href: "/services/stainless-steel-liner",
  },
  {
    service: "Crown Repair",
    price: "$495",
    includes: [
      "Roof access and crown inspection with photos",
      "Elastomeric crown coat for hairline cracks",
      "Photo documentation of finished work",
      "5-year workmanship guarantee",
    ],
    excludes: [
      "Full crown rebuild (starts at $1,200)",
      "Cap replacement if needed",
    ],
    href: "/services/crown-repair",
  },
  {
    service: "Multi-Flue Custom Cap",
    price: "$895",
    includes: [
      "On-site measurement of chimney top",
      "Stainless multi-flue outside-mount cover, fabricated to fit",
      "Properly torqued, sealed, and storm-collared",
      "Photo of finished install from the roof",
      "Lifetime warranty on premium stainless",
    ],
    excludes: [
      "Custom copper upgrade (priced separately)",
      "Crown work if base is failing",
    ],
    href: "/services/rain-caps",
  },
];

/* =============================================================
   About / Founder
   ============================================================= */
export const founder = {
  name: "Kevin Fredrickson",
  title: "Owner and Lead Craftsman",
  photo: "",
  // [DEMO COPY — pending client review] Two-companies framing sourced from Kevin's
  // own Claude-built mockup (2026-05-01). Confirm narrative voice with Kevin during demo.
  bio: "Kevin Fredrickson built his career on rooftops between Bow and the Lakes Region, working chimneys, masonry, and roofing on everything from new construction Capes in Hopkinton to 1798 center-chimney colonials in Henniker. He started Integrity Chimney because the trade needed someone who would answer the phone, show up the day he said, and tell homeowners the truth about what their chimney actually needed. As the work grew, so did the scope. Today Kevin owns two specialized companies: Integrity Chimney for chimneys and historic masonry, and Integrity Exteriors NH for siding and roofing. One owner, two companies, one standard. Most of his work comes from realtor referrals and neighbors who watched him fix a stack down the road. He runs both companies himself: he answers the phone, he writes the quote, he climbs the roof. When you hire either company, you get Kevin and the small crew he trusts. Not a call center, not a subcontractor, not a sales rep with a clipboard.",
  credentials: [
    "Owner-operated in central NH",
    "Fully insured",
    "BBB A+ accredited",
    "Free estimates on all repairs over $500",
    "No deposits over $1,000 until day-of-start",
    "5-year workmanship guarantee, transferable on sale",
  ],
  yearsExperience: 15,
};

/* =============================================================
   Sister Brand callout — "One Owner. Two Companies. One Standard."
   Consumed by FounderTeaser (homepage) and the About page.
   Source: prospect's own Claude mockup, 2026-05-01.
   ============================================================= */
export const sisterBrand = {
  eyebrow: "One Owner · Two Companies",
  headline: "One Owner. Two Companies. One Standard.",
  body: "Kevin runs two specialized companies under his own name. Same craftsman, same crew he trusts, same workmanship guarantee. The work just splits along the lines that make sense for the trades.",
  pillars: [
    {
      brandName: "Integrity Chimney",
      focus: "Chimney & Historic Masonry",
      description:
        "Chimney sweeps, Level 2 inspections, stainless liners, rain caps, full masonry, and historic restoration. The work that built the company.",
      bullets: [
        "Chimney cleaning & Level 2 inspections",
        "Stainless steel liners & rain caps",
        "Full masonry & repointing",
        "Historic lime-mortar restoration",
      ],
      phone: "(603) 660-4644",
      phoneTel: "+16036604644",
      email: "IntegrityChimney1@gmail.com",
      ctaHref: "/services",
      ctaLabel: "Chimney services",
      accent: "primary",
    },
    {
      brandName: "Integrity Exteriors NH",
      focus: "Siding & Roofing",
      description:
        "Premium siding installation and roofing replacement for New Hampshire homeowners. Quality materials, clean installs, lasting protection.",
      bullets: [
        "Vinyl, fiber cement, wood & engineered siding",
        "Architectural & 3-tab shingle roof systems",
        "Ice & water shield, ridge vent, flashing",
        "Free written estimates, clean job sites",
      ],
      phone: "(603) 568-9292",
      phoneTel: "+16035689292",
      email: "integrityexteriors603@gmail.com",
      ctaHref: "/services/siding",
      ctaLabel: "Exterior services",
      accent: "secondary",
    },
  ],
} as const;

/* =============================================================
   Testimonials: 36 total, paginated 9 per page (Error #31)
   ============================================================= */
export type Testimonial = {
  name: string;
  town: string;
  service: string;
  quote: string;
  rating: 5;
  date: string;
};
export const testimonials: Testimonial[] = [
  // Page 1 (1-9)
  {
    name: "Sarah W.",
    town: "Bow, NH",
    service: "Chimney Cleaning & Sweep",
    quote: "Kevin came out within hours of our call after we smelled creosote with the kids in the house. He was honest about what we needed and what we didn't. The chimney was fine, just needed a real cleaning. He emailed the inspection sheet that night.",
    rating: 5,
    date: "2024-11-12",
  },
  {
    name: "Dan R.",
    town: "Concord, NH",
    service: "Level 2 Inspection",
    quote: "I'm a buyer's agent. I've been burned twice by sweeps who said 48 hours and delivered in two weeks. Kevin's PDF was in my inbox the next morning. The lawyer signed off without a comment. I'm sending him every chimney question I get from now on.",
    rating: 5,
    date: "2025-02-04",
  },
  {
    name: "Bob and Linda H.",
    town: "Henniker, NH",
    service: "Historic Fireplace & Masonry Restoration",
    quote: "We have a 1782 Federal with three flues and a beehive oven. We have called every chimney company in the state. Most won't touch lime mortar, the rest told us four months. Kevin started in three weeks, knew the difference between Type O and Portland, and the photos for our archive are beautiful.",
    rating: 5,
    date: "2024-09-23",
  },
  {
    name: "Tyler M.",
    town: "Loudon, NH",
    service: "Chimney Cleaning & Sweep",
    quote: "I burn four cords of oak a year through a Blaze King. I needed someone who would not condescend. Kevin top-down brushed, used a HEPA vac, and showed me a quarter inch of glaze in the smoke chamber. Got the cleaning done, written sheet emailed, $219 like he said.",
    rating: 5,
    date: "2025-01-18",
  },
  {
    name: "Jennifer P.",
    town: "Hopkinton, NH",
    service: "Stainless Steel Chimney Liner",
    quote: "Two other companies wanted us to replace the entire chimney. Kevin came out, looked at it, said the brick was fine and we just needed a stainless liner for the wood stove insert. Saved us probably eighteen thousand. Liner in, cap on, photos at every step.",
    rating: 5,
    date: "2024-10-07",
  },
  {
    name: "Mark D.",
    town: "Pembroke, NH",
    service: "Roofing Repair & Replacement",
    quote: "Tree fell across the back of the house in the December storm. Kevin came out the next morning, tarped it, and had the full repair scope written by the end of the day. Insurance company never pushed back on the documentation. New roof on by January.",
    rating: 5,
    date: "2025-01-22",
  },
  {
    name: "Patricia L.",
    town: "Bow, NH",
    service: "Crown Repair",
    quote: "Water staining on the dining room ceiling for two years. Two roofers said the roof was fine. Kevin checked the chimney first, found a crown that was basically gone, sealed it, and the leak stopped that week. Should have called him first.",
    rating: 5,
    date: "2024-12-03",
  },
  {
    name: "Greg T.",
    town: "Canterbury, NH",
    service: "Historic Fireplace & Masonry Restoration",
    quote: "Owned a 1797 cape for thirty years. The chimney was repointed in Portland in the eighties and the brick has been falling apart since. Kevin took it back to lime mortar, brick by brick, and it looks like it always did. He brought period brick when ours was unsalvageable. Real craftsman.",
    rating: 5,
    date: "2024-08-15",
  },
  {
    name: "Amanda S.",
    town: "Concord, NH",
    service: "Level 2 Inspection",
    quote: "Our buyer needed the Level 2 done in eight days. Kevin scheduled day five, was on site for an hour and a half, and the PDF was in my email by 9 the next morning. Closing went through clean. Already booked him for the next listing.",
    rating: 5,
    date: "2025-03-11",
  },

  // Page 2 (10-18)
  {
    name: "Robert C.",
    town: "Bow, NH",
    service: "Chimney Services",
    quote: "Called three sweeps. Two never called back. Kevin picked up the second ring, gave me a slot the next week, showed up on time, and the work was done by lunch. That's all I wanted.",
    rating: 5,
    date: "2024-11-29",
  },
  {
    name: "Linda M.",
    town: "Henniker, NH",
    service: "Rain Caps & Multi-Flue Covers",
    quote: "The cap on our 1820 farmhouse was loose for years. Three different guys said they would replace it. Nobody followed up. Kevin came, measured the same day, ordered a copper cap that fit the house, and installed it two weeks later. Photos of the install from the roof. Done.",
    rating: 5,
    date: "2024-10-19",
  },
  {
    name: "Chris W.",
    town: "Loudon, NH",
    service: "Stainless Steel Chimney Liner",
    quote: "I asked Kevin a lot of questions about liner sizing because I wasn't sure the previous company had it right. He measured, walked me through the math, and was honest that the original install was undersized. Replaced it with a properly sized 316Ti. Stove drafts perfectly now.",
    rating: 5,
    date: "2024-09-30",
  },
  {
    name: "Helen B.",
    town: "Pembroke, NH",
    service: "Chimney Cleaning & Sweep",
    quote: "Eighty-two years old, widow, terrified of getting scammed by a chimney guy after my husband passed. Kevin showed up exactly when he said. Drop cloths, took his shoes off, cleaned everything, charged exactly what he quoted. Honest man.",
    rating: 5,
    date: "2024-12-15",
  },
  {
    name: "Tom and Karen N.",
    town: "Hopkinton, NH",
    service: "Roofing Repair & Replacement",
    quote: "Asphalt was twenty-two years old. Kevin gave us a free roof inspection, photographed the deck, and quoted a fair number for the architectural shingle replacement. He did the chimney flashing at the same time, which two other roofers said they would farm out. One contractor, one warranty.",
    rating: 5,
    date: "2024-10-25",
  },
  {
    name: "James F.",
    town: "Bow, NH",
    service: "Insurance Inspections",
    quote: "Lightning hit the chimney in July. Insurance adjuster wanted documentation. Kevin had the carrier-ready report on my desk in 36 hours. Claim went through without a fight. Repair quoted separately and on the calendar within a month.",
    rating: 5,
    date: "2024-08-04",
  },
  {
    name: "Stephanie K.",
    town: "Canterbury, NH",
    service: "Crown Repair",
    quote: "Kevin walked me up onto the roof on FaceTime so I could see exactly what he was looking at on the crown. Told me it was a seal job, not a rebuild, and saved me eight hundred dollars. He came back two weeks later and did the seal in an afternoon.",
    rating: 5,
    date: "2025-02-19",
  },
  {
    name: "Brad J.",
    town: "Concord, NH",
    service: "Chimney Services",
    quote: "I had a chimney fire on a Saturday night. Called Kevin Sunday morning, full of dread. He came out Monday morning, did the post-fire Level 2, and had the report and the rebuild quote by Wednesday. Clear, honest, and he did not lecture me. Just got it done.",
    rating: 5,
    date: "2024-11-04",
  },
  {
    name: "Margaret O.",
    town: "Loudon, NH",
    service: "Full Masonry & Chimney Repair",
    quote: "Repointed our 1903 Victorian chimney. Two guys had quoted full rebuild. Kevin said the brick was fine and we just needed the joints raked out and rebuilt. He used the right mortar, took photos at every course, and the chimney looks original. Saved us probably twenty thousand.",
    rating: 5,
    date: "2024-09-08",
  },

  // Page 3 (19-27)
  {
    name: "Diane R.",
    town: "Bow, NH",
    service: "Level 2 Inspection",
    quote: "Pre-listing inspection on our 1956 ranch. Kevin scanned the flues, photographed the cap, and wrote up the report in plain English. Buyer's agent had no questions. House sold for asking. Money well spent.",
    rating: 5,
    date: "2024-10-31",
  },
  {
    name: "Ralph and Joan P.",
    town: "Henniker, NH",
    service: "Historic Fireplace & Masonry Restoration",
    quote: "Beehive bake oven on our 1791 saltbox had collapsed in the back. Kevin rebuilt the dome by hand, reset the floor brick, used the right lime mortar. We use it for bread again every Sunday. Photos of the rebuild are in our family archive now.",
    rating: 5,
    date: "2024-07-12",
  },
  {
    name: "Brian L.",
    town: "Pembroke, NH",
    service: "Chimney Cleaning & Sweep",
    quote: "On time, fair price, done.",
    rating: 5,
    date: "2025-03-04",
  },
  {
    name: "Christine A.",
    town: "Concord, NH",
    service: "Roofing Repair & Replacement",
    quote: "Ice dam took out the gutter and damaged the roof above the kitchen. Kevin came, scoped the repair, replaced the affected section and rebuilt the chimney flashing while he was up there. No more leak in February when the snow melted. He thinks ahead.",
    rating: 5,
    date: "2024-12-28",
  },
  {
    name: "Mike H.",
    town: "Hopkinton, NH",
    service: "Rain Caps & Multi-Flue Covers",
    quote: "Bird got into the flue and we needed a cap fast. Kevin had a stainless multi-flue cover on the chimney within the week. Properly attached, not the loose junk the previous installer left up there. No more raccoons either.",
    rating: 5,
    date: "2024-08-26",
  },
  {
    name: "Karen J.",
    town: "Canterbury, NH",
    service: "Full Masonry & Chimney Repair",
    quote: "Our 1804 farmhouse chimney was in rough shape. Kevin walked me through every option with photos, told me what was urgent and what could wait. Three years later we're still doing the work in stages. He never pressures, just lays out what's needed.",
    rating: 5,
    date: "2024-06-17",
  },
  {
    name: "Steven P.",
    town: "Bow, NH",
    service: "Chimney Services",
    quote: "Heat shield came off the wood stove insert. Kevin diagnosed it in fifteen minutes, ordered the replacement part, came back the next week and installed it. Charged for the part and an hour of labor. That's it.",
    rating: 5,
    date: "2025-02-08",
  },
  {
    name: "Nancy F.",
    town: "Penacook, NH",
    service: "Insurance Inspections",
    quote: "Insurance company wanted a chimney inspection before they would renew the policy. Kevin came, did the Level 2, had the report formatted for the carrier in two days. Renewal went through without a hitch. Easiest part of the renewal process.",
    rating: 5,
    date: "2024-09-19",
  },
  {
    name: "Doug M.",
    town: "Loudon, NH",
    service: "Stainless Steel Chimney Liner",
    quote: "I knew enough to ask the right questions. Kevin answered every one, no condescension, no hand-waving. Recommended a properly sized 316Ti, talked me through insulation, did the install in a day. The kind of tradesman you tell your hunting buddies about.",
    rating: 5,
    date: "2024-11-22",
  },

  // Page 4 (28-36)
  {
    name: "Andrew T.",
    town: "Concord, NH",
    service: "Level 2 Inspection",
    quote: "Used Kevin for our pre-purchase inspection. Found that the prior owner had abandoned a flue without sealing it. The seller paid for the remediation before close. Money saved before we even had keys.",
    rating: 5,
    date: "2024-10-04",
  },
  {
    name: "Rebecca V.",
    town: "Allenstown, NH",
    service: "Chimney Cleaning & Sweep",
    quote: "First time burning a wood stove. I had no idea what I was doing. Kevin spent twenty minutes after the cleaning showing me what I should be watching for. He didn't have to. Scheduled my next cleaning before he left.",
    rating: 5,
    date: "2024-12-08",
  },
  {
    name: "Pete G.",
    town: "Bow, NH",
    service: "Roofing Repair & Replacement",
    quote: "Replaced our 26 year old roof. Kevin coordinated tear-off, ice and water shield, architectural shingles, and chimney flashing all in two days. Magnetic sweep of the lawn, no nails left behind. Manufacturer warranty plus his workmanship guarantee in writing.",
    rating: 5,
    date: "2024-09-13",
  },
  {
    name: "Theresa L.",
    town: "Henniker, NH",
    service: "Historic Fireplace & Masonry Restoration",
    quote: "Rumford fireplace in our 1808 home had been butchered by a previous owner with the wrong firebrick. Kevin rebuilt the firebox to original geometry, including the angled firebacks. Draws perfectly now. The room finally smells like a home, not a smoke pit.",
    rating: 5,
    date: "2024-07-29",
  },
  {
    name: "Jeff and Carol R.",
    town: "Pembroke, NH",
    service: "Full Masonry & Chimney Repair",
    quote: "Whole side of the chimney was spalling. Kevin came out, said the upper four feet had to come off and rebuild, but everything below was fine. He did exactly what he said. Photos before, during, after. Final invoice matched the quote to the dollar.",
    rating: 5,
    date: "2024-08-18",
  },
  {
    name: "Linda S.",
    town: "Bow, NH",
    service: "Rain Caps & Multi-Flue Covers",
    quote: "The previous chimney guy installed a cap that was too small and the wind blew it off in the first nor'easter. Kevin came, measured properly, fabricated a multi-flue cover that fit the actual chimney, and torqued it down. It's been through two winters and not a wobble.",
    rating: 5,
    date: "2024-11-15",
  },
  {
    name: "Walter K.",
    town: "Canterbury, NH",
    service: "Chimney Services",
    quote: "Was referred to Kevin by our realtor. He answered the phone, gave me a fair quote, scheduled around our closing date, and did the work without complaint. Came back six months later for a follow up cleaning. He shows up.",
    rating: 5,
    date: "2024-10-12",
  },
  {
    name: "Megan H.",
    town: "Concord, NH",
    service: "Stainless Steel Chimney Liner",
    quote: "Replaced the liner on a 1928 colonial revival. Kevin matched the cap to the original copper that was still on the back stack. Looks like it has always been there. The wood stove drafts beautifully and we have warranty paperwork in a drawer.",
    rating: 5,
    date: "2025-02-26",
  },
  {
    name: "Ron and Patty F.",
    town: "Hopkinton, NH",
    service: "Level 2 Inspection",
    quote: "Selling our family home of forty years. Kevin did the pre-listing Level 2, gave us a clean report and three small recommendations to address before listing. Did the small repairs himself the next week. Sold above asking with no chimney issues raised.",
    rating: 5,
    date: "2024-09-02",
  },
];

/* =============================================================
   FAQ: homepage + /faq page
   ============================================================= */
export const faq: Array<{ q: string; a: string; category?: string }> = [
  {
    q: "How fast can you call me back?",
    a: "If you call (603) 660-4644 during business hours, we usually answer the first ring. If we miss, we call back within 4 business hours. If we don't, your free estimate is on us. Email IntegrityChimney1@gmail.com works too.",
    category: "Scheduling",
  },
  {
    q: "Do you cold-call homeowners?",
    a: "No. Never. If someone calls you saying they represent Integrity Chimney and offers a $49 sweep, hang up and call (603) 660-4644 to verify. The cold-call $49 sweep is the most common chimney scam in NH and it's not us.",
    category: "Scams & Trust",
  },
  {
    q: "How much does a chimney sweep cost in NH?",
    a: "Our basic sweep with a Level 1 inspection starts at $219. Anything below $199 in NH is either a loss leader or a scam setup. We publish our prices because the rest of the category won't.",
    category: "Pricing",
  },
  {
    q: "What's a Level 2 inspection and do I need one?",
    a: "Level 2 is a video camera scan of every flue plus inspection of accessible parts. NFPA 211 requires it on home sales, fuel changes, and after a chimney fire. Realtors across central NH use ours for transactions because the PDF report is in the inbox within 24 hours.",
    category: "Inspections",
  },
  {
    q: "Do you do real estate inspections on a deadline?",
    a: "Yes. Same-week scheduling is the norm during transactions. The Level 2 written report is in your inbox within 24 hours of the visit. Email us your closing date and we work backwards.",
    category: "Real Estate",
  },
  {
    q: "Can I see what you saw on the roof?",
    a: "Yes. We photograph every inspection, top to bottom. Roof, crown, cap, every flue, the firebox, the smoke chamber. Photos go in your written report. If a competitor showed you blurry pictures of cracks you couldn't verify, that's not us.",
    category: "Inspections",
  },
  {
    q: "Do you take deposits?",
    a: "Not over $1,000 until the day work begins. Final invoice on completion. We've all heard the stories of contractors disappearing after a deposit. Our policy is built so that doesn't happen here.",
    category: "Pricing",
  },
  {
    q: "Do you work on pellet, oil, or coal?",
    a: "Wood, pellet, and oil yes. Coal we will look at but won't always service. Many NH chimney companies skip oil and pellet because they don't want to learn the appliance side. The furnace flue is often the one that's actually dangerous, and it's the one most often missed.",
    category: "Services",
  },
  {
    q: "How do I know if I need repointing or a full rebuild?",
    a: "If the mortar is failing but the brick is sound, it's a repoint. If the brick is spalling, stepping back, or coming apart, the upper courses need to come off. We bring the photos and show you the difference. The category default of quoting tear-down on every job is not how we work.",
    category: "Masonry",
  },
  {
    q: "What's lime mortar and why does it cost more?",
    a: "Lime mortar is what was used on every NH chimney built before 1900. It's softer than Portland cement and moves with the brick. Pre-1900 brick is also softer, and Portland cement on old brick will spall the brick. Lime mortar costs us 30 to 50 percent more in materials. We use it on pre-1900 work because the brick comes apart if we don't.",
    category: "Historic Restoration",
  },
  {
    q: "Are you insured?",
    a: "Fully insured, BBB A+ accredited, and operating in NH for 15-plus years. We carry general liability and workers' comp. Documentation available on request.",
    category: "Trust",
  },
  {
    q: "What towns do you cover?",
    a: "Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke, and the surrounding central NH towns including Canterbury, Auburn, Penacook, and Allenstown. If you're within 30 miles of Bow, call us.",
    category: "Service Area",
  },
  {
    q: "How long does a workmanship guarantee last?",
    a: "5 years on masonry workmanship, transferable to a new owner if you sell the home. Manufacturer warranty on liners (typically lifetime on 316Ti) and caps (lifetime on premium stainless and copper).",
    category: "Warranty",
  },
  {
    q: "Why is the company called Integrity?",
    a: "Because Kevin started it that way and means it. The company has spent 15-plus years answering phones, showing up, and doing the work. The 1-star reviews from years back are real and they're addressed: we now answer the phone, we follow through, and we publish the SLA. The work record stands. We're rebuilding the digital record around it.",
    category: "About",
  },
];

/* =============================================================
   Quiz: "Find Your Chimney Service" (5 questions, 5 outcomes)
   ============================================================= */
export type QuizOption = {
  emoji: string;
  label: string;
  scores: Record<string, number>;
};
export type QuizStep = {
  question: string;
  options: QuizOption[];
};
export type QuizOutcome = {
  id: "sweep" | "level1" | "level2-realtor" | "liner" | "historic";
  emoji: string;
  title: string;
  body: string;
  recommendedService: string;
  ctaLabel: string;
  ctaHref: string;
};
export const quiz = {
  hookHeadline: "Find Your Chimney Service",
  hookBody:
    "Five questions. Sixty seconds. We'll point you to the right service for your situation, with a real price and a real next step.",
  startCTA: "Start the Quiz",
  steps: [
    {
      question: "When was your home built?",
      options: [
        {
          emoji: "🏛️",
          label: "Before 1900",
          scores: { historic: 3, sweep: 1, level1: 1, "level2-realtor": 1, liner: 1 },
        },
        {
          emoji: "🏚️",
          label: "1900 to 1950",
          scores: { historic: 2, sweep: 1, level1: 2, "level2-realtor": 1, liner: 2 },
        },
        {
          emoji: "🏠",
          label: "1950 to 1990",
          scores: { historic: 0, sweep: 2, level1: 2, "level2-realtor": 2, liner: 2 },
        },
        {
          emoji: "🏡",
          label: "After 1990",
          scores: { historic: 0, sweep: 2, level1: 2, "level2-realtor": 2, liner: 1 },
        },
      ],
    },
    {
      question: "What's the main reason you're looking right now?",
      options: [
        {
          emoji: "🔥",
          label: "Safety. I smell creosote or smoke.",
          scores: { sweep: 3, level1: 2, liner: 2, "level2-realtor": 0, historic: 1 },
        },
        {
          emoji: "📋",
          label: "A real estate transaction is in motion.",
          scores: { "level2-realtor": 3, level1: 2, sweep: 1, liner: 0, historic: 0 },
        },
        {
          emoji: "💧",
          label: "Water leaking near the chimney.",
          scores: { sweep: 1, level1: 2, "level2-realtor": 1, liner: 1, historic: 2 },
        },
        {
          emoji: "🏛️",
          label: "Restoration of a historic feature.",
          scores: { historic: 3, sweep: 0, level1: 1, "level2-realtor": 0, liner: 1 },
        },
        {
          emoji: "🧹",
          label: "Just routine seasonal maintenance.",
          scores: { sweep: 3, level1: 2, "level2-realtor": 0, liner: 0, historic: 0 },
        },
      ],
    },
    {
      question: "Is there a buyer or seller transaction in play?",
      options: [
        {
          emoji: "🤝",
          label: "Yes, we're under contract right now.",
          scores: { "level2-realtor": 3, level1: 2, sweep: 0, liner: 0, historic: 0 },
        },
        {
          emoji: "🏷️",
          label: "Pre-listing, getting ready to sell.",
          scores: { "level2-realtor": 3, level1: 2, sweep: 1, liner: 0, historic: 0 },
        },
        {
          emoji: "🔍",
          label: "Buyer's inspection flagged the chimney.",
          scores: { "level2-realtor": 3, level1: 1, sweep: 0, liner: 1, historic: 0 },
        },
        {
          emoji: "🚫",
          label: "No transaction. Just maintenance.",
          scores: { "level2-realtor": 0, level1: 2, sweep: 2, liner: 1, historic: 1 },
        },
      ],
    },
    {
      question: "When was your last chimney inspection?",
      options: [
        {
          emoji: "📅",
          label: "Within the last year.",
          scores: { sweep: 2, level1: 1, "level2-realtor": 1, liner: 1, historic: 1 },
        },
        {
          emoji: "🗓️",
          label: "One to three years ago.",
          scores: { sweep: 3, level1: 2, "level2-realtor": 1, liner: 1, historic: 1 },
        },
        {
          emoji: "📆",
          label: "More than three years ago.",
          scores: { sweep: 2, level1: 3, "level2-realtor": 2, liner: 2, historic: 2 },
        },
        {
          emoji: "❓",
          label: "I have no idea. Maybe never.",
          scores: { sweep: 1, level1: 3, "level2-realtor": 2, liner: 2, historic: 2 },
        },
      ],
    },
    {
      question: "What kind of fuel do you burn?",
      options: [
        {
          emoji: "🪵",
          label: "Wood. Stove or fireplace.",
          scores: { sweep: 3, level1: 1, liner: 2, "level2-realtor": 1, historic: 2 },
        },
        {
          emoji: "🌾",
          label: "Pellet stove.",
          scores: { sweep: 3, level1: 1, liner: 2, "level2-realtor": 1, historic: 0 },
        },
        {
          emoji: "🛢️",
          label: "Oil furnace flue.",
          scores: { sweep: 1, level1: 2, "level2-realtor": 2, liner: 3, historic: 0 },
        },
        {
          emoji: "🔥",
          label: "Gas insert or appliance.",
          scores: { sweep: 1, level1: 2, "level2-realtor": 2, liner: 1, historic: 0 },
        },
        {
          emoji: "🚫",
          label: "Not currently using it.",
          scores: { sweep: 1, level1: 3, "level2-realtor": 2, liner: 1, historic: 1 },
        },
      ],
    },
  ] as QuizStep[],
  outcomes: [
    {
      id: "sweep",
      emoji: "🧹",
      title: "Schedule a Sweep + Level 1 Inspection",
      body: "Based on your answers, you need a routine sweep with a written Level 1 inspection. $219, top-down brushing, HEPA vacuum cleanup, and an inspection sheet emailed the same day. No upsells. We'll tell you the truth about what we find.",
      recommendedService: "Chimney Cleaning & Sweep",
      ctaLabel: "Book Sweep + Inspection",
      ctaHref: "/booking",
    },
    {
      id: "level1",
      emoji: "📋",
      title: "Start with a Level 1 Inspection",
      body: "Your chimney hasn't been looked at in a while. A Level 1 inspection is the right starting point. We document everything with photos, hand you a written sheet, and only recommend further work if you actually need it.",
      recommendedService: "Level 1 Chimney Inspection",
      ctaLabel: "Book Level 1 Inspection",
      ctaHref: "/booking",
    },
    {
      id: "level2-realtor",
      emoji: "🏘️",
      title: "Level 2 Inspection for Your Transaction",
      body: "You're on a real estate clock. Our Level 2 is built for this: $295, video scan of every flue, branded PDF written report in your inbox within 24 hours. Same-week scheduling. Realtors across Bow, Concord, and Hopkinton already use this report to close cleanly.",
      recommendedService: "Level 2 Inspection",
      ctaLabel: "Schedule Level 2 Inspection",
      ctaHref: "/booking",
    },
    {
      id: "liner",
      emoji: "🔩",
      title: "Stainless Steel Liner Assessment",
      body: "Your situation points to a liner question. Could be sizing, could be condition, could be a fuel change. Starting at $2,495 for a properly sized 316Ti install. We measure first, talk through options, and only quote what your appliance actually needs.",
      recommendedService: "Stainless Steel Chimney Liner",
      ctaLabel: "Book a Liner Site Visit",
      ctaHref: "/booking",
    },
    {
      id: "historic",
      emoji: "🏛️",
      title: "Historic Restoration Site Visit",
      body: "Pre-1900 brick needs lime mortar, period-appropriate replacements, and a craftsman who knows the difference between Type O and Portland. Free site visit. We'll walk the chimney with you, take photos for your archive, and write a scope that respects the building.",
      recommendedService: "Historic Fireplace & Masonry Restoration",
      ctaLabel: "Schedule a Historic Site Visit",
      ctaHref: "/booking",
    },
  ] as QuizOutcome[],
};

/* =============================================================
   Service Areas: 6 towns
   Bow, Concord, Hopkinton, Henniker, Loudon, Pembroke
   ============================================================= */
export type ServiceArea = {
  city: string;
  state: "NH";
  slug: string;
  population: number;
  distance: string;
  founded?: number;
  housingNote?: string;
  description: string;
  faqs: Array<{ q: string; a: string }>;
  tier?: "primary" | "extended" | "premium";
};

/**
 * Service area tiers (added 2026-05-01 from prospect's mockup pattern).
 * Primary cities get full landing pages. Extended/Premium are scaffolded for
 * growth — surfaced on /service-areas with a "we travel for the right project"
 * note instead of dedicated pages until coverage is validated with Kevin.
 */
export const serviceAreaTiers = {
  primary: {
    label: "Primary Area",
    headline: "Six core towns, on the route every week",
    note: "These are the towns we cover weekly. If you're calling from one of these addresses, you're often the closest job on the schedule.",
  },
  extended: {
    label: "Extended Area",
    headline: "Greater NH and beyond, project by project",
    note: "We travel for the right project. Manchester, Nashua, Dover, the Lakes Region, and the Seacoast — contact us with the address and the scope, and we'll tell you straight whether we can fit it in.",
  },
  premium: {
    label: "Premium Projects",
    headline: "Heritage and historic work, anywhere it's the right fit",
    note: "Pre-1900 colonial restoration, Federal-era fireplace work, and large heritage masonry projects pull us further than our regular route. If your project is the right fit, distance isn't the question. The work is.",
  },
} as const;
export const serviceAreas: ServiceArea[] = [
  {
    city: "Bow",
    state: "NH",
    tier: "primary",
    slug: "bow",
    population: 7821,
    distance: "Home base",
    founded: 1727,
    housingNote: "Mix of 1700s center-chimney capes, 1800s farmhouses, and post-1990 colonials. Median single-family price $740,000 (Aug 2025).",
    description: "Bow is home. We're physically based here, we live here, and we know which roads ice up first in November. Bow's housing stock is unusual: side-by-side you'll find a 1798 center-chimney Cape and a 2018 colonial, often on the same street. We work both. The historic center along Route 3A and the homes around Bow Pond have some of the best-preserved Federal-era chimneys in Merrimack County, and we repoint them with lime mortar instead of letting Portland cement spall the brick. For the modern homes off South Bow Road, it's straightforward chimney sweeps, Level 2 inspections for resales, and roof replacements when the original architectural shingles start to age out.",
    faqs: [
      { q: "How fast can you get to a Bow address?", a: "Most weeks, same week. We're physically based in Bow. If you're calling from Bow, you're often the closest job on the schedule." },
      { q: "Do you handle the historic homes around Bow center?", a: "Yes. Pre-1900 work is one of our specialties. Lime mortar, period-appropriate brick, Rumford fireplace restoration, beehive bake ovens. The center-chimney homes around Bow center, Bow Bog, and the older farms are exactly the work we want." },
      { q: "Can you do real estate inspections in Bow with the high-end transaction values?", a: "Yes. Bow has the highest median price in Merrimack County, and the transactions are serious. Level 2 inspection $295 with a 24-hour PDF report, same-week scheduling. Realtors at Coldwell Banker, RE/MAX, and Keller Williams Bow already use these reports." },
    ],
  },
  {
    city: "Concord",
    state: "NH",
    tier: "primary",
    slug: "concord",
    population: 43976,
    distance: "10 miles north",
    founded: 1659,
    housingNote: "State capital with 1700s federal homes downtown, Victorian neighborhoods around Pleasant Street, and modern housing along the I-89 corridor. Median single-family price ~$507,500.",
    description: "Concord is our second home. The historic district downtown has Federal-era chimneys, Victorian brick stacks on Pleasant Street, and Cape Cod chimneys on Penacook Street. The state capital also has more home transactions per month than any other town we serve, and the realtor community in Concord knows our 24-hour Level 2 report turnaround. We do everything from a $219 sweep on a 1972 ranch to full historic restoration on the older homes near Eagle Square. Insurance inspections move fast here too: Concord has more carrier-required documentation requests than anywhere else in our coverage area.",
    faqs: [
      { q: "How busy are you in Concord?", a: "Concord is a regular weekly stop on the route. You're rarely waiting more than a week for a sweep, and Level 2 inspections for transactions almost always fit within a 10-day inspection window." },
      { q: "Do you work the older neighborhoods downtown?", a: "Yes. The Federal and Victorian housing stock around Pleasant Street, North Main, and the historic district is the kind of work we do well. Lime mortar where it's called for, modern materials where they belong." },
      { q: "Are you on the realtor referral lists in Concord?", a: "Yes, several. Send the closing date to IntegrityChimney1@gmail.com and we'll fit you into the schedule." },
    ],
  },
  {
    city: "Hopkinton",
    state: "NH",
    tier: "primary",
    slug: "hopkinton",
    population: 5727,
    distance: "12 miles west",
    founded: 1735,
    housingNote: "Pre-1900 farmhouses, center-chimney colonials in the historic district, and modern homes along Route 202. Median single-family price ~$513,750.",
    description: "Hopkinton is heritage country. The historic district along Main Street has been a National Register asset since the 1970s, and the older homes along Route 103 toward Contoocook have center chimneys that haven't been touched correctly in decades. We do a lot of historic restoration work here: lime mortar repointing, Rumford fireplace rebuilds, and the occasional beehive bake oven. The newer homes off Briar Hill and Lakeshore Drive are different work entirely: routine sweeps, real estate inspections for the active resale market, and roof replacements as the post-2000 housing stock ages into its first major exterior cycle.",
    faqs: [
      { q: "Do you specialize in historic homes in Hopkinton?", a: "Yes. Hopkinton has some of the best-preserved colonial and Federal-era housing in central NH, and the historic chimney work is exactly what we want. We use lime mortar on pre-1900 brick, restore Rumford geometry to period spec, and document everything with photos for your archive." },
      { q: "How is the realtor market in Hopkinton?", a: "Active. Median price $513,750 means transactions are serious, and the inspection windows are tight. Same-week Level 2 scheduling, 24-hour PDF report, $295 starting." },
      { q: "Do you cover Contoocook?", a: "Yes. Contoocook village is Hopkinton, and we work the homes along Route 127 and the village center regularly." },
    ],
  },
  {
    city: "Henniker",
    state: "NH",
    tier: "primary",
    slug: "henniker",
    population: 4975,
    distance: "20 miles west",
    founded: 1768,
    housingNote: "Federal-era homes along Western Avenue and historic district. New England College housing. Significant pre-1900 housing stock, especially around Henniker center and the Contoocook River.",
    description: "Henniker has the highest density of pre-1900 homes we serve, and the heritage commission is active. We've done lime mortar repointing on Federal-era homes along Western Avenue, beehive bake oven rebuilds in farmhouses outside the village, and Rumford fireplace restoration on saltboxes near Davis Road. The local heritage community knows the difference between a craftsman who understands historic mortar composition and a contractor who'll throw Portland cement at anything brick. We work the slower, careful kind of restoration the buildings actually need. New England College and the modern homes around Pats Peak get the standard chimney sweep and Level 2 inspection work.",
    faqs: [
      { q: "Are you on the NH Preservation Alliance directory?", a: "Pursuing membership. Either way, the work we do on pre-1900 Henniker chimneys follows NPS Preservation Brief 2 standards: lime mortar, period-appropriate brick, photo archives." },
      { q: "Do you work with the heritage commission?", a: "We have. Several Henniker projects have involved heritage commission review, and we coordinate with the commission's standards and approvals where required." },
      { q: "What about the homes around Pats Peak and the modern subdivisions?", a: "Standard chimney services, sweeps, Level 2 inspections, roof replacements. Same scheduling, same prices, same workmanship guarantee." },
    ],
  },
  {
    city: "Loudon",
    state: "NH",
    tier: "primary",
    slug: "loudon",
    population: 5675,
    distance: "12 miles northeast",
    founded: 1773,
    housingNote: "Mix of 1800s farmhouses, 1900s capes, and modern homes. Active wood-stove and pellet-stove community. New Hampshire Motor Speedway on the southern edge.",
    description: "Loudon is wood stove country. A serious chunk of our Loudon work is annual maintenance for homeowners burning four or five cords a year through Blaze Kings, Jotuls, and Pacific Energy units. The wood-burning community here knows the difference between a sweep who'll do a real top-down brushing and one who'll wave a brush around for fifteen minutes and call it done. We do real cleanings, real Level 1 inspections, and we'll talk drafts and creosote and cord composition for as long as you want. The 1800s farmhouses around the town center get the historic mortar treatment when they need it. Real estate inspection volume is steady, especially around the speedway and the lake regions.",
    faqs: [
      { q: "Do you work on Blaze King and other high-end stoves?", a: "Yes. We sweep every brand, talk fluently about 1/8-inch creosote thresholds, and know the difference between a 6-inch and 8-inch liner. We won't condescend." },
      { q: "How often should I sweep if I burn four cords a year?", a: "Annually at minimum, sometimes mid-season if you're seeing fast glaze build-up. We can pull the cap and check at the half-season mark if you want." },
      { q: "Do you cover the homes around the speedway?", a: "Yes. All of Loudon is regular coverage, including the lake regions, the speedway area, and the older farmhouses along Route 106." },
    ],
  },
  {
    city: "Pembroke",
    state: "NH",
    tier: "primary",
    slug: "pembroke",
    population: 7115,
    distance: "8 miles south",
    founded: 1759,
    housingNote: "Mix of historic homes in Suncook village, mid-century capes, and newer homes along Route 3. Strong residential resale market and active wood-burning community.",
    description: "Pembroke is close to home and we cover it weekly. The Suncook village historic homes get the careful pre-1900 treatment when needed: lime mortar, period brick where the originals are unsalvageable, Rumford restoration where the original geometry is intact. The mid-century capes along Pembroke Hill Road and the newer homes off Borough Road get the standard sweep, Level 2, and roof replacement work. The Pembroke real estate market has been steady, and the realtor referrals for Level 2 inspections are a regular part of the schedule. If you're calling from Pembroke, we can usually fit you in the same week.",
    faqs: [
      { q: "Do you cover all of Pembroke including Suncook?", a: "Yes. Suncook village, Pembroke Hill, Borough Road, and everything in between. Pembroke is on the regular weekly route." },
      { q: "Is the historic work in Suncook similar to the older Bow work?", a: "Very similar. Pre-1900 brick, lime mortar joints, original geometry where it's intact. Same care, same materials, same photo archive for your records." },
      { q: "What's your Pembroke pricing?", a: "Same as everywhere else we work. $219 sweep, $295 Level 2 with 24-hour PDF, $2,495 starting on liners. We don't surcharge by zip code." },
    ],
  },
];

/* =============================================================
   Trust signals (footer + scattered)
   ============================================================= */
export const trustSignals: Array<{ icon: string; label: string; detail: string }> = [
  {
    icon: "✅",
    label: "Fully Insured",
    detail: "General liability and workers' comp. Documentation on request.",
  },
  {
    icon: "🏆",
    label: "BBB A+ Accredited",
    detail: "Better Business Bureau accredited since 2009.",
  },
  {
    icon: "🗓️",
    label: "Owner On Every Job",
    detail: "Kevin Fredrickson personally. Not a call center, not a subcontractor.",
  },
  {
    icon: "📞",
    label: "24-Hour Callback",
    detail: "Or your free estimate is on us.",
  },
  {
    icon: "📋",
    label: "Free Estimates",
    detail: "On any repair quoted over $500.",
  },
  {
    icon: "🛡️",
    label: "5-Year Workmanship Guarantee",
    detail: "Transferable to new owner if you sell.",
  },
];

/* =============================================================
   Navigation
   ============================================================= */
export const nav = {
  primary: [
    { label: "Services", href: "/services" },
    { label: "Historic Restoration", href: "/historic-restoration" },
    { label: "For Realtors", href: "/for-realtors" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  more: [
    { label: "Pricing", href: "/pricing" },
    { label: "Gallery", href: "/gallery" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
  ],
  ctaPrimary: { label: "Book Inspection", href: "/booking" },
  ctaSecondary: { label: "Take the Quiz", href: "/quiz" },
};

/* =============================================================
   Footer
   ============================================================= */
export const footer = {
  tagline: "Chimney, masonry, siding, and roofing across central New Hampshire. Two specialized companies, one owner. We answer the phone, show up when we said, and tell you what your home actually needs.",
  brands: [
    {
      name: "Integrity Chimney",
      focus: "Chimney & Masonry",
      phone: "(603) 660-4644",
      phoneTel: "+16036604644",
      email: "IntegrityChimney1@gmail.com",
      services: [
        { label: "Chimney Cleaning", href: "/services/chimney-cleaning" },
        { label: "Level 2 Inspection", href: "/services/level-2-inspection" },
        { label: "Stainless Liners", href: "/services/stainless-steel-liner" },
        { label: "Historic Restoration", href: "/services/historic-restoration" },
        { label: "Crown & Cap Repair", href: "/services/crown-repair" },
      ],
    },
    {
      name: "Integrity Exteriors NH",
      focus: "Siding & Roofing",
      phone: "(603) 568-9292",
      phoneTel: "+16035689292",
      email: "integrityexteriors603@gmail.com",
      services: [
        { label: "Siding Installation", href: "/services/siding" },
        { label: "Siding Replacement", href: "/services/siding" },
        { label: "Roofing Installation", href: "/services/roofing" },
        { label: "Roofing Replacement", href: "/services/roofing" },
      ],
    },
  ],
  legal: {
    licenseNotice: "Integrity Chimney Services LLC and Integrity Exteriors NH, Bow, NH. Both fully insured. Free estimates.",
    insuredNotice: "Fully insured. Free estimates.",
  },
  schemaAddress: {
    streetAddress: "",
    addressLocality: "Bow",
    addressRegion: "NH",
    postalCode: "03304",
    addressCountry: "US",
  },
};

/* =============================================================
   Pricing disclaimer band: used on /pricing page
   Source: design-system.md §11 Custom row
   ============================================================= */
export const pricingDisclaimer = {
  body: "Final price after on-site assessment. Free estimates over $500. No deposits over $1,000 until day-of-start. We publish these prices because the rest of the category won't.",
};
