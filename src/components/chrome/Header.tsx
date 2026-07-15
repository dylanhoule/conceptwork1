import Link from "next/link";
import { site } from "@/lib/site-config";
import { LogoMark } from "@/components/ui/LogoMark";
import { PhoneIcon } from "@/components/ui/PhoneIcon";

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-night/90 via-night/50 to-transparent">
      <div className="pointer-events-auto mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name}, home`}>
          <LogoMark id="logo-grad-header" />
          <span className="leading-none">
            <span className="type-display block text-lg text-mist">
              {site.shortName.toUpperCase()}
            </span>
            <span className="type-plate block text-[0.55rem] text-haze">Heating &amp; Air</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm font-medium text-haze transition-colors hover:text-mist"
          >
            About
          </Link>
          {/* Header phone hides on small screens; the sticky bottom bar owns mobile */}
          <a
            href={site.telHref}
            aria-label={`Call ${site.name} at ${site.phoneDisplay}`}
            className="hidden items-center gap-2 text-sm font-semibold text-mist transition-colors hover:text-frost md:inline-flex"
          >
            <PhoneIcon className="h-4 w-4 text-frost" />
            {site.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
