"use client";

import { grilleMetal } from "../materials";

/** Concentric protective grille floating just in front of the fan. */
export function FanGrille() {
  const rings = [0.14, 0.24, 0.34, 0.43];
  const spokes = 8;
  return (
    <group>
      {rings.map((r) => (
        <mesh key={r}>
          <torusGeometry args={[r, 0.008, 8, 48]} />
          <meshStandardMaterial {...grilleMetal} />
        </mesh>
      ))}
      {Array.from({ length: spokes }, (_, i) => {
        const a = (i * Math.PI * 2) / spokes;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.22, Math.sin(a) * 0.22, 0]} rotation={[0, 0, a + Math.PI / 2]}>
            <cylinderGeometry args={[0.006, 0.006, 0.43, 8]} />
            <meshStandardMaterial {...grilleMetal} />
          </mesh>
        );
      })}
      {/* center cap */}
      <mesh position={[0, 0, 0.005]}>
        <cylinderGeometry args={[0.05, 0.05, 0.015, 20]} />
        <meshStandardMaterial {...grilleMetal} />
      </mesh>
    </group>
  );
}
