"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedCard from "./AnimatedCard";
import SectionReveal from "./SectionReveal";

const industries = [
  { title: "Manufacturing", description: "Intelligent manufacturing solutions.", href: "/manufacturing", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" },
  { title: "Real Estate", description: "Digital property management.", href: "/real-estate", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80" },
  { title: "Retail", description: "Advanced analytics & engagement.", href: "/retail", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80" },
  { title: "Distribution", description: "Real-time operational visibility.", href: "/distribution", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
  { title: "Professional Services", description: "Dynamic service solutions.", href: "/professional-services", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80" },
];

export default function Industries() {
  return (
    <section id="industries" className="py-16 lg:py-20 relative" style={{ background: "var(--background)" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>Sectors</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>Industries We Serve</h2>
            <p className="mt-6 text-lg" style={{ color: "var(--text-muted)" }}>Deep expertise across key sectors driving the UAE and GCC economy.</p>
          </div>
        </SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <AnimatedCard key={ind.title} delay={i * 0.1}>
              <Link href={ind.href} className="block">
                <div className="group relative rounded-2xl overflow-hidden h-72 shadow-lg">
                  <Image src={ind.image} alt={ind.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-[var(--primary-dark)]/80 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white">{ind.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{ind.description}</p>
                  </div>
                </div>
              </Link>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
