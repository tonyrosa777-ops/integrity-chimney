/**
 * blog.ts: Source of truth for the launch blog set.
 * Voice: trustworthy, direct, skilled, no-nonsense craftsman.
 * Source map: market-intelligence.md (audience, pricing, scam patterns, NH housing stock),
 * design-system.md §7 (tone), site.ts (services, service areas, pricing).
 *
 * Constraints respected:
 *   - Zero em dashes anywhere in the strings.
 *   - First paragraph of every body is the AEO direct-answer block.
 *   - 4+ internal links per post.
 *   - 5+ FAQ items per post.
 *   - 1500+ words per body.
 *   - No claimed certifications Kevin does not have. CSIA standards referenced as public.
 */

export type BlogPostFAQ = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  category:
    | "Maintenance"
    | "Inspection"
    | "Historic Restoration"
    | "Repair"
    | "Real Estate"
    | "Safety";
  cardImage: string;
  headerImage: string;
  body: string;
  faqs: BlogPostFAQ[];
  related: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "chimney-sweep-cost-new-hampshire",
    title: "How Much Does a Chimney Sweep Cost in New Hampshire?",
    excerpt:
      "What a real chimney sweep costs in NH in 2026, what the price actually buys, and how to spot the $99 cold-call scam before you let someone on your roof.",
    publishedAt: "2026-04-15",
    readingMinutes: 9,
    category: "Maintenance",
    cardImage: "/images/blog/01-sweep-cost-card.jpg",
    headerImage: "/images/blog/01-sweep-cost-header.jpg",
    body: `A standard annual chimney sweep in New Hampshire costs between $200 and $400 in 2026. At Integrity Chimney Services, sweeps start at $219 with a written inspection report included. The price varies by chimney height, fuel type, soot buildup, and accessibility.

That price band shows up in every NH market source we trust. Anything Chimney out of Auburn publishes $199 for a Level 1 sweep on their website. National pricing aggregators like HomeGuide put the 2025 average at $254. Black Moose, Crown, and the other established central-NH shops fall inside the same window when you account for travel time. If a price comes back wildly above $400 or wildly below $200, something is being padded or something is being skipped.

## What a real chimney sweep actually includes

A working sweep in central New Hampshire is not a brush down the flue and a handshake. It takes about 60 to 90 minutes per flue when it is done correctly. Here is what the $219 covers when we do it.

Drop cloths go down before any tool comes out of the truck. The hearth, the floor, and the path between the firebox and the front door get covered. Shoes come off when we walk through the rest of the house. The chimney gets brushed top down with a polypropylene or wire brush sized to your flue. The smoke chamber and the smoke shelf get scraped, because that is where most of the dangerous glazed creosote actually lives. A HEPA vacuum runs the whole time so the soot does not end up on your dining-room table.

After the sweep, we do a Level 1 visual inspection of every accessible part. Firebox, smoke chamber, flue, damper, crown, cap, and flashing. We take photos. You get a written inspection sheet by email the same day. If we see something that needs work, you see the photo and the reason. If we do not see anything, we say so. That is the standard. Anything less is a wash, not a sweep.

Read the full scope on the [chimney sweep service page](/services/chimney-cleaning) and the published rate on the [pricing page](/pricing).

## When the price climbs above $300

The number moves up for a few honest reasons. A 30-foot stack on a 1798 Cape with restricted attic access takes longer to set up than a 16-foot fireplace on a 2005 ranch. Two flues in one chimney mass means two sweeps, two camera passes, and two report sections. A pellet stove with caked fly-ash takes a different brush head and a different chemistry than a wood flue with three winters of layered soot.

Heavy creosote, the third-stage glazed kind that looks like black candy on the flue tile, sometimes needs a second pass with a chemical treatment before brushing. That is real labor. A real shop will tell you up front that the visit is going to cost more before they pull the chimney apart.

In the 1750 to 1830 housing stock that fills [Bow](/service-areas/bow), [Henniker](/service-areas/henniker), [Hopkinton](/service-areas/hopkinton), and [Pembroke](/service-areas/pembroke), the center chimneys often vent three to five fireboxes. Sweeping a Federal-era center chimney with three working flues is a half-day job. Expect the invoice to reflect that. We talk through what your specific chimney needs in the [Federal-era center chimneys field guide](/blog/federal-era-center-chimneys-nh).

## When the price drops below $200, run

The chimney sweep category in New England is poisoned by cold-call scammers. The pattern is documented by Wellesley Police, by CSIA, by the Concord Monitor, and by Integrity's own BBB profile.

The script goes like this. Someone calls and says your neighbor referred you for a $49 or $99 sweep. They show up. They climb on the roof for ten minutes. They come down with photos of cracks you cannot verify and a $2,000 estimate to install a flue liner you may not need. The $99 was the bait. The liner was the hook.

> "Anyone who thinks they can get an honest chimney sweep for $99 almost deserves to be scammed. Would you drive a full-size truck with ladders on it to someone's house, then climb on top of their roof and chimney and spend an hour scrubbing the inside of the chimney and smoke chamber and get exposed to soot for $99?"

That quote is from a consumer journal cited on the Chimney Savers VT scam page. It captures the math. Real labor with real liability insurance and real travel does not pencil at $99. The honest floor in NH is $199. Below that, you are paying for a sales call, not a sweep.

We have a separate page on the patterns to watch for at [chimney scam warning signs in NH](/chimney-scams-nh). If a sweep cold-called you, that is your first signal.

## Seasonal demand and how it affects price

The NH heating-season search volume spikes in late August and runs hard through November. Every legitimate sweep in central New Hampshire is booked two to four weeks out by September. Anything Chimney's site says it directly: "We tend to get very busy after fall begins."

What that means for you. Book in late spring or early summer if you can. Prices are the same, the schedule is open, and the soot from last winter has not had a chance to absorb summer humidity and cake. If you are calling in October because you smell creosote, do not panic, but do not delay either. Call (603) 660-4644 the morning you notice it. We try to keep openings every week for the people who need to be on the roof this week.

For a transaction under contract, the rule is different. We hold same-week slots specifically for buyer's-agent and listing-agent calls. Email IntegrityChimney1@gmail.com with the closing date and the address, and we will confirm within 4 business hours. The $295 [Level 2 inspection](/services/level-2-inspection) ships with a 24-hour written PDF report.

## Five questions to ask before you book

Before you put a sweep on your calendar, ask these on the phone. The answers separate the working trade from the bait shop.

1. What does the sweep include? A real sweep has a brush, a vacuum, a smoke-chamber scrape, and a written inspection. If the answer is "we just brush the flue," keep calling.
2. Is the inspection in writing? You should get a same-day inspection sheet by email or text. If the answer is "we will tell you in person," that is a sales pitch waiting to happen.
3. Are you insured? A working NH chimney shop carries general liability and workers' comp. Both. Not one. Ask for the certificate if you want it. We will email it before the visit.
4. Did you cold-call me? If yes, hang up. Integrity does not cold-call. Crown does not cold-call. Anything does not cold-call. Cold-calling is the scam pattern.
5. What is the all-in price? Get the sweep price plus any line-item add-ons in writing before the truck shows up. No deposits over $1,000 until the day work begins, ever.

If you want the easy path, [book the inspection online](/booking) and we will follow up with a written confirmation. The phone number is (603) 660-4644 and someone picks up.

## What the price does not cover

Worth being clear about. The $219 sweep covers a sweep and a Level 1 visual. It does not cover a Level 2 video-camera inspection. That is a separate $295 service because it takes a different camera, a different report format, and a different amount of time. It does not cover repairs. If we find a cracked crown or a missing cap, we quote it separately, free, and you decide.

It also does not cover natural gas or propane appliance inspections. Those need a licensed gas-fitter for the appliance side. We can sweep and inspect the chimney that vents a gas appliance, but the appliance itself goes to a different trade. That is the same boundary every honest NH chimney shop holds.

## Why the price gets cheaper if you book early

Two practical reasons to book the sweep before September if you can.

First, schedule. Late spring and summer slots are wide open. You pick the time. By September, every working sweep in central NH is booking two to four weeks out and the time slots get tight. If you need a specific Saturday, book it in May.

Second, the inspection is more useful in summer. A clean dry chimney inspected in July gives a clear baseline on every component: crown, cap, mortar joints, flue interior. If we find something that needs work, you have time to schedule the repair before the heating season starts. A finding in October means you are scrambling to fit repairs in before snow flies. A finding in July means you have three months of comfortable working weather to address it.

The price does not change. The convenience does. We hold off-season slots open in [Concord](/service-areas/concord) and [Loudon](/service-areas/loudon) specifically because the same-week capacity is the value, not a discount. Book in May and June and you essentially get a free upgrade on schedule control.

## The bottom line

In central New Hampshire in 2026, $200 to $400 buys you an honest chimney sweep with a written inspection. We start at $219. The fancy number is not the floor. The cold-call number is the floor of a different game you do not want to play. Book the sweep, read the inspection sheet, and burn the next winter without wondering what is up there.`,
    faqs: [
      {
        question: "How much does a chimney sweep cost in New Hampshire in 2026?",
        answer:
          "Between $200 and $400 for a single-flue annual sweep with a Level 1 inspection. Integrity Chimney Services starts at $219, which includes the sweep, a HEPA vacuum cleanup, a Level 1 visual inspection, and a written inspection sheet emailed the same day.",
      },
      {
        question: "Why is a $99 chimney sweep a scam?",
        answer:
          "Real labor with insurance, travel, and a working truck does not pencil at $99. Cold-call sweeps at $49 or $99 are documented bait for $2,000 liner upsells. Wellesley Police, CSIA, and Integrity's own BBB profile flag the pattern. We do not cold-call, ever.",
      },
      {
        question: "How often should I get my chimney swept?",
        answer:
          "If you burn three or more cords of wood a year, sweep once every season. Light use, sweep every two years if a Level 1 inspection clears the flue. NFPA 211 recommends an annual inspection at minimum, regardless of use.",
      },
      {
        question: "Does the sweep price include repairs?",
        answer:
          "No. The $219 sweep covers cleaning and a Level 1 visual inspection only. If we find a cracked crown, a failed cap, or a damaged liner, we quote the repair separately at no charge and let you decide. Repairs are not bundled into the sweep price.",
      },
      {
        question: "How long does a chimney sweep take?",
        answer:
          "About 60 to 90 minutes for a single-flue chimney. Multi-flue Federal-era center chimneys can take three to four hours when fully cleaned. We confirm the time at booking and will not start a job we cannot finish that visit.",
      },
      {
        question: "Do you sweep pellet and oil flues?",
        answer:
          "Yes. Many NH chimney companies skip oil and pellet because the brushes and chemistry are different. We sweep both. The oil furnace flue is often the dangerous one in a NH home and the one most often missed by other shops.",
      },
      {
        question: "Can I book a sweep online?",
        answer:
          "Yes. Use the booking calendar at /booking or call (603) 660-4644. For real estate transactions under contract, email IntegrityChimney1@gmail.com with your closing date and we will confirm a same-week slot within 4 business hours.",
      },
    ],
    related: ["level-2-chimney-inspection-explained", "chimney-fire-warning-signs", "selling-home-nh-chimney-inspection"],
  },
  {
    slug: "level-2-chimney-inspection-explained",
    title: "What Is a Level 2 Chimney Inspection? (And Why It's Required When You Buy a Home)",
    excerpt:
      "The camera-and-checklist deep dive defined by NFPA 211. What it covers, what it costs in NH, and why your closing depends on it.",
    publishedAt: "2026-04-16",
    readingMinutes: 10,
    category: "Inspection",
    cardImage: "/images/blog/02-level2-card.jpg",
    headerImage: "/images/blog/02-level2-header.jpg",
    body: `A Level 2 chimney inspection is the camera-and-checklist deep dive defined by NFPA 211, the National Fire Protection Association's chimney safety standard. It is required by NFPA 211 whenever a property changes ownership. Expect 1 to 2 hours on site and a written PDF report; the cost in central New Hampshire ranges from $260 to $460. At Integrity, a Level 2 with same-week scheduling for transactions under contract is $295.

If your buyer's agent or your home inspector said "the chimney needs further evaluation," what they meant was a Level 2. It is not a sales upsell. It is a written national standard. Skipping it is how you end up renegotiating a closing or, worse, buying a house with a $12,000 surprise.

## When NFPA 211 actually requires a Level 2

NFPA 211 is the open public standard maintained by the National Fire Protection Association. Section 14 lays out three inspection levels. Level 2 is mandated in three specific situations:

1. **Sale or transfer of the property.** Every time a chimney changes ownership. This is the realtor inspection.
2. **Change of fuel type or appliance.** Wood to gas, oil to propane, fireplace to insert. The flue has to be sized and certified for the new appliance.
3. **After an event.** Chimney fire, lightning strike, earthquake, or hurricane that may have affected the system. Anything that could have damaged the flue interior triggers a Level 2.

That is the standard. Real estate is the most common driver in central New Hampshire because the housing stock is old and the [Bow](/service-areas/bow), [Concord](/service-areas/concord), and [Hopkinton](/service-areas/hopkinton) markets turn over fast. Buyer's agents who close 20 to 30 transactions a year know the pattern. The home inspector flags the chimney because home inspectors are general practitioners. The Level 2 specialist confirms or clears the flag in writing.

The full sales playbook is on the [for realtors page](/for-realtors), and the per-service line item lives on the [Level 2 inspection page](/services/level-2-inspection).

## What gets checked, line by line

A Level 1 is a visual check of accessible parts. A Level 2 adds three things: every flue scanned with a video camera, every accessible portion of the chimney inspected including attic and basement, and a written report.

Here is the full station list.

The exterior. Crown condition, cap presence and security, flashing seal at the roof line, brick face for spalling, mortar joints for failure, lean of the stack. Photos at each station.

The flue interior. Camera scan top to bottom of every flue, looking for cracked tiles, missing tile sections, mortar joint gaps, glazed creosote stage 3, animal nests, and flue size adequacy for the connected appliance. NFPA 211 specifies that flues serving solid-fuel appliances must be lined with a UL-listed liner sized to the appliance manufacturer's specification.

The firebox. Damaged firebrick, missing refractory mortar, damper function, smoke chamber parging condition, throat geometry. The smoke chamber is the one most commonly skipped by other shops and the most common location for stage 3 creosote.

The connections. Wood stove pipe, oil furnace flue connector, water heater flue, dryer vent overlap. Anything that ties into the chimney mass.

The interior pass-throughs. Attic, second-floor closet, basement clearances. We are looking for combustibles within two inches of the flue, deteriorated parging where the flue passes through framing, water staining that suggests an active leak.

The report. PDF format. Photo on every station. Findings categorized as urgent, recommended, monitor, or pass. Plain English, not just NFPA codes. Recommendations the lawyer and the buyer's agent can act on.

That is the deliverable. Anyone selling you a Level 2 without a written report is selling you something else.

## Level 1 vs Level 2 vs Level 3

The three levels are progressive. Level 1 is the annual maintenance check. Level 2 is the deep dive triggered by a transaction or an event. Level 3 is the destructive inspection where parts of the masonry get opened up to access concealed sections, used after a fire when there is reason to believe the chimney was structurally compromised.

You almost never need a Level 3. If you do, you know it. Your insurance company is involved and there was probably a fire department on your lawn. We discuss Level 3 in the [chimney fire warning signs article](/blog/chimney-fire-warning-signs).

For everyday maintenance, a Level 1 with the annual sweep is enough. For a sale, a fuel change, or a chimney fire, you need a Level 2. The price difference reflects the camera time, the report time, and the liability of putting a written document in a real estate file.

## What it costs in central NH

The honest range across central New Hampshire in 2026 runs $260 to $460 for a single-flue Level 2. Anything Chimney publishes $275 single flue plus $75 each additional flue. Black Moose, Fire N' Stone, and Crown all fall in the same band. National pricing aggregators put the average at $300 to $450.

We charge $295 for a single flue with a 24-hour written PDF report. Multi-flue chimneys go up by $75 each. That price holds for [Loudon](/service-areas/loudon), [Pembroke](/service-areas/pembroke), [Bow](/service-areas/bow), and the rest of our service area. See the line item on the [pricing page](/pricing).

What the price buys you that a $200 inspection does not. The camera. The written report. The 24-hour turnaround. The same-week scheduling for closings under contract. The post-inspection phone call to walk you through findings if you want it.

## What happens when the report finds something

About two-thirds of Level 2 inspections on NH homes built before 1990 surface at least one finding that needs attention. The most common findings, in order: failed crown (crack or no overhang), missing or mis-sized cap, deteriorated mortar joints in the top six feet of the stack, and unlined or partially-lined flue serving a wood appliance.

What happens next depends on which side of the deal you are on.

For the seller. The findings get categorized urgent, recommended, monitor, or pass. Urgent findings (active liner failure, structural lean) you fix or you disclose. Recommended findings (replace the cap, repoint the top three courses) you can address before listing or negotiate around. Pre-listing inspection prevents the renegotiation that costs sellers $5,000 to $15,000 when the buyer's inspector finds it three days before closing. The full math is in the [selling home in NH inspection article](/blog/selling-home-nh-chimney-inspection).

For the buyer. The report goes in your inspection contingency packet. The lawyer reads it. The agent uses it to negotiate either a price credit or a seller-funded repair. We have written reports specifically formatted for the closing file.

For the owner doing a fuel change. The flue gets sized and the liner gets specified. If the existing flue is too big for a new wood insert, you need a [stainless steel liner](/services/stainless-steel-liner). The liner article walks through the math.

> "When I called Kevin, he answered right away, was friendly, knowledgeable and very reasonable. He was able to complete our chimney inspection the same day all of our other inspections were happening, which saved us a lot of time and stress."

That kind of same-day stack matters when you are closing in two weeks. Email IntegrityChimney1@gmail.com or [book the inspection](/booking).

## What to bring to the inspection

Three things speed up the inspection and lower the cost of any follow-up work.

1. The deed or property record showing the year built. We adjust the camera approach for pre-1900 clay or unlined chimneys.
2. Any prior chimney work invoices. If a previous owner installed a stainless liner, we want to verify the install instead of re-quoting from scratch.
3. The home inspector's report or the buyer's-agent inspection list. We will read what they flagged before we get on the roof and confirm or clear each item in writing.

The job takes 1 to 2 hours on site. The PDF report ships within 24 hours. The findings drive the next conversation, which is either "you are good to close" or "here is the line-item quote." Either way, you have a document.

## A word on the people who skip it

Some buyers and sellers skip the Level 2 to save $295. They get away with it most of the time. The 10 percent of the time they do not, the surprise costs in the five-figure range. We have walked into homes where the previous owner sold the property as-is and the new owner inherited a chimney that needed a full reline and crown rebuild within the first heating season. That is a $6,000 to $9,000 line item.

The $295 is cheap insurance. Take the inspection.

## What a clean Level 2 looks like

Roughly one-third of inspections come back with no urgent findings and no recommended repairs. The chimney is sound. The crown is intact. The cap is in place. The flue interior is clean and structurally fine. Those reports get filed in the closing packet as a "pass" and the sale closes without a chimney conversation. That outcome is the goal of pre-listing inspection: hand the buyer a document that closes the chimney question entirely.

A clean Level 2 also functions as a baseline. Five years from now, the next inspection compares against the current photos and finds any new degradation. The chronological photo record is its own form of documentation that increases over time. We file a copy and you keep a copy. The trail is in your inbox forever.`,
    faqs: [
      {
        question: "What is a Level 2 chimney inspection?",
        answer:
          "A Level 2 inspection is the deep camera-and-checklist evaluation defined by NFPA 211 §14. It includes a video camera scan of every flue, inspection of all accessible portions of the chimney including attic and basement pass-throughs, and a written report. It is required when property changes ownership, fuel changes, or after a chimney fire.",
      },
      {
        question: "How much does a Level 2 inspection cost in NH?",
        answer:
          "$260 to $460 for a single-flue Level 2 in central New Hampshire in 2026. Integrity Chimney Services charges $295 for a single flue with a 24-hour written PDF report. Multi-flue chimneys add $75 per additional flue.",
      },
      {
        question: "Is a Level 2 required by law in NH?",
        answer:
          "It is required by NFPA 211, the national chimney safety standard. NH does not have a separate state mandate, but every reputable lender, home inspector, and buyer's agent treats NFPA 211 as the operational standard. Skipping the Level 2 is a renegotiation risk and a liability risk.",
      },
      {
        question: "How long does a Level 2 inspection take?",
        answer:
          "1 to 2 hours on site for a single-flue chimney. Multi-flue Federal-era center chimneys take 2 to 3 hours. The written PDF report ships within 24 hours of the visit.",
      },
      {
        question: "What's the difference between Level 1 and Level 2?",
        answer:
          "Level 1 is a visual inspection of accessible parts only, typically bundled with the annual sweep. Level 2 adds a video camera scan of every flue, inspection of attic and basement pass-throughs, and a written report. Level 2 is required for property transactions, fuel changes, and post-event evaluations.",
      },
      {
        question: "Can you do a Level 2 inspection same-week for a closing?",
        answer:
          "Yes. We hold same-week slots for transactions under contract. Email IntegrityChimney1@gmail.com with the closing date and the property address and we confirm within 4 business hours. The $295 service includes the 24-hour PDF report.",
      },
      {
        question: "What if the Level 2 fails?",
        answer:
          "Findings are categorized urgent, recommended, monitor, or pass. Urgent items must be addressed or disclosed. Recommended items can be negotiated into the closing. Pass items are documented for the file. The report is built so a lawyer or buyer's agent can act on it directly.",
      },
    ],
    related: ["selling-home-nh-chimney-inspection", "chimney-sweep-cost-new-hampshire", "stainless-steel-chimney-liner-guide"],
  },
  {
    slug: "stainless-steel-chimney-liner-guide",
    title: "Stainless Steel Chimney Liner: When You Need One and What It Costs",
    excerpt:
      "How to know your liner is failing, why stainless is the modern standard, and what a real 316Ti install costs in NH in 2026.",
    publishedAt: "2026-04-17",
    readingMinutes: 10,
    category: "Repair",
    cardImage: "/images/blog/03-ss-liner-card.jpg",
    headerImage: "/images/blog/03-ss-liner-header.jpg",
    body: `You need a stainless steel chimney liner when your existing clay tile liner is cracked, when you change fuel type from oil to gas or wood to insert, or when a Level 2 inspection finds a structural failure that creates a fire or carbon monoxide hazard. Installed cost in New Hampshire ranges from $1,200 to $3,800; a 316Ti stainless install at Integrity starts at $2,495 and carries a lifetime warranty against corrosion.

A flue liner is the inside surface of your chimney. Its job is to contain combustion gases, resist corrosion from acidic byproducts, and keep heat off the surrounding masonry and framing. When the liner fails, the chimney mass is no longer a safe path for smoke and gas. That is the moment you reline. Not before, not later.

## How to know your liner is failing

Most clay tile liners last 50 to 80 years. Many central New Hampshire homes built before 1970 are running on the original clay. By 2026, that clay is at or past its design life.

Five signals that the liner has gone or is going.

1. **White stains on the masonry exterior.** Efflorescence on the brick face is moisture coming from inside the flue. The liner is no longer fully containing combustion moisture, and the moisture is finding the brick.
2. **Smoke smell when nothing is burning.** A sealed liner does not leak. If the house smells like a smoky fireplace in July, gas is migrating through cracked tiles into the masonry and out into the room.
3. **Pieces of clay tile in the firebox or on the smoke shelf.** Clay tile spalls from the inside when it fails. If you find shards in the firebox after a season of burning, the camera scan is going to confirm interior cracking.
4. **A failed Level 2 camera inspection.** The camera reveals what visual inspection cannot. Hairline cracks, displaced tile sections, mortar gaps between tiles, and surface deterioration. Read about [what a Level 2 covers](/blog/level-2-chimney-inspection-explained).
5. **A fuel change.** New wood insert in an old fireplace flue, oil-to-gas conversion, addition of a wood stove. The new appliance has a specified flue size from the manufacturer. The old flue is almost always too big. An oversized flue causes condensation, draft problems, and carbon monoxide migration. The fix is a sized stainless liner.

You can also see a few of these signals from the ground without a ladder. The detail is on the [crown vs cap article](/blog/chimney-crown-vs-cap-explained), which covers the visual cues homeowners can spot from the driveway.

## Why stainless is the modern standard

Three reasons clay relining and cast-in-place liners are rarely the right call anymore.

**Cost.** A clay reline involves removing the existing tiles from the top down and re-stacking. Labor runs $3,000 to $5,000 even on a clean job. A stainless reline runs $1,500 to $3,800 and ships with a manufacturer warranty. The math is one-sided.

**Sizing flexibility.** Wood inserts and modern oil furnaces have specific flue diameter requirements. A 6-inch insert wants a 6-inch flue. The old fireplace flue is probably 8 by 12 inches. A clay reline cannot resize. A stainless liner can. The liner is selected to match the appliance manufacturer's spec exactly.

**Acid resistance.** Modern high-efficiency oil and gas appliances run cooler than the systems they replaced. Cooler exhaust means more condensation in the flue, and the condensation is acidic. Plain galvanized or aluminum liners corrode in 5 to 10 years. Stainless 316Ti, which is the alloy we install, is designed for the chemistry. The lifetime warranty exists because the failure mode for 316Ti is decades, not years.

The pricing is published on the [pricing page](/pricing) and the service detail is on the [stainless steel liner page](/services/stainless-steel-liner).

## 304 vs 316Ti and rigid vs flexible

Two grades you will see quoted, and two formats.

**304 stainless** handles wood-burning duty. It is rated for solid fuel only. Less expensive than 316Ti. Adequate for a wood stove install in a clean dry flue.

**316Ti stainless** handles wood, gas, oil, and pellet. The "Ti" is titanium added to the alloy to resist condensation acid. It is the all-fuel grade and the only grade we install for new clients in NH because most central NH homes have multiple fuel types in play across their lifetime. A 316Ti liner costs about 15 percent more than 304 and lasts the life of the chimney.

**Flexible liner** is corrugated stainless that snakes through bends. It is the standard for relining an existing masonry flue, especially in pre-1900 [Federal-era center chimneys](/blog/federal-era-center-chimneys-nh) where the flue path is rarely perfectly straight.

**Rigid liner** is straight pipe. Used in new construction or in chimneys with perfectly aligned flues. Slightly less expensive per foot than flex but limited in application.

For 90 percent of central NH installs, the right answer is 316Ti flexible with a top-mount termination, a poured insulation backfill or wrap insulation, and a stainless cap. That is what we install. That is what carries the lifetime warranty.

## What a real install day looks like

A liner install is a one-day job in most cases. Two days for a tall stack or a multi-flue chimney.

Morning. The truck arrives, the drop cloths go down, the existing cap and crown get assessed. If the crown needs work it gets quoted as a separate line item, not bundled. The old tile, if any, gets evaluated. Severely deteriorated tile sections may need removal for clearance.

Mid-day. The liner is measured, cut to length, and lowered from the top. The bottom is connected to the appliance breech. The top is terminated with a flange and a cap. Insulation is wrapped or poured around the liner inside the existing flue cavity. The combination of the liner and the insulation is what keeps the surrounding masonry cool and the flue gases hot enough to draft properly.

Afternoon. The system is tested with a smoke test. Photos at every station. The cap is locked in place. The drop cloths come up. The HEPA vacuum runs one last time. We walk you through the install before we leave.

Final invoice on completion. Lifetime warranty paperwork in your hand. The job is done.

> "Had Kevin Fredrickson install a liner with cap in my chimney connected to a wood stove insert. He was professional, the work was clean, and the system has drafted right every winter since."

That is the standard. Anyone leaving without testing the install or without a written warranty is leaving the job unfinished.

## When NOT to reline

Worth being clear about. Not every chimney needs a stainless reline. Sometimes the answer is repointing, a crown rebuild, and a cap. A working camera inspection tells the truth.

We have walked away from several quotes in [Bow](/service-areas/bow) and [Concord](/service-areas/concord) where a previous contractor told the owner they needed a $4,000 reline. The Level 2 showed a perfectly serviceable clay liner with two minor mortar joint gaps that needed parging. The honest answer was a $400 parge and a $250 cap. We do not sell relines that are not needed. The whole point of the [Level 2 inspection](/services/level-2-inspection) is to find out what the chimney actually needs.

If you want a second opinion on a reline quote you have been given, [book the inspection](/booking) and we will read the existing quote against what the camera shows. The $295 either confirms the work or saves you several thousand.

## What the warranty actually covers

Three things to know about the lifetime warranty.

**Corrosion only.** The manufacturer lifetime warranty covers liner corrosion under normal operating conditions for the rated fuel types. It does not cover damage from chimney fires, mechanical impact, or operation outside the rated temperature range. A chimney fire can damage even a stainless 316Ti liner enough to require replacement, and that replacement is a new install, not a warranty claim.

**Original purchaser, original chimney.** The warranty stays with the chimney for which the liner was purchased and installed. If the home sells, the warranty typically transfers to the new owner with documentation. If the liner is removed and reinstalled in a different chimney, the warranty does not follow.

**Workmanship is separate.** The manufacturer warranty covers the liner material. Our workmanship warranty covers the install for one year. Both pieces of paperwork get handed over the day of install. If the liner pulls loose at the top mount or the insulation slumps in the first season, those are workmanship items and we come back at no charge.

We have never had a 316Ti liner fail under the manufacturer warranty in active NH service. The grade is over-engineered for the application. The lifetime guarantee exists because the failure mode is decades, not years.

## How to evaluate competing reline quotes

If you have multiple quotes and the prices vary by more than 20 percent, ask three questions to figure out why.

What grade of stainless? 304 is solid-fuel only and costs less. 316Ti is all-fuel and costs more. A $1,800 reline quote in 304 and a $2,495 quote in 316Ti are different products, not different prices for the same product.

Insulation method? An insulation wrap on the liner before installation differs from poured insulation backfill, and both differ from no insulation at all. Insulation matters for draft, condensation control, and combustible clearances. A non-insulated liner in a NH home is rarely the right answer.

Top termination and cap? A simple flange and a basic cap is one cost. A full top-mount termination with a quality stainless or copper cap is another. Make sure the cap is in the quote.

The differences usually account for the price spread. The cheapest quote is often missing one of the three components. The honest quote includes all three and shows the line items.

## The bottom line

In central New Hampshire in 2026, a real 316Ti stainless reline runs $1,200 to $3,800 depending on chimney height, flue path, and insulation method. We start at $2,495 with a lifetime warranty against corrosion. The job takes a day. The system runs cleaner, drafts better, and lasts longer than any liner option that was on the market 50 years ago.

That is the modern standard. The old options were honest in their day. They are not the answer in 2026.`,
    faqs: [
      {
        question: "How much does a stainless steel chimney liner cost in NH?",
        answer:
          "$1,200 to $3,800 installed in 2026 in central New Hampshire. Integrity Chimney Services starts at $2,495 for a 316Ti flexible install with insulation, top termination, and a stainless cap. The price varies by chimney height, flue diameter, and insulation method.",
      },
      {
        question: "How long does a stainless liner last?",
        answer:
          "316Ti stainless is rated for the life of the chimney. The grade is designed to resist condensation acid from gas and oil appliances. Lower grades like 304 last 20 to 30 years on solid fuel only. We install 316Ti exclusively for the lifetime warranty.",
      },
      {
        question: "When do I need to reline my chimney?",
        answer:
          "When a Level 2 camera inspection finds cracked or displaced clay tiles, when you change fuel type or appliance, after a chimney fire, or when efflorescence and smoke smell signal flue gas migration into the masonry. Not every old chimney needs a reline. The camera tells the truth.",
      },
      {
        question: "What's the difference between 304 and 316Ti stainless?",
        answer:
          "304 is rated for solid fuel only and costs less. 316Ti has titanium added to resist condensation acid from gas, oil, and pellet appliances. 316Ti is the all-fuel grade and the only grade we install for new clients because most NH homes change fuel type across their lifetime.",
      },
      {
        question: "Is a flexible or rigid liner better?",
        answer:
          "Flexible 316Ti is the right answer for 90 percent of central NH installs because most existing masonry flues are not perfectly straight. Rigid liner is used in new construction or perfectly aligned flues. Both are stainless. The choice is about the flue path, not the quality.",
      },
      {
        question: "Can a stainless liner be installed in one day?",
        answer:
          "Yes for most single-flue installs. The job takes 6 to 8 hours including setup, install, insulation, termination, and smoke test. Multi-flue chimneys or very tall stacks may extend to two days. We confirm the timeline at the quote.",
      },
      {
        question: "Does the liner come with a warranty?",
        answer:
          "316Ti liners we install carry a manufacturer lifetime warranty against corrosion. Workmanship is warrantied separately for one year. Both pieces of paper are handed over on install day along with the photo documentation of the install.",
      },
    ],
    related: ["level-2-chimney-inspection-explained", "chimney-crown-vs-cap-explained", "chimney-fire-warning-signs"],
  },
  {
    slug: "lime-mortar-vs-portland-cement-historic-homes",
    title: "Lime Mortar vs Portland Cement: Why It Matters on a Pre-1900 New Hampshire Home",
    excerpt:
      "Pre-1900 brick is soft. Portland cement destroys it. Lime mortar saves it. Here is how to tell the difference and why it matters on your Federal-era stack.",
    publishedAt: "2026-04-18",
    readingMinutes: 11,
    category: "Historic Restoration",
    cardImage: "/images/blog/04-lime-mortar-card.jpg",
    headerImage: "/images/blog/04-lime-mortar-header.jpg",
    body: `Pre-1900 brick is soft. It was made to flex with the seasons and let mortar joints absorb that movement. Portland cement is harder than the brick, traps moisture, and causes the brick face to spall away year over year. Lime mortar (Type O on most central NH chimneys) is softer than the brick and the only correct choice on a Federal-era center chimney. Use the wrong mortar and you destroy the masonry you were trying to save.

This is the single most expensive mistake homeowners make on pre-1900 New Hampshire houses. The chimney looks like it needs repointing. A general mason shows up, mixes a Type N or Type S Portland blend out of habit, and patches the joints. For one or two seasons, it looks great. By year three, the brick faces are flaking off. By year ten, the chimney needs to be rebuilt. The repointing destroyed it.

The fix is simple. Match the original. The original is lime.

## How to tell which mortar your chimney has

Walk up to the chimney and look at the mortar joints. Three quick tests work from the ground or with a ladder.

**Color.** Original lime mortar reads warm tan or cream, sometimes nearly white where it has weathered, sometimes pinkish where local clay was added. Portland cement reads cold gray. If the joints are bright gray, you are looking at Portland repointing already in place.

**Texture.** Lime mortar is sandy and slightly powdery to the touch. Portland is dense and uniform. If you scratch the joint with a key, lime crumbles into sand grains. Portland resists.

**Hardness.** Take the corner of a key or a small screwdriver and push it gently into the joint. Lime mortar yields. Portland does not. The yielding is exactly the property that protects the brick. Lime is sacrificial. It is supposed to fail before the brick does.

If you find a chimney with mixed joints, some lime and some Portland, you are looking at a partial repointing job done by a contractor who did not understand the masonry. That is recoverable. The Portland sections need to come out and get redone in lime. Read the broader [historic restoration page](/historic-restoration) for the full process.

## The spalling cycle in NH winters

Here is the physics of why Portland kills pre-1900 brick.

Brick made before 1900 was fired in beehive kilns at relatively low temperatures. The fired clay is porous. It absorbs moisture and lets it back out. That is a feature. The whole wall is designed to breathe.

Lime mortar is even more porous than the brick. When water enters the wall (rain, snow, condensation), the moisture migrates to the lime joint and exits there. The joint takes the freeze-thaw cycle. The brick stays dry.

Now repoint with Portland. Portland is harder and less porous than the brick. Water still enters the wall. But now the only exit is through the brick face itself. Each NH winter cycle, the moisture in the brick freezes, expands, and pops the face off. That is spalling. After 5 to 10 winters, the chimney looks like the bricks are being eaten.

You can see this on hundreds of chimneys across [Henniker](/service-areas/henniker), [Hopkinton](/service-areas/hopkinton), and [Pembroke](/service-areas/pembroke). The spalling pattern is unmistakable: the brick faces are gone, the Portland joints are still pristine. The mortar outlasted the brick by design failure.

NPS Preservation Brief 2 is the federal reference document on this. The National Park Service Preservation Brief 2 ("Repointing Mortar Joints in Historic Masonry Buildings") states the rule plainly: the replacement mortar should never be harder than the masonry units. For pre-1900 soft-fired brick in central New Hampshire, that means a high-lime mortar, typically classified as Type O.

## The mortar types and what each is for

ASTM C270 defines five mortar types by compressive strength. The shorthand:

- **Type M** at 2,500 psi. Foundations, retaining walls, anything below grade. Never on a chimney.
- **Type S** at 1,800 psi. Modern hard brick, exterior load-bearing walls. Modern construction. Never on a pre-1900 chimney.
- **Type N** at 750 psi. Modern softer brick, above-grade non-load-bearing. The contractor default. Wrong for pre-1900.
- **Type O** at 350 psi. Soft brick repointing. The right answer on a Federal-era center chimney.
- **Type K** at 75 psi. Very soft, used on the most fragile museum-grade work. Uncommon in residential NH chimneys but appropriate on some 18th-century work.

The compressive strength is the whole story. The mortar should match or be softer than the brick it is bedding. A Federal-era Bow brick tests around 600 to 1,200 psi. A Type O lime mortar at 350 psi is softer than the brick. A Type N Portland blend at 750 psi may be harder than the brick. Type S is dramatically harder.

A working historic mason mixes Type O on site from hydrated lime, masonry sand, and a small percentage of Portland (typically less than 20 percent of the binder) to give the mix initial set strength. The recipe is not a secret. The judgment about how much Portland to add and how much sand to mix in is what separates a heritage restoration from a chimney that fails in five years.

## Why most contractors use Portland anyway

Two reasons.

**Convenience.** Pre-mixed Type N comes in a bag at any masonry supply. Lime mortar gets mixed on site, takes longer to set, and requires the mason to know what they are doing. The bag is faster.

**Cost.** Lime is not dramatically more expensive than Portland in raw material. But the labor is. Lime mortar takes more attention during cure (covering, misting, slow cure over 7 to 14 days versus 24 to 48 hours for Portland) and the joints take more skill to point cleanly. The total cost of a lime repoint runs 30 to 50 percent higher than a Portland repoint on a comparable chimney.

We use lime because the math is brutal. A $4,000 Portland repoint that destroys the chimney over 10 years costs the homeowner $30,000 in eventual rebuild. A $5,500 lime repoint that lasts 80 years costs nothing more in the long run. The cheap option is the expensive option.

That math is the entire reason we exist as a heritage shop. Most central NH chimney companies do good work on modern brick. Almost none have the patience for pre-1900 lime work. Read the [Federal-era center chimneys field guide](/blog/federal-era-center-chimneys-nh) for what that judgment actually looks like in practice.

## How we match a 230-year-old joint

When we repoint a Federal-era chimney in [Henniker](/service-areas/henniker) or [Hopkinton](/service-areas/hopkinton), the process runs five steps.

1. **Sample and analysis.** We chip out a small sample of the original mortar from a hidden location. We dissolve the lime in dilute acid and measure the sand grain distribution and color. The sand is what gives the joint its character. Local sand colors are local. We match the sand source by sieve.
2. **Mix design.** We mix a test batch of Type O lime with the matched sand and let it set. Typical ratio is 1 part Type S hydrated lime to 2.5 to 3 parts matched sand, with a small amount of Portland (typically less than 15 percent of the binder weight) for early set.
3. **Joint preparation.** We rake the failed joint to a depth of 2 to 2.5 times the joint width. Hand tools only. Power grinders chip the brick. We use a chisel and a brush.
4. **Pointing.** We butter the joint in lifts, working in small sections. Each lift gets struck flush or slightly recessed to match the original profile. Concave, beaded, or struck profiles all show up on NH historic chimneys; the original profile gets matched.
5. **Cure.** Lime mortar cures by carbonation, not hydration. It needs CO2 and time. We cover the work and mist it for 7 to 14 days. The joint reaches design strength over months, not days.

This is the full restoration process. Pricing depends on the chimney height, the joint count, and how much rebuild is needed beyond pointing. We quote it in writing after a site visit. [Schedule a site visit](/booking) and we walk the chimney with you.

> "I had two estimates that suggested tear down and rebuild and two that recommended repointing, confirming flashing and sealing. The price ranges for this work varied by 30 thousand dollars. Kevin walked the stack with me and showed me what was actually wrong."

That is the story. Most pre-1900 chimneys do not need rebuild. They need correct mortar, correct technique, and a contractor who knows the difference.

## When a rebuild really is the answer

Sometimes the masonry is past pointing. The brick is so spalled it cannot hold a joint. The flue is structurally compromised. The chimney is leaning. In those cases, a salvage rebuild is the right call.

A salvage rebuild on a Federal-era stack means careful disassembly, cleaning of the original brick, salvaging what is reusable, sourcing matching reclaimed brick for what is not, and rebuilding in lime mortar. It is a slow, skilled job. Done right, the rebuilt chimney is indistinguishable from the original after a season of weathering.

Done wrong, the rebuild uses modern hard brick and Portland mortar and looks like it belongs on a 1985 ranch. We have seen those rebuilds on 1798 Capes. They are heartbreaking and they are not us.

## The bottom line

If your home was built before 1900 and you are looking at a chimney repoint quote, ask one question: "What mortar are you using?" If the answer is Type N or Type S, get another quote. If the answer is Type O lime mortar matched to the original sand, you have found the right mason. The wrong mortar is more expensive than the right mortar over the life of the house.`,
    faqs: [
      {
        question: "What is lime mortar and why is it used on historic chimneys?",
        answer:
          "Lime mortar is a soft mortar made from hydrated lime, sand, and sometimes a small percentage of Portland for early set. It is softer and more porous than the surrounding brick, which means it absorbs the freeze-thaw cycle without damaging the brick face. NPS Preservation Brief 2 specifies it for pre-1900 soft-fired brick.",
      },
      {
        question: "How do I tell if my chimney has lime or Portland mortar?",
        answer:
          "Color, texture, and hardness. Lime is warm tan or cream and crumbles to sand grains under a key. Portland is cold gray and resists scratching. Mixed joints (some lime, some Portland) indicate a partial repointing already in place that may need correction.",
      },
      {
        question: "What is Type O lime mortar?",
        answer:
          "Type O is a mortar designation under ASTM C270 with a compressive strength of approximately 350 psi. It is the high-lime mix typically used for repointing pre-1900 soft-fired brick in central New Hampshire. Softer than the brick, it sacrifices itself in freeze-thaw cycles to protect the masonry units.",
      },
      {
        question: "Why does Portland cement damage old brick?",
        answer:
          "Portland is harder and less porous than pre-1900 brick. Water that enters the wall cannot exit through the joint and instead exits through the brick face. NH freeze-thaw cycles then pop the brick face off in a process called spalling. After 5 to 10 winters, the brick is destroyed and the joints are still pristine.",
      },
      {
        question: "Is lime mortar more expensive than Portland?",
        answer:
          "Yes, by 30 to 50 percent on a comparable chimney. The labor is higher because lime requires longer cure time, more skilled pointing, and on-site mixing. The math still favors lime because a Portland repoint that destroys the chimney over 10 years costs the homeowner several times more in eventual rebuild.",
      },
      {
        question: "Can I use bagged Type N mortar on my old chimney?",
        answer:
          "No. Type N is a Portland blend at approximately 750 psi compressive strength, often harder than the original soft-fired brick. The result is the same spalling damage as Type S. Pre-1900 brick needs Type O lime mortar matched to the original sand and color.",
      },
      {
        question: "Do you analyze the original mortar before repointing?",
        answer:
          "Yes. We chip a small sample from a hidden location and analyze the sand grain distribution and color. Local sand colors are local. We mix a test batch matched to the sample and let it set before committing to the full pointing job. The match is verified before we start.",
      },
    ],
    related: ["federal-era-center-chimneys-nh", "rumford-fireplace-restoration", "chimney-crown-vs-cap-explained"],
  },
  {
    slug: "chimney-fire-warning-signs",
    title: "Chimney Fire: Warning Signs Every NH Wood-Burner Should Know",
    excerpt:
      "How to recognize a chimney fire in the first 60 seconds, what to do, and how to prevent the next one. Read this before the next time you light the wood stove.",
    publishedAt: "2026-04-19",
    readingMinutes: 9,
    category: "Safety",
    cardImage: "/images/blog/05-fire-signs-card.jpg",
    headerImage: "/images/blog/05-fire-signs-header.jpg",
    body: `A chimney fire sounds like a low-flying jet or a freight train. Other signs are dense black smoke pouring from the cap, intense heat radiating off the chase wall inside the home, a deep crackling or popping noise, and the sound of debris falling inside the flue. If you suspect one, call 911 first; once the fire is out, no more wood goes in that chimney until a Level 3 inspection clears it.

Every NH winter, the fire departments in [Bow](/service-areas/bow), [Concord](/service-areas/concord), and [Loudon](/service-areas/loudon) respond to chimney fires that started exactly the same way. Wood that was not seasoned long enough. A flue that did not get swept. A creosote glaze that ignited at 1,800 degrees and turned a regular fire into a structural emergency. Most chimney fires are survivable. The 5 percent that are not are the reason this article exists.

## The 60 seconds after you suspect a fire

What to do, in order, the moment you hear the freight train.

1. **Call 911.** Before you do anything else. Get the trucks rolling. They will get to your house faster than you can put the fire out yourself, and the data shows owners consistently underestimate how fast a chimney fire spreads.
2. **Get everyone out.** Kids, dogs, anyone in the house. Out the door. Meet at the mailbox. Do not stop to grab valuables.
3. **Close the damper if you can do it without burns.** This starves the fire of oxygen. If the damper is too hot to touch, leave it.
4. **Close the air intake on the wood stove.** Same logic. Cut the airflow.
5. **Do not pour water down the chimney.** Sudden cooling on hot masonry causes the flue tile to crack catastrophically and can blow the chimney apart. Let the fire department handle suppression.
6. **Wait for the trucks outside.** Do not go back in until the fire department clears the structure.

After the fire is out and the firefighters leave, the chimney is not safe to use. NFPA 211 requires a Level 3 inspection before the chimney goes back into service. A Level 3 may include opening parts of the masonry to access concealed sections that the camera cannot see. Until that inspection clears the system, no fires.

## What creosote actually is and the three stages

Creosote is unburned wood combustion product that condenses inside the flue. It comes in three stages.

**Stage 1.** Soft, flaky, sooty. Sweeps off easily with a brush. This is what an annual sweep removes. Burns at higher temperature than wood smoke but generally does not sustain a fire on its own.

**Stage 2.** Hard, tarry, granular. Looks like coffee grounds compressed onto the flue wall. Forms when the fire runs cool or when the wood is not fully seasoned. Harder to remove. Requires aggressive brushing and sometimes a chemical pretreatment.

**Stage 3.** Glazed. Looks like black candy or frozen tar coating the flue. Burns at over 2,000 degrees Fahrenheit and is the primary fuel source for chimney fires. Cannot be removed by brushing alone. Requires chemical treatment plus mechanical removal, and sometimes a stainless reline if the glaze has bonded to deteriorated tile.

The progression from stage 1 to stage 3 happens over multiple heating seasons of inadequate sweeping or repeated cool burns. A homeowner burning unseasoned wood with the air intake choked down to "make the fire last all night" is manufacturing stage 3 creosote on purpose.

That is also why an annual [chimney sweep](/services/chimney-cleaning) matters. Sweeping at the end of every heating season removes the stage 1 buildup before it has a chance to compress into stage 2 over a humid summer.

## Prevention is the whole game

Five rules that prevent 95 percent of chimney fires in central New Hampshire.

**Burn seasoned wood only.** Wood that was split and stacked at least 12 months ago, ideally 18 to 24 for hardwood. Moisture content under 20 percent on a wood moisture meter. Unseasoned wood does not put out enough heat to maintain a clean burn. The condensation in the flue is what becomes creosote.

**Burn hot.** A wood stove or open fire that runs at the right temperature deposits much less creosote than one that runs cool. The instinct to choke the air down to make the fire last all night is exactly what creates stage 3 creosote. If you need long burn times, get a stove rated for them; do not strangle the air on a stove that is not.

**Sweep annually.** Every heating season. NFPA 211 recommends an annual inspection at minimum. We sweep at $219 with a written Level 1 inspection. The visit pays for itself the first time it catches a buildup before it becomes a fire.

**Cap the chimney.** A working stainless or copper cap keeps rain out of the flue, which prevents the moisture-driven creosote that forms in uncapped chimneys. The cap also keeps animals from nesting in the flue, and animal nests are an underappreciated chimney-fire cause. Read the [crown vs cap article](/blog/chimney-crown-vs-cap-explained) for the cap details.

**Inspect after any event.** Storm, lightning, earthquake, or any unusual noise from the chimney triggers a Level 2. The [Level 2 inspection](/services/level-2-inspection) at $295 with a written report is the right tool.

## What a Level 3 inspection actually finds

After a chimney fire, the Level 2 video camera scan sometimes reveals all the damage. Sometimes it does not. The hottest fires can damage the flue interior in ways the camera cannot see, especially at concealed pass-throughs in the attic, between floors, or where the flue exits the masonry into framing.

A Level 3 inspection involves removing parts of the masonry, the chimney chase, or interior finish to access those concealed sections. Common findings:

- Cracked flue tile sections behind interior walls or in the attic.
- Charred or pyrolyzed framing within 2 inches of the flue.
- Mortar joint failures that opened during the fire and now leak gas.
- Crown cracks created by the thermal shock of the fire.
- Liner deformation in stainless installs that exceeded their temperature rating.

The findings drive the repair scope. Sometimes the answer is a stainless reline and a crown rebuild. Sometimes it is more substantial. The full repair cost varies enormously: $2,500 for a simple reline-and-cap on a small fire, $30,000 plus for a stack rebuild on a fire that compromised structural masonry. We work the numbers carefully because most homeowners are filing an insurance claim and the documentation has to be clean.

> "We have been customers since 2015. They are consummate professionals in every respect from the front office to the field engineers. They talk the talk and walk the walk of caring for their customers."

That is what a chimney fire response should feel like, even when the news is bad. Calm, documented, written down, and clear about what comes next.

## Why annual sweeps matter on the prevention side

The math on annual sweeps is one-sided. A $219 sweep with a written Level 1 inspection catches the stage 1 creosote before it compresses, catches the failing cap before it lets rain in, and catches the small mortar joint failure before it becomes a flue gas leak. The visit pays for itself once every 5 to 10 years on average.

The 5 percent of homeowners who skip the annual sweep and end up with a chimney fire pay 10 to 100 times the sweep cost in damages, repairs, and insurance deductible. The expected value is overwhelming. Sweep every season, especially in the [Henniker](/service-areas/henniker) and [Pembroke](/service-areas/pembroke) housing stock where the chimneys are old and the wood-burning is heavy.

## After the fire department leaves

Once the trucks pull away and you are back in a house that smells like smoke, three calls in order.

1. **Insurance.** File the claim same day. The fire department will give you an incident number that goes on the claim.
2. **Chimney specialist.** Get the [Level 2 inspection](/services/level-2-inspection) on the calendar this week. The insurance adjuster needs the report before they release the claim. Email IntegrityChimney1@gmail.com or call (603) 660-4644 the morning after.
3. **Restoration.** Smoke damage inside the home gets handled by a separate restoration trade. We can refer you to one. Do not try to clean smoke residue with regular household cleaners; it sets the staining permanently.

The path from a Friday-night chimney fire to a re-certified system that can burn again typically runs 4 to 8 weeks: 1 week for initial inspection and report, 2 to 4 weeks for repairs, 1 to 2 weeks for insurance reconciliation. We have walked that path with NH homeowners every winter.

The wood stove can run again when the system clears the inspection. Not before.

## Three things you can do this week

If you are reading this article in November and you have not had your chimney swept this season, three actions in the next seven days lower your risk dramatically.

First, check your wood. Run a moisture meter on a fresh-split face. If the reading is over 20 percent, the wood is not seasoned enough for a clean burn. Buy or borrow seasoned wood for the rest of the season and let your current stack dry for next year.

Second, inspect what you can see. From the ground, look at the cap. If it is gone, rusted through, or visibly damaged, replace it before the next storm. From inside, peek up the flue with a flashlight. If you see thick black glaze on the tile, do not light a fire until the flue is professionally cleaned.

Third, [book the sweep](/booking). Even if the schedule is two weeks out, the appointment is the action that matters. A clean flue going into the depth of winter is the single highest-leverage thing a wood-burning NH homeowner does each year.`,
    faqs: [
      {
        question: "What does a chimney fire sound like?",
        answer:
          "Like a freight train or a low-flying jet. The sound comes from rapid combustion of stage 3 glazed creosote inside the flue, which can burn at over 2,000 degrees Fahrenheit. Other signs include dense black smoke from the cap, intense heat radiating off the chase wall, and crackling or debris falling inside the flue.",
      },
      {
        question: "Should I pour water down the chimney during a fire?",
        answer:
          "No. Sudden cooling on hot masonry causes flue tile to crack catastrophically and can blow the chimney apart. Call 911, evacuate everyone, close the damper if safe to do so, and let the fire department handle suppression.",
      },
      {
        question: "Can I use my chimney after a fire?",
        answer:
          "Not until a Level 2 or Level 3 inspection clears it. NFPA 211 mandates inspection after any event that may have damaged the system. The hottest fires create damage the visual inspection cannot see, including cracked tile sections in concealed pass-throughs and charred framing within 2 inches of the flue.",
      },
      {
        question: "How does creosote cause a chimney fire?",
        answer:
          "Stage 3 glazed creosote ignites at approximately 1,000 degrees Fahrenheit and burns at over 2,000. It forms over multiple heating seasons of inadequate sweeping or cool burns from unseasoned wood. The glaze is the primary fuel source for the freight-train chimney fire that destroys flue interiors.",
      },
      {
        question: "How often should I sweep my chimney to prevent a fire?",
        answer:
          "Once every heating season at minimum. NFPA 211 recommends annual inspection. If you burn three or more cords of wood per year, plan on a sweep every fall before the first fire. Light use can sometimes go two years between sweeps if a Level 1 inspection clears the flue.",
      },
      {
        question: "Does insurance cover chimney fire repairs?",
        answer:
          "Most NH homeowner policies cover chimney fire damage as a sudden and accidental event, but coverage varies. The fire department incident number goes on the claim. The insurance adjuster typically requires a Level 2 written report before releasing the claim. We provide the report formatted for adjuster use.",
      },
      {
        question: "What's the most common cause of chimney fires in NH?",
        answer:
          "Burning unseasoned wood combined with infrequent sweeping. Wood split and stacked less than 12 months ago has too much moisture. The damp burn deposits stage 2 and stage 3 creosote, which compresses and glazes over multiple seasons until it reaches ignition temperature. Annual sweeping and seasoned wood prevent 95 percent of cases.",
      },
    ],
    related: ["chimney-sweep-cost-new-hampshire", "level-2-chimney-inspection-explained", "stainless-steel-chimney-liner-guide"],
  },
  {
    slug: "selling-home-nh-chimney-inspection",
    title: "Selling a Home in NH? Why Your Buyer Will Want a Chimney Inspection",
    excerpt:
      "The renegotiation math on a missed chimney inspection. Why a $295 pre-listing report saves NH sellers $5K to $15K at the closing table.",
    publishedAt: "2026-04-20",
    readingMinutes: 10,
    category: "Real Estate",
    cardImage: "/images/blog/06-pre-sale-card.jpg",
    headerImage: "/images/blog/06-pre-sale-header.jpg",
    body: `New Hampshire buyer's agents increasingly request a Level 2 chimney inspection during the inspection contingency. NFPA 211 requires it on any sale, and the buyer's home inspector will flag any chimney as "needs further evaluation" by default. A $295 pre-listing inspection prevents the renegotiation that costs sellers $5K to $15K when a buyer finds an unknown crown crack three days before closing.

If you are selling a home in [Bow](/service-areas/bow), [Concord](/service-areas/concord), [Hopkinton](/service-areas/hopkinton), or any of the central NH towns where the housing stock skews older than 1990, the chimney is going to come up at the inspection. The only question is whether you control the conversation or your buyer's agent does. Pre-listing inspection puts the seller in control. The full realtor-side playbook is on the [for realtors page](/for-realtors).

## The renegotiation math

Here is what a missed chimney inspection looks like in practice.

A 2,400-square-foot Cape in Bow goes under contract at $740,000. The buyer's home inspector flags the chimney for further evaluation, which is a default flag he writes on every chimney he sees because he is not a chimney specialist. The buyer's agent commissions a Level 2. The Level 2 finds a cracked crown, a missing cap, and 15 feet of repointing needed at the top of the stack.

The findings hit the seller's email three days before closing. The buyer's agent sends a renegotiation request: $12,000 credit toward the chimney work or the buyer walks. The seller has 48 hours to decide. The seller takes the credit because the closing is already scheduled, the boxes are in the truck, and the alternative is starting over with another buyer in 60 days.

Now run the same scenario with a pre-listing inspection. Six weeks before listing, the seller paid $295 for a Level 2. The same three findings showed up. The seller had time to: get three quotes for the work, choose the right contractor, complete the work for $7,500, and list the property with a "chimney recently serviced" line in the disclosure. The buyer's home inspector still flagged the chimney out of habit. The buyer's agent commissioned a follow-up Level 2 to verify. The follow-up confirmed the recent work. The closing happened on schedule with no renegotiation.

The seller saved $4,500 (the difference between the negotiated credit and the actual repair cost) plus the closing-day stress.

That math holds across most NH transactions. The pre-listing inspection costs $295. The savings on the typical missed-finding scenario run $3,000 to $15,000. The expected value is overwhelming.

## What the buyer's home inspector will flag

Buyer's home inspectors are general practitioners. Their job is to flag everything that might be a concern and recommend a specialist evaluate. They do this on chimneys by default. The standard ASHI checklist includes:

- "Chimney shows visible cracking or spalling, recommend specialist evaluation."
- "Chimney crown not visible from accessible vantage, unable to confirm condition."
- "Cap appears damaged or missing, recommend chimney specialist."
- "Flue interior not assessed, recommend Level 2 inspection per NFPA 211."

That fourth bullet shows up on virtually every NH transaction. It is not a real finding. It is a liability disclaimer. But the buyer's agent reads it as a real finding and commissions the Level 2 anyway, and now the seller is responding to whatever the Level 2 turns up under deadline pressure.

The pre-listing inspection short-circuits this. When the seller has already done the Level 2 and addressed any findings, the disclosure packet contains the report. The buyer's home inspector still writes the disclaimer, but the buyer's agent reads the disclosure and skips the redundant inspection. The deal moves forward.

## What your listing agent should be doing

A working NH listing agent in 2026 does five things on the chimney before going to market.

1. **Asks the seller about chimney use.** Is there a working fireplace, an insert, a wood stove? Has it been swept recently?
2. **Reviews the disclosure for prior chimney work.** Any liner installation, repointing, crown repair within the last 10 years gets noted.
3. **Recommends a pre-listing Level 2 inspection** if the home is over 30 years old or has any active chimney use. This is the $295 the seller pays.
4. **Reads the inspection report** and decides which findings get fixed before listing and which get disclosed in the listing remarks.
5. **Keeps the report in the listing packet** so any buyer's agent can read it before commissioning their own.

If your listing agent is not doing these five things, you are exposed. The realtor portal at [/for-realtors](/for-realtors) shows the workflow we built specifically for this. Email IntegrityChimney1@gmail.com with the closing date and we confirm a same-week slot within 4 business hours.

## The 24-hour PDF report

What we hand back after a Level 2 is a branded PDF report. The format is built for the closing file.

Cover page with the property address, inspection date, owner name, and the "Level 2 inspection per NFPA 211 §14" header. The buyer's agent and the lawyer recognize the header and know the document is real.

Findings summary on page 2. Each finding categorized urgent, recommended, monitor, or pass. Plain English. The buyer's agent can read it without a chimney glossary.

Detailed findings, one per page, with photos. Crown condition with a roof-line photo. Cap condition with a close-up. Flue camera scan with stills at 5-foot intervals. Mortar joint condition with photos of any failure points. Flashing condition. Firebox and smoke chamber. Damper. Pass-through clearances. Each station gets a photo and a paragraph.

Recommendations page with line-item quotes for any recommended work. The seller can choose to address any or all of them, or disclose them and let the buyer negotiate.

Signature page with the inspector's name, the report date, and a contact phone for follow-up questions.

The full report ships within 24 hours of the inspection. That timing is critical because most pre-listing decisions are made on a 1-week window before going to market. We hold the timing.

## Common findings on NH homes built before 1990

About two-thirds of pre-1990 NH homes surface at least one finding on the Level 2. The most common, in order:

**Failed crown.** The concrete or mortar slab at the top of the chimney has cracked or has no overhang. Water has been entering the chimney for years. Repair cost: $400 to $1,500 depending on severity. Read the [crown vs cap article](/blog/chimney-crown-vs-cap-explained) for the detail.

**Missing or undersized cap.** Either the cap is gone, or it is the wrong size for the flue and is allowing animal entry or rain. Replacement cost: $250 to $1,500 depending on configuration.

**Deteriorated mortar joints in the top six feet of the stack.** The top is the most exposed section and fails first. Repointing cost: $1,500 to $4,500 depending on chimney height. If the home is pre-1900, the [lime mortar article](/blog/lime-mortar-vs-portland-cement-historic-homes) explains why this has to be done with the right material.

**Unlined or partially-lined flue serving a wood appliance.** The original masonry flue has degraded and the appliance is venting into a flue that no longer meets code. Reline cost: $2,495 to $3,800 depending on configuration. The [stainless steel liner guide](/blog/stainless-steel-chimney-liner-guide) covers the options.

**Flashing seal failure at the roof line.** Water has been entering between the chimney and the roof. Repair cost: $400 to $1,200. This is also the most common cause of interior ceiling stains. The [ice dam article](/blog/ice-dams-chimney-flashing-nh) covers why flashing fails specifically.

These findings are routine. They are not deal-breakers when the seller addresses them in advance. They become deal-breakers when the buyer finds them three days before closing.

> "Was referred to Kevin by our realtor. He came out the same week, did the inspection, and had the report in our inbox the next morning. The buyer's agent had no further questions and we closed on schedule."

That is the standard. Same-week scheduling, 24-hour report, closing happens.

## When to start the process

Six weeks before listing is the sweet spot. That gives time for the inspection (1 week to schedule, 1 day to inspect, 1 day to report), the repair quotes (1 to 2 weeks), and the actual repair work (1 to 3 weeks depending on scope). Listing agents who work the full 6-week window report the smoothest closings.

If you are inside the 6-week window and need to move fast, [book the inspection](/booking) right now. We hold same-week slots for transactions under contract and pre-listing prep. The phone number is (603) 660-4644.

## What it costs to be unprepared

One last number worth holding in mind. The typical missed-finding renegotiation in central NH runs $5,000 to $15,000 in price credit at the closing table. The same finding addressed before listing typically costs the seller $2,000 to $7,000 in actual repair. The delta between those two numbers is the renegotiation premium the buyer captures by finding the issue under deadline.

The pre-listing inspection eliminates that delta. The seller pays repair cost, not negotiation cost. The closing happens on schedule with no contingency drama. The math is overwhelming.

## The bottom line

If you are selling a NH home with a working chimney, the buyer is going to want an inspection. NFPA 211 says they should. Their agent will tell them they need to. Your $295 pre-listing inspection puts you ahead of that conversation. The expected savings on the typical scenario run 10 to 50 times the inspection cost. The peace of mind on closing day is the second prize.`,
    faqs: [
      {
        question: "Does a NH home seller need a chimney inspection before listing?",
        answer:
          "Not legally required by state law, but practically required by the market. Buyer's home inspectors flag every chimney as needing further evaluation by default, which triggers a Level 2 commissioned by the buyer's agent. A $295 pre-listing Level 2 puts the seller in control of any findings before the buyer's agent finds them.",
      },
      {
        question: "How much does a pre-listing chimney inspection cost in NH?",
        answer:
          "$295 for a single-flue Level 2 inspection with a 24-hour written PDF report at Integrity Chimney Services. Multi-flue chimneys add $75 per additional flue. The cost is the same as a buyer-side Level 2 because the inspection is the same.",
      },
      {
        question: "How much can a chimney finding cost a seller at closing?",
        answer:
          "Renegotiation requests on chimney findings typically run $5,000 to $15,000 in central NH. The credit is usually higher than the actual repair cost because the buyer is negotiating from a deadline-pressure position. Pre-listing inspection lets the seller address findings at actual repair cost or disclose with a more accurate price expectation.",
      },
      {
        question: "When should I schedule the pre-listing inspection?",
        answer:
          "Six weeks before listing is the sweet spot. That gives time for the inspection, repair quotes, and any actual repair work before the home goes to market. If you are inside that window, schedule immediately. We hold same-week slots specifically for pre-listing transactions.",
      },
      {
        question: "Will the buyer accept my pre-listing report?",
        answer:
          "In most NH transactions yes, especially when the report is recent (within 90 days), formatted to NFPA 211 standards, and includes photos at each inspection station. Some buyer's agents still commission a follow-up Level 2 to verify, but the existence of the pre-listing report typically eliminates surprise findings.",
      },
      {
        question: "What if the inspection finds something serious?",
        answer:
          "The seller has three options: fix it before listing, disclose it and adjust the listing price accordingly, or disclose it and negotiate at offer. All three preserve seller leverage that disappears once the buyer's agent commissions their own Level 2 inside the inspection contingency window.",
      },
      {
        question: "Do you work directly with NH realtors?",
        answer:
          "Yes. The /for-realtors page documents the workflow: same-week scheduling for transactions under contract, 24-hour PDF report turnaround, $295 published price, and direct email to IntegrityChimney1@gmail.com with the closing date and address. Most listing agents in our service area schedule chimney inspections through us as part of their pre-listing checklist.",
      },
    ],
    related: ["level-2-chimney-inspection-explained", "chimney-sweep-cost-new-hampshire", "ice-dams-chimney-flashing-nh"],
  },
  {
    slug: "federal-era-center-chimneys-nh",
    title: "Federal-Era Center Chimneys: A Field Guide for New Hampshire Owners",
    excerpt:
      "What a Federal-era center chimney is, how to date yours, what fails first, and why you need a heritage mason instead of a generalist.",
    publishedAt: "2026-04-21",
    readingMinutes: 11,
    category: "Historic Restoration",
    cardImage: "/images/blog/07-federal-card.jpg",
    headerImage: "/images/blog/07-federal-header.jpg",
    body: `A Federal-era center chimney is a single masonry mass at the heart of a 1780 to 1830 home that vents three to five fireboxes simultaneously. Restoring one means matching original lime mortar, salvaging period brick, and protecting the surrounding wood frame. Most of central New Hampshire's pre-1830 housing stock has one, and Henniker, Hopkinton, Pembroke, and Bow are the densest.

If you own a Federal in central New Hampshire, the chimney is the structural and thermal heart of the house. It is not just decorative. The fireboxes were the only heat source for 150 years. The masonry mass stores heat. The flues vent multiple rooms. The chimney is the spine. Restoring it correctly is more than a repair job. It is heritage work, and the rules are different from modern chimney repair.

## How to date your center chimney

Three quick observations narrow the construction date to within 30 years.

**Brick size and texture.** Federal-era brick (1780 to 1830) measures roughly 8 by 4 by 2.25 inches with visible kiln variation. The face is irregular, with color variations from salmon-pink through deep red. Earlier Georgian brick (1700 to 1780) is smaller and more variable. Later Greek Revival brick (1830 to 1860) is more uniform.

**Mortar color and composition.** Lime mortar with local sand reads warm tan or cream. The presence of any gray Portland cement indicates later repointing. Original Federal mortar contains visible sand grains and small inclusions like wood ash or charcoal that came from the on-site lime kiln. Read the [lime mortar article](/blog/lime-mortar-vs-portland-cement-historic-homes) for the full mortar identification process.

**Joint width and profile.** Federal joints typically run 3/8 to 1/2 inch wide and were struck flush or slightly recessed. The width is wider than what most modern masons cut. Tighter joints with crisp profiles often indicate later rebuild.

**Flue count and configuration.** A true Federal center chimney vents three to five fireboxes. Look in the cellar. The chimney mass should rise as a single block from a stone or brick foundation. Multiple flues should converge into the single mass. If the chimney is split or there are exterior chimneys instead of a center mass, you may be looking at a later remodel or a different period.

**Beehive bake oven.** A side-arched brick oven on the kitchen firebox is a Federal indicator. Earlier homes had Dutch ovens; later homes had cast iron stoves and no bake oven. If you have a beehive, you have a Federal-era working kitchen.

The dating matters because the restoration approach changes by period. A 1798 Federal in [Henniker](/service-areas/henniker) gets one approach. A 1850 Greek Revival in the same town gets a different one.

## What fails first on a Federal center chimney

Three failure points show up in roughly this order on every Federal center chimney we inspect.

**Crown.** The concrete or mortar slab at the top of the chimney is the first thing to go. Many Federal chimneys never had a real crown; they had a sloped mortar wash that has long since failed. Water has been entering the masonry from the top for decades, sometimes a century. The crown is the easiest fix and the highest-leverage one. A working crown stops 80 percent of the water that destroys old chimneys. Cost: $750 to $2,500 depending on size. Read the [crown vs cap article](/blog/chimney-crown-vs-cap-explained) for the full detail.

**Mortar joints in the top six to ten feet.** The top of the stack is most exposed and fails first. Joints fail in characteristic patterns: full joint loss, partial mortar washing, and surface erosion. Repointing the top section in matched lime mortar runs $2,500 to $5,500 on a typical center chimney depending on height and access.

**Flue interior.** Federal-era flues were rarely lined in the modern sense. Many ran as raw masonry with parging. After 200 years of NH winters, the parging has often failed, mortar joints between flue tiles (where tile was added later) have failed, and the flue interior is no longer safe for active use. The fix is a stainless reline. The [stainless steel liner guide](/blog/stainless-steel-chimney-liner-guide) covers the install detail.

These three failures show up in this order because they follow the water path. Water enters at the top through the failed crown. It runs down through the masonry, accelerating mortar joint failure on the exterior and interior. The flue interior takes the moisture last and is the least visible failure.

## The lime mortar question, revisited

If you take only one thing from this article, take this: do not let anyone repoint a Federal-era chimney with Portland cement. The damage is permanent. The brick face will spall away over the next 5 to 15 winters. The chimney that survived 200 years intact will not survive the wrong repoint by 30.

We cover the full case in [the lime mortar versus Portland cement article](/blog/lime-mortar-vs-portland-cement-historic-homes). The short version: pre-1900 brick is soft, porous, and designed to flex. Lime mortar is softer than the brick and absorbs the freeze-thaw cycle. Portland is harder and forces the moisture out through the brick face, destroying the brick.

A heritage mason matches Type O lime mortar to the original sand. A generalist uses Type N from a bag because that is what is in the truck. The first chimney lasts another 80 years. The second chimney needs rebuild in 15.

## Why generalists ruin them

Three failure modes show up routinely when a generalist tackles a Federal-era center chimney.

**Wrong mortar.** The Type N or Type S Portland repoint that destroys the brick. Discussed above.

**Wrong brick on rebuild.** When part of the chimney needs rebuild, the salvageable brick has to be reused and any new brick has to match the salvage. A generalist orders modern brick from the supply house. The new brick is harder, more uniform, and reads as obviously different. The rebuild looks like a patch job that will never integrate visually.

**Wrong chimney profile.** Federal center chimneys have specific geometry. The shoulders, the corbels, the cap profile, the flue arrangement all follow period conventions. A generalist rebuilds with modern proportions and the chimney looks like it belongs on a 1985 colonial. The character of the house is degraded.

This is why the [historic restoration page](/historic-restoration) exists as a flagship service. The work is different from modern chimney repair. The price reflects the difference. A Federal restoration costs 30 to 50 percent more than a generic chimney repair on a comparable structure. The math still favors restoration because the alternative is a destroyed chimney and a damaged house.

> "I had two estimates that said tear down and rebuild and two that said repoint. The price ranges varied by 30 thousand dollars. Kevin walked the stack with me, showed me what was actually wrong, and we ended up with a lime repoint and a new crown. The chimney looks like it has been there forever, because it has."

That is the heritage work. Most Federal chimneys do not need rebuild. They need correct repointing, a working crown, and a sized stainless reline. The path costs less than rebuild, preserves the house, and lasts 80 years.

## How we approach a Federal restoration

Five steps from first call to handoff.

**Site visit and assessment.** Free, in writing. We walk the chimney with you, photograph each elevation, take mortar samples from a hidden location for analysis, and write a scoping document with options. The scoping document distinguishes structural work (must do) from cosmetic work (can do) so you can plan the budget.

**Mortar analysis and mix design.** The original mortar sample gets analyzed for sand color, grain distribution, and binder type. We mix a test batch matched to the sample, set it on a sample brick, and let it cure for two weeks. The match is verified before we start the full job.

**Salvage planning.** If any rebuild is needed, we plan brick salvage in advance. Brick from the chimney that has to come down gets cleaned and stockpiled for reuse on the rebuild. New brick, if needed, gets sourced from reclaimed yards that match Federal-era kiln character.

**Execution.** Pointing in lifts, lime mortar, hand tools only on joint preparation. Crown rebuild in matched mortar with proper overhang. Stainless reline if the flue work calls for it. Flashing reset where the chimney passes through the roof line. Each phase documented with photos for your records.

**Curing and handoff.** Lime mortar cures slowly. We cover the work and mist for 7 to 14 days. The final walk-through happens after cure. You get a photo packet documenting every phase and a written scope-versus-completed checklist.

The full process runs 4 to 8 weeks on a typical Federal center chimney depending on scope and weather. Lime work is best done between May and October when the curing temperature stays above 40 degrees Fahrenheit overnight.

## Where the Federal stock concentrates

Central NH's Federal-era housing stock is densest in a few specific towns. From the Bow base:

[Henniker](/service-areas/henniker), founded 1768, has dozens of pre-1830 center-chimney homes still in original use. The Henniker historic district preserves entire blocks of Federal architecture.

[Hopkinton](/service-areas/hopkinton), founded 1735, has the second-densest Federal concentration in central Merrimack County. The Contoocook village area has working Federal homes whose chimneys have not been correctly maintained in decades.

[Pembroke](/service-areas/pembroke), founded 1759, has Federal homes scattered along the Soucook River and the older roads. The Suncook village area in particular has a strong heritage stock.

[Bow](/service-areas/bow) has scattered Federal-era homes mixed with later periods, often in the central village area near Bow Center.

If your home falls in any of these areas and dates to before 1830, the chimney deserves heritage-grade work. [Schedule a site visit](/booking) and we walk it with you. Free, in writing, no pressure.

## The bottom line

A Federal-era center chimney is a 200-year-old structure that has survived because the original masons knew what they were doing. The materials and techniques they used are documented, repeatable, and still available. The mistakes that destroy these chimneys in 2026 are mostly avoidable. Lime mortar, matched brick, correct geometry, and patient curing. That is the entire toolkit. The chimney that gets that treatment lasts another 80 years. The one that does not is on a 15-year clock.`,
    faqs: [
      {
        question: "What defines a Federal-era center chimney?",
        answer:
          "A single masonry mass rising from a stone or brick foundation at the structural center of a 1780 to 1830 home, venting three to five fireboxes through separate flues that converge in the single mass. Often includes a beehive bake oven on the kitchen firebox. The chimney was the only heat source and stored thermal mass for the entire house.",
      },
      {
        question: "How can I tell if my chimney is Federal-era?",
        answer:
          "Brick size around 8 by 4 by 2.25 inches with visible kiln variation, lime mortar joints with warm tan color and visible sand grains, joint width 3/8 to 1/2 inch struck flush or recessed, three to five flues converging into a single center mass, and a beehive bake oven on the kitchen side. The home itself typically dates 1780 to 1830 by deed.",
      },
      {
        question: "Can I repoint a Federal chimney with regular masonry mortar?",
        answer:
          "No. Type N or Type S Portland mortar from a bag is harder than pre-1900 soft-fired brick. The mismatch causes the brick face to spall away over 5 to 15 NH winters and destroys the masonry. The correct material is Type O lime mortar matched to the original sand and color. NPS Preservation Brief 2 documents the standard.",
      },
      {
        question: "What does a Federal chimney restoration cost?",
        answer:
          "A typical Federal center chimney restoration runs $8,000 to $25,000 depending on scope. Crown rebuild, lime repointing of the top six to ten feet, stainless reline for the active flue, and flashing reset are the common line items. Full rebuild with brick salvage runs $25,000 to $60,000. We quote in writing after a free site visit.",
      },
      {
        question: "How long does a Federal restoration take?",
        answer:
          "4 to 8 weeks on a typical center chimney depending on scope and weather. Lime mortar cures slowly and the work is best done May through October when overnight temperatures stay above 40 degrees Fahrenheit. We schedule the full timeline in writing at the quote.",
      },
      {
        question: "Do you do full salvage rebuilds with original brick?",
        answer:
          "Yes. When rebuild is the right answer, we plan brick salvage in advance. Existing brick that comes down is cleaned and stockpiled for reuse. New brick, if needed, is sourced from reclaimed yards that match the Federal-era kiln character. The rebuild integrates visually with the original within one season.",
      },
      {
        question: "Where in central NH are Federal-era homes most common?",
        answer:
          "Henniker, Hopkinton, and Pembroke have the densest Federal concentrations in our service area. Bow has scattered Federal homes mixed with later periods. Concord has a smaller Federal stock concentrated in the historic district. We work all of these regularly.",
      },
    ],
    related: ["lime-mortar-vs-portland-cement-historic-homes", "rumford-fireplace-restoration", "chimney-crown-vs-cap-explained"],
  },
  {
    slug: "rumford-fireplace-restoration",
    title: "Rumford Fireplace: Why It Heats Better Than Any Modern Build",
    excerpt:
      "Why an 1796 Rumford radiates more heat than any post-1850 fireplace, how to identify a true one, and how to restore it correctly.",
    publishedAt: "2026-04-22",
    readingMinutes: 10,
    category: "Historic Restoration",
    cardImage: "/images/blog/08-rumford-card.jpg",
    headerImage: "/images/blog/08-rumford-header.jpg",
    body: `A Rumford fireplace, designed by Count Rumford (Benjamin Thompson, born in Woburn MA, 1753) in 1796, has a tall narrow firebox and a deeply angled rear wall that radiates more usable heat into the room than any post-1850 design. Restoring one in a New Hampshire colonial means rebuilding the smoke shelf and throat to period geometry. Done right, it is the most efficient open fireplace ever built.

The Rumford is a piece of applied physics. Benjamin Thompson, who held the title Count Rumford from his work in Bavaria, redesigned the fireplace based on a simple principle: a tall, narrow, shallow firebox with a heavily angled back wall reflects radiant heat into the room instead of letting it escape up the flue. The design predates thermodynamics as a formal science. He worked it out by observation and testing. It is still the most efficient open fireplace ever made.

By the 1850s, builders had abandoned the Rumford for shorter, deeper, less-efficient designs because they were easier to build and the country had moved to wood and coal stoves. Thousands of original Rumfords across New England got bricked up, modified, or rebuilt incorrectly. Most of what gets called a "Rumford" in real estate listings today is not a Rumford. The originals are still out there, hiding behind 1950s remodels in Federal-era homes across [Henniker](/service-areas/henniker) and [Hopkinton](/service-areas/hopkinton).

## How to identify a true Rumford

Four geometric tests identify an authentic Rumford. The proportions are documented in Thompson's 1796 essay and refined by later researchers, especially Vrest Orton in the 1960s and Jim Buckley in the modern revival movement.

**Firebox depth.** A Rumford firebox is shallow. Depth runs roughly one-third the firebox opening width. A 36-inch wide opening has a firebox 12 to 14 inches deep. Modern fireplaces (post-1850) run 18 to 24 inches deep on the same opening width. If your firebox is shallow, you may have a Rumford.

**Firebox height.** Rumford fireboxes are tall. The opening height runs equal to or slightly less than the opening width. A 36-inch wide opening has a 30 to 36-inch tall opening. Modern fireplaces are wider than tall. If your firebox is nearly square or taller-than-wide, you may have a Rumford.

**Back wall angle.** The Rumford's signature is the deeply angled back wall, sloped forward toward the room. Original installations have the back wall canted forward at roughly 30 to 45 degrees from vertical. The slope reflects radiant heat into the room. Modern fireplaces have a vertical or slightly canted back. The angled back wall is the Rumford's heat-reflection mechanism. If you see a heavily angled back wall, you almost certainly have a Rumford.

**Throat geometry.** The Rumford has a streamlined throat, narrow and rounded, that creates a smooth airflow up the flue. The throat is narrow (4 to 5 inches front-to-back) and positioned at the top of the firebox. Modern fireplaces have a wide, square throat that creates turbulence and heat loss. The throat is hidden but inspectable with a flashlight.

If three of the four tests pass, you have a Rumford. If two pass, you may have a partially-modified Rumford that can be restored. If only one passes, you have a modern fireplace and a Rumford restoration is a full rebuild.

## Why it works thermodynamically

The Rumford works for two reasons.

**Radiant reflection.** The angled back wall reflects radiant heat (infrared) horizontally into the room instead of vertically up the flue. A vertical back wall reflects heat upward, where it escapes through the chimney. The angle is the geometric difference between a stove and a fire pit. Rumford understood it 200 years before the math was formalized.

**Streamlined airflow.** The narrow rounded throat moves smoke up the flue without creating turbulence at the firebox opening. Turbulence at the opening pulls room air into the fire instead of letting the fire heat the room. A modern wide square throat creates turbulence and pulls room air into the chimney, which is why a modern fireplace can actually cool a room on a cold night by exhausting heated room air faster than the fire produces heat.

The combined effect is dramatic. A correctly built Rumford with seasoned hardwood produces measurable radiant heat at 8 to 10 feet from the firebox opening. The same room with a 1950s-era fireplace at the same fuel load actually loses heat. Many homeowners with non-Rumford fireplaces describe the room "getting cold when the fire is going." That is the modern fireplace pulling heated air up the flue faster than the fire produces heat.

## Common ways modern remodels destroy them

Three remodels routinely destroy original Rumfords across NH.

**The 1950s "open it up" remodel.** Owners in the 1950s wanted bigger, wider fireplaces to suit then-modern decor. Original Rumford fireboxes were widened, the back wall angle was reduced, and the throat was opened up. The remodeled fireplace looks bigger but produces almost no heat. Restoration means rebuilding back to original Rumford geometry, which is sometimes literally rebuilding inside the existing masonry.

**The 1970s wood stove insert.** Energy crisis remodels installed cast iron wood stove inserts inside Rumford fireboxes. The insert was sized for a generic 1970s firebox, not a Rumford. The original Rumford geometry got covered, sometimes filled with mortar to seat the insert, and effectively destroyed. Removing the insert and restoring the Rumford is possible but requires careful demolition.

**The 2000s glass-front remodel.** Modern remodels installed gas inserts or glass-front airtight units in original Rumford fireboxes. The insert seals the firebox geometry behind a metal box. The Rumford physics no longer apply. Restoration requires removing the gas insert, rebuilding the firebox in firebrick to original geometry, and committing to wood-burning use only.

If you have a Federal-era home and the fireplace was remodeled at some point in the last 70 years, there may be an original Rumford behind the remodel. The diagnostic is to remove the remodel layer and inspect the underlying masonry. Sometimes the Rumford is still intact behind the modifications. Sometimes it has been destroyed. The site visit on the [historic restoration page](/historic-restoration) walks the assessment.

## Restoration vs replacement

Three restoration paths depending on the condition of the original.

**Cleanup restoration.** The Rumford is intact behind a remodel that simply covered it. Removing the remodel and cleaning the original firebox restores function. Cost runs $3,500 to $8,000 depending on the remodel scope. The original Rumford does the heat-reflection work as designed.

**Geometry rebuild.** The Rumford has been modified (widened, throat opened) and the original geometry needs to be rebuilt within the existing masonry. Firebrick is rebuilt to original Rumford proportions. Throat is rebuilt to streamlined geometry. Cost runs $8,000 to $18,000 depending on the modifications. The result is a working Rumford in the original masonry shell.

**Full firebox rebuild.** The original Rumford has been completely destroyed by remodels and the entire firebox needs to be rebuilt. New firebrick, new back wall, new throat, new smoke shelf. Cost runs $15,000 to $35,000. The result is a working Rumford that did not exist five minutes ago, in a chimney that may or may not have housed an original.

A working Rumford restoration also requires the supporting infrastructure: a working flue (often a [stainless steel reline](/blog/stainless-steel-chimney-liner-guide) for safety), a working damper, a working crown, and the [center chimney mass](/blog/federal-era-center-chimneys-nh) intact around it. The fireplace does not work without the chimney.

> "The fireplace had been bricked up since the 1970s. Kevin opened it up, found the original Rumford geometry intact, and rebuilt the firebrick interior to match. First fire produced more heat in the room than our wood stove. We had no idea what we had."

That is what restoration delivers when the original survived underneath. The Rumford was always there. The remodel just covered it up.

## What it costs in NH in 2026

Pricing depends on the condition of the original and the supporting chimney work needed. Working ranges in central New Hampshire:

- Rumford-only cleanup restoration: $3,500 to $8,000
- Rumford geometry rebuild: $8,000 to $18,000
- Full Rumford firebox rebuild: $15,000 to $35,000
- Full chimney work (Rumford plus stack restoration plus reline): $25,000 to $75,000

The price reflects the heritage labor. Rumford rebuilds require firebrick laid by hand to specific geometry. The work is slow and the margin for error is tight. Generalist masons rarely take on Rumford rebuilds because the geometry is exacting and the inspection is unforgiving.

We quote Rumford work after a site visit and a mortar analysis. The site visit is free. The quote is in writing. [Schedule the visit](/booking) and we walk the fireplace with you.

## When a Rumford restoration is worth it

Three cases where the answer is clearly yes.

**The home is pre-1830 and the fireplace was original.** Restoring the original Rumford preserves the house's heritage value and unlocks a working heat source that radiates heat into the room. The combination of historic accuracy and functional heat is rare and valuable.

**The remodel layer is reversible without destroying the original masonry.** When a 1950s or 1970s remodel can be removed without damaging the surrounding chimney mass, the restoration is straightforward and the result is dramatic.

**The owner plans to use the fireplace.** A working Rumford in a primary living room delivers the most usable radiant heat of any open fireplace design. If the fireplace is going to get used, the restoration pays back in fuel efficiency over time.

If the home is not historic, the fireplace was never a Rumford, or the fireplace will not see active use, restoration economics are weaker. A sealed gas insert or a high-efficiency wood stove may serve better than a restored open fireplace. We say so honestly when we see those cases.

## The bottom line

A Rumford fireplace is a 230-year-old design that still outperforms most of what gets built today. If your central NH home has one and it is buried under a remodel, the original may still be there. The site visit answers the question. The restoration unlocks heat that has been hiding behind the remodel for 50 to 75 years. It is the most satisfying heritage work in the trade.`,
    faqs: [
      {
        question: "What is a Rumford fireplace?",
        answer:
          "A fireplace designed by Count Rumford (Benjamin Thompson) in 1796 with a tall narrow shallow firebox, a heavily angled back wall, and a streamlined throat. The geometry reflects radiant heat into the room instead of letting it escape up the flue. The design is the most efficient open fireplace ever built.",
      },
      {
        question: "How do I know if my fireplace is a Rumford?",
        answer:
          "Four geometric tests. Firebox depth roughly one-third the opening width, opening height roughly equal to opening width, back wall angled forward 30 to 45 degrees from vertical, and a narrow rounded throat. If three of four tests pass, you have a Rumford. The shallow firebox and heavily angled back wall are the clearest indicators.",
      },
      {
        question: "Why does a Rumford heat better than a modern fireplace?",
        answer:
          "The angled back wall reflects radiant heat horizontally into the room instead of vertically up the flue. The narrow streamlined throat reduces airflow turbulence so the fireplace does not pull heated room air up the chimney. Combined, the two effects produce measurable radiant heat at 8 to 10 feet from the opening on seasoned hardwood.",
      },
      {
        question: "Can I restore a Rumford that was remodeled in the 1970s?",
        answer:
          "Sometimes. If the original Rumford geometry survived behind the remodel, restoration is straightforward and runs $3,500 to $8,000. If the original was destroyed by the remodel, a full rebuild is required and runs $15,000 to $35,000. The site visit determines which case applies.",
      },
      {
        question: "What does a Rumford restoration cost?",
        answer:
          "Cleanup restoration $3,500 to $8,000 if the original survived. Geometry rebuild $8,000 to $18,000 if the firebox was modified. Full firebox rebuild $15,000 to $35,000 if the original was destroyed. Full chimney work including stack restoration and reline can run $25,000 to $75,000. We quote in writing after a free site visit.",
      },
      {
        question: "Do I need a chimney reline with a Rumford restoration?",
        answer:
          "Often yes. The original masonry flue serving the Rumford is typically 200 years old and may be unlined or partially failed. A stainless reline sized to the Rumford's flue requirement is common as part of the restoration. The full liner detail is in our stainless liner guide article.",
      },
      {
        question: "Where in central NH are Rumford fireplaces most common?",
        answer:
          "In Federal-era homes (1780 to 1830) across Henniker, Hopkinton, Pembroke, and Bow. The original housing stock that fills these towns predates the 1850s shift away from Rumfords. Many original Rumfords still exist behind later remodels and are recoverable.",
      },
    ],
    related: ["federal-era-center-chimneys-nh", "lime-mortar-vs-portland-cement-historic-homes", "chimney-crown-vs-cap-explained"],
  },
  {
    slug: "chimney-crown-vs-cap-explained",
    title: "Crown vs Cap: What Sits On Top of Your NH Chimney (And Why It Fails)",
    excerpt:
      "The crown is the slab. The cap is the hood. They do different jobs. Most homeowners confuse them. Both fail in NH winters. Here is the difference and the cost to fix each.",
    publishedAt: "2026-04-23",
    readingMinutes: 9,
    category: "Repair",
    cardImage: "/images/blog/09-crown-cap-card.jpg",
    headerImage: "/images/blog/09-crown-cap-header.jpg",
    body: `The crown is the concrete or mortar slab sealing the top of the masonry, and it sheds rainwater away from the brick. The cap is the metal hood (galvanized, copper, or stainless) over the flue opening that keeps animals, sparks, and direct rainfall out. Crown failure is the number one reason New Hampshire homeowners need brick repair, and cap failure is the number one cause of preventable water damage inside the chimney.

If you can name only one part of your chimney, name the crown. It is the most important single component for chimney longevity, and it is the one most homeowners do not know exists. Half the chimney repairs we quote across [Bow](/service-areas/bow), [Concord](/service-areas/concord), and [Hopkinton](/service-areas/hopkinton) trace back to a failed crown that let water into the masonry for years before anyone noticed.

## What the crown does

The crown is a slab of concrete, mortar, or stone that sits on top of the chimney masonry and seals the top of the brick from rainfall. The crown has three jobs.

**Shed water outward.** A working crown overhangs the chimney by 1.5 to 2 inches on all sides with a drip edge that throws water clear of the brick face. Water that lands on the crown runs off the overhang and falls clear of the chimney instead of running down the brick.

**Seal the top of the masonry.** The crown extends from the outside edge of the brick inward to the flue tile, sealing the gap. Water that would otherwise enter between the brick and the flue is blocked.

**Provide a base for the cap.** The cap installs on top of the crown around the flue opening. The crown gives the cap a stable mounting surface.

A working crown lasts 30 to 75 years depending on material, exposure, and original construction. A failed crown lets water enter the chimney mass continuously through every rainstorm and every snowmelt. Over 5 to 15 NH winters, the water that enters through a failed crown causes mortar joint failure, brick face spalling, flue tile cracking, and interior wall staining.

## How crowns fail

Three failure modes show up on essentially every NH chimney over 30 years old.

**No overhang or insufficient overhang.** Many chimneys built before 1980 had a crown that was simply a flat top course of mortar with no overhang at all. Water runs straight down the brick instead of being thrown clear. After 30 to 50 winters, the brick face is saturated and spalling. The fix is a crown rebuild with proper overhang.

**Crown cracking.** Concrete or mortar crowns crack as they age. Hairline cracks become visible cracks become open splits. Each crack is a water entry point. Small cracks can sometimes be sealed with elastomeric crown coating ($300 to $700). Large cracks require crown rebuild ($750 to $2,500).

**Crown delamination.** The crown separates from the underlying masonry as the bond fails. Water enters between the crown and the brick. From the ground, the crown still looks fine. From the roof, the gap is visible and obvious. Delamination usually requires crown rebuild because the bond cannot be re-established by patching.

The full repair detail is on the [crown repair service page](/services/crown-repair) and the published rate is on the [pricing page](/pricing).

## How to spot a failing crown from the ground

You cannot inspect the crown directly from the ground without a ladder, but you can see the symptoms of crown failure on the brick face.

**Vertical staining on the brick.** Long dark streaks running down the chimney face indicate water has been running off the top onto the brick. A working crown with proper overhang prevents this. If you see vertical streaking, the crown is failing.

**Efflorescence.** White crystalline deposits on the brick face are mineral salts left behind by water that entered the masonry and exited through the brick. The salts come from inside the brick, not from rain. Efflorescence is a strong signal of water entry and almost always traces back to a failed crown.

**Spalling brick.** Flaked or popped brick faces are the late-stage symptom. By the time spalling is visible, the crown has been failing for 5 to 15 years. The crown rebuild is needed and the brick may need replacement too.

**Interior wall staining.** Water stains on interior walls or ceilings near the chimney indicate the leak has reached the framing. By this point the chimney has been wet for years. Both the crown and the flashing need attention. The [ice dam article](/blog/ice-dams-chimney-flashing-nh) covers the flashing side of the failure.

## What the cap does

The cap is a separate component from the crown. It is a metal hood that sits over the flue opening (on top of the crown) and serves four functions.

**Block direct rainfall into the flue.** A working cap stops rain from falling into the open flue. Without a cap, the flue gets wet every storm, the masonry inside the flue stays damp, and creosote buildup accelerates.

**Block animal entry.** Birds, squirrels, raccoons, and bats nest in uncapped flues. Animal nests are an underappreciated chimney fire cause and an underappreciated reason for poor draft. A cap with a wire mesh screen blocks entry.

**Spark arrestor.** The mesh on a working cap stops embers from escaping the flue and landing on the roof. This matters during chimney fires (read the [chimney fire warning signs article](/blog/chimney-fire-warning-signs)) and during normal hot-burning operation in dry conditions.

**Improve draft in some configurations.** Properly designed caps create a slight pressure differential that helps the flue draft. The wrong cap can have the opposite effect. We size and select caps based on the flue and the appliance.

A working cap lasts 10 to 30 years depending on material. Galvanized caps fail in 10 to 15 years (rust). Stainless caps last 20 to 30 years. Copper caps last essentially the life of the chimney with some maintenance. The full cap line item is on the [rain caps service page](/services/rain-caps).

## Copper vs stainless cap selection

Two material choices for a long-lasting cap.

**Stainless steel.** The standard recommendation. Lasts 20 to 30 years. Costs $250 to $1,500 installed depending on configuration (single flue versus multi-flue, simple cap versus custom outside-mount). Looks gray and modern. Disappears visually against most roof colors.

**Copper.** The premium option. Lasts the life of the chimney. Costs $800 to $4,000 installed depending on configuration. Develops a green patina over 10 to 20 years that reads as authentic on heritage homes. The clear right answer on a Federal-era center chimney where the cap is a visible architectural element.

For a 1985 colonial, stainless is the right call. For a 1798 Federal in [Henniker](/service-areas/henniker) or [Hopkinton](/service-areas/hopkinton), copper is the right call. For everything in between, the choice depends on visibility and budget.

We do not install galvanized caps for new clients. The 10 to 15 year service life is too short and the rust marks on the brick face below the cap (when it inevitably fails) damage the masonry. Galvanized was the standard 30 years ago. It is not the standard now.

## Why DIY caulking the crown almost always fails

Homeowners sometimes try to seal a cracked crown with hardware-store caulk or roof patch. The fix lasts one season and then makes the underlying problem worse.

Three reasons DIY crown sealing fails.

**Wrong material.** Hardware store caulks are not rated for the freeze-thaw and UV exposure of a chimney crown. They harden in the first winter and crack in the second.

**Wrong scope.** A crown that is cracking is usually structurally failed, not surface-failed. Caulking the visible crack does not address the underlying loss of overhang or delamination. The water finds a new path.

**Hides the problem.** A patched crown still looks intact from the ground. The owner stops worrying about the chimney. The water continues to enter through the unaddressed failure point. By the time the symptom is bad enough to warrant attention again, the masonry has been wet for several more years.

The right fix for a failing crown is a crown rebuild in the right material with proper overhang. Cost runs $750 to $2,500 for a full rebuild on a typical NH chimney. The fix lasts 30 to 75 years. The DIY caulk lasts one winter.

> "We had water staining on the dining-room ceiling for two years. Two roofers told us it was a roof leak. Kevin came up, took photos, and showed us the crown had no overhang. He rebuilt the crown with proper overhang and the staining stopped that winter."

That is the diagnostic problem with chimneys. The crown is the most important single component and the hardest one for homeowners to inspect. It takes a ladder and a trained eye to assess. The [Level 2 inspection](/services/level-2-inspection) covers the crown as part of the standard scope.

## When you need both

Most NH chimneys over 30 years old need both crown work and cap work in the same project. Sequencing matters.

The crown gets rebuilt first. Concrete crowns need to cure for 7 to 14 days before installing a cap on top. We pour the crown, set the form for proper overhang, let it cure under cover, and return for cap installation.

The cap gets installed second, sized to the flue and selected for material based on the chimney's age and visibility. The cap is bolted or strapped to the new crown at the flue opening.

A combined crown-and-cap project on a single-flue chimney runs $1,500 to $4,500 depending on materials and chimney height. Multi-flue chimneys run higher. The work takes one to two visits.

[Book the inspection](/booking) and we assess both pieces in one visit. The phone number is (603) 660-4644 and someone picks up.

## The bottom line

The crown is the slab. The cap is the hood. They do different jobs. Both fail in NH winters. Both are fixable. The crown is the most important single component for chimney longevity, and it is the one most homeowners cannot see. Get it inspected. Replace it when it fails. The chimney lasts decades longer for the work.`,
    faqs: [
      {
        question: "What is the difference between a chimney crown and a chimney cap?",
        answer:
          "The crown is the concrete or mortar slab on top of the masonry that sheds rainwater off the chimney structure. The cap is the metal hood over the flue opening that blocks animals, sparks, and direct rainfall into the flue. They are different components with different jobs. Most chimneys need both.",
      },
      {
        question: "How much does a crown rebuild cost in NH?",
        answer:
          "$750 to $2,500 for a full crown rebuild on a typical New Hampshire chimney in 2026. Minor crack sealing with elastomeric coating runs $300 to $700 and works for hairline failures only. Larger failures require full rebuild with proper overhang.",
      },
      {
        question: "How long does a chimney crown last?",
        answer:
          "30 to 75 years depending on the original construction, material, and exposure. Crowns built without proper overhang fail faster (15 to 30 years). Crowns built with proper overhang and quality concrete or mortar last decades longer. NH freeze-thaw cycles are the primary aging factor.",
      },
      {
        question: "Should I install a copper or stainless chimney cap?",
        answer:
          "Stainless steel is the standard for most NH chimneys, lasts 20 to 30 years, and costs $250 to $1,500 installed. Copper is the premium choice, lasts the life of the chimney, and costs $800 to $4,000 installed. Copper is the right call on heritage homes where the cap is architecturally visible. Stainless is the right call elsewhere.",
      },
      {
        question: "Can I seal a cracked crown myself?",
        answer:
          "DIY crown sealing with hardware-store caulk or roof patch fails within one winter and hides the underlying failure. Cracks in a crown almost always indicate structural failure (loss of overhang or delamination) that surface caulk cannot address. The fix is a proper crown rebuild.",
      },
      {
        question: "How do I know if my crown is failing?",
        answer:
          "Vertical dark staining on the brick face, white efflorescence on the masonry, spalling brick, or interior wall staining near the chimney all indicate water entering through a failed crown. The crown itself can only be assessed from the roof. A Level 2 inspection covers it as part of the standard scope.",
      },
      {
        question: "Do I need to replace the crown and cap at the same time?",
        answer:
          "Often yes. Most NH chimneys over 30 years old need both. Sequencing matters: the crown gets rebuilt first and cured for 7 to 14 days, then the cap is installed on top. A combined project runs $1,500 to $4,500 on a single-flue chimney.",
      },
    ],
    related: ["stainless-steel-chimney-liner-guide", "ice-dams-chimney-flashing-nh", "chimney-sweep-cost-new-hampshire"],
  },
  {
    slug: "ice-dams-chimney-flashing-nh",
    title: "Ice Dams and Your NH Chimney: The Connection Most Roofers Miss",
    excerpt:
      "Why ice dams leak around your chimney specifically, why two contractors blame each other, and why the Exterior Envelope inspection ends the finger-pointing.",
    publishedAt: "2026-04-24",
    readingMinutes: 10,
    category: "Repair",
    cardImage: "/images/blog/10-ice-dams-card.jpg",
    headerImage: "/images/blog/10-ice-dams-header.jpg",
    body: `Ice dams form on New Hampshire roofs because uneven attic temperatures melt snow that re-freezes at the cold eaves. Where the dam pushes water uphill against your chimney flashing, water leaks behind the brick into the wall cavity. By the time the stain appears on the dining-room ceiling, the leak has been running for weeks. This is exactly why a single Exterior Envelope inspection (chimney plus roof plus flashing in one visit) beats two separate contractors who each blame the other.

Every NH winter we get the same call. The ceiling near the chimney has a brown stain. It started small and grew. The homeowner called a roofer. The roofer said it was the chimney. The homeowner called a chimney company. The chimney company said it was the roof. Both contractors gave a free estimate that solved their part of the problem and shrugged about the rest. The leak continued. That is the finger-pointing problem the [Exterior Envelope](/exterior-envelope) service was built to end.

## The physics of ice dam formation

Ice dams happen for a specific reason. Your attic is warmer than the outside air. The warmth comes from heated rooms below leaking through the attic floor, supplemented by sunlight on the roof. The warm attic warms the underside of the roof deck. Snow on the roof above the warm portion melts. The meltwater runs down the roof toward the eaves.

The eaves overhang the unheated wall and are at outside air temperature, well below freezing. The meltwater hits the cold eave and re-freezes. The frozen water builds up over multiple cycles into an ice dam. Each subsequent thaw-freeze cycle adds to the dam.

Eventually the dam grows tall enough to back up meltwater behind it. The water sits on the roof surface, ponded behind the dam. Roof shingles are designed to shed water flowing downhill. They are not designed to seal against standing water flowing uphill. The water finds the smallest gap in the roof surface and enters the assembly.

## Why the chimney is the worst place for it

The chimney is the worst place on the entire roof for this kind of water entry, for three reasons.

**Flashing is the most penetrated detail on the roof.** Where the chimney passes through the roof plane, the roofer installed step flashing (under the shingles, against the chimney) and counter-flashing (cut into the chimney mortar joints, lapping over the step flashing). Step flashing has hundreds of small overlap joints. Each joint is a potential leak path under standing water.

**The chimney is uphill from many roof areas.** Center chimneys (the [Federal-era kind in central NH](/blog/federal-era-center-chimneys-nh)) sit at or near the ridge. Snow melt from the entire upper roof drains past the chimney on its way to the eave. When the eave dams up, the standing water level rises until the chimney flashing is submerged.

**The chimney mass interrupts roof airflow.** Cold air that would normally flow up the underside of the roof deck and exit through the ridge vent gets blocked by the chimney mass. The roof deck near the chimney runs warmer than other parts of the roof, accelerating the local snowmelt and feeding more water to the dam. The chimney makes its own ice dam worse.

This is why the ceiling stain almost always appears near the chimney. The water entered through the chimney flashing because the chimney is where the dam concentrated the standing water.

## Where chimney flashing fails specifically

Five failure modes on chimney flashing, in roughly the order they show up.

**Counter-flashing pulled out of the mortar joint.** The counter-flashing was originally cut into the chimney mortar joint and bedded with sealant. After 20 to 30 NH winters, the sealant has dried, the joint has shifted, and the counter-flashing has separated from the brick. Water now runs behind the counter-flashing instead of over it. This is the most common failure on chimneys 20+ years old.

**Step flashing rusted through.** Galvanized step flashing rusts after 20 to 30 years. The rust starts at the lap edges and works inward. By the time the rust is visible from below, the flashing has holes. Aluminum step flashing lasts longer but corrodes in salt-air conditions. Stainless or copper step flashing essentially does not fail.

**Caulk-only flashing.** Sometimes the original installer skipped the proper step-and-counter-flashing detail and just caulked around the chimney. The caulk lasts 5 to 10 years. After that, water enters wherever the caulk has failed. This is the worst-case failure mode and usually requires full flashing replacement.

**Cricket missing on uphill side of large chimney.** Wide chimneys (over about 30 inches wide measured across the roof slope) need a small saddle-shaped roof structure on the uphill side to shed water around the chimney. Without a cricket, snow and water accumulate against the uphill chimney face and overwhelm the flashing. Many older NH homes have wide center chimneys with no cricket.

**Mortar joint failure where counter-flashing is cut in.** The counter-flashing only works if the surrounding mortar is sound. If the mortar joints around the counter-flashing are deteriorated, water bypasses the flashing entirely by entering the masonry directly. The fix combines mortar repointing (in [the right material](/blog/lime-mortar-vs-portland-cement-historic-homes) for the chimney age) with flashing reset.

## The two-contractors finger-pointing problem

Now you have water on the dining-room ceiling. Here is what happens with separate contractors.

You call a roofer. The roofer comes out, walks the roof, and looks at the chimney flashing. The flashing looks "ok" from the outside (counter-flashing visible, step flashing not obviously failed). The roofer concludes the leak is not from the roof. Estimate: "your chimney needs work, call a chimney guy." Cost to you: nothing, but you got nothing.

You call a chimney company. The chimney company sends a sweep who looks at the chimney from the top, scans the flue, and looks at the firebox. The flue camera shows nothing wrong. The chimney sweep concludes the leak is not from the chimney. Estimate: "your roof must be leaking, call a roofer." Cost to you: $295 for the inspection that did not solve the problem.

Round and round. Each contractor solves their part and shrugs about the rest. Neither contractor is wrong about their scope, exactly. They just are not looking at the integration point, which is the chimney flashing where the two trades meet. The leak is in the seam.

The Exterior Envelope inspection at $99 (waived against any subsequent work over $2,000) is built specifically for this. One visit covers the chimney, the roof, the flashing, and the ice dam vulnerability. One contractor diagnoses the whole system. One quote covers all the work. One warranty covers the result. Read the [Exterior Envelope page](/exterior-envelope) for the full scope.

> "I had a tree fall in my house recently and ended up needing a roofer for an estimate for the repairs. I called a hand full of contractors to get estimates. Most of the contractors did not call back."

That is the baseline experience in NH for cross-trade work. Most contractors do not call back. The ones who do solve their part and shrug about the rest. The Envelope inspection is the alternative.

## What the Envelope inspection covers

The single visit covers four things, in order.

**Chimney inspection.** Top to bottom. Crown, cap, mortar joints, flue camera scan if appropriate. Same scope as a [Level 2 inspection](/services/level-2-inspection) on the chimney side.

**Roof inspection.** Walking inspection of the full roof surface where safe to access, ladder visual where not. Shingle condition, deck integrity from below in the attic where accessible, ventilation assessment.

**Flashing inspection.** The integration point. Step flashing, counter-flashing, cricket presence and condition, sealant condition, any visible water staining on framing in the attic.

**Ice dam vulnerability assessment.** Attic insulation level, ventilation pattern, roof slope, eave condition, any history of ice damming. Recommendations for prevention beyond the immediate repair.

The deliverable is a single written report covering all four areas, with photos at each station and recommendations prioritized by urgency. One contractor signs the report. One scope. One quote. One warranty when the work is complete.

## What to do when you see a stain

Three steps in order, the first time you see a brown stain near the chimney.

**Photograph it immediately and date the photo.** The stain will grow. Documentation matters for both diagnosis and any insurance claim.

**Check the attic.** If you have attic access, look for active drips, wet insulation, or staining on the framing near the chimney pass-through. Active drips during a thaw indicate a current leak. Dry but stained framing indicates a past leak that may or may not still be active.

**Schedule the [Envelope inspection](/booking).** The single visit gives you the diagnosis. We do not chase the stain to a roof claim or a chimney claim until we know which it is, or whether it is both. The phone number is (603) 660-4644 and someone picks up.

If the stain is small and recent and you cannot get the inspection scheduled quickly, do not put off heating system use. Chimney flashing leaks rarely create immediate fire or carbon monoxide hazards. The leak can usually wait the 1 to 2 weeks for inspection without the chimney becoming dangerous. We can fast-track for active drips.

## What the repair scope usually looks like

Three common scope shapes after the Envelope inspection.

**Flashing-only repair.** The chimney is sound, the roof is sound, the flashing is the failure point. Step flashing replacement, counter-flashing reset into mortar joints, sealant refresh. Cost: $600 to $1,800 depending on chimney size. Fastest fix.

**Flashing plus mortar repair.** The flashing is failing because the mortar joints holding the counter-flashing are deteriorated. Both have to be addressed together. Cost: $1,500 to $3,500 depending on scope. Most common scenario on chimneys 30+ years old.

**Full envelope repair.** Flashing, mortar, crown, cap, and roof work all integrated into a single project. Cost: $4,500 to $15,000 depending on scope. The right answer when multiple components have failed and the homeowner wants one warranty covering everything.

The published rates for the chimney-side line items are on the [pricing page](/pricing). The roofing scope gets quoted separately within the same project. The Envelope inspection result gives you a single integrated number.

## The bottom line

Ice dams are a roof phenomenon. The damage is a flashing phenomenon. The leak is a chimney phenomenon. All three meet at the same point on your roof, and that is why the conventional approach (roofer plus chimney sweep, separately) keeps failing. The Envelope inspection sees the whole system. One contractor, one quote, one warranty. That is how you stop the stain from coming back next winter.`,
    faqs: [
      {
        question: "Why does my ceiling stain show up near the chimney?",
        answer:
          "Because the chimney flashing is the most penetrated detail on the roof and the chimney mass concentrates ice dams. Snow melt from the upper roof drains past the chimney on the way to the eave. When the eave dams up, standing water rises against the chimney flashing and finds the path of least resistance into the wall.",
      },
      {
        question: "Is the leak coming from the roof or the chimney?",
        answer:
          "Almost always from the integration point between the two: the chimney flashing. Step flashing and counter-flashing where the chimney passes through the roof plane is the most common failure point. Separate roofer and chimney inspections each tend to declare their part fine because the failure is in the seam.",
      },
      {
        question: "How much does the Exterior Envelope inspection cost?",
        answer:
          "$99 for the integrated inspection covering chimney, roof, flashing, and ice dam vulnerability. The fee is waived against any subsequent work over $2,000. The deliverable is a single written report with photos at each station and prioritized recommendations.",
      },
      {
        question: "Why don't roofers find the chimney leak?",
        answer:
          "Most roofers walk the roof and look at the flashing from outside. Counter-flashing that has separated from the mortar joint at the top edge looks fine from below. The leak path is under the flashing, behind the brick, and into the wall cavity. It only shows up on a chimney-side inspection from the roof and an attic check from inside.",
      },
      {
        question: "Can I prevent ice dams without rebuilding the roof?",
        answer:
          "Yes, in most cases. Improving attic insulation, sealing air leaks from heated rooms into the attic, and improving roof ventilation address the root cause (uneven attic temperature). Heat cables along the eaves can manage the symptom but not the cause. The Envelope inspection assesses the attic and ventilation as part of the scope.",
      },
      {
        question: "How long does ice dam damage take to show up?",
        answer:
          "The leak runs for weeks before the stain appears on the ceiling. Wet insulation in the attic absorbs the water until it saturates, then the water reaches the ceiling drywall. By the time the homeowner sees the stain, framing in the attic has been wet for an extended period and may need replacement, not just drying.",
      },
      {
        question: "Do you do both the chimney work and the roof work?",
        answer:
          "Yes. We work chimney, masonry, and roofing as integrated trades. The Exterior Envelope service was built specifically to cover the seam where the trades meet. One contractor, one quote, one warranty when the work is complete. That is the alternative to the two-contractors finger-pointing pattern.",
      },
    ],
    related: ["chimney-crown-vs-cap-explained", "selling-home-nh-chimney-inspection", "level-2-chimney-inspection-explained"],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return [];
  return post.related
    .map((s) => getPostBySlug(s))
    .filter((p): p is BlogPost => Boolean(p))
    .slice(0, limit);
}

export const blogCategories: Array<{ id: string; label: string }> = [
  { id: "all", label: "All Articles" },
  { id: "Maintenance", label: "Maintenance" },
  { id: "Inspection", label: "Inspection" },
  { id: "Historic Restoration", label: "Historic Restoration" },
  { id: "Repair", label: "Repair" },
  { id: "Real Estate", label: "Real Estate" },
  { id: "Safety", label: "Safety" },
];
