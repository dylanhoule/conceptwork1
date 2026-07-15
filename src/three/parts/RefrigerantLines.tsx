"use client";

import { useMemo } from "react";
import { CatmullRomCurve3, Vector3 } from "three";
import { copper, insulation, steelDark } from "../materials";

/**
 * Two refrigerant runs (bare copper liquid line + insulated suction line)
 * plus the service valves on the right side. Local origin = unit origin.
 */
export function RefrigerantLines() {
  const liquid = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(0.25, 0.55, 0.05),
        new Vector3(0.34, 0.72, -0.02),
        new Vector3(0.46, 0.68, -0.12),
        new Vector3(0.5, 0.5, -0.14),
        new Vector3(0.52, 0.42, 0.06),
      ]),
    [],
  );
  const suction = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(0.28, 0.24, 0.06),
        new Vector3(0.42, 0.2, 0.1),
        new Vector3(0.52, 0.28, 0.08),
        new Vector3(0.54, 0.34, 0.1),
      ]),
    [],
  );

  return (
    <group>
      <mesh>
        <tubeGeometry args={[liquid, 40, 0.013, 10, false]} />
        <meshStandardMaterial {...copper} />
      </mesh>
      <mesh>
        <tubeGeometry args={[suction, 32, 0.024, 10, false]} />
        <meshStandardMaterial {...insulation} />
      </mesh>
      {/* service valves */}
      {[0.34, 0.42].map((y) => (
        <mesh key={y} position={[0.56, y, 0.1]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.028, 0.028, 0.07, 14]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
      ))}
    </group>
  );
}
