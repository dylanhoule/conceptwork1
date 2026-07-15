import { site } from "@/lib/site-config";
import { CallCta } from "@/components/ui/CallCta";

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

      {/* Scroll journey placeholder — replaced by the 3D HeroJourney in M3/M4 */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-5">
        <p className="type-plate text-haze/60">Scroll journey — 3D unit lands here</p>
        <CallCta variant="mini" label="Need it fixed today? Call now" />
      </section>

      {/* Trust strip placeholder — designed in M2 */}
      <section className="flex min-h-[40vh] flex-col items-center justify-center gap-6 border-t border-white/5 px-5">
        <p className="type-plate text-haze/60">Trust strip — reviews &amp; badges</p>
        <CallCta variant="mini" />
      </section>

      {/* Service area + final CTA placeholder — designed in M2 */}
      <section className="flex min-h-[50vh] flex-col items-center justify-center gap-8 border-t border-white/5 px-5">
        <h2 className="type-display text-center text-4xl text-mist md:text-6xl">
          Talk to a tech now.
        </h2>
        <CallCta variant="hero" />
      </section>
    </>
  );
}
