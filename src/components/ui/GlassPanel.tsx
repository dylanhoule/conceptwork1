import type { ReactNode } from "react";

export type Accent = "frost" | "ember" | "mist" | "dual";

const accentGlow: Record<Accent, string> = {
  frost: "bg-frost/20",
  ember: "bg-ember/20",
  mist: "bg-white/10",
  dual: "bg-gradient-to-r from-frost/20 to-ember/20",
};

/**
 * Glass surface with a soft accent glow in the corner. The inner gradient
 * darkens toward the text area to keep body copy ≥4.5:1 on the blur.
 */
export function GlassPanel({
  accent = "mist",
  className = "",
  children,
}: {
  accent?: Accent;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`glass relative overflow-hidden rounded-3xl ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute -top-20 -left-20 h-56 w-56 rounded-full blur-3xl ${accentGlow[accent]}`}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
