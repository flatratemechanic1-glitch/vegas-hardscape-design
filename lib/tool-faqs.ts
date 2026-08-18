import type { Faq } from "@/lib/faqs";

export const PAVER_CALCULATOR_FAQS: Faq[] = [
  {
    question: "How many pavers do I need per square foot?",
    answer:
      "It depends entirely on paver size. A 12x12 in. paver covers 1 sq ft, so you'd need roughly one paver per square foot before waste. Smaller units like 6x9 in. cover about 0.375 sq ft, so you'd need close to three per square foot. Always add a waste factor for cuts around edges and curves.",
  },
  {
    question: "How much waste factor should I use for a paver patio?",
    answer:
      "10% is a safe default for a simple rectangular layout. Patios with curves, diagonal or herringbone patterns, steps, or lots of edge cutting should use 15% or more to avoid running short mid-project.",
  },
  {
    question: "How much paver base do I need?",
    answer:
      "Most Las Vegas Valley soils call for 4-6 in. of compacted road base (Class II base) under a paver patio, more under driveways or in areas with expansive clay. Deeper base and proper compaction matter more here than in milder climates because of our soil movement and heat.",
  },
  {
    question: "How much bedding sand goes under pavers?",
    answer:
      "A 1 in. layer of coarse bedding sand is standard between the compacted base and the pavers. It should never be used to level an out-of-grade base — grade the base itself, then screed a consistent 1 in. sand layer on top.",
  },
  {
    question: "Is this calculator accurate enough to buy materials from?",
    answer:
      "It's a solid planning estimate for budgeting and comparing contractor bids, not a final material order. Site conditions, drainage requirements, and pattern complexity all affect real quantities — our design process includes precise material take-offs for your actual site before anyone breaks ground.",
  },
];

export const TURF_CALCULATOR_FAQS: Faq[] = [
  {
    question: "How much extra turf should I order for waste?",
    answer:
      "10% is a reasonable default for a simple rectangular yard. Add more — 15-20% — for irregular shapes, lots of curves, or areas that need the grain direction to run consistently across multiple rolls, since offcuts usually can't be reused elsewhere.",
  },
  {
    question: "Why does roll width matter for turf?",
    answer:
      "Synthetic turf ships in fixed-width rolls (commonly 12 or 15 ft) and is sold by the linear foot off that roll. Any dimension wider than the roll requires a seam, which affects both how much turf you order and how much seaming tape and glue you'll need.",
  },
  {
    question: "How much infill does artificial turf need?",
    answer:
      "Most residential turf needs roughly 1-2 lb of silica sand infill per sq ft, depending on pile height and product spec. Infill weighs the blades down, protects the backing from UV, and helps the turf stand up rather than matting down over time.",
  },
  {
    question: "Does converting grass to turf actually save water in Las Vegas?",
    answer:
      "Yes — removing thirsty grass is one of the most effective ways to cut outdoor water use in our desert climate, which is why Southern Nevada Water Authority's Water Smart Landscapes Rebate program exists to offset qualifying conversions. Check SNWA's current program details for eligibility and rebate rates before you start.",
  },
  {
    question: "Is this calculator accurate enough to order turf from?",
    answer:
      "It's a solid planning estimate for budgeting, not a final material order — actual roll layout, seam placement, and infill depend on your yard's exact shape and the specific turf product. Our design process maps the actual layout and material take-off before anyone orders product.",
  },
];

export const RETAINING_WALL_CALCULATOR_FAQS: Faq[] = [
  {
    question: "How many retaining wall blocks do I need?",
    answer:
      "Divide the total wall face area (length x height) by the face area of one block, then add a waste factor for cuts at corners and ends. A common small block measuring 12x4 in. covers 1/3 sq ft per unit, so a 20 ft long, 3 ft tall wall (60 sq ft) needs roughly 180 blocks before waste.",
  },
  {
    question: "How thick should the base be under a retaining wall?",
    answer:
      "A minimum of 6 in. of compacted crushed base is standard under the first course, more for taller walls or soft/expansive soil. Getting this base level and well-compacted matters more than almost anything else — an uneven base is the top cause of retaining walls leaning or settling over time.",
  },
  {
    question: "Why does a retaining wall need drainage gravel behind it?",
    answer:
      "Backfilling with clean, free-draining crushed stone (rather than native soil) lets water pass through instead of building up hydrostatic pressure behind the wall. Without it, saturated soil is one of the most common causes of retaining wall failure, especially after heavy rain.",
  },
  {
    question: "Do I need a permit or engineer for a retaining wall in Las Vegas?",
    answer:
      "Many Southern Nevada jurisdictions require an engineered design and permit once a wall exceeds roughly 4 ft in height (measured from the bottom of the footing) or holds back a slope with a surcharge load — but rules vary by city and county. Always confirm current requirements with your local building department before starting a tall wall.",
  },
  {
    question: "Is this calculator accurate enough to order blocks from?",
    answer:
      "It's a solid planning estimate for budgeting, not a final material order — actual block count, base depth, and drainage needs depend on your soil, wall height, and site grading. Our design process includes an engineered take-off for anything beyond a short garden wall.",
  },
];

export const CONCRETE_CALCULATOR_FAQS: Faq[] = [
  {
    question: "How much concrete do I need for a slab?",
    answer:
      "Multiply length x width x thickness (converted to feet) to get cubic feet, then divide by 27 to get cubic yards — that's the number ready-mix suppliers quote by. Always add a waste factor; concrete that runs short mid-pour is a real problem since a slab should be poured continuously.",
  },
  {
    question: "Should I use bagged concrete or order ready-mix?",
    answer:
      "Bagged mix is fine for small pours like footings or post holes — under about 1 cubic yard. Beyond that, ready-mix delivered by truck is far more practical and gives more consistent strength than mixing dozens of bags by hand.",
  },
  {
    question: "How thick should a concrete patio or driveway be?",
    answer:
      "4 in. is standard for patios, walkways, and other foot-traffic-only slabs. Driveways and anywhere vehicles will drive or park need 5-6 in., often with reinforcement, especially on our region's expansive and caliche-heavy soils.",
  },
  {
    question: "Do I need rebar or wire mesh in a concrete slab?",
    answer:
      "Generally yes in the Las Vegas Valley — reinforcement helps control cracking from our soil movement and large day-to-night temperature swings. A common rule of thumb is a rebar grid on roughly 24 in. centers in both directions for residential slabs.",
  },
  {
    question: "Is this calculator accurate enough to order concrete from?",
    answer:
      "It's a solid planning estimate for budgeting, not a final order — actual yardage should always be confirmed with your ready-mix supplier, who will also account for slab thickness variation and site access. Our design process includes precise take-offs for any concrete work tied to a project we design.",
  },
];

export const POOL_VOLUME_CALCULATOR_FAQS: Faq[] = [
  {
    question: "How do I calculate my pool's volume in gallons?",
    answer:
      "Multiply length x width x average depth (in feet), then multiply by 7.48 — the number of gallons in a cubic foot of water. For round or oval pools, the calculation uses the actual circle or ellipse area instead of a simple rectangle.",
  },
  {
    question: "What if my pool is a kidney or freeform shape?",
    answer:
      "There's no exact formula for an irregular shape, so this calculator applies a rough approximation based on the pool's bounding length and width. For an exact number, check your builder's original plans or have your pool professional measure it directly.",
  },
  {
    question: "How does average depth work for a sloped pool?",
    answer:
      "Average depth is simply (shallow end depth + deep end depth) / 2, which works well for a pool with one even, consistent slope. Pools with a distinct hopper or deep-end drop-off will run slightly higher in actual volume than this estimate.",
  },
  {
    question: "Why does knowing my pool's volume matter?",
    answer:
      "Gallon count is the baseline for nearly everything else in pool ownership — chemical dosing, heater sizing, and estimating fill time or water cost. Once you have your volume here, you can carry it straight into our Pool Chlorine Calculator.",
  },
  {
    question: "Is this calculator accurate enough for chemical dosing?",
    answer:
      "It's a solid planning estimate, not an exact number. For precise chemical dosing, it's worth confirming your volume against your builder's plans or a professional measurement, since even a 10% difference in gallons changes dosing amounts meaningfully.",
  },
];

export const POOL_CHLORINE_CALCULATOR_FAQS: Faq[] = [
  {
    question: "How much chlorine do I need to raise my pool's chlorine level?",
    answer:
      "The amount depends on your pool's volume and how many parts per million (ppm) you need to raise free chlorine by. This calculator estimates the fl oz of 12.5% liquid chlorine needed — a common retail strength — to close that gap.",
  },
  {
    question: "What's the difference between liquid chlorine, cal-hypo, and dichlor shock?",
    answer:
      "They're different concentrations and forms of the same active ingredient, so they require different amounts to raise chlorine by the same ppm — liquid chlorine (10-12.5%) needs the most by volume, while granular cal-hypo or dichlor shock (55-73%) needs far less by weight. Always follow your specific product's label, since this calculator assumes liquid chlorine.",
  },
  {
    question: "How often should I test and add chlorine?",
    answer:
      "Most residential pools should be tested at least 2-3 times per week in swim season, more often in our summer heat since chlorine burns off faster in high heat and direct sun. Keeping free chlorine in the 1-3 ppm range (or per your stabilizer level) is the general target for most chlorine pools.",
  },
  {
    question: "Is it safe to swim right after adding chlorine?",
    answer:
      "Wait until free chlorine drops back into a normal swimming range — generally under about 5 ppm — before getting in, which is especially important after a shock treatment. Always follow your product label's specific re-entry guidance.",
  },
  {
    question: "Is this calculator accurate enough to dose my pool from directly?",
    answer:
      "Treat it as a starting-point estimate, not a precise dose — actual chlorine demand depends on your product's exact concentration, stabilizer (CYA) level, temperature, and sunlight exposure. Add chemicals gradually, retest before swimming, and always follow your product's label instructions.",
  },
];

export const GRAVEL_CALCULATOR_FAQS: Faq[] = [
  {
    question: "How much gravel do I need for my project?",
    answer:
      "Multiply length x width x depth (converted to feet) to get cubic feet, divide by 27 for cubic yards, then multiply by your material's density to get tons. Most gravel and crushed stone runs about 1.3-1.5 tons per cubic yard depending on the specific material.",
  },
  {
    question: "How deep should a gravel path or ground cover layer be?",
    answer:
      "2-3 in. is typical for a decorative ground cover layer over landscape fabric. Paths and drainage areas often go 3-4 in., and areas under a structural base (like a paver base course) are a separate, deeper calculation — see our Paver Patio Calculator for that.",
  },
  {
    question: "Should I order gravel by the ton or by the bag?",
    answer:
      "Bags make sense for small areas — under about half a ton. Anything larger is far more cost-effective delivered in bulk by the ton or cubic yard from a landscape supply yard rather than bought bag by bag.",
  },
  {
    question: "Why is decorative rock more common than mulch in Las Vegas?",
    answer:
      "Rock doesn't break down, blow away, or need replacing the way organic mulch does, and it doesn't hold moisture against a home's foundation the way mulch can — all practical advantages in our heat and low-rainfall climate. Mulch still has a place around trees and shrubs where moisture retention actually helps.",
  },
  {
    question: "Is this calculator accurate enough to order gravel from?",
    answer:
      "It's a solid planning estimate for budgeting, not a final material order — actual yardage should be confirmed with your supplier, especially for irregular areas or unusual depths. Our design process includes precise material take-offs for any project we design.",
  },
];

export const MULCH_CALCULATOR_FAQS: Faq[] = [
  {
    question: "How much mulch do I need for my beds?",
    answer:
      "Multiply length x width x depth (converted to feet) to get cubic feet, then divide by 27 for cubic yards — or divide cubic feet by 2 to estimate standard 2 cu ft retail bags, the most common bag size sold at garden centers.",
  },
  {
    question: "How deep should a mulch layer be?",
    answer:
      "2-3 in. is the standard depth for most planting beds — enough to suppress weeds and retain moisture without smothering roots. Avoid piling mulch directly against tree trunks or plant stems regardless of depth.",
  },
  {
    question: "Is it cheaper to buy mulch in bags or bulk?",
    answer:
      "Bags are convenient for small beds, but bulk delivery by the cubic yard is almost always cheaper per unit for anything beyond a few beds — as a rough rule of thumb, once you need more than about 10-15 bags, bulk is usually worth pricing out.",
  },
  {
    question: "Does mulch make sense in a Las Vegas landscape?",
    answer:
      "Yes, in the right spots — mulch helps retain moisture and moderate soil temperature around trees, shrubs, and planting beds, which matters in our heat even in an otherwise rock-and-turf-heavy desert landscape. It's just less commonly used as a large-area ground cover here than decorative rock.",
  },
  {
    question: "Is this calculator accurate enough to order mulch from?",
    answer:
      "It's a solid planning estimate for budgeting, not a final material order — actual coverage varies by bed shape and how settled or loose the mulch is. Our design process includes precise material take-offs for any project we design.",
  },
];

export const FIRE_PIT_CALCULATOR_FAQS: Faq[] = [
  {
    question: "How many blocks do I need for a fire pit?",
    answer:
      "Divide the circumference of your fire pit ring (roughly pi x interior diameter) by the width of one block to get blocks per course, then multiply by how many courses tall you're building. A 4 ft diameter pit with 12 in. blocks needs about 13 blocks per course.",
  },
  {
    question: "How tall should a fire pit wall be?",
    answer:
      "12-14 in. is a common finished height — tall enough to contain the fire safely, low enough to still work as informal seating or a place to rest a drink. That usually works out to 2-3 courses of standard 4-6 in. wall block.",
  },
  {
    question: "What size fire pit is comfortable to sit around?",
    answer:
      "36-44 in. interior diameter is the typical comfortable range for a seating area built around it — small enough to radiate heat to everyone seated, large enough that seating isn't uncomfortably close to the flame.",
  },
  {
    question: "Do I need a liner or base inside a fire pit?",
    answer:
      "A steel fire ring liner is strongly recommended to protect the block wall from direct heat damage and cracking over time. A gravel or sand base under the liner also helps with drainage and heat protection for the ground beneath.",
  },
  {
    question: "Does Las Vegas have rules about fire pits?",
    answer:
      "Wood-burning fire features are restricted in parts of the Las Vegas Valley for air quality reasons, and many HOAs require gas rather than wood-burning fire pits. Always confirm your HOA's rules and any county or city burn restrictions before building a wood-burning fire pit.",
  },
  {
    question: "Is this calculator accurate enough to order blocks from?",
    answer:
      "It's a solid planning estimate for budgeting, not a final material order — actual block count depends on the specific curved or straight block product you choose, since some are designed specifically for circular construction. Our design process includes an exact take-off for any fire feature tied to a project we design.",
  },
];
