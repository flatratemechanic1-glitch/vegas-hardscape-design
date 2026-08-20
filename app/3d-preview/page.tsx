import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PoolViewerLoader } from "@/components/three-d/pool-viewer-loader";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Interactive 3D Pool & Backyard Preview",
  description:
    "Explore a real 3D pool and backyard design from Vegas Hardscape Design, right in your browser — drag to rotate, scroll to zoom, and see the layout from any angle.",
  alternates: {
    canonical: "/3d-preview",
  },
};

export default function ThreeDPreviewPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            3D Preview
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            Explore a Design in 3D
          </h1>
          <p className="mt-6 text-sm text-muted-foreground sm:text-base">
            A real pool and backyard design, straight out of our SketchUp
            workflow — drag to rotate, scroll or pinch to zoom, and look
            around from any angle, right here in your browser.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <PoolViewerLoader />
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Drag to rotate &middot; Scroll or pinch to zoom
        </p>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center lg:px-10">
          <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
            Want a model like this of your own backyard?
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Every design we build starts as a fully modeled, photorealistic
            3D walkthrough — so you approve the vision before construction
            ever begins.
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "h-11 px-8 text-sm tracking-wide")}
          >
            Book a 3D Design Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
