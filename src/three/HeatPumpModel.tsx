"use client";

import type { Object3D } from "three";
import type { PartId } from "@/lib/heat-pump-contract";
import type { HeatPumpRegistry } from "./registry";
import { BasePan } from "./parts/BasePan";
import { SidePanel, FrontPanel, TopCap } from "./parts/Cabinet";
import { CondenserCoil } from "./parts/CondenserCoil";
import { FanAssembly } from "./parts/FanAssembly";
import { FanGrille } from "./parts/FanGrille";
import { Compressor } from "./parts/Compressor";
import { RefrigerantLines } from "./parts/RefrigerantLines";

/** Assembled ("home") transform for each part. A GLB would bake these. */
const HOME: Record<PartId, [number, number, number]> = {
  basePan: [0, 0.1, 0],
  cabinetLeft: [-0.56, 0.8, 0],
  cabinetRight: [0.56, 0.8, 0],
  cabinetFront: [0, 0.8, 0.225],
  topCap: [0, 1.49, 0],
  coil: [0, 0.85, -0.14],
  fanAssembly: [0, 0.93, 0.16],
  fanGrille: [0, 0.93, 0.3],
  compressor: [0.25, 0.38, 0],
  refrigerantLines: [0, 0, 0],
  statusLed: [0.42, 0.33, 0.245],
};

/**
 * The code-built unit. Each part sits inside a static "home" group; the inner
 * named group is what SceneRig displaces to explode/reassemble. Swapping in a
 * segmented GLB = filling the same registry from getObjectByName(partId).
 */
export function HeatPumpModel({
  registry,
  quality = "full",
}: {
  registry: HeatPumpRegistry;
  quality?: "full" | "lite";
}) {
  const register = (id: PartId) => (el: Object3D | null) => {
    if (el) registry.parts.set(id, el);
    else registry.parts.delete(id);
  };

  const part = (id: PartId, children: React.ReactNode) => (
    <group position={HOME[id]}>
      <group ref={register(id)} name={id}>
        {children}
      </group>
    </group>
  );

  return (
    <group>
      {part("basePan", <BasePan />)}
      {part("cabinetLeft", <SidePanel />)}
      {part("cabinetRight", <SidePanel />)}
      {part("cabinetFront", <FrontPanel />)}
      {part("topCap", <TopCap />)}
      {part(
        "coil",
        <CondenserCoil
          fins={quality === "full" ? 56 : 28}
          matRef={registry.coilMat}
          tubeMatRef={registry.coilTubeMat}
        />,
      )}
      {part("fanAssembly", <FanAssembly rotorRef={registry.rotor} />)}
      {part("fanGrille", <FanGrille />)}
      {part("compressor", <Compressor />)}
      {part("refrigerantLines", <RefrigerantLines />)}
      {part(
        "statusLed",
        <mesh>
          <sphereGeometry args={[0.02, 16, 12]} />
          <meshStandardMaterial
            ref={(m) => {
              registry.ledMat.current = m;
            }}
            color="#57b8ff"
            emissive="#57b8ff"
            emissiveIntensity={0.4}
          />
        </mesh>,
      )}
    </group>
  );
}
