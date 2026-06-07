"use client";

import Image from "next/image";
import AnimatedCard from "./AnimatedCard";
import SectionReveal from "./SectionReveal";

const posts = [
  { title: "Build a Unified Data Platform To Enhance End-To-End Customer Experience", date: "Oct 18, 2023", category: "Data", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
  { title: "It is Time To Outsource Development To An Offshore Development Firm", date: "Oct 18, 2023", category: "Development", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80" },
  { title: "Attaining Operational Flexibility During Uncertain Times", date: "Oct 18, 2023", category: "Strategy", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" },
  { title: "How To Bring About Rapid Growth With Power Platform?", date: "Oct 18, 2023", category: "Power Platform", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80" },
];

export default function Blog() {
  return (
    <section id="blog" className="py-16 lg:py-20 relative" style={{ background: "var(--surface-alt)" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>Blog</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>Latest Insights</h2>
            <p className="mt-6 text-lg" style={{ color: "var(--text-muted)" }}>Stay ahead with our latest thoughts on technology and business.</p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => (
            <AnimatedCard key={post.title} delay={i * 0.1}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="glass text-[var(--primary-light)] text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold group-hover:text-[var(--primary-light)] transition-colors leading-snug line-clamp-2" style={{ color: "var(--text-secondary)" }}>{post.title}</h3>
                <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>{post.date}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
