"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveTestimonial, type FormState } from "./actions";

type TestimonialData = { tag: string; quote: string; rating: number; order: number };

const EMPTY: TestimonialData = { tag: "", quote: "", rating: 5, order: 0 };

const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-primary)", fontSize: 14, outline: "none" };

export default function TestimonialForm({ id, initial, submitLabel }: { id: string | null; initial?: TestimonialData; submitLabel: string }) {
  const data = initial ?? EMPTY;
  const action = saveTestimonial.bind(null, id);
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state?.error && (
        <div className="text-sm px-4 py-3 rounded-lg" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>{state.error}</div>
      )}
      <div>
        <label style={labelStyle} htmlFor="tag">Tag *</label>
        <input id="tag" name="tag" required defaultValue={data.tag} style={inputStyle} placeholder="e.g. Trusted by customers" />
      </div>
      <div>
        <label style={labelStyle} htmlFor="quote">Quote *</label>
        <textarea id="quote" name="quote" required rows={3} defaultValue={data.quote} style={inputStyle} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle} htmlFor="rating">Rating (1–5)</label>
          <input id="rating" name="rating" type="number" min={1} max={5} defaultValue={data.rating} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="order">Order</label>
          <input id="order" name="order" type="number" min={0} defaultValue={data.order} style={inputStyle} />
        </div>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={pending} className="text-sm font-semibold px-4 py-2.5 rounded-lg disabled:opacity-60" style={{ background: "var(--text-primary)", color: "var(--background)" }}>
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link href="/admin/homepage" className="text-sm font-medium px-4 py-2.5 rounded-lg" style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}>Cancel</Link>
      </div>
    </form>
  );
}
