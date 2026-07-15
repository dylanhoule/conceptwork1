/**
 * Stylized service-area map — pure inline SVG, no map embed, no API keys.
 * Abstract streets + coverage rings radiating from the Summit HQ dot.
 * HIGGSFIELD_SLOT: could be replaced by a rendered map illustration later.
 */
export function ServiceAreaMap() {
  return (
    <svg
      viewBox="0 0 480 360"
      className="h-auto w-full"
      role="img"
      aria-label="Stylized map of the Summit service area around Fairview"
    >
      <defs>
        <radialGradient id="map-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--color-frost)" stopOpacity="0.14" />
          <stop offset="0.6" stopColor="var(--color-ember)" stopOpacity="0.05" />
          <stop offset="1" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="480" height="360" fill="url(#map-glow)" />

      {/* Abstract street grid */}
      <g stroke="white" strokeOpacity="0.07" strokeWidth="1.5" fill="none">
        <path d="M0 90 C120 80 200 110 480 95" />
        <path d="M0 180 C160 170 300 195 480 178" />
        <path d="M0 270 C140 285 320 255 480 268" />
        <path d="M90 0 C100 130 80 240 95 360" />
        <path d="M240 0 C230 120 250 250 238 360" />
        <path d="M380 0 C390 140 370 230 385 360" />
        <path d="M0 30 C180 45 330 20 480 38" />
      </g>

      {/* Coverage rings */}
      <g fill="none">
        <circle cx="240" cy="180" r="60" stroke="var(--color-frost)" strokeOpacity="0.35" strokeWidth="1.5" />
        <circle cx="240" cy="180" r="110" stroke="white" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="240" cy="180" r="160" stroke="var(--color-ember)" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 8" />
      </g>

      {/* Neighborhood dots */}
      <g fill="var(--color-haze)">
        <circle cx="150" cy="110" r="3.5" />
        <circle cx="335" cy="130" r="3.5" />
        <circle cx="130" cy="250" r="3.5" />
        <circle cx="350" cy="255" r="3.5" />
        <circle cx="255" cy="70" r="3.5" />
        <circle cx="240" cy="300" r="3.5" />
      </g>

      {/* HQ dot — pulses unless the visitor prefers reduced motion */}
      <circle cx="240" cy="180" r="10" fill="var(--color-frost)" fillOpacity="0.25" className="motion-safe:animate-ping" style={{ transformOrigin: "240px 180px" }} />
      <circle cx="240" cy="180" r="6" fill="var(--color-mist)" />
      <circle cx="240" cy="180" r="3" fill="var(--color-ember)" />
    </svg>
  );
}
