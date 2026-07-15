import { site } from "@/lib/site-config";
import { PhoneIcon } from "./PhoneIcon";

type Variant = "hero" | "section" | "mini";

const ariaLabel = `Call ${site.name} at ${site.phoneDisplay}`;

/**
 * The site's ONE primary action. Every variant is a tel: link. No forms,
 * no secondary funnels (see context/ABOUT.md conversion rules).
 */
export function CallCta({
  variant = "section",
  label,
  className = "",
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  if (variant === "hero") {
    return (
      <a
        href={site.telHref}
        aria-label={ariaLabel}
        className={`glow-dual inline-flex items-center gap-3 rounded-full bg-mist px-8 py-4 text-lg font-semibold text-night transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] ${className}`}
      >
        <PhoneIcon className="h-5 w-5" />
        {label ?? `Call ${site.phoneDisplay}`}
      </a>
    );
  }

  if (variant === "mini") {
    return (
      <a
        href={site.telHref}
        aria-label={ariaLabel}
        className={`inline-flex items-center gap-2 text-sm font-medium text-mist underline decoration-frost/50 underline-offset-4 transition-colors hover:decoration-ember/70 ${className}`}
      >
        <PhoneIcon className="h-3.5 w-3.5" />
        {label ?? `Call ${site.phoneDisplay}`}
      </a>
    );
  }

  return (
    <a
      href={site.telHref}
      aria-label={ariaLabel}
      className={`glass inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold text-mist transition-colors hover:border-white/20 hover:bg-white/10 ${className}`}
    >
      <PhoneIcon className="h-4 w-4" />
      {label ?? `Call ${site.phoneDisplay}`}
    </a>
  );
}
