export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  accent = "text-haze",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  accent?: string;
}) {
  const alignCls = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`${alignCls} ${align === "center" ? "mx-auto" : ""} max-w-3xl`}>
      <p className={`type-plate ${accent}`}>{eyebrow}</p>
      <h2 className="type-display mt-4 text-4xl text-mist md:text-6xl">{title}</h2>
      {lede ? <p className={`mt-5 text-lg text-haze ${align === "center" ? "mx-auto" : ""} max-w-xl`}>{lede}</p> : null}
    </div>
  );
}
