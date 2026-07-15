"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, InstancedMesh, MeshBasicMaterial, Object3D } from "three";
import type { SectionId } from "@/lib/heat-pump-contract";
import { sectionWeight } from "./choreography";
import { makeRadialTexture } from "./textures";

type Seed = { x: number; y: number; z: number; speed: number; scale: number; phase: number };

function Pool({
  progressRef,
  rgba,
  count,
  section,
  kind,
}: {
  progressRef: { current: number };
  rgba: string;
  count: number;
  section: SectionId;
  /** 'stream' = blown forward from the fan; 'rise' = drifting up off the coil */
  kind: "stream" | "rise";
}) {
  const meshRef = useRef<InstancedMesh>(null);
  const matRef = useRef<MeshBasicMaterial>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const tex = useMemo(() => makeRadialTexture(rgba), [rgba]);
  const seeds = useMemo<Seed[]>(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * (kind === "stream" ? 0.8 : 1.0),
        y: kind === "stream" ? 0.93 + (Math.random() - 0.5) * 0.7 : 0,
        z: kind === "stream" ? 0 : -0.45 + Math.random() * 0.25,
        speed: 0.5 + Math.random() * 0.9,
        scale: 0.04 + Math.random() * 0.07,
        phase: Math.random(),
      })),
    [count, kind],
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;
    const w = sectionWeight(section, progressRef.current);
    mat.opacity = 0.85 * w;
    mesh.visible = w > 0.02;
    if (!mesh.visible) return;

    const t = state.clock.elapsedTime;
    for (let i = 0; i < seeds.length; i++) {
      const s = seeds[i];
      const travel = (t * s.speed * 0.4 + s.phase) % 1;
      if (kind === "stream") {
        // blown out of the fan face, spreading as it travels
        dummy.position.set(
          s.x * (1 + travel * 0.8),
          s.y + Math.sin((travel + s.phase) * 6.28) * 0.05,
          0.45 + travel * 1.9,
        );
      } else {
        // shimmering up off the hot coil
        dummy.position.set(
          s.x * (1 + travel * 0.3),
          1.55 + travel * 1.1,
          s.z - travel * 0.35,
        );
      }
      const fade = Math.sin(travel * Math.PI); // grow then shrink over the run
      dummy.scale.setScalar(s.scale * (0.5 + fade));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={matRef}
        map={tex}
        transparent
        opacity={0}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/**
 * Air made visible: frost particles stream from the fan on the cooling beat,
 * ember shimmer rises off the coil on the heating beat.
 */
export function AirStreams({
  progressRef,
  quality = "full",
}: {
  progressRef: { current: number };
  quality?: "full" | "lite";
}) {
  const n = quality === "full" ? 70 : 30;
  return (
    <>
      <Pool progressRef={progressRef} rgba="rgba(87,184,255,0.9)" count={n} section="cooling" kind="stream" />
      <Pool progressRef={progressRef} rgba="rgba(255,158,69,0.9)" count={Math.round(n * 0.8)} section="heating" kind="rise" />
    </>
  );
}
