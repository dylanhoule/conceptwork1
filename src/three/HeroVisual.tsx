"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getQualityTier, type QualityTier } from "@/lib/quality";
import { Poster } from "./Poster";

const HeatPumpScene = dynamic(
  () => import("./HeatPumpScene").then((m) => m.HeatPumpScene),
  { ssr: false },
);

/**
 * The hero visual behind the swap seam: anything honoring
 * { progressRef, quality } can replace the R3F scene (segmented GLB,
 * HIGGSFIELD_SLOT scroll-scrub video, photoreal poster).
 *
 * Poster-first: the SVG poster is in the server HTML immediately; the canvas
 * mounts client-side (never for the "poster" tier) and cross-fades in after
 * its first rendered frame. `active` gates the frame loop so the GPU idles
 * once the visitor scrolls past the journey.
 */
export function HeroVisual({
  progressRef,
  active = true,
}: {
  progressRef: { current: number };
  active?: boolean;
}) {
  const [tier, setTier] = useState<QualityTier | null>(null); // null until hydration
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTier(getQualityTier());
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Poster
        className={`transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {tier && tier !== "poster" && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <HeatPumpScene
            progressRef={progressRef}
            quality={tier}
            frameloop={active ? "always" : "never"}
            onReady={() => setReady(true)}
          />
        </div>
      )}
    </div>
  );
}
