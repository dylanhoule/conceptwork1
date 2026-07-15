import {
  PART_CHOREO,
  SECTION_RANGES,
  type PartId,
  type SectionId,
} from "@/lib/heat-pump-contract";

/**
 * Pure progress → pose math. No three.js, no React — testable in isolation
 * and reusable verbatim if the code-built model is swapped for a GLB.
 */

const smootherstep = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
};

const rangeT = (p: number, [a, b]: readonly [number, number]) =>
  Math.min(1, Math.max(0, (p - a) / (b - a)));

/** 0→1→0 envelope across a section, with soft shoulders. */
export function sectionWeight(section: SectionId, p: number): number {
  const [a, b] = SECTION_RANGES[section];
  const t = rangeT(p, [a, b] as const);
  return smootherstep(t <= 0.5 ? t * 2 : (1 - t) * 2);
}

/** Global explode envelope: 0 assembled → 1 fully apart → 0 reassembled. */
export function explodeEnvelope(p: number): number {
  const rise = smootherstep(rangeT(p, [SECTION_RANGES.hold[1] - 0.02, 0.42] as const));
  const fall = smootherstep(rangeT(p, SECTION_RANGES.reassemble));
  return rise * (1 - fall);
}

export type PartPose = {
  position: [number, number, number];
  rotation: [number, number, number];
  /** 0..1 — drives emissive/highlight on the part during its focus beat. */
  glow: number;
};

export function partPose(id: PartId, p: number): PartPose {
  const { explodeOffset, explodeRotation = [0, 0, 0], focusSection } = PART_CHOREO[id];
  const focus = sectionWeight(focusSection, p);
  // Parts drift with the global envelope, and lean out further on their beat.
  const amount = explodeEnvelope(p) * (0.55 + 0.45 * focus);
  return {
    position: [
      explodeOffset[0] * amount,
      explodeOffset[1] * amount,
      explodeOffset[2] * amount,
    ],
    rotation: [
      explodeRotation[0] * amount,
      explodeRotation[1] * amount,
      explodeRotation[2] * amount,
    ],
    glow: focus,
  };
}

/**
 * Camera keyframes at section MIDPOINTS — each beat's showcase angle lands
 * exactly when that beat peaks; boundaries become the transitions.
 */
const CAMERA_KEYS: Array<{
  at: number;
  azimuth: number; // radians around Y
  elevation: number; // radians above horizon
  distance: number;
}> = [
  { at: 0.0, azimuth: -0.35, elevation: 0.18, distance: 4.2 },
  { at: 0.06, azimuth: 0.1, elevation: 0.12, distance: 3.7 }, // hold: front
  { at: 0.21, azimuth: 0.45, elevation: 0.1, distance: 3.6 }, // cooling: fan pulls toward camera
  { at: 0.39, azimuth: 3.35, elevation: 0.42, distance: 4.7 }, // heating: coil bank from behind-above
  { at: 0.57, azimuth: 5.55, elevation: 0.12, distance: 4.3 }, // air quality: opened cabinet
  { at: 0.75, azimuth: 5.9, elevation: 0.2, distance: 4.5 }, // emergency: exploded three-quarter
  { at: 1.0, azimuth: 6.28 - 0.35, elevation: 0.18, distance: 4.4 }, // reassembled
];

export function cameraPose(p: number) {
  let i = 0;
  while (i < CAMERA_KEYS.length - 2 && p > CAMERA_KEYS[i + 1].at) i++;
  const a = CAMERA_KEYS[i];
  const b = CAMERA_KEYS[i + 1];
  const t = smootherstep(rangeT(p, [a.at, b.at] as const));
  const lerp = (x: number, y: number) => x + (y - x) * t;
  return {
    azimuth: lerp(a.azimuth, b.azimuth),
    elevation: lerp(a.elevation, b.elevation),
    distance: lerp(a.distance, b.distance),
  };
}

/** Fan angular velocity (rad/s): idles always, spins up for the cooling beat. */
export function fanSpeed(p: number): number {
  return 1.2 + 14 * sectionWeight("cooling", p);
}

/** Coil ember glow intensity for the heating beat. */
export function coilGlow(p: number): number {
  return sectionWeight("heating", p);
}

/** Status LED pulse: emergency beat, pulsing with wall-clock time. */
export function ledPulse(p: number, timeSec: number): number {
  const w = sectionWeight("emergency", p);
  return 0.15 + w * (0.5 + 0.5 * Math.sin(timeSec * 5.5)) * 0.85;
}
