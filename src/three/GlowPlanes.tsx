"use client";

import { useMemo } from "react";
import { AdditiveBlending } from "three";
import { Billboard } from "@react-three/drei";
import { makeRadialTexture } from "./textures";

function Glow({
  rgba,
  position,
  scale,
  opacity,
}: {
  rgba: string;
  position: [number, number, number];
  scale: number;
  opacity: number;
}) {
  const tex = useMemo(() => makeRadialTexture(rgba), [rgba]);
  return (
    <Billboard position={position}>
      <mesh scale={scale}>
        <planeGeometry />
        <meshBasicMaterial
          map={tex}
          transparent
          opacity={opacity}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </Billboard>
  );
}

/**
 * The dual-temperature atmosphere behind the unit: cheap additive sprites
 * instead of postprocessing bloom (the 60fps-on-midrange-phone budget).
 */
export function GlowPlanes() {
  return (
    <>
      <Glow rgba="rgba(87,184,255,0.85)" position={[-1.4, 1.3, -1.6]} scale={4.5} opacity={0.5} />
      <Glow rgba="rgba(255,158,69,0.8)" position={[1.5, 0.7, -1.4]} scale={4} opacity={0.42} />
    </>
  );
}
