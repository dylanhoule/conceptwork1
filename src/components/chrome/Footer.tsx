import { site } from "@/lib/site-config";
import { LogoMark } from "@/components/ui/LogoMark";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-abyss">
      {/* Extra bottom padding on mobile so the sticky call bar never covers content */}
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-28 md:px-8 md:pb-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark id="logo-grad-footer" className="h-6 w-6" />
              <span className="type-display text-base text-mist">
                {site.shortName.toUpperCase()}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-haze">{site.tagline}</p>
            <p className="type-plate mt-4 text-haze/80">Since {site.since}</p>
          </div>

          <div>
            <p className="type-plate text-haze/80">Talk to a tech</p>
            <a
              href={site.telHref}
              aria-label={`Call ${site.name} at ${site.phoneDisplay}`}
              className="type-display mt-3 block text-2xl text-mist transition-colors hover:text-frost"
            >
              {site.phoneDisplay}
            </a>
            <p className="mt-2 text-sm text-haze">{site.hours}</p>
            <p className="mt-1 text-sm text-haze">{site.serviceArea}</p>
          </div>

          <div>
            <p className="type-plate text-haze/80">Credentials</p>
            <ul className="mt-3 space-y-1.5 text-sm text-haze">
              {site.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
              <li>{site.license}</li>
            </ul>
          </div>
        </div>

        {/* md:pr keeps the credit clear of the fixed call pill bottom-right */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/5 pt-6 md:flex-row md:justify-between md:pr-48">
          <p className="text-xs text-haze/70">
            © {new Date().getFullYear()} {site.name}
          </p>
          {/* The actual lead-gen hook */}
          <p className="type-plate bg-gradient-to-r from-frost to-ember bg-clip-text text-transparent">
            {site.studio.credit}
          </p>
        </div>
      </div>
    </footer>
  );
}
