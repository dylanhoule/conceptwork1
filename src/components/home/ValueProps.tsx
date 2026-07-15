import type { ReactNode } from "react";
import { GlassPanel, type Accent } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallCta } from "@/components/ui/CallCta";

const iconCls = "h-6 w-6";
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export type ValueProp = {
  /** ids match SECTION_RANGES keys in the scroll journey (M4) */
  id: "cooling" | "heating" | "airQuality" | "emergency";
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  accent: Accent;
  accentText: string;
  icon: ReactNode;
};

export const VALUE_PROPS: ValueProp[] = [
  {
    id: "cooling",
    eyebrow: "Cooling",
    title: "Cool. Quiet. Handled.",
    body: "AC repair today, honest quotes before any work starts, and installs done right the first time.",
    cta: "AC down? Call now",
    accent: "frost",
    accentText: "text-frost",
    icon: (
      <svg viewBox="0 0 24 24" className={iconCls} {...stroke} aria-hidden="true">
        <path d="M12 2v20M4 6l16 12M20 6L4 18" />
        <path d="M12 5l-2-2M12 5l2-2M12 19l-2 2M12 19l2 2" />
      </svg>
    ),
  },
  {
    id: "heating",
    eyebrow: "Heating",
    title: "Heat, back on. Fast.",
    body: "Furnaces and heat pumps repaired, replaced, and tuned for the coldest night of the year.",
    cta: "No heat? Call now",
    accent: "ember",
    accentText: "text-ember",
    icon: (
      <svg viewBox="0 0 24 24" className={iconCls} {...stroke} aria-hidden="true">
        <path d="M12 3c3 4-2 5.5 1 9 1.5-1 2-2.5 1.5-4 2.5 1.5 4.5 4.5 4.5 7a7 7 0 0 1-14 0c0-3.5 2.5-5.5 3.5-8 .8 1 1.2 2 1 3.5C11.5 8.5 10.5 6 12 3z" />
      </svg>
    ),
  },
  {
    id: "airQuality",
    eyebrow: "Air quality",
    title: "Air your family can breathe easy about.",
    body: "Filtration, humidity control, and fresh ductwork for allergies, dust, and that stale-house feeling.",
    cta: "Stale air? Call now",
    accent: "mist",
    accentText: "text-mist",
    icon: (
      <svg viewBox="0 0 24 24" className={iconCls} {...stroke} aria-hidden="true">
        <path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h8a2.5 2.5 0 1 1-2.5 2.5" />
      </svg>
    ),
  },
  {
    id: "emergency",
    eyebrow: "24/7 emergency",
    title: "2 AM breakdown? We pick up.",
    body: "A real tech answers day or night. No answering service, no callback queue, no waiting until Monday.",
    cta: "Emergency? Call right now",
    accent: "dual",
    accentText: "bg-gradient-to-r from-frost to-ember bg-clip-text text-transparent",
    icon: (
      <svg viewBox="0 0 24 24" className={iconCls} {...stroke} aria-hidden="true">
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2.5M9 2h6" />
      </svg>
    ),
  },
];

/** One value-prop card, shared by the static stack and the scroll journey overlay. */
export function ValuePropCard({ prop, className = "" }: { prop: ValueProp; className?: string }) {
  return (
    <GlassPanel accent={prop.accent} className={className}>
      <div className="p-7 md:p-9">
        <div className={`flex items-center gap-3 ${prop.accentText}`}>
          {prop.icon}
          <span className="type-plate">{prop.eyebrow}</span>
        </div>
        <h3 className="type-display mt-4 text-2xl text-mist md:text-4xl">{prop.title}</h3>
        <p className="mt-3 max-w-lg text-sm text-haze md:text-base">{prop.body}</p>
        <div className="mt-5">
          <CallCta variant="mini" label={prop.cta} />
        </div>
      </div>
    </GlassPanel>
  );
}

/**
 * Static value-prop stack: the reduced-motion and poster-tier experience
 * (the scroll journey re-choreographs the same cards).
 */
export function ValueProps() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading
        eyebrow="What we fix"
        title="Broken today. Fixed today."
        lede="The AC, the furnace, the air itself. Whatever quit, one number covers it."
      />
      <div className="mt-14 grid gap-6 md:mt-20 md:gap-8">
        {VALUE_PROPS.map((prop, i) => (
          <ValuePropCard
            key={prop.id}
            prop={prop}
            className={`md:max-w-2xl ${i % 2 === 1 ? "md:ml-auto" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
