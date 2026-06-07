"use client";

import AnimatedCard from "./AnimatedCard";
import SectionReveal from "./SectionReveal";
import Link from "next/link";

const technologies = [
  { title: "Microsoft Dynamics 365", description: "Intuitive, adaptable enterprise applications that grow with you.", letter: "D365", gradient: "from-blue-500 to-blue-700", href: "/microsoft-dynamics-365" },
  { title: "Power Platform", description: "Connect data, build apps, and automate workflows for everyone.", letter: "PP", gradient: "from-purple-500 to-purple-700", href: "/microsoft-power-platform" },
  { title: "Microsoft Azure", description: "Endless cloud capabilities and global infrastructure.", letter: "Az", gradient: "from-sky-500 to-sky-700", href: "/microsoft-azure" },
  { title: "Settlemint Blockchain", description: "Unmatched security and transparency for transactions.", letter: "BC", gradient: "from-emerald-500 to-emerald-700", href: "/settlemint-blockchain" },
  { title: "OpenAI", description: "Advanced AI models to drive innovation and automate processes.", letter: "AI", gradient: "from-gray-500 to-gray-700", href: "/open-ai" },
  { title: "IoT", description: "Real-time insights and control from the edge to the cloud.", letter: "IoT", gradient: "from-orange-500 to-orange-700", href: "/iot-internet-of-things" },
];

export default function Technologies() {
  return (
    <section id="technologies" className="py-16 lg:py-20 relative" style={{ background: "var(--background)" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>Tech Stack</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>Technologies We Work With</h2>
            <p className="mt-6 text-lg" style={{ color: "var(--text-muted)" }}>Cutting-edge platforms powering next-generation enterprise solutions.</p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, i) => (
            <AnimatedCard key={tech.title} delay={i * 0.1}>
              <Link href={tech.href} className="block">
                <div className="glass-light rounded-2xl p-8 transition-all duration-500 group text-center" style={{ boxShadow: "var(--shadow)" }}>
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    {tech.letter}
                  </div>
                  <h3 className="mt-6 text-lg font-bold group-hover:text-[var(--primary-light)] transition-colors" style={{ color: "var(--text-primary)" }}>{tech.title}</h3>
                  <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>{tech.description}</p>
                </div>
              </Link>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
