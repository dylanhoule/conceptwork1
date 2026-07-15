import { site } from "@/lib/site-config";
import { PhoneIcon } from "@/components/ui/PhoneIcon";

const ariaLabel = `Call ${site.name} at ${site.phoneDisplay}`;

/**
 * Always-visible call affordance (conversion rule: the number is reachable at
 * every scroll position). Desktop: bottom-right pill wrapped in the
 * frost→ember "temperature ring". Mobile: full-width thumb bar.
 */
export function StickyCallButton() {
  return (
    <>
      {/* Desktop */}
      <div className="fixed right-6 bottom-6 z-50 hidden md:block">
        <span
          className="block rounded-full p-px"
          style={{
            background:
              "conic-gradient(from 140deg, var(--color-frost), var(--color-ember), var(--color-frost))",
          }}
        >
          <a
            href={site.telHref}
            aria-label={ariaLabel}
            className="flex items-center gap-2.5 rounded-full bg-night/85 px-5 py-3 text-sm font-semibold text-mist backdrop-blur-md transition-colors hover:bg-night/60"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
        </span>
      </div>

      {/* Mobile: one-thumb funnel */}
      <div className="fixed inset-x-0 bottom-0 z-50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <a
          href={site.telHref}
          aria-label={ariaLabel}
          className="glow-dual flex h-13 items-center justify-center gap-2.5 rounded-2xl bg-mist text-base font-semibold text-night active:scale-[0.99]"
        >
          <PhoneIcon className="h-5 w-5" />
          Call {site.phoneDisplay}
        </a>
      </div>
    </>
  );
}
