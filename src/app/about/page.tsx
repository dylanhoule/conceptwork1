import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { CallCta } from "@/components/ui/CallCta";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Story } from "@/components/about/Story";
import { Team } from "@/components/about/Team";
import { Certifications } from "@/components/about/Certifications";
import { Reviews } from "@/components/about/Reviews";
import { ServiceAreaMap } from "@/components/home/ServiceAreaMap";

export const metadata: Metadata = {
  title: "About",
  description: `The team your neighbors call. ${site.name} — licensed, insured, and answering the phone since ${site.since}.`,
};

/** About — the trust page. */
export default function About() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-ember/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-5 pt-40 pb-10 md:px-8">
          <p className="type-plate text-haze">About {site.shortName}</p>
          <h1 className="type-display mt-5 max-w-3xl text-4xl text-mist md:text-7xl">
            The team your neighbors call.
          </h1>
          <p className="mt-6 max-w-md text-lg text-haze">
            Licensed, insured, and answering the phone since {site.since}.
          </p>
          <div className="mt-8">
            <CallCta />
          </div>
        </div>
      </section>

      <Story />
      <Team />
      <Certifications />
      <Reviews />

      {/* Closing CTA + service-area map */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="type-plate text-haze">{site.serviceArea}</p>
            <h2 className="type-display mt-4 text-4xl text-mist md:text-6xl">
              One call. Comfort handled.
            </h2>
            <div className="mt-10">
              <CallCta variant="hero" />
            </div>
          </div>
          <GlassPanel className="p-4 md:p-6">
            <ServiceAreaMap />
          </GlassPanel>
        </div>
      </section>
    </>
  );
}
