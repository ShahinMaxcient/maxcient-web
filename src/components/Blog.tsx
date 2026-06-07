"use client";

import Image from "next/image";
import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";

const posts = [
  { title: "Build a Unified Data Platform To Enhance End-To-End Customer Experience", date: "Oct 18, 2023", category: "Data", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
  { title: "It is Time To Outsource Development To An Offshore Development Firm", date: "Oct 18, 2023", category: "Development", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80" },
  { title: "Attaining Operational Flexibility During Uncertain Times", date: "Oct 18, 2023", category: "Strategy", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" },
  { title: "How To Bring About Rapid Growth With Power Platform?", date: "Oct 18, 2023", category: "Power Platform", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80" },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 lg:py-28" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow="Journal" title={<>Latest<br />thinking.</>}>
            Perspectives on enterprise technology, digital transformation, and building for the GCC.
          </SectionHead>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => (
            <SectionReveal key={post.title} delay={i * 0.08}>
              <article className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden mb-5" style={{ borderRadius: "5px", border: "1px solid var(--border)" }}>
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.5), transparent 60%)" }} />
                  <div className="absolute top-3 left-3">
                    <span style={{ background: "var(--background)", color: "var(--primary)", fontFamily: "var(--font-geist-mono), monospace", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 9px", borderRadius: "3px" }}>{post.category}</span>
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", color: "var(--text-muted)", marginBottom: 8 }}>{post.date}</div>
                <h3 className="text-[15px] font-bold leading-snug transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{post.title}</h3>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
