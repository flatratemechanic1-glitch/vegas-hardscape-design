import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Concept renderings showcasing the design style and approach of Vegas Hardscape Design.",
};

type GalleryItem = {
  label: string;
  caption: string;
  aspect: string;
  image: string;
};

// All concept renderings — Vegas Hardscape Design is a new practice with no
// completed client projects to photograph yet, so nothing here is labeled
// as a real/built project.
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
            A selection of concept renderings showcasing our design style and
            approach. As client projects are completed by their own licensed
            contractors, real project photography will be added here.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {GALLERY_ITEMS.map((item) => (
            <figure
              key={item.caption}
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
      </section>
    </>
  );
}
