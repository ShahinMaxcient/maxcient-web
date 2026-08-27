"use client";

import { RevealGroup, RevealItem } from "./RevealGroup";
import BrandMark from "./BrandMark";
import AnimatedCounter from "./AnimatedCounter";

type StatItem = { eyebrow: string; value: number; suffix: string; label: string };
type SectionHeaderProps = { eyebrow?: string; title?: string; body?: string };

/** Strips a leading "01 — " style prefix, keeping the meaningful label. */
const cleanLabel = (s?: string) => s?.replace(/^\s*[A-Za-z]?\/?\d+\s*[—–-]?\s*/, "") ?? "";

export default function SocialProof({ stats, header }: { stats: StatItem[]; header?: SectionHeaderProps }) {
  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: "var(--surface-alt)" }}>
      {/* No bloom here. The band already reads as its own moment from the
          --surface-alt fill and its hard top edge; the blurred violet ellipse
          that used to sit here spilled diagonally across the section and was
          the most visible "stain" on the page. */}

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 relative">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-20 items-end mb-14">
          <div>
            <div className="mb-4" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)" }}>
              <BrandMark />{header?.eyebrow || "By the Numbers"}
            </div>
            <h2 className="ed-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.9rem)" }}>{header?.title || "Trusted across the GCC."}</h2>
          </div>
          <p className="leading-relaxed" style={{ fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: "480px" }}>
            {header?.body || "Nearly a decade of measurable outcomes — from implementation velocity to satisfaction scores that outperform the regional average."}
          </p>
        </div>

        {/* Elevated cards rather than a flat bordered row: each stat gets an
            accent rule, a gradient numeral and room to breathe. */}
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.09}>
          {stats.map((s, i) => (
            <RevealItem key={s.eyebrow || i}>
              <div
                className="ed-service-card group h-full flex flex-col"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "26px 24px 28px",
                }}
              >
                <span
                  aria-hidden
                  className="block transition-all duration-300 group-hover:w-16"
                  style={{ width: 34, height: 3, borderRadius: 3, background: "linear-gradient(90deg, var(--primary), var(--primary-light))" }}
                />
                <div
                  className="mt-6"
                  style={{
                    fontSize: "clamp(2.4rem, 4.2vw, 3.4rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.045em",
                    lineHeight: 0.95,
                    background: "linear-gradient(135deg, var(--text-primary) 30%, var(--primary) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div
                  className="mt-4"
                  style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--primary)" }}
                >
                  {cleanLabel(s.eyebrow)}
                </div>
                <div className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
