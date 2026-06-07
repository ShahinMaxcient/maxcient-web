"use client";

import Link from "next/link";
import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";

const technologies = [
  { title: "Microsoft Dynamics 365", description: "Intuitive, adaptable enterprise applications that grow with you.", letter: "D365", href: "/microsoft-dynamics-365" },
  { title: "Power Platform", description: "Connect data, build apps, and automate workflows for everyone.", letter: "PP", href: "/microsoft-power-platform" },
  { title: "Microsoft Azure", description: "Endless cloud capabilities and global infrastructure.", letter: "Az", href: "/microsoft-azure" },
  { title: "Settlemint Blockchain", description: "Unmatched security and transparency for transactions.", letter: "BC", href: "/settlemint-blockchain" },
  { title: "OpenAI", description: "Advanced AI models to drive innovation and automate processes.", letter: "AI", href: "/open-ai" },
  { title: "IoT", description: "Real-time insights and control from the edge to the cloud.", letter: "IoT", href: "/iot-internet-of-things" },
];

export default function Technologies() {
  return (
    <section id="technologies" className="py-20 lg:py-28" style={{ background: "var(--background)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow="Tech Stack" title={<>Platforms<br />we master.</>}>
            Cutting-edge platforms powering next-generation enterprise solutions across the region.
          </SectionHead>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}>
          {technologies.map((tech, i) => (
            <SectionReveal key={tech.title} delay={i * 0.06}>
              <Link href={tech.href} className="group block h-full">
                <div className="h-full p-8 transition-colors duration-300" style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div className="flex items-center justify-center transition-colors duration-300"
                    style={{ width: 56, height: 56, border: "1px solid var(--text-primary)", borderRadius: "4px", fontFamily: "var(--font-geist-mono), monospace", fontWeight: 700, fontSize: "13px", color: "var(--text-primary)" }}
                  >
                    {tech.letter}
                  </div>
                  <h3 className="mt-6 text-lg font-bold transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{tech.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{tech.description}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--primary)" }}>
                    Explore <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
