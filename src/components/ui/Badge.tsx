export function Badge({ label }: { label: string }) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-mist">
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 text-frost"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2l7 4v6c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
      {label}
    </span>
  );
}
