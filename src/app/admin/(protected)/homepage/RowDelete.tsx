"use client";

import { deleteService, deleteTestimonial } from "./actions";

export default function RowDelete({ id, label, kind }: { id: string; label: string; kind: "service" | "testimonial" }) {
  const action = kind === "service" ? deleteService : deleteTestimonial;
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete "${label}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="font-medium" style={{ color: "#dc2626" }}>Delete</button>
    </form>
  );
}
