import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A concept-to-completion case study alongside concept renderings showcasing the design style and approach of Vegas Hardscape Design.",
};

type GalleryItem = {
  label: string;
  caption: string;
  aspect: string;
  image: string;
};

// A real, completed client project — concept renderings through construction
// to the finished backyard. Location kept generic at the client's request.
const FEATURED_PROJECT_ITEMS: GalleryItem[] = [
  { label: "Concept Rendering", caption: "Full Backyard Vision", aspect: "aspect-[3/2]", image: "/portfolio/featured-01-concept-render.jpg" },
  { label: "Concept Rendering", caption: "Layout & Dimensions", aspect: "aspect-video", image: "/portfolio/featured-02-concept-layout.jpg" },
  { label: "Design Development", caption: "Dimensioned Model", aspect: "aspect-video", image: "/portfolio/featured-03-design-development.jpg" },
  { label: "Concept Rendering", caption: "Water Feature Bench Detail", aspect: "aspect-[3/2]", image: "/portfolio/featured-04-concept-detail.jpg" },
  { label: "Under Construction", caption: "Pool Shell & Decking Layout", aspect: "aspect-[3/4]", image: "/portfolio/featured-05-under-construction.jpg" },
  { label: "Under Construction", caption: "Decking Installation", aspect: "aspect-[3/4]", image: "/portfolio/featured-06-under-construction.jpg" },
  { label: "Under Construction", caption: "Turf & Gazebo Area", aspect: "aspect-[3/4]", image: "/portfolio/featured-07-under-construction.jpg" },
  { label: "Completed Project", caption: "Finished Backyard", aspect: "aspect-[4/3]", image: "/portfolio/featured-08-completed.jpg" },
];

// Concept renderings — no client project attached yet, shown as design
// style and approach samples.
const GALLERY_ITEMS: GalleryItem[] = [
  { label: "Concept Rendering", caption: "Resort-Style Pool & Spa Layout — Summerlin", aspect: "aspect-[4/5]", image: "/portfolio/01-resort-pool-spa-summerlin.jpg" },
  { label: "Concept Rendering", caption: "Outdoor Kitchen & Pergola Concept — The Lakes", aspect: "aspect-square", image: "/portfolio/02-outdoor-kitchen-pergola-lakes.jpeg" },
  { label: "Concept Rendering", caption: "Negative-Edge Pool — Peccole Ranch", aspect: "aspect-[3/4]", image: "/portfolio/03-negative-edge-pool-peccole-ranch.jpg" },
  { label: "Concept Rendering", caption: "Fire Feature & Lounge Terrace — Summerlin", aspect: "aspect-square", image: "/portfolio/04-fire-feature-lounge-summerlin.jpg" },
  { label: "Concept Rendering", caption: "Desert-Modern Hardscape Courtyard", aspect: "aspect-[4/5]", image: "/portfolio/05-desert-modern-courtyard.jpg" },
  { label: "Concept Rendering", caption: "Backyard Master Plan — Night Lighting Study", aspect: "aspect-[3/4]", image: "/portfolio/06-backyard-masterplan-night-lighting.jpg" },
  { label: "Concept Rendering", caption: "Owner's Rep Oversight — Final Walkthrough", aspect: "aspect-square", image: "/portfolio/07-owners-rep-final-walkthrough.jpg" },
  { label: "Concept Rendering", caption: "Putting Green & Water Feature Layout", aspect: "aspect-[4/5]", image: "/portfolio/08-putting-green-water-feature.jpg" },
  { label: "Concept Rendering", caption: "Custom Pool Deck & Cabana — The Lakes", aspect: "aspect-[3/4]", image: "/portfolio/09-pool-deck-cabana-lakes.jpg" },
];

function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {items.map((item) => (
        <figure
          key={item.image}
          className="mb-6 break-inside-avoid overflow-hidden rounded-sm border border-border bg-secondary/40"
        >
          <div className={`relative ${item.aspect}`}>
            <Image
              src={item.image}
              alt={item.caption}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute top-3 left-3 rounded-full bg-foreground/70 px-2.5 py-1 text-[10px] font-medium tracking-[0.15em] text-background uppercase backdrop-blur-sm">
              {item.label}
            </span>
          </div>
          <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Portfolio
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            Renderings &amp; Realized Projects
          </h1>
          <p className="mt-6 text-sm text-muted-foreground sm:text-base">
            A concept-to-completion case study from a recent client project,
            alongside concept renderings showcasing our design style and
            approach.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              Featured Project
            </p>
            <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
              Concept to Completion
            </h2>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              From first rendering through construction to the finished
              backyard — built by the client&apos;s own licensed contractors
              under our design oversight.
            </p>
          </div>

          <div className="mt-16">
            <GalleryGrid items={FEATURED_PROJECT_ITEMS} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            More Work
          </p>
          <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
            Concept Renderings
          </h2>
        </div>

        <div className="mt-16">
          <GalleryGrid items={GALLERY_ITEMS} />
        </div>
      </section>
    </>
  );
}
