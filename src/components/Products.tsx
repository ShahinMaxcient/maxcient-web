"use client";

import Image from "next/image";
import Link from "next/link";
import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";

type ProductItem = { num: string; title: string; desc: string; tags: string[]; href: string; image: string };

type SectionHeaderProps = { eyebrow?: string; title?: string; body?: string };

export default function Products({ products, header }: { products: ProductItem[]; header?: SectionHeaderProps }) {
  return (
    <section id="products" className="py-20 lg:py-28" style={{ background: "var(--background)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow={header?.eyebrow || "Proprietary Products"} title={header?.title || "Software we built."}>
            {header?.body || "Three vertical solutions, each purpose-built for a specific industry challenge in the region."}
          </SectionHead>
        </SectionReveal>

        <div className="flex flex-col">
          {products.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 0.08}>
              <Link href={p.href} className="group block" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="grid lg:grid-cols-[88px_1fr_320px] gap-8 lg:gap-14 items-center py-12 lg:py-14">
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
                  {/* framed product image */}
                  <div className="hidden lg:block relative" style={{ aspectRatio: "16/11" }}>
                    <div className="absolute" style={{ inset: 0, border: "1px solid var(--text-primary)", transform: "translate(12px, 12px)", borderRadius: "6px", opacity: 0.5 }} />
                    <div className="relative w-full h-full overflow-hidden" style={{ border: "1px solid var(--border)", borderRadius: "6px" }}>
                      <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" sizes="320px" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(16,12,32,0.35), transparent 55%)" }} />
                    </div>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>

        <SectionReveal>
          <div className="mt-12 flex justify-center">
            <Link
              href="/request-a-consultation"
              className="group inline-flex items-center gap-3 px-8 py-4 transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--text-primary)", color: "var(--background)", fontWeight: 600, fontSize: "15px", borderRadius: "6px" }}
            >
              See more projects
              <svg className="w-[18px] h-[18px] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
