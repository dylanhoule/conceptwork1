"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeatPumpScene = dynamic(
  () => import("./HeatPumpScene").then((m) => m.HeatPumpScene),
  { ssr: false },
);

/**
 * The hero visual behind the scroll journey, behind the swap seam: anything
 * honoring { progressRef, quality } can replace the R3F scene (segmented GLB,
 * HIGGSFIELD_SLOT scroll-scrub video, photoreal poster) without touching the
 * page. Quality tiers get fully fleshed out in M5.
 */
export function HeroVisual({ progressRef }: { progressRef: { current: number } }) {
  const [quality, setQuality] = useState<"full" | "lite">("full");
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      setQuality("lite");
    }
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <HeatPumpScene key={quality} progressRef={progressRef} quality={quality} />
    </div>
  );
}
