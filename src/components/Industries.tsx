"use client";

import Image from "next/image";
import Link from "next/link";
import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";

type IndustryItem = { title: string; num: string; href: string; image: string; span: string };

type SectionHeaderProps = { eyebrow?: string; title?: string; body?: string };

export default function Industries({ industries, header }: { industries: IndustryItem[]; header?: SectionHeaderProps }) {
  return (
    <section id="industries" className="py-20 lg:py-28" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow={header?.eyebrow || "Industries"} title={header?.title || "Sectors we know cold."}>
            {header?.body || "Deep domain expertise across the verticals that drive the UAE and GCC economy."}
          </SectionHead>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 lg:auto-rows-[180px]">
          {industries.map((ind, i) => {
            const big = ind.span.includes("row-span-2");
            return (
            <SectionReveal key={ind.title} delay={i * 0.06} className={ind.span}>
              <Link href={ind.href} className="block h-full">
                <div className="group relative h-full overflow-hidden transition-transform duration-500 hover:scale-[0.985]" style={{ borderRadius: "4px", minHeight: "180px" }}>
                  <Image src={ind.image} alt={ind.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.78) 0%, transparent 60%)" }} />
                  <div className="absolute bottom-0 left-0 p-7">
                    <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: big ? "13px" : "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(245,242,235,0.7)", marginBottom: 8 }}>{ind.num}</div>
                    <div style={{ fontSize: big ? "2.5rem" : "1.5rem", fontWeight: 700, letterSpacing: "-0.025em", color: "#F5F2EB", lineHeight: 1 }}>{ind.title}</div>
                  </div>
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
