"use client";

import { useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { ACESFilmicToneMapping } from "three";
import type { Object3D } from "three";
import { createRegistry } from "./registry";
import { HeatPumpModel } from "./HeatPumpModel";
import { SceneRig } from "./SceneRig";
import { GlowPlanes } from "./GlowPlanes";

export type HeatPumpSceneProps = {
  /** Scroll progress 0..1 — the ONLY input the hero visual needs. */
  progressRef: { current: number };
  quality?: "full" | "lite";
};

/**
 * The R3F implementation of the hero visual. Anything that honors
 * HeatPumpSceneProps can replace it (segmented GLB scene, scrub video, poster)
 * — see src/lib/heat-pump-contract.ts.
 */
export function HeatPumpScene({ progressRef, quality = "full" }: HeatPumpSceneProps) {
  const registry = useMemo(createRegistry, []);
  const rootRef = useRef<Object3D | null>(null);

  return (
    <Canvas
      dpr={quality === "full" ? [1, 1.75] : [1, 1.5]}
      camera={{ fov: 32, position: [1.2, 1.6, 4.2], near: 0.1, far: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.45,
      }}
      aria-hidden="true"
    >
      <SceneRig progressRef={progressRef} registry={registry} rootRef={rootRef} />

      <group ref={rootRef}>
        <HeatPumpModel registry={registry} quality={quality} />
      </group>

      <GlowPlanes />

      {/* Dual-glow identity baked into the metal via a code-authored environment
          — no HDR downloads, no network. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} color="#57b8ff" position={[-3, 2, 1]} rotation-y={Math.PI / 2} scale={[4, 3, 1]} />
        <Lightformer form="rect" intensity={2.1} color="#ff9e45" position={[3, 1.5, -0.5]} rotation-y={-Math.PI / 2} scale={[4, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#ffffff" position={[0, 4, 0]} rotation-x={-Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={0.7} color="#aac6e8" position={[0, 1, 4]} scale={[5, 3, 1]} />
      </Environment>

      <ambientLight intensity={0.22} />
      <spotLight position={[-4, 3, 3]} intensity={18} color="#57b8ff" angle={0.5} penumbra={1} />
      <spotLight position={[4, 2.5, -2.5]} intensity={15} color="#ff9e45" angle={0.5} penumbra={1} />

      {quality === "full" && (
        <ContactShadows position={[0, 0, 0]} scale={6} opacity={0.5} blur={2.4} far={2.2} frames={1} />
      )}
    </Canvas>
  );
}
