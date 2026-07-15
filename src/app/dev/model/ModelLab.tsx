"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { SECTION_RANGES, type SectionId } from "@/lib/heat-pump-contract";
import type { Stage } from "./StageTest";

const StageTest = dynamic(() => import("./StageTest").then((m) => m.StageTest), {
  ssr: false,
});

const HeatPumpScene = dynamic(
  () => import("@/three/HeatPumpScene").then((m) => m.HeatPumpScene),
  { ssr: false },
);

function sectionFor(p: number): SectionId {
  for (const [id, [a, b]] of Object.entries(SECTION_RANGES)) {
    if (p >= a && p <= b) return id as SectionId;
  }
  return "hold";
}

/** Dev-only choreography lab: scrub fake scroll progress with a slider. */
export function ModelLab() {
  const progressRef = useRef(0);
  const [quality, setQuality] = useState<"full" | "lite">("full");
  const [readout, setReadout] = useState({ p: 0, section: "hold" as SectionId });
  // Freeze-bisect harness: /dev/model?stage=bare|model|rig|env|glow|full
  const [stage, setStage] = useState<string | null>(null);
  useEffect(() => {
    setStage(new URLSearchParams(window.location.search).get("stage"));
  }, []);

  if (stage) {
    return (
      <div className="fixed inset-0 z-[70] bg-night">
        <StageTest stage={stage as Stage} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] bg-night">
      <HeatPumpScene key={quality} progressRef={progressRef} quality={quality} />

      <div className="glass fixed inset-x-4 bottom-4 z-10 mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <span className="type-plate text-haze">
            progress {readout.p.toFixed(3)} — {readout.section}
          </span>
          <button
            type="button"
            onClick={() => setQuality((q) => (q === "full" ? "lite" : "full"))}
            className="type-plate rounded-full border border-white/15 px-3 py-1.5 text-mist"
          >
            quality: {quality}
          </button>
        </div>
        <input
          type="range"
          min={0}
          max={1000}
          defaultValue={0}
          aria-label="Scrub choreography progress"
          className="w-full accent-frost"
          onInput={(e) => {
            const p = Number(e.currentTarget.value) / 1000;
            progressRef.current = p;
            setReadout({ p, section: sectionFor(p) });
          }}
        />
        <div className="flex justify-between">
          {Object.keys(SECTION_RANGES).map((s) => (
            <span
              key={s}
              className={`type-plate ${s === readout.section ? "text-frost" : "text-haze/50"}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
