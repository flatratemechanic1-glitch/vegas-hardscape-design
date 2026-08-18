import type { GalleryItem } from "@/components/portfolio/gallery-grid";

// Concept renderings — no client project attached yet, shown as design
// style and approach samples. Shared between /portfolio and the
// /service-areas/{slug} pages, which filter by `area` to show real photos
// for the neighborhoods that have them.
export const GALLERY_ITEMS: GalleryItem[] = [
  { label: "Concept Rendering", caption: "Resort-Style Pool & Spa Layout — Summerlin", aspect: "aspect-[4/5]", image: "/portfolio/01-resort-pool-spa-summerlin.jpg", area: "summerlin" },
  { label: "Concept Rendering", caption: "Outdoor Kitchen & Pergola Concept — The Lakes", aspect: "aspect-square", image: "/portfolio/02-outdoor-kitchen-pergola-lakes.jpeg", area: "the-lakes" },
  { label: "Concept Rendering", caption: "Negative-Edge Pool — Peccole Ranch", aspect: "aspect-[3/4]", image: "/portfolio/03-negative-edge-pool-peccole-ranch.jpg", area: "peccole-ranch" },
  { label: "Concept Rendering", caption: "Fire Feature & Lounge Terrace — Summerlin", aspect: "aspect-square", image: "/portfolio/04-fire-feature-lounge-summerlin.jpg", area: "summerlin" },
  { label: "Concept Rendering", caption: "Desert-Modern Hardscape Courtyard", aspect: "aspect-[4/5]", image: "/portfolio/05-desert-modern-courtyard.jpg" },
  { label: "Concept Rendering", caption: "Backyard Master Plan — Night Lighting Study", aspect: "aspect-[3/4]", image: "/portfolio/06-backyard-masterplan-night-lighting.jpg" },
  { label: "Concept Rendering", caption: "Owner's Rep Oversight — Final Walkthrough", aspect: "aspect-square", image: "/portfolio/07-owners-rep-final-walkthrough.jpg" },
  { label: "Concept Rendering", caption: "Putting Green & Water Feature Layout", aspect: "aspect-[4/5]", image: "/portfolio/08-putting-green-water-feature.jpg" },
  { label: "Concept Rendering", caption: "Custom Pool Deck & Cabana — The Lakes", aspect: "aspect-[3/4]", image: "/portfolio/09-pool-deck-cabana-lakes.jpg", area: "the-lakes" },
];
