"use client";

import { useState } from "react";

type Faq = { question: string; answer: string };

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 11px", borderRadius: 8, border: "1px solid var(--border)",
  background: "var(--surface)", color: "var(--text-primary)", fontSize: 14, outline: "none",
};

function parseInitial(json: string): Faq[] {
  try {
    const v = JSON.parse(json);
    if (Array.isArray(v)) return v.filter((f) => f && typeof f.question === "string");
  } catch {}
  return [];
}

/**
 * Friendly Question/Answer editor. Serializes to the hidden `faqsJson`
 * field in the exact format the save action already expects.
 */
export default function FaqEditor({ name, initialValue }: { name: string; initialValue: string }) {
  const [faqs, setFaqs] = useState<Faq[]>(parseInitial(initialValue));

  const serialized = JSON.stringify(
    faqs.filter((f) => f.question.trim() && f.answer.trim()),
  );

  function update(i: number, key: keyof Faq, val: string) {
    setFaqs((prev) => prev.map((f, idx) => (idx === i ? { ...f, [key]: val } : f)));
  }
  function add() {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  }
  function remove(i: number) {
    setFaqs((prev) => prev.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    setFaqs((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  return (
    <div>
      <input type="hidden" name={name} value={faqs.length ? serialized : ""} />

      {faqs.length === 0 && (
        <p className="text-sm mb-3 px-3 py-3 rounded-lg" style={{ background: "var(--surface-alt)", color: "var(--text-muted)" }}>
          No questions yet. Add one below — or leave empty to use the page&apos;s built-in FAQs.
        </p>
      )}

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--card-bg)" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Question {i + 1}</span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="w-7 h-7 flex items-center justify-center rounded-md disabled:opacity-30" style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === faqs.length - 1} aria-label="Move down" className="w-7 h-7 flex items-center justify-center rounded-md disabled:opacity-30" style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <button type="button" onClick={() => remove(i)} aria-label="Remove question" className="w-7 h-7 flex items-center justify-center rounded-md" style={{ border: "1px solid #fecaca", color: "#dc2626" }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            <input
              value={f.question}
              onChange={(e) => update(i, "question", e.target.value)}
              placeholder="Type the question"
              style={inputStyle}
            />
            <textarea
              value={f.answer}
              onChange={(e) => update(i, "answer", e.target.value)}
              placeholder="Type the answer"
              rows={3}
              className="mt-2"
              style={inputStyle}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg"
        style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
        Add question
      </button>
    </div>
  );
}
