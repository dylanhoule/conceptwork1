function Star({ fill = 1, index }: { fill?: number; index: number }) {
  const id = `star-clip-${index}-${Math.round(fill * 100)}`;
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={24 * fill} height="24" />
        </clipPath>
      </defs>
      <path
        d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.57l-5.9 3.11 1.13-6.58L2.45 9.44l6.6-.96L12 2.5z"
        fill="color-mix(in oklab, var(--color-ember) 25%, transparent)"
      />
      <path
        d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.57l-5.9 3.11 1.13-6.58L2.45 9.44l6.6-.96L12 2.5z"
        fill="var(--color-ember)"
        clipPath={`url(#${id})`}
      />
    </svg>
  );
}

export function StarRating({ rating = 4.9, label }: { rating?: number; label?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1"
      role="img"
      aria-label={label ?? `Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} index={i} fill={Math.min(1, Math.max(0, rating - i))} />
      ))}
    </span>
  );
}
