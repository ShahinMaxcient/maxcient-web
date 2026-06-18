import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePost } from "../../actions";
import PostForm from "../../PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  const updateAction = updatePost.bind(null, post.id);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/blog" className="text-sm" style={{ color: "var(--text-muted)" }}>← Back to blog</Link>
        <div className="flex items-center justify-between gap-4 mt-2">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Edit post</h1>
          {post.status === "PUBLISHED" && (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium" style={{ color: "var(--primary)" }}>
              View live ↗
            </a>
          )}
        </div>
      </div>
      <PostForm
        action={updateAction}
        submitLabel="Save changes"
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content ?? "",
          category: post.category ?? "",
          coverImage: post.coverImage ?? "",
          status: post.status,
        }}
      />
    </div>
  );
}
