"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SECTION_RANGES } from "@/lib/heat-pump-contract";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { HeroVisual } from "@/three/HeroVisual";
import { Poster } from "@/three/Poster";
import { HeroCopy } from "./HeroCopy";
import { ValueProps, ValuePropCard, VALUE_PROPS } from "./ValueProps";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function Atmosphere() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-frost/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 -bottom-40 h-[36rem] w-[36rem] rounded-full bg-ember/15 blur-3xl"
      />
    </>
  );
}

/** Reduced-motion / no-pin experience: the M2 static layout. */
function StaticExperience() {
  return (
    <>
      <section className="relative flex min-h-svh items-center overflow-hidden">
        <Atmosphere />
        <div className="absolute inset-y-0 right-0 left-0 opacity-70 md:left-[8%]">
          <Poster />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-5 py-28 md:px-8">
          <HeroCopy />
        </div>
      </section>
      <ValueProps />
    </>
  );
}

/**
 * The pinned scroll journey. One ScrollTrigger scrubs a 0..1 timeline:
 * progressRef feeds the 3D scene (SceneRig), the same SECTION_RANGES place
 * the DOM value-prop panels, so copy and choreography cannot drift apart.
 */
export function HeroJourney() {
  const reduced = useReducedMotion();
  const scope = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  // Parks the canvas frame loop once the visitor scrolls past the journey.
  const [canvasActive, setCanvasActive] = useState(true);

  useGSAP(
    () => {
      if (reduced || !scope.current) return;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
          onToggle: (self) => setCanvasActive(self.isActive),
        },
      });

      // Pad the timeline to exactly 1 so positions == journey fractions.
      tl.to({}, { duration: 0 }, 1);

      tl.to("[data-scroll-hint]", { autoAlpha: 0, duration: 0.03 }, 0.02);
      tl.to("[data-hero-copy]", { autoAlpha: 0, y: -60, duration: 0.07 }, 0.05);

      for (const prop of VALUE_PROPS) {
        const [a, b] = SECTION_RANGES[prop.id];
        const el = `[data-vp="${prop.id}"]`;
        tl.fromTo(
          el,
          { autoAlpha: 0, y: 48 },
          { autoAlpha: 1, y: 0, duration: 0.045 },
          a + 0.015,
        );
        tl.to(el, { autoAlpha: 0, y: -40, duration: 0.04 }, b - 0.055);
      }
    },
    { scope, dependencies: [reduced] },
  );

  if (reduced) return <StaticExperience />;

  return (
    <section
      ref={scope}
      className="relative h-svh overflow-hidden"
      aria-label="What Summit fixes: cooling, heating, air quality, 24/7 emergency"
    >
      <Atmosphere />
      {/* offset right on desktop so the unit doesn't sit under the copy */}
      <div className="absolute inset-y-0 right-0 left-0 md:left-[8%]">
        <HeroVisual progressRef={progressRef} active={canvasActive} />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 md:px-8">
        <div data-hero-copy className="pointer-events-auto">
          <HeroCopy />
        </div>
      </div>

      {VALUE_PROPS.map((prop, i) => (
        <div
          key={prop.id}
          className={`absolute inset-x-4 bottom-24 z-10 md:inset-x-auto md:top-1/2 md:bottom-auto md:w-[26rem] md:-translate-y-1/2 ${
            i % 2 === 0 ? "md:left-10 lg:left-24" : "md:right-10 lg:right-24"
          }`}
        >
          <div data-vp={prop.id} className="invisible rounded-3xl bg-night/45">
            <ValuePropCard prop={prop} />
          </div>
        </div>
      ))}

      <div
        data-scroll-hint
        className="type-plate absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-haze/70"
      >
        Scroll to explore
      </div>
    </section>
  );
}
