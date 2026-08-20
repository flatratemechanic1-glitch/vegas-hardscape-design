"use client";

import { Suspense, useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Loader, OrbitControls, Stage, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/pool-showcase.glb";
const PAVER_TEXTURE_URL = "/models/paver-tile.png";

const EDGE_MATERIAL = new THREE.LineBasicMaterial({
  color: "#2a2a2a",
  transparent: true,
  opacity: 0.35,
});

// The source model's deck/walkway materials are just plain speckled-stone
// swatches with no grout lines baked in, and the deck geometry itself is a
// handful of large flat quads rather than individual paver tiles — so
// there's no grid to recover from the export as-is. Swap in a generated
// large-format paver texture (repeating so it reads as individual tiles)
// to match the tiled look of the SketchUp reference.
const DECK_MATERIAL_NAMES = new Set([
  "Screen_Shot_2022_06_21_at_5_41_43_PM",
  "Screen_Shot_2022_06_21_at_5_38_38_PM",
  "Ty_Gray1",
  "Ty_Gray2",
  "M_76768980_cb14_4354_a991_ff8a514b30c7",
  "M_8617884d_1771_4d2f_8a5c_0538b207e292",
]);

function PoolModel() {
  const { scene } = useGLTF(MODEL_URL);
  const paverTexture = useTexture(PAVER_TEXTURE_URL);
  const { gl } = useThree();

  useLayoutEffect(() => {
    paverTexture.wrapS = THREE.RepeatWrapping;
    paverTexture.wrapT = THREE.RepeatWrapping;
    paverTexture.repeat.set(4, 4);
    paverTexture.colorSpace = THREE.SRGBColorSpace;
    paverTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
    paverTexture.needsUpdate = true;
  }, [paverTexture, gl]);

  // SketchUp's default style always draws crisp black edge lines between
  // faces (tile grout lines, panel seams, silhouette outlines) — that's
  // most of what reads as "sharp" in the SketchUp screenshot. Three.js
  // does plain smooth shading with none of that, so without this the whole
  // model looks soft/melted-together by comparison. Add it back as a
  // thin-line overlay per mesh.
  useLayoutEffect(() => {
    const added: THREE.LineSegments[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const material = Array.isArray(child.material) ? child.material[0] : child.material;

        if (material && DECK_MATERIAL_NAMES.has(material.name) && "map" in material) {
          (material as THREE.MeshStandardMaterial).map = paverTexture;
          material.needsUpdate = true;
        }

        // The junipers use a leaf-card texture ("Branch") built from many
        // small overlapping quads — edge lines there just turn into a
        // scribbly mess rather than a clean outline, so skip foliage.
        if (material?.name === "Branch") return;

        const edges = new THREE.EdgesGeometry(child.geometry, 20);
        const lines = new THREE.LineSegments(edges, EDGE_MATERIAL);
        child.add(lines);
        added.push(lines);
      }
    });
    return () => {
      for (const lines of added) {
        lines.geometry.dispose();
        lines.removeFromParent();
      }
    };
  }, [scene, paverTexture]);

  return <primitive object={scene} />;
}

useGLTF.preload(MODEL_URL);
useTexture.preload(PAVER_TEXTURE_URL);

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
          <Stage environment="apartment" intensity={0.9} shadows="contact" adjustCamera={false}>
            <PoolModel />
          </Stage>
        </Suspense>
        <directionalLight position={[300, 400, 200]} intensity={1.1} />
        <ambientLight intensity={0.4} />
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
