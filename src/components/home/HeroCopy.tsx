import { site } from "@/lib/site-config";
import { CallCta } from "@/components/ui/CallCta";

/** Hero headline block — shared by the scroll journey and the static fallback. */
export function HeroCopy() {
  return (
    <div className="max-w-2xl">
      <p className="type-plate text-haze">
        24/7 heating &amp; cooling — {site.serviceArea}
      </p>
      <h1 className="type-display mt-5 text-5xl text-mist md:text-7xl lg:text-8xl">
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
  );
}
