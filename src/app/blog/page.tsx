import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import Footer from "@/components/Footer";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal | Maxcient Technologies",
  description: "Perspectives on enterprise technology, digital transformation, and building for the GCC.",
};

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <>
      <NavbarServer />
      <main>
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-16" style={{ background: "var(--background)" }}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--primary)" }}>Journal</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Latest thinking.</h1>
            <p className="mt-4 text-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
              Perspectives on enterprise technology, digital transformation, and building for the GCC.
            </p>
          </div>
        </section>

        <section className="pb-24" style={{ background: "var(--background)" }}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const inner = (
                  <article className="group cursor-pointer h-full">
                    <div className="relative aspect-[4/3] overflow-hidden mb-5" style={{ borderRadius: "5px", border: "1px solid var(--border)" }}>
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
                      {post.category && (
                        <div className="absolute top-3 left-3">
                          <span style={{ background: "var(--background)", color: "var(--primary)", fontFamily: "var(--font-geist-mono), monospace", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 9px", borderRadius: "3px" }}>{post.category}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", color: "var(--text-muted)", marginBottom: 8 }}>{post.date}</div>
                    <h2 className="text-lg font-bold leading-snug transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{post.title}</h2>
                    {post.excerpt && <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{post.excerpt}</p>}
                  </article>
                );
                return post.slug ? (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>{inner}</Link>
                ) : (
                  <div key={post.title}>{inner}</div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
