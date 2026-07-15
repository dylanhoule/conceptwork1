/**
 * Static hero visual, in the server HTML immediately, so the page has its
 * "wow" before (or without) the canvas. A hand-authored SVG composition of
 * the unit in the dual-glow atmosphere; zero network weight beyond markup.
 *
 * Upgrade paths (no page changes needed):
 * - Capture a real render: open /dev/model, pose the slider, then POST the
 *   canvas to /api/dev/poster (writes public/posters/hero-poster.png) and
 *   swap this component's body for a next/image of that file.
 * - HIGGSFIELD_SLOT: drop in a photoreal AI-generated hero render the same way.
 */
export function Poster({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <radialGradient id="p-frost" cx="0.22" cy="0.25" r="0.55">
            <stop offset="0" stopColor="#57b8ff" stopOpacity="0.22" />
            <stop offset="1" stopColor="#57b8ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="p-ember" cx="0.8" cy="0.72" r="0.55">
            <stop offset="0" stopColor="#ff9e45" stopOpacity="0.2" />
            <stop offset="1" stopColor="#ff9e45" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="p-cab" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2b3038" />
            <stop offset="0.5" stopColor="#3a414d" />
            <stop offset="1" stopColor="#22262e" />
          </linearGradient>
          <radialGradient id="p-floor" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#000" stopOpacity="0.55" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1200" height="800" fill="#0a0c10" />
        <rect width="1200" height="800" fill="url(#p-frost)" />
        <rect width="1200" height="800" fill="url(#p-ember)" />

        {/* floor shadow */}
        <ellipse cx="620" cy="712" rx="270" ry="34" fill="url(#p-floor)" />

        {/* cabinet */}
        <g>
          <rect x="430" y="196" width="380" height="500" rx="18" fill="url(#p-cab)" />
          <rect x="418" y="180" width="404" height="26" rx="10" fill="#171b22" />
          <rect x="446" y="690" width="348" height="18" rx="8" fill="#14181f" />
          {/* feet */}
          <rect x="470" y="708" width="34" height="16" rx="6" fill="#14181f" />
          <rect x="736" y="708" width="34" height="16" rx="6" fill="#14181f" />

          {/* coil fins peeking at the edges */}
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={446 + i * 39} y="216" width="4" height="20" rx="2" fill="#4a5464" />
          ))}

          {/* fan shroud + grille */}
          <circle cx="620" cy="420" r="158" fill="#10141b" />
          <circle cx="620" cy="420" r="158" fill="none" stroke="#0c0f14" strokeWidth="14" />
          {[46, 88, 128].map((r) => (
            <circle key={r} cx="620" cy="420" r={r} fill="none" stroke="#242b36" strokeWidth="5" />
          ))}
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <line
                key={i}
                x1={620 + Math.cos(a) * 24}
                y1={420 + Math.sin(a) * 24}
                x2={620 + Math.cos(a) * 148}
                y2={420 + Math.sin(a) * 148}
                stroke="#242b36"
                strokeWidth="5"
              />
            );
          })}
          {/* fan blades behind the grille */}
          {Array.from({ length: 5 }, (_, i) => {
            const a = (i * 2 * Math.PI) / 5 - 0.5;
            return (
              <ellipse
                key={i}
                cx={620 + Math.cos(a) * 74}
                cy={420 + Math.sin(a) * 74}
                rx="52"
                ry="26"
                fill="#151a22"
                transform={`rotate(${(a * 180) / Math.PI + 90} ${620 + Math.cos(a) * 74} ${420 + Math.sin(a) * 74})`}
              />
            );
          })}
          <circle cx="620" cy="420" r="26" fill="#1c222c" />

          {/* status LED */}
          <circle cx="762" cy="640" r="7" fill="#57b8ff" opacity="0.95" />
          <circle cx="762" cy="640" r="14" fill="#57b8ff" opacity="0.25" />
        </g>

        {/* rim glows on the cabinet edges */}
        <rect x="430" y="196" width="8" height="500" rx="4" fill="#57b8ff" opacity="0.18" />
        <rect x="802" y="196" width="8" height="500" rx="4" fill="#ff9e45" opacity="0.2" />
      </svg>
      {/* settle into the page atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/50" />
    </div>
  );
}
