export type BidReviewVertical = {
  slug: string;
  // Display name for the project type, e.g. "Paver Patios & Walkways".
  name: string;
  // Short kicker shown above the H1.
  kicker: string;
  // 2-3 sentences of unique, trade-specific context — keeps each vertical
  // page from reading as a template clone with only the noun swapped out.
  intro: string;
  // 3-4 red flags specific to this trade, shown as a standalone section.
  // Genuine, checkable content — not filler — since a page that's only a
  // reskinned headline over shared boilerplate is exactly the thin-content
  // pattern that hurts SEO rather than helping it.
  redFlags: string[];
};

export const BID_REVIEW_VERTICALS: BidReviewVertical[] = [
  {
    slug: "paver-patios",
    name: "Paver Patios & Walkways",
    kicker: "Paver Bid Review",
    intro:
      "Paver bids vary wildly on base prep and material grade, and both are easy to gloss over in a one-line quote. A $14/sq ft install and a $22/sq ft install can look identical on paper until you ask what's under the pavers.",
    redFlags: [
      "Base depth and material aren't specified — a thin or unstabilized base is the #1 cause of pavers sinking or shifting within a year or two",
      "Polymeric sand vs. regular jointing sand isn't called out, even though it changes both price and how well joints hold up to weeds and washout",
      "No mention of edge restraint (paver edging), which is what actually keeps a patio from creeping outward over time",
      "Material grade (thickness, finish) isn't specified — bids for the same square footage can vary by thousands depending on which paver line is assumed",
    ],
  },
  {
    slug: "pool-decks",
    name: "Pool Decks & Pool Remodels",
    kicker: "Pool Deck Bid Review",
    intro:
      "Pool deck and remodel bids carry extra risk because demo, drainage, and coping work are easy to underscope — and once the old deck is torn out, change orders are expensive to negotiate from a position of no leverage.",
    redFlags: [
      "Demo and haul-off of the old decking isn't broken out as its own line — it's often lumped into \"prep\" with no real detail",
      "Drainage (deck slope, drain locations) isn't addressed at all, which is how pool decks end up with standing water or water intrusion later",
      "Coping replacement scope is vague about material match to the existing pool shell",
      "No allowance breakdown for anything hidden until demo — cracked plumbing, sub-base issues — which is normal to have as a contingency, but should be a stated number, not a surprise later",
    ],
  },
  {
    slug: "retaining-walls",
    name: "Retaining Walls",
    kicker: "Retaining Wall Bid Review",
    intro:
      "Retaining walls are one of the few hardscape items where a low bid can actually be dangerous, not just cheap — engineering and drainage requirements scale with wall height, and skipping either is the most common way a wall fails.",
    redFlags: [
      "No mention of engineering review or stamped plans for walls above the height where your jurisdiction requires one (commonly 3-4 ft, but this varies)",
      "Drainage behind the wall (gravel backfill, drain pipe, weep holes) isn't specified — this is what actually relieves hydrostatic pressure and prevents bowing or collapse",
      "Per-foot pricing doesn't distinguish wall height — a $150/ft rate means something very different at 2 ft than at 6 ft",
      "No mention of permit handling, when the wall height or location likely requires one",
    ],
  },
  {
    slug: "concrete-driveways",
    name: "Concrete Driveways & Slabs",
    kicker: "Concrete Bid Review",
    intro:
      "Concrete bids look simple — cost per square foot — but slab thickness, rebar or wire mesh reinforcement, and control-joint spacing all move the price and the odds of cracking, and none of them show up in a one-line quote.",
    redFlags: [
      "Slab thickness isn't specified — a 4\" driveway slab and a 5-6\" slab (needed if it'll see heavier vehicles) shouldn't be priced the same",
      "Reinforcement (rebar grid vs. wire mesh vs. none) isn't called out, which materially affects long-term cracking",
      "Control joint spacing and sub-base prep (compaction, base material) aren't mentioned — both are what actually prevent random cracking, not just the concrete mix",
      "No cure-time or weather-contingency language, which matters most for bids scheduled in extreme heat",
    ],
  },
  {
    slug: "artificial-turf",
    name: "Artificial Turf Installation",
    kicker: "Turf Bid Review",
    intro:
      "Turf bids are quoted per square foot, but base depth, infill type, and seaming method drive most of the price difference between a turf install that looks good for a decade and one that starts rippling within a year or two.",
    redFlags: [
      "Base material and compaction depth aren't specified — inadequate base is the top cause of turf that ripples, drains poorly, or shifts",
      "Infill type (silica sand, zeolite, antimicrobial) isn't named, which matters a lot if the area is for pets",
      "Seam locations and method (glued seaming tape vs. stitched) aren't addressed for larger areas that require more than one roll",
      "No mention of perimeter nailing/edge securing, which is what keeps turf edges from lifting over time",
    ],
  },
  {
    slug: "outdoor-living",
    name: "Outdoor Living & Pergolas",
    kicker: "Outdoor Living Bid Review",
    intro:
      "Pergolas, covered patios, and outdoor kitchens combine structural, electrical, and sometimes gas work in one bid — which makes it easy for a contractor to lump trades together into an allowance instead of pricing each scope clearly.",
    redFlags: [
      "Footing depth and post attachment method aren't specified for a freestanding structure — this is a structural, not cosmetic, detail",
      "Electrical and/or gas rough-in for an outdoor kitchen is bundled into a single allowance instead of itemized by fixture/appliance",
      "No mention of permit and inspection handling for a permanent structure, when the size or attachment to the house likely requires one",
      "Roofing/shade material (louvered, lattice, solid) isn't specified, even though it's one of the biggest cost drivers on a covered structure",
    ],
  },
];
