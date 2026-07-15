import { site } from "@/lib/site-config";
import { reviews } from "@/lib/demo-content";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { CallCta } from "@/components/ui/CallCta";

export function TrustStrip() {
  return (
    <section className="border-y border-white/5 bg-panel/40">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="flex flex-col items-center gap-3 text-center">
          <StarRating rating={site.rating.stars} />
          <p className="text-lg font-semibold text-mist">
            {site.rating.stars} · {site.rating.count}
          </p>
          <p className="type-plate text-haze/80">The neighbors&rsquo; verdict</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <GlassPanel key={r.name} className="p-7">
              <blockquote className="text-mist">&ldquo;{r.quote}&rdquo;</blockquote>
              <p className="type-plate mt-4 text-haze/80">
                {r.name}, {r.area}
              </p>
            </GlassPanel>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Badge label={`Since ${site.since}`} />
          {site.credentials.map((c) => (
            <Badge key={c} label={c} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <CallCta label={`Join them: call ${site.phoneDisplay}`} />
        </div>
      </div>
    </section>
  );
}
