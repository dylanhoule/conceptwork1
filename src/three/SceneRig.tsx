"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import type { Object3D } from "three";
import { PART_IDS } from "@/lib/heat-pump-contract";
import {
  partPose,
  cameraPose,
  fanSpeed,
  coilGlow,
  ledPulse,
  explodeEnvelope,
} from "./choreography";
import type { HeatPumpRegistry } from "./registry";

const LOOK_AT = new Vector3(0, 0.78, 0);

/**
 * The single frame loop: damps the incoming scroll progress (so scrub jumps
 * stay buttery), then drives part poses, fan spin, glows, idle turntable,
 * and the camera, all from choreography.ts pure math.
 */
export function SceneRig({
  progressRef,
  registry,
  rootRef,
}: {
  progressRef: { current: number };
  registry: HeatPumpRegistry;
  rootRef: { current: Object3D | null };
}) {
  const smoothed = useRef(0);

  useFrame((state, delta) => {
    const p = MathUtils.damp(smoothed.current, progressRef.current, 5, delta);
    smoothed.current = p;

    for (const id of PART_IDS) {
      const obj = registry.parts.get(id);
      if (!obj) continue;
      const pose = partPose(id, p);
      obj.position.set(...pose.position);
      obj.rotation.set(...pose.rotation);
    }

    if (registry.rotor.current) {
      registry.rotor.current.rotation.z -= fanSpeed(p) * delta;
    }
    const glow = coilGlow(p);
    if (registry.coilMat.current) {
      registry.coilMat.current.emissiveIntensity = 0.28 * glow;
    }
    if (registry.coilTubeMat.current) {
      registry.coilTubeMat.current.emissiveIntensity = 1.5 * glow;
    }
    if (registry.ledMat.current) {
      registry.ledMat.current.emissiveIntensity = 3 * ledPulse(p, state.clock.elapsedTime);
    }
    // Idle sway while assembled, bounded (not a free-running turntable) so
    // the model's facing always matches the camera keyframes at every beat.
    if (rootRef.current) {
      const sway = 0.28 * Math.sin(state.clock.elapsedTime * 0.3) * (1 - explodeEnvelope(p));
      rootRef.current.rotation.y = MathUtils.damp(rootRef.current.rotation.y, sway, 3, delta);
    }

    const cam = cameraPose(p);
    state.camera.position
      .setFromSphericalCoords(cam.distance, Math.PI / 2 - cam.elevation, cam.azimuth)
      .add(LOOK_AT);
    state.camera.lookAt(LOOK_AT);

    if (process.env.NODE_ENV !== "production") {
      (globalThis as Record<string, unknown>).__hpDebug = {
        p,
        coilGlow: coilGlow(p),
        camera: state.camera.position.toArray(),
      };
    }
  });

  return null;
}
