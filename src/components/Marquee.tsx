const DEFAULT_ITEMS = ["DYNAMICS 365", "POWER PLATFORM", "AZURE", "OPENAI", "IoT"];

export default function Marquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "var(--primary-light)", color: "var(--foreground)", padding: "clamp(13px, 3.2vw, 26px) 0", overflow: "hidden", transform: "rotate(-1.5deg)", margin: "-12px 0" }}>
      <div style={{ display: "flex", gap: "clamp(34px, 8vw, 60px)", whiteSpace: "nowrap", width: "max-content", animation: "ed-marquee 30s linear infinite" }}>
        {doubled.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "clamp(34px, 8vw, 60px)", fontFamily: "var(--font-geist-mono), monospace", fontSize: "clamp(14px, 3.5vw, 22px)", fontWeight: 700, textTransform: "uppercase" }}>
            {it}
            <span style={{ color: "var(--foreground)", fontSize: "clamp(16px, 4vw, 26px)", opacity: 0.55 }}>→</span>
          </div>
        ))}
      </div>
    </div>
  );
}
