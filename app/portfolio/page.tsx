import type { Metadata } from "next";
import { GalleryGrid, type GalleryItem } from "@/components/portfolio/gallery-grid";
import { FEATURED_TESTIMONIAL } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A concept-to-completion case study alongside concept renderings showcasing the design style and approach of Vegas Hardscape Design.",
};

// A real, completed client project — concept renderings through construction
// to the finished backyard. Location kept generic at the client's request.
const FEATURED_PROJECT_ITEMS: GalleryItem[] = [
  { label: "Before", caption: "Original Backyard", aspect: "aspect-[3/2]", image: "/portfolio/featured-00-before.jpg" },
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

          <div className="mx-auto mt-16 grid max-w-5xl gap-10 border-t border-border pt-16 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase">
                The Challenge
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                An open backyard of grass and a covered patio — no pool, no
                defined entertaining space, and no clear path from a wish
                list to a buildable plan.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase">
                The Approach
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Photorealistic renderings and a fully dimensioned design —
                pool geometry, a 24-foot raised water-feature bench, and deck
                layout — approved before contractors bid. Precise material
                take-offs meant accurate quantities and costs going into
                every bid, little wasted material, and a clear baseline to
                check contractor pricing against. As owner&apos;s rep, we
                tracked the pool shell, decking, and gazebo build against
                that plan.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase">
                The Result
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A finished pool with tiled decking and inlay border, the
                raised water-feature bench, turf lawn, and a covered gazebo —
                built to match the renderings approved months before ground
                was broken.
              </p>
            </div>
          </div>

          <blockquote className="mx-auto mt-16 max-w-2xl text-center">
            <p className="font-heading text-xl leading-relaxed text-foreground sm:text-2xl">
              &ldquo;{FEATURED_TESTIMONIAL.quote}&rdquo;
            </p>
            <footer className="mt-6 text-xs font-medium tracking-[0.15em] text-accent uppercase">
              {FEATURED_TESTIMONIAL.author} — {FEATURED_TESTIMONIAL.detail}
            </footer>
          </blockquote>
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
