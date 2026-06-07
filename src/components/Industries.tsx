"use client";

import Image from "next/image";
import Link from "next/link";
import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";

const industries = [
  { title: "Manufacturing", num: "I/01", href: "/manufacturing", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80", span: "lg:col-span-7 lg:row-span-2", big: true },
  { title: "Real Estate", num: "I/02", href: "/real-estate", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80", span: "lg:col-span-5" },
  { title: "Retail", num: "I/03", href: "/retail", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80", span: "lg:col-span-5" },
  { title: "Distribution", num: "I/04", href: "/distribution", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80", span: "lg:col-span-4" },
  { title: "Professional Services", num: "I/05", href: "/professional-services", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80", span: "lg:col-span-8" },
];

export default function Industries() {
  return (
    <section id="industries" className="py-20 lg:py-28" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow="Industries" title={<>Sectors we<br />know cold.</>}>
            Deep domain expertise across the verticals that drive the UAE and GCC economy.
          </SectionHead>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 lg:auto-rows-[180px]">
          {industries.map((ind, i) => (
            <SectionReveal key={ind.title} delay={i * 0.06} className={ind.span}>
              <Link href={ind.href} className="block h-full">
                <div className="group relative h-full overflow-hidden transition-transform duration-500 hover:scale-[0.985]" style={{ borderRadius: "4px", minHeight: "180px" }}>
                  <Image src={ind.image} alt={ind.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.78) 0%, transparent 60%)" }} />
                  <div className="absolute bottom-0 left-0 p-7">
                    <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: ind.big ? "13px" : "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(245,242,235,0.7)", marginBottom: 8 }}>{ind.num}</div>
                    <div style={{ fontSize: ind.big ? "2.5rem" : "1.5rem", fontWeight: 700, letterSpacing: "-0.025em", color: "#F5F2EB", lineHeight: 1 }}>{ind.title}</div>
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
