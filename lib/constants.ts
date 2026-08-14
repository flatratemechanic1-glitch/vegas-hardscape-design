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

// Every named community we service, shown in full on the footer and Contact page.
export const SERVICE_AREAS = [
  "Summerlin",
  "Summerlin North",
  "Peccole Ranch",
  "The Lakes",
  "Queensridge",
  "Centennial Hills",
  "Desert Shores",
  "Sun City Summerlin",
  "Lone Mountain Village",
  "North Las Vegas",
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
