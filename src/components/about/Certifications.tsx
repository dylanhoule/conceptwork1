import { certifications } from "@/lib/demo-content";
import { site } from "@/lib/site-config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallCta } from "@/components/ui/CallCta";

export function Certifications() {
  return (
    <section className="border-y border-white/5 bg-panel/40">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionHeading
          eyebrow="Credentials"
          title="Certified, not just confident."
          lede={`${site.license}, and the paperwork behind every claim below.`}
        />
        <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {certifications.map((c) => (
            <div key={c.label} className="border-l-2 border-frost/40 pl-5">
              <dt className="text-lg font-semibold text-mist">{c.label}</dt>
              <dd className="mt-1 text-haze">{c.detail}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12">
          <CallCta variant="mini" label="Questions? Call and ask" />
        </div>
      </div>
    </section>
  );
}
