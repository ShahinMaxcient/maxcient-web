"use client";

import { deletePost } from "./actions";

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deletePost}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="font-medium" style={{ color: "#dc2626" }}>
        Delete
      </button>
    </form>
  );
}
