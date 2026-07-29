"use client";

import SectionReveal from "./SectionReveal";

type Reason = { title: string; body: string };

/**
 * "Why choose {product}" band — three numbered value paragraphs, used on
 * product pages between the hero and the feature grid.
 */
export default function WhyChoose({ product, reasons }: { product: string; reasons: Reason[] }) {
  return (
    <section className="py-20 lg:py-24" style={{ background: "var(--surface-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <div className="mb-12">
            <div className="mb-4" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)" }}>
              <span style={{ color: "var(--primary)" }}>// </span>Why {product}
            </div>
            <h2 className="ed-display" style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}>Built to deliver, not just to demo.</h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {reasons.map((r, i) => (
            <SectionReveal key={r.title} delay={i * 0.08}>
              <div>
                <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 700, color: "var(--primary)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-bold" style={{ color: "var(--text-primary)", fontSize: "1.15rem", letterSpacing: "-0.01em" }}>{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{r.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
