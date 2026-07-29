"use client";

import Image from "next/image";
import Link from "next/link";
import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";

type ProductItem = { num: string; title: string; desc: string; tags: string[]; href: string; image: string };

type SectionHeaderProps = { eyebrow?: string; title?: string; body?: string };

function ProductCard({ p }: { p: ProductItem }) {
  return (
    <Link href={p.href} className="group block h-full">
      <div
        className="ed-service-card relative h-full overflow-hidden flex flex-col"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px" }}
      >
        {/* image header. Mobile: flex-1 so the image absorbs any extra card
            height (equal-height cards, no blank space). sm+: fixed 16/10. */}
        <div className="relative w-full overflow-hidden flex-1 min-h-[180px] sm:flex-none sm:min-h-0 sm:aspect-[16/10]">
          <Image
            src={p.image}
            alt={p.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(16,12,32,0.55), rgba(16,12,32,0.06) 60%)" }} />
          {/* number chip */}
          <span
            className="absolute"
            style={{ left: 16, top: 16, padding: "5px 10px", borderRadius: 8, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)", fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", color: "var(--text-primary)" }}
          >
            {p.num}
          </span>
          {/* arrow */}
          <span
            className="ed-service-arrow absolute flex items-center justify-center"
            style={{ right: 16, top: 16, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.92)", color: "#14101f" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </span>
        </div>

        {/* body — natural height; the image above flexes to fill */}
        <div className="flex flex-col" style={{ padding: "22px 24px 24px" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 10, color: "var(--text-primary)" }}>
            {p.title}<span style={{ color: "var(--primary)" }}>.</span>
          </h3>
          <p style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: 16 }}>{p.desc}</p>
          <div className="flex flex-wrap gap-2">
            {p.tags.slice(0, 4).map((t) => (
              <span key={t} style={{ padding: "5px 11px", border: "1px solid var(--border-strong)", borderRadius: "100px", fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Products({ products, header }: { products: ProductItem[]; header?: SectionHeaderProps }) {
  // Show every product (order is admin-controlled — products arrive pre-sorted
  // by `order`). No "see more" gating.
  return (
    <section id="products" className="pt-20 lg:pt-28 pb-12 lg:pb-16" style={{ background: "var(--background)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow={header?.eyebrow || "Proprietary Products"} title={header?.title || "Software we built."}>
            {header?.body || "Vertical solutions, each purpose-built for a specific industry challenge in the region."}
          </SectionHead>
        </SectionReveal>

        {/* Mobile: horizontal snap-scroll carousel (one card per swipe, next
            card peeks). sm+: responsive grid. Cards render plainly (no per-card
            reveal) so no card is ever left blank / vertically scrollable
            (see Services.tsx). */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto overflow-y-hidden sm:overflow-visible snap-x snap-mandatory -mx-5 px-5 sm:mx-0 sm:px-0 pb-1 sm:pb-0 [scrollbar-width:none]">
          {products.map((p) => (
            <div key={p.title} className="snap-start shrink-0 basis-[85%] sm:basis-auto sm:shrink">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
