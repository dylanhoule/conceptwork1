import { site } from "@/lib/site-config";
import { reviews } from "@/lib/demo-content";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { CallCta } from "@/components/ui/CallCta";

export function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <SectionHeading
        eyebrow="Reviews"
        title={`${site.rating.stars} stars, ${site.rating.count.replace(" five-star reviews", " reviews")}.`}
        lede="Unedited, from the streets we service."
      />
      <div className="mt-14 columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
        {reviews.map((r) => (
          <GlassPanel key={r.name} className="break-inside-avoid p-7">
            <StarRating rating={5} label="Rated 5 out of 5 stars" />
            <blockquote className="mt-4 text-mist">&ldquo;{r.quote}&rdquo;</blockquote>
            <p className="type-plate mt-4 text-haze/80">
              {r.name}, {r.area}
            </p>
          </GlassPanel>
        ))}
      </div>
      <div className="mt-12">
        <CallCta variant="mini" label="Want the same treatment? Call now" />
      </div>
    </section>
  );
}
