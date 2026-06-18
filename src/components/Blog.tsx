"use client";

import Image from "next/image";
import Link from "next/link";
import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";

type BlogPost = {
  title: string;
  slug: string | null;
  category: string | null;
  image: string;
  date: string;
};

function Card({ post }: { post: BlogPost }) {
  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden mb-5" style={{ borderRadius: "5px", border: "1px solid var(--border)" }}>
        <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.5), transparent 60%)" }} />
        {post.category && (
          <div className="absolute top-3 left-3">
            <span style={{ background: "var(--background)", color: "var(--primary)", fontFamily: "var(--font-geist-mono), monospace", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 9px", borderRadius: "3px" }}>{post.category}</span>
          </div>
        )}
      </div>
      <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", color: "var(--text-muted)", marginBottom: 8 }}>{post.date}</div>
      <h3 className="text-[15px] font-bold leading-snug transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{post.title}</h3>
    </article>
  );
}

export default function Blog({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) return null;

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
            <SectionReveal key={post.slug ?? post.title} delay={i * 0.08}>
              {post.slug ? (
                <Link href={`/blog/${post.slug}`}>
                  <Card post={post} />
                </Link>
              ) : (
                <Card post={post} />
              )}
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
