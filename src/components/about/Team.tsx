import { team } from "@/lib/demo-content";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallCta } from "@/components/ui/CallCta";

/* HIGGSFIELD_SLOT: swap monogram avatars for AI-generated team portraits */
function Monogram({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  // Alternate the temperature of each avatar's glow
  const warm = index % 2 === 1;
  return (
    <div
      aria-hidden="true"
      className={`flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br ${
        warm ? "from-ember/30 to-frost/10" : "from-frost/30 to-ember/10"
      }`}
    >
      <span className="type-display text-xl text-mist">{initials}</span>
    </div>
  );
}

export function Team() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <SectionHeading
        eyebrow="The crew"
        title="Faces you'll recognize."
        lede="Small team, long tenures: the tech who shows up this year is the one who showed up last year."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, i) => (
          <GlassPanel key={member.name} accent={i % 2 === 1 ? "ember" : "frost"} className="p-7">
            <Monogram name={member.name} index={i} />
            <h3 className="mt-5 text-lg font-semibold text-mist">{member.name}</h3>
            <p className="type-plate mt-1 text-haze/80">{member.role}</p>
            <p className="mt-3 text-sm text-haze">{member.line}</p>
          </GlassPanel>
        ))}
      </div>
      <div className="mt-12">
        <CallCta variant="mini" label="Talk to one of us now" />
      </div>
    </section>
  );
}
