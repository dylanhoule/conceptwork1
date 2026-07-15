import type { Object3D, MeshStandardMaterial } from "three";
import type { PartId } from "@/lib/heat-pump-contract";

/**
 * Mutable handles the frame loop drives. HeatPumpModel fills it while
 * mounting; SceneRig reads it every frame. A GLB-based model would fill the
 * same registry from scene.getObjectByName(partId).
 */
export type HeatPumpRegistry = {
  parts: Map<PartId, Object3D>;
  /** Spinning fan rotor (child of fanAssembly). */
  rotor: { current: Object3D | null };
  /** Coil fin material: subtle warm tint during the heating beat. */
  coilMat: { current: MeshStandardMaterial | null };
  /** Copper tube material: glows hot during the heating beat. */
  coilTubeMat: { current: MeshStandardMaterial | null };
  /** Status LED material: pulses during the emergency beat. */
  ledMat: { current: MeshStandardMaterial | null };
};

export const createRegistry = (): HeatPumpRegistry => ({
  parts: new Map(),
  rotor: { current: null },
  coilMat: { current: null },
  coilTubeMat: { current: null },
  ledMat: { current: null },
});
