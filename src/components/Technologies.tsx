"use client";

import Link from "next/link";
import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";
import TechIcon, { techBrandColor } from "./TechIcon";

type TechnologyItem = { title: string; description: string; letter: string; href: string };

type SectionHeaderProps = { eyebrow?: string; title?: string; body?: string };

export default function Technologies({ technologies, header }: { technologies: TechnologyItem[]; header?: SectionHeaderProps }) {
  return (
    <section id="technologies" className="pt-12 lg:pt-16 pb-20 lg:pb-28" style={{ background: "var(--background)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow={header?.eyebrow || "Tech Stack"} title={header?.title || "Platforms we master."}>
            {header?.body || "Cutting-edge platforms powering next-generation enterprise solutions across the region."}
          </SectionHead>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {technologies.map((tech, i) => {
            const color = techBrandColor(tech.title);
            return (
              <SectionReveal key={tech.title} delay={i * 0.06} className="h-full">
                <Link href={tech.href} className="mx-tech-card group h-full flex flex-col rounded-2xl overflow-hidden border t-border" style={{ background: "var(--surface)" }}>
                  {/* Brand-violet panel. The mark sits in a white disc so each
                      platform keeps its own colour instead of being flattened
                      to white against the fill. */}
                  <div className="mx-tech-head flex items-center justify-center">
                    <span
                      className="mx-tech-disc flex items-center justify-center rounded-full"
                      style={{ width: 92, height: 92, background: "#FFFFFF", color, boxShadow: "0 14px 30px -12px rgba(20,16,40,0.45)" }}
                    >
                      <TechIcon name={tech.title} className="w-11 h-11" />
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 p-7">
                    <h3 className="text-lg font-bold transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                      {tech.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{tech.description}</p>
                    <span
                      className="mx-tech-cta mt-6 self-start inline-flex items-center gap-2"
                      style={{ background: "var(--primary)", color: "#fff", fontSize: 13, fontWeight: 600, padding: "10px 18px", borderRadius: 4 }}
                    >
                      Learn more
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
