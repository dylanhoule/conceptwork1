"use client";

import { compressorShell, steelDark } from "../materials";

/** Hermetic compressor can + muffler — the heart revealed on the emergency beat. */
export function Compressor() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.14, 0.15, 0.32, 28]} />
        <meshStandardMaterial {...compressorShell} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.14, 28, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial {...compressorShell} />
      </mesh>
      {/* muffler */}
      <mesh position={[0.17, -0.02, 0.05]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.045, 0.045, 0.2, 16]} />
        <meshStandardMaterial {...steelDark} />
      </mesh>
      {/* mounting feet */}
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, -0.17, 0]}>
          <boxGeometry args={[0.08, 0.03, 0.12]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
      ))}
    </group>
  );
}
