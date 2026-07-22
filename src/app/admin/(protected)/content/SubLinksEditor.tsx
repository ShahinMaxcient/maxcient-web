"use client";

import { useState } from "react";

type Row = { label: string; href: string };

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 11px", borderRadius: 8, border: "1px solid var(--border)",
  background: "var(--surface)", color: "var(--text-primary)", fontSize: 14, outline: "none",
};

function parseInitial(value: string): Row[] {
  if (!value.trim()) return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split("|").map((s) => s.trim());
      return { label: label ?? "", href: href ?? "" };
    });
}

export default function SubLinksEditor({ name, initialValue }: { name: string; initialValue: string }) {
  const [rows, setRows] = useState<Row[]>(parseInitial(initialValue));

  // Serialized in the format the server action already understands: "Label | href" per line.
  const serialized = rows
    .filter((r) => r.label.trim())
    .map((r) => `${r.label.trim()} | ${r.href.trim()}`)
    .join("\n");

  function update(i: number, key: keyof Row, val: string) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: val } : r)));
  }
  function add() {
    setRows((prev) => [...prev, { label: "", href: "" }]);
  }
  function remove(i: number) {
    setRows((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <input type="hidden" name={name} value={serialized} />

      {rows.length === 0 && (
        <p className="text-sm mb-3 px-3 py-3 rounded-lg" style={{ background: "var(--surface-alt)", color: "var(--text-muted)" }}>
          No sub-menu items. This product shows as a single link in the navbar.
        </p>
      )}

      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs w-5 shrink-0 text-center" style={{ color: "var(--text-muted)" }}>{i + 1}</span>
            <input
              value={row.label}
              onChange={(e) => update(i, "label", e.target.value)}
              placeholder="Label (e.g. Key Functionalities)"
              style={{ ...inputStyle, flex: "1 1 40%" }}
            />
            <input
              value={row.href}
              onChange={(e) => update(i, "href", e.target.value)}
              placeholder="/link-or-anchor"
              style={{ ...inputStyle, flex: "1 1 55%", fontFamily: "var(--font-geist-mono), monospace", fontSize: 13 }}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Remove"
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-md transition-colors"
              style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
        style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
        Add sub-menu item
      </button>
    </div>
  );
}
