"use client";

import { steelDark } from "../materials";

export function BasePan() {
  const feet: Array<[number, number]> = [
    [-0.5, -0.17],
    [0.5, -0.17],
    [-0.5, 0.17],
    [0.5, 0.17],
  ];
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.14, 0.07, 0.48]} />
        <meshStandardMaterial {...steelDark} />
      </mesh>
      {feet.map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, -0.06, z]}>
          <cylinderGeometry args={[0.035, 0.045, 0.06, 12]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
      ))}
    </group>
  );
}
