import type { Faq } from "@/lib/faqs";

// One factual, neighborhood-specific FAQ per service area, grounded in the
// same public community characteristics used for SERVICE_AREAS[].blurb
// (lib/constants.ts) — phrased as general/typical patterns for that kind of
// community rather than asserted specifics of any one HOA, since we haven't
// verified individual association rules. Appended to the shared FAQS on
// that area's /service-areas page so pages aren't 100% identical content.
// Areas not yet listed here simply fall back to the shared FAQS alone.
export const AREA_FAQS: Record<string, Faq[]> = {
  summerlin: [
    {
      question: "Which Summerlin HOA governs my pool or hardscape project?",
      answer:
        "Summerlin is split into three master associations — Summerlin West, Summerlin North, and Summerlin South — each with its own published Design Review Guidelines and Design Review Committee. Regardless of which village you're in, pool, patio, and hardscape work generally needs to be submitted as an Improvement Request with dimensioned drawings before construction begins. We prepare every design in that submittal-ready format from the start.",
    },
  ],
  "summerlin-north": [
    {
      question: "What does Summerlin North's HOA require for a new pool?",
      answer:
        "Per Summerlin North's published Design Guidelines, a pool's water's edge must stay at least three (3) feet from all property lines, construction must meet City and County building codes, and equipment must be screened from view. The Association's CC&Rs allow up to 30 business days to respond to an Improvement Request submittal, though actual review is often faster. We design to these standards and prepare submittal-ready plans so approval isn't the bottleneck.",
    },
  ],
  "summerlin-south": [
    {
      question: "What does Summerlin South's HOA require for a new pool?",
      answer:
        "Per Summerlin South's published Design Guidelines, a pool's water's edge must stay at least three (3) feet from all property lines, and pool construction access isn't permitted through Association common walls. Typical Improvement Request submittals take about 10-15 business days to process. We design to these standards and prepare submittal-ready plans so approval isn't the bottleneck.",
    },
  ],
  "peccole-ranch": [
    {
      question:
        "Our home is in a gated executive enclave within Peccole Ranch — can you design around an older lot?",
      answer:
        "Many Peccole Ranch homes were built from the late 1980s through the early 2000s, so lot shapes, drainage, and existing hardscape often don't match newer construction. We start every design from your site's actual grade and existing conditions rather than a generic template.",
    },
  ],
  "the-lakes": [
    {
      question:
        "Our backyard backs onto Lake Sahara — do you design around the dock and waterfront?",
      answer:
        "For homes backing onto Lake Sahara, we account for dock access, waterfront setbacks, and lake-facing sightlines in the layout, so your pool, patio, and hardscape work with the water view rather than against it.",
    },
  ],
  queensridge: [
    {
      question:
        "Does Queensridge's guard-gated HOA require plan approval before construction?",
      answer:
        "Guard-gated luxury communities like Queensridge commonly require architectural review committee approval before pool or hardscape construction begins. We prepare dimensioned plans and renderings in a submittal-ready format so that review doesn't become a bottleneck.",
    },
  ],
  "centennial-hills": [
    {
      question:
        "Our home in Centennial Hills has a standard builder-grade backyard — what's the starting point?",
      answer:
        "Most Centennial Hills homes are newer construction with a builder-grade slab, block wall, and minimal landscaping as the starting point. We design from that baseline, working around existing drainage and hardscape rather than assuming a blank slate.",
    },
  ],
  "desert-shores": [
    {
      question: "We're on one of Desert Shores' lakes — how does that affect the design?",
      answer:
        "Homes on Desert Shores' lakes (Jacqueline, Sarah, Maddison, and Lindsey) often have private boat docks and waterfront HOA guidelines that affect where hardscape and pool work can begin. We factor dock access and setback requirements into the layout from the start.",
    },
  ],
  "sun-city-summerlin": [
    {
      question: "Sun City Summerlin is age-restricted — does that change what you design?",
      answer:
        "As an age-55+ community, Sun City Summerlin's HOA design guidelines often address accessibility and low-maintenance landscaping alongside standard architectural review. We can build those considerations — wider pathways, low-maintenance plant selections — into the design from day one.",
    },
  ],
  "lone-mountain-village": [
    {
      question:
        "We have a larger lot with RV parking in Lone Mountain Village — does that open up more design options?",
      answer:
        "Lone Mountain Village's larger lots and more spacious layouts than central Las Vegas neighborhoods often leave room for a full pool and a larger hardscape footprint — or dedicated space like a sport court or extended patio — that tighter lots can't accommodate.",
    },
  ],
  "north-las-vegas": [
    {
      question:
        "We're in a newer North Las Vegas community like Aliante or Valley Vista — what's the design process?",
      answer:
        "Newer master-planned pockets of North Las Vegas, like Aliante and Valley Vista, typically start from a builder-grade backyard with minimal existing landscaping. We design a complete plan — hardscape, pool, and planting — from that starting point, submittal-ready for your contractor and HOA.",
    },
  ],
};
