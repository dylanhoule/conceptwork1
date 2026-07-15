# The hero visual — architecture & swap seams

The 3D heat pump is deliberately replaceable. Everything on the page talks to
it through two narrow contracts; swap what's behind them and nothing else
changes.

## Contract 1: the hero visual interface

`HeroVisual` (and anything that replaces it) receives:

```ts
{ progressRef: { current: number },  // scroll journey progress, 0..1
  active?: boolean }                  // false ⇒ park the render loop
```

`HeroJourney` owns the pinned ScrollTrigger and writes `progressRef.current`
every scroll frame. Implementations read it — they never know about GSAP,
Lenis, or the DOM around them.

**Swap paths:**

- **Scroll-scrubbed video** (HIGGSFIELD_SLOT): render a `<video>`, set
  `video.currentTime = progress * duration` from a rAF loop. Drop-in.
- **Photoreal poster**: the `poster` quality tier already renders `Poster.tsx`
  only. Replace its SVG with an AI render (or write
  `public/posters/hero-poster.png` via the dev capture API below).

## Contract 2: the named-part registry (for a segmented GLB)

`src/lib/heat-pump-contract.ts` defines:

- `PART_IDS` — the 11 part names (`cabinetFront`, `coil`, `fanAssembly`, …)
- `SECTION_RANGES` — journey beats as 0..1 fractions (shared with the DOM
  panels, so copy and choreography can't drift)
- `PART_CHOREO` — per-part explode offset/rotation + focus beat

`src/three/choreography.ts` is pure math: `partPose(id, progress)`,
`cameraPose(progress)`, `fanSpeed`, `coilGlow`, `ledPulse`. No three.js, no
React — it survives any model swap.

To use a **commissioned/AI-generated GLB**: name its nodes to `PART_IDS`,
load it, fill the same registry (`registry.parts.set(id,
scene.getObjectByName(id))`), and keep `SceneRig` as-is. The code-built
`HeatPumpModel` is the reference implementation.

## Quality tiers (`src/lib/quality.ts`)

- `full` — desktop: 56 coil fins, DPR ≤ 1.75, ContactShadows
- `lite` — coarse pointer / narrow viewport: 28 fins, DPR ≤ 1.5, no shadows
- `poster` — no WebGL, low memory, or reduced motion: static poster, no canvas

`PerformanceMonitor` also steps DPR down on sustained frame drops, and the
frame loop parks (`frameloop="never"`) when the journey scrolls out of view.

## Dev tools

- `/dev/model` — scrub the full choreography with a slider (dev-only route).
  `?stage=bare|model|rig|env|glow|full` mounts the scene piece by piece.
- **Poster capture**: with the lab open and the window visible, run in the
  console:
  ```js
  fetch("/api/dev/poster", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dataUrl: document.querySelector("canvas").toDataURL("image/png"),
    }),
  });
  ```
  Writes `public/posters/hero-poster.png` (dev server only).

## Gotcha worth knowing

Chrome pauses `requestAnimationFrame` for fully-occluded windows (macOS
occlusion detection). If the canvas looks frozen/blank during automated
checks, bring the window to the foreground first.
