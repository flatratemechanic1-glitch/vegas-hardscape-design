"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

// The Canvas/WebGL tree can't render on the server, and the .glb + Three.js
// bundle is heavy — load it client-side only, after the rest of the page.
const PoolViewer = dynamic(
  () => import("@/components/three-d/pool-viewer").then((mod) => mod.PoolViewer),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-secondary/30">
        <Image
          src="/portfolio/featured-01-concept-render.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
        />
        <p className="relative text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
          Loading 3D Model…
        </p>
      </div>
    ),
  }
);

export function PoolViewerLoader() {
  return <PoolViewer />;
}
