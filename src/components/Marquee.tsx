"use client";

const DEFAULT_ITEMS = ["DYNAMICS 365", "POWER PLATFORM", "AZURE", "OPENAI", "IoT"];

export default function Marquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "var(--primary-light)", color: "var(--foreground)", padding: "26px 0", overflow: "hidden", transform: "rotate(-1.5deg)", margin: "-12px 0" }}>
      <div style={{ display: "flex", gap: 60, whiteSpace: "nowrap", width: "max-content", animation: "ed-marquee 30s linear infinite" }}>
        {doubled.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 60, fontFamily: "var(--font-geist-mono), monospace", fontSize: 22, fontWeight: 700, textTransform: "uppercase" }}>
            {it}
            <span style={{ color: "var(--foreground)", fontSize: 26, opacity: 0.55 }}>→</span>
          </div>
        ))}
      </div>
    </div>
  );
}
