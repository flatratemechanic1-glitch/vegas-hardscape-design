export const SITE_NAME = "Vegas Hardscape Design";

export const SITE_TAGLINE =
  "Photorealistic 3D Renderings & Unbiased Owner's Rep Consulting";

export const SITE_DESCRIPTION =
  "Vegas Hardscape Design provides custom hardscape and pool layout design, photorealistic 3D renderings, and owner's representative project consulting for luxury homes across Summerlin, Queensridge, Centennial Hills, and the greater Las Vegas valley.";

export const CONTACT_EMAIL = "reggie@vegashardscapedesign.com";

// Basic shape check only, not RFC 5322 exhaustive — just enough to catch
// malformed input before it becomes an undeliverable replyTo address.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Hidden honeypot field shared by both contact forms. Real visitors never see
// or fill this input (it's visually hidden off-screen, not display:none, since
// some bots skip display:none fields); any submission with a value here is
// almost certainly a bot and gets silently dropped server-side.
export const HONEYPOT_FIELD_NAME = "website";

export const CONTACT_PHONE_DISPLAY = "725-352-3305";
export const CONTACT_PHONE_TEL = "+17253523305";

export const GOOGLE_BUSINESS_PROFILE_URL = "https://maps.app.goo.gl/xrchjzeXwf1zKQjw7";

// Short marquee shown in the hero and nav — the full list lives in SERVICE_AREAS below.
export const SERVICE_AREA_HIGHLIGHTS = ["Summerlin", "The Lakes", "Queensridge"];

export type ServiceArea = {
  name: string;
  slug: string;
  // 1-2 sentences of real, verifiable community character — the factual
  // opener for that area's /service-areas page, so pages differ by more than
  // a swapped name. Sourced from public real-estate/community guides
  // (homes.com, nevadarealestategroup.com, neighborhoodscout.com, 55places.com,
  // summerlin.com, city-data.com, neighborhoodsinlasvegas.com) — general public
  // facts, not business-specific claims.
  blurb: string;
};

// Every named community we service, shown in full on the footer, Contact
// page, and as individual /service-areas/{slug} landing pages.
export const SERVICE_AREAS: ServiceArea[] = [
  {
    name: "Summerlin",
    slug: "summerlin",
    blurb:
      "A 22,500-acre master-planned community along the western rim of the valley, about 20 minutes from the Strip, built around Red Rock Canyon views, 150+ miles of trails, and more than 30 individual villages.",
  },
  {
    name: "Summerlin North",
    slug: "summerlin-north",
    blurb:
      "Home to some of Summerlin's most established villages, including guard-gated enclaves like Willow Creek and age-restricted communities like Regency at Summerlin, with mature landscaping and decades-old HOA governance.",
  },
  {
    name: "Summerlin South",
    slug: "summerlin-south",
    blurb:
      "Anchored by Downtown Summerlin, Red Rock Resort, and the Las Vegas Ballpark, with 10 distinct villages — from The Ridges' custom estates to family-friendly neighborhoods — connected by 200+ miles of trails.",
  },
  {
    name: "Peccole Ranch",
    slug: "peccole-ranch",
    blurb:
      "A mature, walkable community of roughly 3,000 homes built from the late 1980s through the early 2000s, known for 46 acres of tree-lined greenbelt trails, tennis courts, and a mix of townhomes, single-family homes, and gated executive enclaves.",
  },
  {
    name: "The Lakes",
    slug: "the-lakes",
    blurb:
      "One of Las Vegas's first master-planned communities, built in the 1980s around 30-acre Lake Sahara, where many homes back directly onto the water with private docks.",
  },
  {
    name: "Queensridge",
    slug: "queensridge",
    blurb:
      "A guard-gated, 987-home luxury estate community inside the Peccole Ranch master plan, known for Mediterranean- and Tuscan-influenced architecture and a central location about 15 minutes from the Strip.",
  },
  {
    name: "Centennial Hills",
    slug: "centennial-hills",
    blurb:
      "Sits in the far northwest valley against the Sheep and Spring Mountain foothills — a largely built-out, family-oriented community of newer homes, big regional parks, and mountain views.",
  },
  {
    name: "Desert Shores",
    slug: "desert-shores",
    blurb:
      "A lake community of roughly 3,350 homes built around four man-made lakes — Jacqueline, Sarah, Maddison, and Lindsey — with private boat docks, a swim lagoon, and resident-controlled HOA districts.",
  },
  {
    name: "Sun City Summerlin",
    slug: "sun-city-summerlin",
    blurb:
      "Southern Nevada's original Del Webb active-adult community — an age-55+ neighborhood of more than 7,700 homes set against the Spring Mountains with three golf courses and resort-style amenities.",
  },
  {
    name: "Lone Mountain Village",
    slug: "lone-mountain-village",
    blurb:
      "Sits in the northwest valley near its namesake rock formation and Red Rock Canyon — known for larger lots, RV parking, and a quieter, more spacious suburban feel than more central neighborhoods.",
  },
  {
    name: "North Las Vegas",
    slug: "north-las-vegas",
    blurb:
      "Its own incorporated city — Nevada's fourth largest — with a fast-growing, family-oriented character distinct from the Strip, including newer master-planned pockets like Aliante and Valley Vista in the north valley.",
  },
];

// Not rendered as visible copy — used only for LocalBusiness structured data so
// search engines associate the business with each zip code without cluttering the UI.
export const SERVICE_ZIP_CODES = [
  "89108",
  "89128",
  "89129",
  "89130",
  "89131",
  "89134",
  "89135",
  "89143",
  "89144",
  "89149",
  "89166",
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
};

export type TrustSignal = {
  title: string;
  description: string;
};

// Shown on the homepage, and reused (text-only, no photos) on
// /service-areas pages for neighborhoods without tagged portfolio images —
// real content instead of a repeated/generic photo gallery.
export const TRUST_SIGNALS: TrustSignal[] = [
  {
    title: "Design-Only, By Design",
    description:
      "We plan, render, and consult — your licensed, insured contractors handle every stage of physical construction.",
  },
  {
    title: "Independent Advocate",
    description:
      "We are never paid by the contractors we oversee, and our precise material take-offs give you an accurate cost baseline — so you know when a bid is fair, not inflated.",
  },
  {
    title: "See It Before You Build It",
    description:
      "Photorealistic renderings let you approve materials, lighting, and layout on-screen — before ground is broken.",
  },
];

// Contact form photo uploads — kept in one place so the client-side compression
// targets and the server-side defense-in-depth checks can't drift out of sync.
// Vercel serverless Functions enforce a hard ~4.5MB request body limit no matter
// what Next.js-level config says, so these numbers leave real headroom under that.
export const MAX_CONTACT_PHOTOS = 4;
export const MAX_PHOTO_DIMENSION = 1600;
export const PHOTO_JPEG_QUALITY_STEPS = [0.75, 0.6, 0.45] as const;
export const MAX_PHOTO_BYTES_CLIENT = 1.2 * 1024 * 1024;
export const MAX_TOTAL_PHOTO_BYTES_CLIENT = 3 * 1024 * 1024;
export const MAX_PHOTO_BYTES_SERVER = 2 * 1024 * 1024;
export const MAX_TOTAL_PHOTO_BYTES_SERVER = 4 * 1024 * 1024;
export const ALLOWED_PHOTO_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const SERVICES: Service[] = [
  {
    slug: "hardscape-pool-design",
    title: "Custom Hardscape & Pool Layout Design",
    summary:
      "Precision-drafted layouts for pools, patios, and outdoor living spaces, tailored to your lot, view corridors, and how you actually live outdoors.",
    description:
      "We translate your site's grade, orientation, and HOA constraints into a fully dimensioned design — hardscape materials, pool and spa geometry, shade structures, and landscape zones — before a single bid goes out. Every plan includes precise material quantities and costs, so you can hand it directly to your licensed contractors for accurate, apples-to-apples pricing and know when a bid is out of line.",
  },
  {
    slug: "3d-renderings",
    title: "3D Backyard Renderings",
    summary:
      "Photorealistic SketchUp renderings that let you walk through your backyard, test material and lighting choices, and approve the vision before construction begins.",
    description:
      "Using SketchUp and photoreal rendering, we produce day and night walkthroughs of your proposed outdoor space — accurate materials, planting, water features, and lighting — so decisions are made on-screen, not after the concrete is poured.",
  },
  {
    slug: "owners-rep-consulting",
    title: "Owner's Rep & Project Management",
    summary:
      "Independent oversight of your licensed, insured contractors — protecting your design intent, timeline, and budget from groundbreaking to final walkthrough.",
    description:
      "As your owner's representative, we review bids, translate design intent for your contractors, track progress against the plan, and flag deviations before they become costly change orders. We do not perform construction — we protect it, on your behalf, as an independent advocate.",
  },
];
