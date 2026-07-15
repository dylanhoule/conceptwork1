"use client";

import type { Object3D } from "three";
import { fanBlade, grilleMetal, steelDark } from "../materials";

const BLADES = 5;

/**
 * Fan facing +z. Static motor struts + a spinning rotor (hub + pitched
 * blades). SceneRig spins the rotor via registry.rotor.
 */
export function FanAssembly({ rotorRef }: { rotorRef: { current: Object3D | null } }) {
  return (
    <group>
      {/* motor struts behind the rotor */}
      {[0, 1, 2].map((i) => {
        const a = (i * Math.PI * 2) / 3 + 0.4;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.2, Math.sin(a) * 0.2, -0.09]} rotation={[0, 0, a + Math.PI / 2]}>
            <boxGeometry args={[0.035, 0.42, 0.02]} />
            <meshStandardMaterial {...grilleMetal} />
          </mesh>
        );
      })}
      {/* motor can */}
      <mesh position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.12, 20]} />
        <meshStandardMaterial {...steelDark} />
      </mesh>

      {/* rotor */}
      <group
        ref={(el: Object3D | null) => {
          rotorRef.current = el;
        }}
      >
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.1, 0.09, 24]} />
          <meshStandardMaterial {...fanBlade} />
        </mesh>
        {Array.from({ length: BLADES }, (_, i) => {
          const a = (i * Math.PI * 2) / BLADES;
          return (
            <group key={i} rotation={[0, 0, a]}>
              {/* blade: pitched plate reaching out from the hub */}
              <mesh position={[0, 0.245, 0]} rotation={[0.5, 0, 0]}>
                <boxGeometry args={[0.15, 0.32, 0.012]} />
                <meshStandardMaterial {...fanBlade} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
