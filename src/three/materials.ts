/**
 * Shared PBR material prop-sets for the code-built unit.
 * Spread onto <meshStandardMaterial|meshPhysicalMaterial> — no texture files,
 * the Lightformer environment does the work in the reflections.
 */

export const graphitePanel = {
  color: "#2e3540",
  metalness: 0.75,
  roughness: 0.44,
  envMapIntensity: 1.2,
} as const;

export const steelDark = {
  color: "#1b1f26",
  metalness: 0.82,
  roughness: 0.45,
  envMapIntensity: 1.0,
} as const;

export const aluminumFin = {
  color: "#67748a",
  metalness: 0.95,
  roughness: 0.48,
  emissive: "#ff6a00",
  emissiveIntensity: 0,
  envMapIntensity: 0.9,
} as const;

export const copper = {
  color: "#c9813f",
  metalness: 1.0,
  roughness: 0.3,
  envMapIntensity: 1.1,
} as const;

export const fanBlade = {
  color: "#12161d",
  metalness: 0.55,
  roughness: 0.5,
} as const;

export const grilleMetal = {
  color: "#0e1116",
  metalness: 0.6,
  roughness: 0.68,
} as const;

export const insulation = {
  color: "#14161a",
  metalness: 0.1,
  roughness: 0.92,
} as const;

export const compressorShell = {
  color: "#171b22",
  metalness: 0.7,
  roughness: 0.42,
  envMapIntensity: 1.1,
} as const;
