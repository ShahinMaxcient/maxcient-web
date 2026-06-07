"use client";

/**
 * Marquee — angled scrolling tech-stack band.
 * Pure CSS animation; respects prefers-reduced-motion via globals.
 */
const items = ["DYNAMICS 365", "POWER PLATFORM", "AZURE", "OPENAI", "SETTLEMINT", "IoT"];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "var(--text-primary)", color: "var(--background)", padding: "26px 0", overflow: "hidden", transform: "rotate(-1.5deg)", margin: "-12px 0" }}>
      <div style={{ display: "flex", gap: 60, whiteSpace: "nowrap", width: "max-content", animation: "ed-marquee 30s linear infinite" }}>
        {doubled.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 60, fontFamily: "var(--font-geist-mono), monospace", fontSize: 22, fontWeight: 700, textTransform: "uppercase" }}>
            {it}
            <span style={{ color: "var(--primary)", fontSize: 26 }}>→</span>
          </div>
        ))}
      </div>
    </div>
  );
}
