"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { PostFormState } from "./actions";

type PostInitial = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  status: "DRAFT" | "PUBLISHED";
};

const EMPTY: PostInitial = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  coverImage: "",
  status: "DRAFT",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 6,
  color: "var(--text-secondary)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--surface)",
  color: "var(--text-primary)",
  fontSize: 14,
  outline: "none",
};

export default function PostForm({
  action,
  initial,
  submitLabel,
}: {
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  initial?: PostInitial;
  submitLabel: string;
}) {
  const data = initial ?? EMPTY;
  const [state, formAction, pending] = useActionState<PostFormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state?.error && (
        <div
          className="text-sm px-4 py-3 rounded-lg"
          style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}
        >
          {state.error}
        </div>
      )}

      <div>
        <label style={labelStyle} htmlFor="title">Title *</label>
        <input id="title" name="title" required defaultValue={data.title} style={inputStyle} placeholder="Post title" />
      </div>

      <div>
        <label style={labelStyle} htmlFor="slug">Slug</label>
        <input id="slug" name="slug" defaultValue={data.slug} style={inputStyle} placeholder="auto-generated from title if blank" />
        <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>The URL will be /blog/your-slug</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle} htmlFor="category">Category</label>
          <input id="category" name="category" defaultValue={data.category} style={inputStyle} placeholder="e.g. Strategy" />
        </div>
        <div>
          <label style={labelStyle} htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={data.status} style={inputStyle}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="coverImage">Cover image URL</label>
        <input id="coverImage" name="coverImage" defaultValue={data.coverImage} style={inputStyle} placeholder="https://…" />
      </div>

      <div>
        <label style={labelStyle} htmlFor="excerpt">Excerpt</label>
        <textarea id="excerpt" name="excerpt" defaultValue={data.excerpt} rows={2} style={inputStyle} placeholder="Short summary shown in listings" />
      </div>

      <div>
        <label style={labelStyle} htmlFor="content">Content</label>
        <textarea id="content" name="content" defaultValue={data.content} rows={12} style={{ ...inputStyle, fontFamily: "var(--font-geist-mono), monospace", lineHeight: 1.6 }} placeholder="Write your post here. Plain text or basic HTML." />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="text-sm font-semibold px-4 py-2.5 rounded-lg disabled:opacity-60"
          style={{ background: "var(--text-primary)", color: "var(--background)" }}
        >
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link href="/admin/blog" className="text-sm font-medium px-4 py-2.5 rounded-lg" style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
