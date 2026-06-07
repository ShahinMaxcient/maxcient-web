"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import SectionReveal from "./SectionReveal";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (ts: number) => { if (!start) start = ts; const p = Math.min((ts - start) / duration, 1); setCount(Math.floor(p * target)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [isInView, target]);
  return <div ref={ref}>{count}{suffix}</div>;
}

export default function SocialProof() {
  return (
    <section id="about" className="py-16 lg:py-20 relative overflow-hidden" style={{ background: "var(--surface-alt)" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <SectionReveal>
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--primary-light)" }}>Why Choose Us</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                Trusted by UAE&apos;s <span className="gradient-text">Leading Enterprises</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                To our happy customers we are a technology partner, not just a vendor. Collaborative growth through trusted, mutually beneficial partnerships.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 100, suffix: "%", label: "On-Time Delivery" },
                { value: 50, suffix: "+", label: "Years Experience" },
                { value: 5, suffix: "/5", label: "Client Rating" },
                { value: 6, suffix: "", label: "Global Offices" },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-light rounded-2xl p-6" style={{ boxShadow: "var(--shadow)" }}
                >
                  <div className="text-3xl font-bold gradient-text"><AnimatedCounter target={stat.value} suffix={stat.suffix} /></div>
                  <div className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
