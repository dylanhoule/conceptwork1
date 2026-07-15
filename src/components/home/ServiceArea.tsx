import { site } from "@/lib/site-config";
import { neighborhoods } from "@/lib/demo-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { CallCta } from "@/components/ui/CallCta";
import { ServiceAreaMap } from "./ServiceAreaMap";

export function ServiceArea() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <SectionHeading
            eyebrow="Service area"
            title="Talk to a tech now."
            lede={`If you're in ${site.serviceArea.replace(" & surrounding areas", "")} or nearby, we're already close.`}
          />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {neighborhoods.map((n) => (
              <li
                key={n}
                className="glass rounded-full px-4 py-1.5 text-sm text-haze"
              >
                {n}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <CallCta variant="hero" />
          </div>
        </div>
        <GlassPanel className="p-4 md:p-6">
          <ServiceAreaMap />
        </GlassPanel>
      </div>
    </section>
  );
}
