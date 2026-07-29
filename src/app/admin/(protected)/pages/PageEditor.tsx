"use client";

import { useActionState } from "react";
import Link from "next/link";
import { savePage, type PageEditState } from "./actions";
import ImageUpload from "../ImageUpload";
import FaqEditor from "./FaqEditor";
import ReasonsEditor from "./ReasonsEditor";
import FeaturesEditor from "./FeaturesEditor";

type Initial = {
  title: string;
  subtitle: string;
  heroImage: string;
  faqsJson: string;
  reasonsJson: string;
  featuresJson: string;
  featuresTitle: string;
  featuresSubtitle: string;
  published: boolean;
};

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
        Hero fields: leave blank to keep the page&apos;s built-in default. Content
        sections below (reasons, features, FAQs) show exactly what you set here —
        clearing a section hides it on the live page.
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

      <div className="pt-2" style={{ borderTop: "1px solid var(--border)" }}>
        <label style={{ ...labelStyle, fontSize: 15, marginTop: 8 }}>Why-choose reasons</label>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>The value band near the top of the page. Leave empty to hide it.</p>
        <ReasonsEditor name="reasonsJson" initialValue={initial.reasonsJson} />
      </div>

      <div className="pt-2" style={{ borderTop: "1px solid var(--border)" }}>
        <label style={{ ...labelStyle, fontSize: 15, marginTop: 8 }}>Features section</label>
        <div className="mt-1">
          <label style={labelStyle} htmlFor="featuresTitle">Section heading</label>
          <input id="featuresTitle" name="featuresTitle" defaultValue={initial.featuresTitle} style={inputStyle} placeholder="e.g. Key Functionalities" />
        </div>
        <div className="mt-3">
          <label style={labelStyle} htmlFor="featuresSubtitle">Section sub-heading</label>
          <textarea id="featuresSubtitle" name="featuresSubtitle" rows={2} defaultValue={initial.featuresSubtitle} style={inputStyle} placeholder="One line under the heading" />
        </div>
        <div className="mt-4">
          <label style={labelStyle}>Feature cards</label>
          <FeaturesEditor name="featuresJson" initialValue={initial.featuresJson} />
        </div>
      </div>

      <div className="pt-2" style={{ borderTop: "1px solid var(--border)" }}>
        <label style={{ ...labelStyle, fontSize: 15, marginTop: 8 }}>FAQs</label>
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
