"use client";

import AnimatedCard from "./AnimatedCard";
import SectionReveal from "./SectionReveal";

interface Feature {
  title: string;
  description: string;
}

export default function FeatureGrid({ title, subtitle, features }: { title: string; subtitle: string; features: Feature[] }) {
  return (
    <section className="py-14 lg:py-16" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>{title}</h2>
            <p className="mt-4 text-lg" style={{ color: "var(--text-muted)" }}>{subtitle}</p>
          </div>
        </SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <AnimatedCard key={i} delay={i * 0.08}>
              <div className="glass-light rounded-2xl p-6 transition-all group h-full" style={{ boxShadow: "var(--shadow)" }}>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--violet)] flex items-center justify-center text-white font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 font-semibold group-hover:text-[var(--primary-light)] transition-colors" style={{ color: "var(--text-primary)" }}>{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{feature.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
