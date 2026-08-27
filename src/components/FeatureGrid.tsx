"use client";

import SectionReveal from "./SectionReveal";
import BrandMark from "./BrandMark";
import FeatureIcon from "./FeatureIcon";

interface Feature {
  title: string;
  description: string;
  bullets?: string[];
}

export default function FeatureGrid({ id, title, subtitle, features }: { id?: string; title: string; subtitle: string; features: Feature[] }) {
  return (
    <section id={id} className="py-14 lg:py-24" style={{ background: "var(--background)", scrollMarginTop: "88px" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-20 items-end mb-16">
            <div>
              <div className="mb-4" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)" }}>
                <BrandMark />Capabilities
              </div>
              <h2 className="ed-display" style={{ fontSize: "clamp(1.65rem, 3.2vw, 2.6rem)" }}>{title}</h2>
            </div>
            <p className="leading-relaxed" style={{ fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: "480px" }}>{subtitle}</p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {features.map((feature, i) => (
            <SectionReveal key={i} delay={(i % 4) * 0.06} className="h-full">
              <div className="mx-cap h-full p-7 rounded-2xl border t-border" style={{ background: "var(--surface)" }}>
                <div className="flex items-center justify-between">
                  <span className="mx-cap-badge flex items-center justify-center rounded-xl" style={{ width: 48, height: 48 }}>
                    <FeatureIcon name={feature.title} />
                  </span>
                  <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 700, color: "var(--border-strong)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-bold" style={{ color: "var(--text-primary)", fontSize: "0.95rem", letterSpacing: "-0.01em" }}>{feature.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{feature.description}</p>
                {feature.bullets && feature.bullets.length > 0 && (
                  <ul className="mt-3.5 space-y-1.5">
                    {feature.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--primary)" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
