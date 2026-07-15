import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { CallCta } from "@/components/ui/CallCta";

export const metadata: Metadata = {
  title: "About",
  description: `The team your neighbors call. ${site.name} — licensed, insured, and answering the phone since ${site.since}.`,
};

/** About — the trust page. M1 stubs; fully designed in M2. */
export default function About() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-40 pb-20 md:px-8">
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
      </section>

      {/* Story / Team / Certifications / Reviews — designed in M2 */}
      {["Story", "Team", "Certifications", "Reviews"].map((label) => (
        <section
          key={label}
          className="flex min-h-[30vh] flex-col items-center justify-center gap-5 border-t border-white/5 px-5"
        >
          <p className="type-plate text-haze/60">{label}</p>
          <CallCta variant="mini" />
        </section>
      ))}

      <section className="flex min-h-[40vh] flex-col items-center justify-center gap-8 border-t border-white/5 px-5">
        <h2 className="type-display text-center text-4xl text-mist md:text-6xl">
          One call. Comfort handled.
        </h2>
        <CallCta variant="hero" />
      </section>
    </>
  );
}
