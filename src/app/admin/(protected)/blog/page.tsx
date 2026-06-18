import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

export default async function BlogAdmin() {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Blog</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {posts.length} {posts.length === 1 ? "post" : "posts"}.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="text-sm font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap"
          style={{ background: "var(--text-primary)", color: "var(--background)" }}
        >
          + New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="p-12 text-center rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
          No posts yet. Create your first post to see it on the site.
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--surface-alt)", color: "var(--text-secondary)" }}>
                  <th className="text-left font-semibold px-4 py-3">Title</th>
                  <th className="text-left font-semibold px-4 py-3">Category</th>
                  <th className="text-left font-semibold px-4 py-3">Status</th>
                  <th className="text-left font-semibold px-4 py-3">Updated</th>
                  <th className="text-right font-semibold px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} style={{ borderTop: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--text-primary)" }}>
                    <td className="px-4 py-3 align-top">
                      <div className="font-semibold">{post.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>/blog/{post.slug}</div>
                    </td>
                    <td className="px-4 py-3 align-top" style={{ color: "var(--text-secondary)" }}>{post.category || "—"}</td>
                    <td className="px-4 py-3 align-top">
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-md"
                        style={
                          post.status === "PUBLISHED"
                            ? { background: "#ecfdf5", color: "#059669" }
                            : { background: "var(--surface-alt)", color: "var(--text-muted)" }
                        }
                      >
                        {post.status === "PUBLISHED" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{formatDate(post.updatedAt)}</td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/blog/${post.id}/edit`} className="font-medium" style={{ color: "var(--primary)" }}>Edit</Link>
                        <DeleteButton id={post.id} title={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
