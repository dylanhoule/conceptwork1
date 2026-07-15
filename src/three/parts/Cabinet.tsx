"use client";

import { graphitePanel } from "../materials";

/** Left / right body panels — separate parts so the Air-Quality beat can swing them open. */
export function SidePanel() {
  return (
    <mesh>
      <boxGeometry args={[0.02, 1.32, 0.44]} />
      <meshPhysicalMaterial {...graphitePanel} clearcoat={0.35} clearcoatRoughness={0.3} />
    </mesh>
  );
}

/**
 * Front panel: four strips framing a square fan opening, with a proud
 * cylindrical shroud that turns the opening visually circular.
 * Local origin = panel center (y=0 is mid-panel; fan center sits at y +0.13).
 */
export function FrontPanel() {
  return (
    <group>
      {/* bottom strip (below the fan opening) */}
      <mesh position={[0, -0.47, 0]}>
        <boxGeometry args={[1.1, 0.38, 0.02]} />
        <meshPhysicalMaterial {...graphitePanel} clearcoat={0.35} clearcoatRoughness={0.3} />
      </mesh>
      {/* top strip */}
      <mesh position={[0, 0.625, 0]}>
        <boxGeometry args={[1.1, 0.07, 0.02]} />
        <meshPhysicalMaterial {...graphitePanel} clearcoat={0.35} clearcoatRoughness={0.3} />
      </mesh>
      {/* left / right strips */}
      <mesh position={[-0.515, 0.13, 0]}>
        <boxGeometry args={[0.07, 0.92, 0.02]} />
        <meshPhysicalMaterial {...graphitePanel} clearcoat={0.35} clearcoatRoughness={0.3} />
      </mesh>
      <mesh position={[0.515, 0.13, 0]}>
        <boxGeometry args={[0.07, 0.92, 0.02]} />
        <meshPhysicalMaterial {...graphitePanel} clearcoat={0.35} clearcoatRoughness={0.3} />
      </mesh>
      {/* fan shroud — open cylinder facing +z */}
      <mesh position={[0, 0.13, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.1, 48, 1, true]} />
        <meshStandardMaterial
          color="#1a1f27"
          metalness={0.7}
          roughness={0.5}
          side={2 /* DoubleSide */}
        />
      </mesh>
    </group>
  );
}

/** Top cap with a slight overhang + recessed brand strip. */
export function TopCap() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.16, 0.06, 0.5]} />
        <meshPhysicalMaterial {...graphitePanel} clearcoat={0.4} clearcoatRoughness={0.25} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[1.04, 0.025, 0.42]} />
        <meshStandardMaterial color="#171b22" metalness={0.75} roughness={0.4} />
      </mesh>
    </group>
  );
}
