"use client";

import { useActionState } from "react";
import { saveSectionHeaders, type SectionsFormState } from "./actions";
import type { SectionHeaders } from "@/lib/settings";

const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-primary)", fontSize: 14, outline: "none" };

const SECTION_KEYS: (keyof SectionHeaders)[] = [
  "services", "industries", "products", "technologies", "testimonials", "blog", "faq", "stats", "trustedBy",
];

const LABELS: Record<string, string> = {
  services: "Services",
  industries: "Industries",
  products: "Products",
  technologies: "Technologies",
  testimonials: "Testimonials / Who We Are",
  blog: "Blog / Journal",
  faq: "FAQ",
  stats: "Stats / By the Numbers",
  trustedBy: "Trusted By (Client logos)",
};

export default function SectionsForm({ initial }: { initial: SectionHeaders }) {
  const [state, formAction, pending] = useActionState<SectionsFormState, FormData>(saveSectionHeaders, undefined);

  return (
    <form action={formAction} className="space-y-8 max-w-3xl">
      {state?.error && <div className="text-sm px-4 py-3 rounded-lg" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>{state.error}</div>}
      {state?.ok && <div className="text-sm px-4 py-3 rounded-lg" style={{ background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0" }}>Section headers saved.</div>}

      {SECTION_KEYS.map((key) => (
        <fieldset key={key} className="p-5 rounded-xl" style={{ border: "1px solid var(--border)" }}>
          <legend className="px-2 text-sm font-bold" style={{ color: "var(--primary)" }}>{LABELS[key]}</legend>
          <div className="space-y-3 mt-2">
            <div>
              <label style={labelStyle} htmlFor={`${key}.eyebrow`}>Eyebrow</label>
              <input id={`${key}.eyebrow`} name={`${key}.eyebrow`} defaultValue={initial[key].eyebrow} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle} htmlFor={`${key}.title`}>Title</label>
              <input id={`${key}.title`} name={`${key}.title`} defaultValue={initial[key].title} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle} htmlFor={`${key}.body`}>Body</label>
              <textarea id={`${key}.body`} name={`${key}.body`} rows={2} defaultValue={initial[key].body} style={inputStyle} />
            </div>
          </div>
        </fieldset>
      ))}

      <div className="pt-2">
        <button type="submit" disabled={pending} className="text-sm font-semibold px-4 py-2.5 rounded-lg disabled:opacity-60" style={{ background: "var(--text-primary)", color: "var(--background)" }}>
          {pending ? "Saving…" : "Save section headers"}
        </button>
      </div>
    </form>
  );
}
