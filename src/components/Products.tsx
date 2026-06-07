"use client";

import Link from "next/link";
import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";

const products = [
  { num: "P/01", title: "RealtyAI", desc: "Property management for the AI-first era. Tenants, maintenance, billing, and real-time portfolio analytics — fully UAE-compliant.", tags: ["Property Management", "Tenant Portal", "AI Insights", "RERA / UAE"], href: "/realtyai-property-management-solution" },
  { num: "P/02", title: "SmartFees", desc: "School financial operations — invoicing, expense tracking, payroll, and board-ready financial reports, in one place.", tags: ["Invoicing", "Expense Tracking", "Payroll", "Compliance"], href: "/smartfees-school-admin-solution" },
  { num: "P/03", title: "MaxPayroll", desc: "Modern HR + payroll for UAE employers. Employee self-service, attendance, leave, EOSB, and WPS in a single workflow.", tags: ["HR Management", "Payroll", "Employee Portal", "WPS Ready"], href: "/maxpayroll-hr-management-solution-2" },
];

export default function Products() {
  return (
    <section id="products" className="py-20 lg:py-28" style={{ background: "var(--background)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow="Proprietary Products" title={<>Software<br />we built.</>}>
            Three vertical solutions, each purpose-built for a specific industry challenge in the region.
          </SectionHead>
        </SectionReveal>

        <div className="flex flex-col">
          {products.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 0.08}>
              <Link href={p.href} className="group block" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="grid lg:grid-cols-[120px_1fr_auto] gap-8 lg:gap-16 items-center py-12 lg:py-16">
                  <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "13px", fontWeight: 600, color: "var(--text-muted)" }}>{p.num}</div>
                  <div>
                    <div className="flex items-baseline gap-4 mb-5">
                      <h3 className="ed-display" style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)" }}>{p.title}<span style={{ color: "var(--primary)" }}>.</span></h3>
                      <svg className="w-7 h-7 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{ color: "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                    <p className="leading-relaxed mb-5" style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: "560px" }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} style={{ padding: "5px 11px", border: "1px solid var(--border-strong)", borderRadius: "100px", fontFamily: "var(--font-geist-mono), monospace", fontSize: "10.5px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <ProductGlyph index={i} />
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </div>
    </section>
  );
}

function ProductGlyph({ index }: { index: number }) {
  // three distinct rotating 3D primitives
  if (index === 0) {
    // stacked building blocks
    return (
      <div style={{ width: 150, height: 150, perspective: 700 }}>
        <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", animation: "ed-cube-spin 20s linear infinite" }}>
          {[40, 0, -40].map((y, i) => (
            <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 70 - i * 14, height: 24, background: i === 1 ? "var(--primary-light)" : "var(--text-primary)", transform: `translate(-50%,-50%) translateY(${y}px)` }} />
          ))}
        </div>
      </div>
    );
  }
  if (index === 1) {
    // coin stack
    return (
      <div style={{ width: 150, height: 150, perspective: 700 }}>
        <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", animation: "ed-cube-spin 18s linear infinite" }}>
          {[0, 12, 24, 36].map((z, i) => (
            <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 96, height: 96, margin: -48, borderRadius: "50%", border: "2px solid var(--text-primary)", background: i === 0 ? "var(--primary-light)" : "var(--surface)", transform: `rotateX(70deg) translateZ(${z}px)` }} />
          ))}
        </div>
      </div>
    );
  }
  // wave grid
  return (
    <div style={{ width: 150, height: 150, perspective: 700 }}>
      <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transform: "rotateX(62deg) rotateZ(-15deg)", animation: "ed-pyr-spin 24s linear infinite" }}>
        {Array.from({ length: 25 }).map((_, i) => {
          const r = Math.floor(i / 5), c = i % 5;
          const accent = (r + c) % 3 === 0;
          return <div key={i} style={{ position: "absolute", width: 11, height: 11, borderRadius: "50%", background: accent ? "var(--primary-light)" : "var(--text-primary)", left: `${(c / 4) * 100}%`, top: `${(r / 4) * 100}%`, transform: `translate(-50%,-50%) translateZ(${(r + c) * 4}px)` }} />;
        })}
      </div>
    </div>
  );
}
