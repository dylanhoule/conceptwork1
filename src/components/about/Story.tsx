import { site } from "@/lib/site-config";
import { stats } from "@/lib/demo-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallCta } from "@/components/ui/CallCta";

export function Story() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <SectionHeading
          eyebrow="Our story"
          title={`One van. ${new Date().getFullYear() - site.since} winters.`}
        />
        <div className="space-y-5 text-lg text-haze">
          <p>
            Summit started in {site.since} with one van, one toolbox, and a simple rule: show up
            when you said you would, and fix it like it&rsquo;s your own house.
          </p>
          <p>
            Two decades later there are more vans and more faces, but the rule hasn&rsquo;t moved.
            We still answer our own phones. We still quote before we touch anything. And we still
            treat a 2 am no-heat call like the emergency it is.
          </p>
          <p>
            Most of our work comes from the same streets, year after year — the neighbor who
            called us once and never called anyone else again.
          </p>
          <div className="pt-2">
            <CallCta variant="mini" label="Become a neighbor — call us" />
          </div>
        </div>
      </div>

      <dl className="mt-16 grid gap-6 border-t border-white/5 pt-10 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col">
            <dt className="type-plate order-2 mt-2 text-haze/80">{s.label}</dt>
            <dd className="type-display order-1 text-4xl text-mist md:text-5xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
