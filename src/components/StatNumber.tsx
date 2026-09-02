import AnimatedCounter from "./AnimatedCounter";

/**
 * Counts up the numeric part of a hero stat while leaving the rest intact.
 *
 * Product stats are display strings, not numbers — "$3B+", "12 wks", "24×7",
 * "55,000+" — so the first digit run is animated and whatever sits either side
 * of it is preserved verbatim.
 *
 * A value that OPENS with a letter is treated as a name rather than a quantity:
 * "D365" is Dynamics 365 and "WPS" is a payroll scheme, and ticking either up
 * to a number would be nonsense.
 */
export default function StatNumber({ value }: { value: string }) {
  const v = (value ?? "").trim();
  if (/^[A-Za-z]/.test(v)) return <>{value}</>;

  const m = /(\d[\d,]*)/.exec(v);
  if (!m) return <>{value}</>;

  const raw = m[1];
  const target = parseInt(raw.replace(/,/g, ""), 10);
  if (!Number.isFinite(target)) return <>{value}</>;

  const at = v.indexOf(raw);
  return (
    <>
      {v.slice(0, at)}
      <AnimatedCounter target={target} grouped={raw.includes(",")} />
      {v.slice(at + raw.length)}
    </>
  );
}
