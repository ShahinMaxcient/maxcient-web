"use client";

import { useActionState } from "react";
import Link from "next/link";
import { savePage, type PageEditState } from "./actions";
import ImageUpload from "../ImageUpload";
import FaqEditor from "./FaqEditor";

type Initial = { title: string; subtitle: string; heroImage: string; faqsJson: string; published: boolean };

const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-primary)", fontSize: 14, outline: "none" };

export default function PageEditor({ slug, initial }: { slug: string; initial: Initial }) {
  const action = savePage.bind(null, slug);
  const [state, formAction, pending] = useActionState<PageEditState, FormData>(action, undefined);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state?.error && (
        <div className="text-sm px-4 py-3 rounded-lg" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>{state.error}</div>
      )}

      <p className="text-sm px-4 py-3 rounded-lg" style={{ background: "var(--surface-alt)", color: "var(--text-muted)" }}>
        Leave a field blank to use the page&apos;s built-in default. Only the fields you fill in here will override the live page.
      </p>

      <div>
        <label style={labelStyle} htmlFor="title">Hero title</label>
        <input id="title" name="title" defaultValue={initial.title} style={inputStyle} placeholder="Overrides the hero heading" />
      </div>
      <div>
        <label style={labelStyle} htmlFor="subtitle">Hero subtitle</label>
        <textarea id="subtitle" name="subtitle" rows={3} defaultValue={initial.subtitle} style={inputStyle} placeholder="Overrides the hero paragraph" />
      </div>
      <ImageUpload name="heroImage" value={initial.heroImage} label="Hero image" />

      <div className="flex items-start gap-3 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--card-bg)" }}>
        <input id="published" name="published" type="checkbox" defaultChecked={initial.published} style={{ marginTop: 3, width: 16, height: 16 }} />
        <label htmlFor="published" className="cursor-pointer">
          <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Visible on site</span>
          <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Uncheck to take this page off the live site — it will return 404 and disappear from the navbar. Reversible anytime.
          </span>
        </label>
      </div>

      <div>
        <label style={labelStyle}>FAQs</label>
        <FaqEditor name="faqsJson" initialValue={initial.faqsJson} />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={pending} className="text-sm font-semibold px-4 py-2.5 rounded-lg disabled:opacity-60" style={{ background: "var(--text-primary)", color: "var(--background)" }}>
          {pending ? "Saving…" : "Save changes"}
        </button>
        <Link href="/admin/pages" className="text-sm font-medium px-4 py-2.5 rounded-lg" style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}>Cancel</Link>
      </div>
    </form>
  );
}
