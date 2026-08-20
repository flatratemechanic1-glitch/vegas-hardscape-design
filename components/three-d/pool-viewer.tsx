"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls, Stage, useGLTF } from "@react-three/drei";

const MODEL_URL = "/models/pool-showcase.glb";

function PoolModel() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} />;
}

useGLTF.preload(MODEL_URL);

// This particular export is a full ~50x85ft property (pool/patio at the
// house end, a long juniper hedge and planters running the depth of the
// lot). Stage's own auto-fit frames the *whole* property, which leaves the
// pool itself tiny in frame — so instead we let Stage handle centering,
// lighting, and shadows (adjustCamera off), and manually aim the camera at
// the near, pool/patio end of the recentered model as a "hero" framing.
// Users can still scroll/zoom out via OrbitControls to see the full yard.
const CAMERA_TARGET: [number, number, number] = [-100, -10, 260];
const CAMERA_POSITION: [number, number, number] = [140, 230, 660];

export function PoolViewer() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-secondary/30">
      <Canvas camera={{ position: CAMERA_POSITION, fov: 45, near: 1, far: 5000 }} shadows dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} shadows="contact" adjustCamera={false}>
            <PoolModel />
          </Stage>
        </Suspense>
        <OrbitControls
          makeDefault
          target={CAMERA_TARGET}
          enablePan
          minDistance={80}
          maxDistance={1600}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
      <Loader />
    </div>
  );
}
