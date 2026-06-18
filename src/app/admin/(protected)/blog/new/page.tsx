import Link from "next/link";
import { createPost } from "../actions";
import PostForm from "../PostForm";

export default function NewPostPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/blog" className="text-sm" style={{ color: "var(--text-muted)" }}>← Back to blog</Link>
        <h1 className="text-2xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>New post</h1>
      </div>
      <PostForm action={createPost} submitLabel="Create post" />
    </div>
  );
}
