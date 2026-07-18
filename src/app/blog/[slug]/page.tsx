import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavbarServer from "@/components/NavbarServer";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { getPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found | Maxcient" };
  return {
    title: `${post.title} | Maxcient Technologies`,
    description: post.excerpt ?? undefined,
  };
}

function renderContent(content: string) {
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(content);
  if (looksLikeHtml) {
    // Content is authored only by the authenticated admin.
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return (
    <>
      {content
        .split(/\n{2,}/)
        .map((para, i) => (
          <p key={i} style={{ whiteSpace: "pre-wrap" }}>{para}</p>
        ))}
    </>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <NavbarServer />
      <main>
        <article className="pt-32 lg:pt-40" style={{ background: "var(--background)" }}>
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <Link href="/blog" className="text-sm" style={{ color: "var(--text-muted)" }}>← All posts</Link>
            <div className="mt-6 flex items-center gap-3" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
              {post.category && <span style={{ color: "var(--primary)" }}>{post.category}</span>}
              <span>{post.date}</span>
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight" style={{ color: "var(--text-primary)" }}>
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
            )}
          </div>

          <div className="max-w-4xl mx-auto px-5 sm:px-8 mt-10">
            <div className="relative aspect-[16/9] overflow-hidden" style={{ borderRadius: "8px", border: "1px solid var(--border)" }}>
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14">
            {post.content ? (
              <div
                className="space-y-5 text-[17px] leading-[1.75]"
                style={{ color: "var(--text-secondary)" }}
              >
                {renderContent(post.content)}
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)" }}>This post has no content yet.</p>
            )}
          </div>
        </article>

        <CTASection title="Let's build something" subtitle="Talk to our UAE-based consultants about your next enterprise project." />
      </main>
      <Footer />
    </>
  );
}
