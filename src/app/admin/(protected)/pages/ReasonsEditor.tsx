"use client";

import { useState } from "react";

type Reason = { title: string; body: string };

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 11px", borderRadius: 8, border: "1px solid var(--border)",
  background: "var(--surface)", color: "var(--text-primary)", fontSize: 14, outline: "none",
};

function parseInitial(json: string): Reason[] {
  try {
    const v = JSON.parse(json);
    if (Array.isArray(v)) return v.filter((r) => r && typeof r.title === "string");
  } catch {}
  return [];
}

/**
 * Friendly editor for the "Why {product}" band — a list of title + paragraph
 * cards. Serializes to the hidden `reasonsJson` field the save action expects.
 */
export default function ReasonsEditor({ name, initialValue }: { name: string; initialValue: string }) {
  const [reasons, setReasons] = useState<Reason[]>(parseInitial(initialValue));

  const serialized = JSON.stringify(reasons.filter((r) => r.title.trim() && r.body.trim()));

  const update = (i: number, key: keyof Reason, val: string) =>
    setReasons((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: val } : r)));
  const add = () => setReasons((prev) => [...prev, { title: "", body: "" }]);
  const remove = (i: number) => setReasons((prev) => prev.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) =>
    setReasons((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  return (
    <div>
      <input type="hidden" name={name} value={reasons.length ? serialized : ""} />

      {reasons.length === 0 && (
        <p className="text-sm mb-3 px-3 py-3 rounded-lg" style={{ background: "var(--surface-alt)", color: "var(--text-muted)" }}>
          No reasons yet. Add a few short value points — they appear in the &ldquo;Why&rdquo; band near the top of the page.
        </p>
      )}

      <div className="space-y-4">
        {reasons.map((r, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--card-bg)" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Reason {i + 1}</span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="w-7 h-7 flex items-center justify-center rounded-md disabled:opacity-30" style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === reasons.length - 1} aria-label="Move down" className="w-7 h-7 flex items-center justify-center rounded-md disabled:opacity-30" style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <button type="button" onClick={() => remove(i)} aria-label="Remove reason" className="w-7 h-7 flex items-center justify-center rounded-md" style={{ border: "1px solid #fecaca", color: "#dc2626" }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            <input value={r.title} onChange={(e) => update(i, "title", e.target.value)} placeholder="Short title" style={inputStyle} />
            <textarea value={r.body} onChange={(e) => update(i, "body", e.target.value)} placeholder="One or two sentences" rows={3} className="mt-2" style={inputStyle} />
          </div>
        ))}
      </div>

      <button type="button" onClick={add} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg" style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
        Add reason
      </button>
    </div>
  );
}
