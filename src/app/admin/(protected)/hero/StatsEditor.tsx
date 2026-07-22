"use client";

import { useState } from "react";

type Stat = { n: string; l: string };

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 11px", borderRadius: 8, border: "1px solid var(--border)",
  background: "var(--surface)", color: "var(--text-primary)", fontSize: 14, outline: "none",
};

export default function StatsEditor({ name, initial }: { name: string; initial: Stat[] }) {
  const [rows, setRows] = useState<Stat[]>(initial);

  // The server action expects a JSON array — serialized here so the form
  // stays a normal set of inputs for the editor.
  const serialized = JSON.stringify(rows.filter((r) => r.n.trim() || r.l.trim()));

  function update(i: number, key: keyof Stat, val: string) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: val } : r)));
  }

  return (
    <div>
      <input type="hidden" name={name} value={serialized} />

      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs w-5 shrink-0 text-center" style={{ color: "var(--text-muted)" }}>{i + 1}</span>
            <input
              value={row.n}
              onChange={(e) => update(i, "n", e.target.value)}
              placeholder="Value (e.g. 120+)"
              style={{ ...inputStyle, flex: "0 0 130px" }}
            />
            <input
              value={row.l}
              onChange={(e) => update(i, "l", e.target.value)}
              placeholder="Label (e.g. Projects Delivered)"
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setRows((prev) => prev.filter((_, idx) => idx !== i))}
              aria-label="Remove stat"
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-md"
              style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setRows((prev) => [...prev, { n: "", l: "" }])}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg"
        style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
        Add stat
      </button>
    </div>
  );
}
