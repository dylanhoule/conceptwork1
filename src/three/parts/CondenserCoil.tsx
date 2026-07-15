"use client";

import { useEffect, useMemo } from "react";
import { Instances, Instance } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { aluminumFin } from "../materials";

/**
 * Condenser coil bank: instanced vertical aluminum fins over a dark backing
 * plate, crossed by copper runs. On the heating beat the copper glows hot
 * (strong emissive) while the fins pick up a subtle warm tint — SceneRig
 * drives both via registry.coilMat / registry.coilTubeMat.
 */
export function CondenserCoil({
  fins = 56,
  matRef,
  tubeMatRef,
}: {
  fins?: number;
  matRef: { current: MeshStandardMaterial | null };
  tubeMatRef: { current: MeshStandardMaterial | null };
}) {
  const tubeMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#c9813f",
        metalness: 1.0,
        roughness: 0.3,
        emissive: "#ff7a2a",
        emissiveIntensity: 0,
      }),
    [],
  );
  useEffect(() => {
    tubeMatRef.current = tubeMat;
    return () => {
      tubeMatRef.current = null;
      tubeMat.dispose();
    };
  }, [tubeMat, tubeMatRef]);

  const span = 1.0;
  return (
    <group>
      {/* backing plate so the fin bank reads solid from behind */}
      <mesh position={[0, 0, -0.12]}>
        <boxGeometry args={[1.04, 1.27, 0.03]} />
        <meshStandardMaterial color="#10131a" metalness={0.6} roughness={0.6} />
      </mesh>
      <Instances limit={96} key={fins}>
        <boxGeometry args={[0.014, 1.25, 0.34]} />
        <meshStandardMaterial
          ref={(m: MeshStandardMaterial | null) => {
            matRef.current = m;
          }}
          {...aluminumFin}
        />
        {Array.from({ length: fins }, (_, i) => (
          <Instance key={i} position={[-span / 2 + (i * span) / (fins - 1), 0, 0]} />
        ))}
      </Instances>
      {/* copper runs through the fin bank — these glow on the heating beat */}
      {[-0.35, 0.25].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]} material={tubeMat}>
          <cylinderGeometry args={[0.022, 0.022, 1.06, 16]} />
        </mesh>
      ))}
      {/* U-bend hints at both ends */}
      {[-0.53, 0.53].map((x) => (
        <mesh key={x} position={[x, -0.05, 0]} material={tubeMat}>
          <torusGeometry args={[0.3, 0.02, 10, 20, Math.PI]} />
        </mesh>
      ))}
    </group>
  );
}
