import { site } from "@/lib/site-config";
import { CallCta } from "@/components/ui/CallCta";
import { ValueProps } from "@/components/home/ValueProps";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServiceArea } from "@/components/home/ServiceArea";

/**
 * Home — one long scroll.
 * M1: hero + stub sections. The scroll journey (3D + choreography) lands in M3/M4;
 * the static sections are fully designed in M2.
 */
export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-svh items-center overflow-hidden">
        {/* Dual-temperature atmosphere */}
        <div
          aria-hidden="true"
          className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-frost/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-40 -bottom-40 h-[36rem] w-[36rem] rounded-full bg-ember/15 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-28 md:px-8">
          <p className="type-plate text-haze">
            24/7 heating &amp; cooling — {site.serviceArea}
          </p>
          <h1 className="type-display mt-5 max-w-4xl text-5xl text-mist md:text-8xl">
            Comfort is one call away.
          </h1>
          <p className="mt-6 max-w-md text-lg text-haze">
            Heating and cooling for Fairview — fixed fast, done right.
          </p>
          <div className="mt-10">
            <CallCta variant="hero" />
          </div>
          <ul className="type-plate mt-10 flex flex-wrap gap-x-6 gap-y-2 text-haze/80">
            <li>Since {site.since}</li>
            <li>Licensed &amp; insured</li>
            <li>24/7 emergency</li>
          </ul>
        </div>
      </section>

      {/* Value props — becomes the choreographed scroll journey in M4;
          this stacked form remains the reduced-motion experience */}
      <ValueProps />

      <TrustStrip />

      <ServiceArea />
    </>
  );
}
