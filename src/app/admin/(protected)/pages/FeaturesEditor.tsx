"use client";

import { useState } from "react";

type Feature = { title: string; description: string; bullets: string };

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 11px", borderRadius: 8, border: "1px solid var(--border)",
  background: "var(--surface)", color: "var(--text-primary)", fontSize: 14, outline: "none",
};

// The DB stores bullets as a string[]; the editor edits them as one-per-line text.
function parseInitial(json: string): Feature[] {
  try {
    const v = JSON.parse(json);
    if (Array.isArray(v)) {
      return v
        .filter((f) => f && typeof f.title === "string")
        .map((f) => ({
          title: String(f.title ?? ""),
          description: String(f.description ?? ""),
          bullets: Array.isArray(f.bullets) ? f.bullets.join("\n") : "",
        }));
    }
  } catch {}
  return [];
}

function serialize(features: Feature[]): string {
  const clean = features
    .filter((f) => f.title.trim())
    .map((f) => {
      const bullets = f.bullets.split("\n").map((b) => b.trim()).filter(Boolean);
      const out: { title: string; description: string; bullets?: string[] } = {
        title: f.title.trim(),
        description: f.description.trim(),
      };
      if (bullets.length) out.bullets = bullets;
      return out;
    });
  return clean.length ? JSON.stringify(clean) : "";
}

/**
 * Friendly editor for the FeatureGrid — a list of capability cards, each with a
 * title, a one-line description, and optional bullet points (one per line).
 * Serializes to the hidden `featuresJson` field the save action expects.
 */
export default function FeaturesEditor({ name, initialValue }: { name: string; initialValue: string }) {
  const [features, setFeatures] = useState<Feature[]>(parseInitial(initialValue));

  const update = (i: number, key: keyof Feature, val: string) =>
    setFeatures((prev) => prev.map((f, idx) => (idx === i ? { ...f, [key]: val } : f)));
  const add = () => setFeatures((prev) => [...prev, { title: "", description: "", bullets: "" }]);
  const remove = (i: number) => setFeatures((prev) => prev.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) =>
    setFeatures((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  return (
    <div>
      <input type="hidden" name={name} value={serialize(features)} />

      {features.length === 0 && (
        <p className="text-sm mb-3 px-3 py-3 rounded-lg" style={{ background: "var(--surface-alt)", color: "var(--text-muted)" }}>
          No features yet. Add capability cards — each shows a title, a short description, and optional bullet points.
        </p>
      )}

      <div className="space-y-4">
        {features.map((f, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--card-bg)" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Feature {i + 1}</span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="w-7 h-7 flex items-center justify-center rounded-md disabled:opacity-30" style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === features.length - 1} aria-label="Move down" className="w-7 h-7 flex items-center justify-center rounded-md disabled:opacity-30" style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <button type="button" onClick={() => remove(i)} aria-label="Remove feature" className="w-7 h-7 flex items-center justify-center rounded-md" style={{ border: "1px solid #fecaca", color: "#dc2626" }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            <input value={f.title} onChange={(e) => update(i, "title", e.target.value)} placeholder="Feature title" style={inputStyle} />
            <textarea value={f.description} onChange={(e) => update(i, "description", e.target.value)} placeholder="One-line description" rows={2} className="mt-2" style={inputStyle} />
            <label className="block text-xs mt-3 mb-1" style={{ color: "var(--text-muted)" }}>Bullet points — one per line (optional)</label>
            <textarea value={f.bullets} onChange={(e) => update(i, "bullets", e.target.value)} placeholder={"First point\nSecond point\nThird point"} rows={3} style={{ ...inputStyle, fontFamily: "var(--font-geist-mono), monospace", fontSize: 13 }} />
          </div>
        ))}
      </div>

      <button type="button" onClick={add} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg" style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
        Add feature
      </button>
    </div>
  );
}
