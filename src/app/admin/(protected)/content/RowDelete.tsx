"use client";

import { deleteItem } from "./actions";

export default function RowDelete({ collectionKey, id, label }: { collectionKey: string; id: string; label: string }) {
  return (
    <form
      action={deleteItem}
      onSubmit={(e) => {
        if (!confirm(`Delete "${label}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="key" value={collectionKey} />
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="font-medium" style={{ color: "#dc2626" }}>Delete</button>
    </form>
  );
}
