"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import type { Object3D } from "three";
import { createRegistry } from "@/three/registry";
import { HeatPumpModel } from "@/three/HeatPumpModel";
import { SceneRig } from "@/three/SceneRig";
import { GlowPlanes } from "@/three/GlowPlanes";

const STAGES = ["bare", "model", "rig", "env", "glow", "full"] as const;
export type Stage = (typeof STAGES)[number];

/** Debug harness: mounts the scene piece by piece to isolate a renderer freeze. */
export function StageTest({ stage }: { stage: Stage }) {
  const registry = useMemo(createRegistry, []);
  const rootRef = useRef<Object3D | null>(null);
  const progressRef = useRef(0);
  const lvl = STAGES.indexOf(stage);

  useEffect(() => {
    document.title = `stage:${stage} mounted`;
  }, [stage]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 32, position: [1.2, 1.6, 4.2], near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      {lvl === 0 && (
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      )}
      {lvl >= 1 && (
        <group ref={rootRef}>
          <HeatPumpModel registry={registry} />
        </group>
      )}
      {lvl >= 2 && <SceneRig progressRef={progressRef} registry={registry} rootRef={rootRef} />}
      {lvl >= 3 && (
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.4} color="#57b8ff" position={[-3, 2, 1]} rotation-y={Math.PI / 2} scale={[4, 3, 1]} />
          <Lightformer form="rect" intensity={2.2} color="#ff9e45" position={[3, 1.5, -0.5]} rotation-y={-Math.PI / 2} scale={[4, 3, 1]} />
          <Lightformer form="rect" intensity={1.1} color="#ffffff" position={[0, 4, 0]} rotation-x={-Math.PI / 2} scale={[6, 3, 1]} />
        </Environment>
      )}
      {lvl >= 4 && <GlowPlanes />}
      {lvl >= 5 && (
        <>
          <spotLight position={[-4, 3, 3]} intensity={30} color="#57b8ff" angle={0.5} penumbra={1} />
          <spotLight position={[4, 2.5, -2.5]} intensity={26} color="#ff9e45" angle={0.5} penumbra={1} />
          <ContactShadows position={[0, 0, 0]} scale={6} opacity={0.5} blur={2.4} far={2.2} frames={1} />
        </>
      )}
    </Canvas>
  );
}
