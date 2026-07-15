export type QualityTier = "full" | "lite" | "poster";

/**
 * Client-side quality gate, evaluated once before the hero canvas mounts.
 * - poster: no WebGL, very low memory, or reduced motion → static image
 * - lite:   touch devices / narrow viewports → fewer instances, lower DPR
 * - full:   everything else
 */
export function getQualityTier(): QualityTier {
  if (typeof window === "undefined") return "lite";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "poster";

  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return "poster";

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return "poster";
  } catch {
    return "poster";
  }

  if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
    return "lite";
  }
  return "full";
}
