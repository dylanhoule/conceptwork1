/** Twin-peak mark stroked with the frost→ember gradient. */
export function LogoMark({
  id = "logo-grad",
  className = "h-7 w-7",
}: {
  id?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-frost)" />
          <stop offset="1" stopColor="var(--color-ember)" />
        </linearGradient>
      </defs>
      <path
        d="M4 25 L13 8 L17.5 15.5 L21.5 9.5 L28 25 Z"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
