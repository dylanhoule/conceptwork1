"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import { ACESFilmicToneMapping } from "three";
import type { Object3D } from "three";
import { createRegistry } from "./registry";
import { HeatPumpModel } from "./HeatPumpModel";
import { SceneRig } from "./SceneRig";
import { GlowPlanes } from "./GlowPlanes";
import { AirStreams } from "./AirStreams";

export type HeatPumpSceneProps = {
  /** Scroll progress 0..1, the ONLY input the hero visual needs. */
  progressRef: { current: number };
  quality?: "full" | "lite";
  /** Dev lab only: lets canvas.toDataURL() capture poster frames. */
  preserveBuffer?: boolean;
  /** 'never' parks the GPU when the journey is out of view. */
  frameloop?: "always" | "never";
  /** Fires once after the first rendered frame (poster cross-fade). */
  onReady?: () => void;
};

function FirstFrame({ onReady }: { onReady?: () => void }) {
  const fired = useRef(false);
  useFrame(() => {
    if (!fired.current) {
      fired.current = true;
      onReady?.();
    }
  });
  return null;
}

/**
 * The R3F implementation of the hero visual. Anything that honors
 * HeatPumpSceneProps can replace it (segmented GLB scene, scrub video, poster);
 * see src/lib/heat-pump-contract.ts.
 */
export function HeatPumpScene({
  progressRef,
  quality = "full",
  preserveBuffer = false,
  frameloop = "always",
  onReady,
}: HeatPumpSceneProps) {
  const registry = useMemo(createRegistry, []);
  const rootRef = useRef<Object3D | null>(null);
  // Steps down if sustained frame drops are detected (PerformanceMonitor).
  const [maxDpr, setMaxDpr] = useState(quality === "full" ? 1.75 : 1.5);

  return (
    <Canvas
      dpr={[1, maxDpr]}
      frameloop={frameloop}
      camera={{ fov: 32, position: [1.2, 1.6, 4.2], near: 0.1, far: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.45,
        preserveDrawingBuffer: preserveBuffer,
      }}
      aria-hidden="true"
    >
      <FirstFrame onReady={onReady} />
      <PerformanceMonitor onDecline={() => setMaxDpr((d) => Math.max(1.1, d - 0.25))} />
      <SceneRig progressRef={progressRef} registry={registry} rootRef={rootRef} />

      <group ref={rootRef}>
        <HeatPumpModel registry={registry} quality={quality} />
      </group>

      <AirStreams progressRef={progressRef} quality={quality} />
      <GlowPlanes />

      {/* Dual-glow identity baked into the metal via a code-authored environment:
          no HDR downloads, no network. */}
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
