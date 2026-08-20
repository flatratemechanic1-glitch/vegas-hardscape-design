"use client";

import dynamic from "next/dynamic";

// The Canvas/WebGL tree can't render on the server, and the .glb + Three.js
// bundle is heavy — load it client-side only, after the rest of the page.
const PoolViewer = dynamic(
  () => import("@/components/three-d/pool-viewer").then((mod) => mod.PoolViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-border bg-secondary/30">
        <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
          Loading 3D Model…
        </p>
      </div>
    ),
  }
);

export function PoolViewerLoader() {
  return <PoolViewer />;
}
