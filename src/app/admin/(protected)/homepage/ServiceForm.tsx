"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveService, type FormState } from "./actions";

type ServiceData = { num: string; title: string; desc: string; href: string; span: string; variant: string; order: number };

const EMPTY: ServiceData = { num: "", title: "", desc: "", href: "", span: "lg:col-span-2", variant: "default", order: 0 };

const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-primary)", fontSize: 14, outline: "none" };

export default function ServiceForm({ id, initial, submitLabel }: { id: string | null; initial?: ServiceData; submitLabel: string }) {
  const data = initial ?? EMPTY;
  const action = saveService.bind(null, id);
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state?.error && (
        <div className="text-sm px-4 py-3 rounded-lg" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>{state.error}</div>
      )}
      <div>
        <label style={labelStyle} htmlFor="title">Title *</label>
        <input id="title" name="title" required defaultValue={data.title} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle} htmlFor="desc">Description *</label>
        <textarea id="desc" name="desc" required rows={3} defaultValue={data.desc} style={inputStyle} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle} htmlFor="num">Number / label</label>
          <input id="num" name="num" defaultValue={data.num} style={inputStyle} placeholder="e.g. 01 or 01 — FLAGSHIP" />
        </div>
        <div>
          <label style={labelStyle} htmlFor="href">Link (href)</label>
          <input id="href" name="href" defaultValue={data.href} style={inputStyle} placeholder="/erp-and-crm" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label style={labelStyle} htmlFor="variant">Style</label>
          <select id="variant" name="variant" defaultValue={data.variant} style={inputStyle}>
            <option value="default">Default</option>
            <option value="flagship">Flagship (large)</option>
            <option value="accent">Accent (lavender)</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <label style={labelStyle} htmlFor="span">Grid span</label>
          <input id="span" name="span" defaultValue={data.span} style={inputStyle} placeholder="lg:col-span-2" />
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
