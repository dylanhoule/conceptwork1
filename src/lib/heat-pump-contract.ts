/**
 * THE SWAP SEAM.
 *
 * Everything that draws or choreographs the hero unit speaks in these names
 * and ranges. Two replacement paths, both without touching page code:
 *
 * 1. Segmented GLB (commissioned or AI-generated): name its nodes to PART_IDS
 *    and map them via scene.getObjectByName(id) — choreography.ts keeps working.
 * 2. Entirely different hero visual (HIGGSFIELD_SLOT: scroll-scrubbed video or
 *    photoreal poster): implement the HeroVisual interface { progressRef,
 *    quality } and swap the component — the page and scroll wiring never change.
 */

export const PART_IDS = [
  "basePan",
  "cabinetFront",
  "cabinetLeft",
  "cabinetRight",
  "coil",
  "fanAssembly",
  "fanGrille",
  "topCap",
  "compressor",
  "refrigerantLines",
  "statusLed",
] as const;

export type PartId = (typeof PART_IDS)[number];

/** Scroll-journey beats as fractions of the pinned scroll (0..1). */
export const SECTION_RANGES = {
  hold: [0.0, 0.12],
  cooling: [0.12, 0.3],
  heating: [0.3, 0.48],
  airQuality: [0.48, 0.66],
  emergency: [0.66, 0.84],
  reassemble: [0.84, 1.0],
} as const;

export type SectionId = keyof typeof SECTION_RANGES;

export type PartChoreo = {
  /** Direction & distance the part drifts to at full explode. */
  explodeOffset: [number, number, number];
  /** Extra rotation (radians) at full explode. */
  explodeRotation?: [number, number, number];
  /** The beat during which this part leans out furthest / glows. */
  focusSection: Exclude<SectionId, "hold" | "reassemble">;
};

export const PART_CHOREO: Record<PartId, PartChoreo> = {
  fanGrille: {
    explodeOffset: [0, 0.18, 1.0],
    explodeRotation: [0.25, 0, 0],
    focusSection: "cooling",
  },
  fanAssembly: {
    explodeOffset: [0, 0.08, 0.6],
    focusSection: "cooling",
  },
  coil: {
    explodeOffset: [0, 0.16, -0.55],
    focusSection: "heating",
  },
  cabinetLeft: {
    explodeOffset: [-0.85, 0.12, 0.1],
    explodeRotation: [0, -0.55, -0.12],
    focusSection: "airQuality",
  },
  cabinetRight: {
    explodeOffset: [0.85, 0.12, 0.1],
    explodeRotation: [0, 0.55, 0.12],
    focusSection: "airQuality",
  },
  cabinetFront: {
    explodeOffset: [0, -0.5, 0.62],
    explodeRotation: [-0.4, 0, 0],
    focusSection: "airQuality",
  },
  topCap: {
    explodeOffset: [0, 0.8, 0],
    explodeRotation: [0, 0.35, 0],
    focusSection: "airQuality",
  },
  compressor: {
    explodeOffset: [0.28, 0.14, 0.42],
    focusSection: "emergency",
  },
  refrigerantLines: {
    explodeOffset: [0.5, 0.05, 0.28],
    focusSection: "emergency",
  },
  statusLed: {
    explodeOffset: [0, -0.5, 0.75],
    focusSection: "emergency",
  },
  basePan: {
    explodeOffset: [0, -0.32, 0],
    focusSection: "emergency",
  },
};
