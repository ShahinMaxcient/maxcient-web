"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveItem, type ContentFormState } from "./actions";
import type { Field } from "@/lib/collections";
import ImageUpload from "../ImageUpload";

const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-primary)", fontSize: 14, outline: "none" };

function initialValue(field: Field, initial: Record<string, unknown>): string {
  const v = initial[field.name];
  if (v == null) return "";
  if (field.type === "sublinks" && Array.isArray(v)) {
    return (v as { label?: string; href?: string }[])
      .map((s) => `${s.label ?? ""} | ${s.href ?? ""}`)
      .join("\n");
  }
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}

export default function CollectionForm({
  collectionKey,
  id,
  fields,
  initial,
  backHref,
  submitLabel,
}: {
  collectionKey: string;
  id: string | null;
  fields: Field[];
  initial: Record<string, unknown>;
  backHref: string;
  submitLabel: string;
}) {
  const action = saveItem.bind(null, collectionKey, id);
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(action, undefined);

  const publishedChecked = initial.published !== false;
  const orderValue = initial.order != null ? String(initial.order) : "0";

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state?.error && (
        <div className="text-sm px-4 py-3 rounded-lg" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>{state.error}</div>
      )}

      {fields.map((f) => (
        <div key={f.name}>
          {f.type === "image" ? (
            <ImageUpload
              name={f.name}
              value={initialValue(f, initial)}
              label={`${f.label}${f.required ? " *" : ""}`}
              help={f.help}
            />
          ) : (
            <>
              <label style={labelStyle} htmlFor={f.name}>{f.label}{f.required ? " *" : ""}</label>
              {f.type === "textarea" ? (
                <textarea id={f.name} name={f.name} rows={3} defaultValue={initialValue(f, initial)} style={inputStyle} placeholder={f.placeholder} />
              ) : f.type === "sublinks" ? (
                <textarea id={f.name} name={f.name} rows={4} defaultValue={initialValue(f, initial)} style={{ ...inputStyle, fontFamily: "var(--font-geist-mono), monospace", fontSize: 13 }} placeholder={"Metering & Billing | /maxutility-facility-utility-management-solution#functionalities\nBook a Demo | /request-a-consultation"} />
              ) : f.type === "select" ? (
                <select id={f.name} name={f.name} defaultValue={initialValue(f, initial) || (f.options?.[0]?.value ?? "")} style={inputStyle}>
                  {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : f.type === "number" ? (
                <input id={f.name} name={f.name} type="number" defaultValue={initialValue(f, initial)} style={inputStyle} placeholder={f.placeholder} />
              ) : (
                <input id={f.name} name={f.name} defaultValue={initialValue(f, initial)} style={inputStyle} placeholder={f.placeholder} />
              )}
              {f.help && <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{f.help}</p>}
            </>
          )}
        </div>
      ))}

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label style={labelStyle} htmlFor="order">Order</label>
          <input id="order" name="order" type="number" min={0} defaultValue={orderValue} style={inputStyle} />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            <input type="checkbox" name="published" defaultChecked={publishedChecked} />
            Published (visible on the site)
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={pending} className="text-sm font-semibold px-4 py-2.5 rounded-lg disabled:opacity-60" style={{ background: "var(--text-primary)", color: "var(--background)" }}>
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link href={backHref} className="text-sm font-medium px-4 py-2.5 rounded-lg" style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}>Cancel</Link>
      </div>
    </form>
  );
}
