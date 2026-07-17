"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = (ts: number) => { if (!start) start = ts; const p = Math.min((ts - start) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [isInView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

type StatItem = { eyebrow: string; value: number; suffix: string; label: string };

export default function SocialProof({ stats }: { stats: StatItem[] }) {
  return (
    <section id="about" className="py-20 lg:py-28" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-20 items-end mb-16">
          <div>
            <div className="mb-4" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)" }}>
              <span style={{ color: "var(--primary)" }}>// </span>By the Numbers
            </div>
            <h2 className="ed-display" style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)" }}>Trusted across<br />the GCC.</h2>
          </div>
          <p className="leading-relaxed" style={{ fontSize: "1.05rem", color: "var(--text-muted)", maxWidth: "480px" }}>
            Nearly a decade of measurable outcomes — from implementation velocity to satisfaction
            scores that outperform the regional average.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ borderTop: "1px solid var(--border)" }}>
          {stats.map((s, i) => (
            <div key={s.eyebrow || i} className="py-12 pr-9" style={{ borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
              <div className="mb-7" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "10.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)" }}>{s.eyebrow}</div>
              <div style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.9, color: "var(--text-primary)" }}>
                <AnimatedCounter target={s.value} /><span style={{ color: "var(--primary)" }}>{s.suffix}</span>
              </div>
              <div className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "200px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
