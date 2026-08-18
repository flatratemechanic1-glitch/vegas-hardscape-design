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
