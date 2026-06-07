"use client";

import SectionReveal from "./SectionReveal";

interface Feature {
  title: string;
  description: string;
}

export default function FeatureGrid({ title, subtitle, features }: { title: string; subtitle: string; features: Feature[] }) {
  return (
    <section className="py-20 lg:py-24" style={{ background: "var(--background)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-20 items-end mb-16">
            <div>
              <div className="mb-4" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)" }}>
                <span style={{ color: "var(--primary)" }}>// </span>Capabilities
              </div>
              <h2 className="ed-display" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>{title}</h2>
            </div>
            <p className="leading-relaxed" style={{ fontSize: "1.05rem", color: "var(--text-muted)", maxWidth: "480px" }}>{subtitle}</p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}>
          {features.map((feature, i) => (
            <SectionReveal key={i} delay={(i % 4) * 0.06}>
              <div className="h-full p-7 transition-colors duration-300" style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 700, color: "var(--primary)" }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-4 font-bold" style={{ color: "var(--text-primary)", fontSize: "1.05rem", letterSpacing: "-0.01em" }}>{feature.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{feature.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
