"use client";

import { useActionState } from "react";
import { saveHeroSettings, type HeroFormState } from "./actions";
import type { HeroSettings } from "@/lib/settings";
import ImageUpload from "../ImageUpload";

const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-primary)", fontSize: 14, outline: "none" };

export default function HeroForm({ initial }: { initial: HeroSettings }) {
  const [state, formAction, pending] = useActionState<HeroFormState, FormData>(saveHeroSettings, undefined);

  return (
    <form action={formAction} className="space-y-5 max-w-3xl">
      {state?.error && <div className="text-sm px-4 py-3 rounded-lg" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>{state.error}</div>}
      {state?.ok && <div className="text-sm px-4 py-3 rounded-lg" style={{ background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0" }}>Hero settings saved.</div>}

      <div>
        <label style={labelStyle} htmlFor="headline">Headline</label>
        <input id="headline" name="headline" defaultValue={initial.headline} style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="subtitle">Subtitle</label>
        <textarea id="subtitle" name="subtitle" rows={3} defaultValue={initial.subtitle} style={inputStyle} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle} htmlFor="ctaText">Primary CTA text</label>
          <input id="ctaText" name="ctaText" defaultValue={initial.ctaText} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="ctaSecondary">Secondary CTA text</label>
          <input id="ctaSecondary" name="ctaSecondary" defaultValue={initial.ctaSecondary} style={inputStyle} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle} htmlFor="phone">Phone number</label>
          <input id="phone" name="phone" defaultValue={initial.phone} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="badge">Badge text</label>
          <input id="badge" name="badge" defaultValue={initial.badge} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="tagline">Tagline (top of hero)</label>
        <input id="tagline" name="tagline" defaultValue={initial.tagline} style={inputStyle} />
      </div>

      <ImageUpload name="image" value={initial.image} label="Background image" />

      <div>
        <label style={labelStyle}>Stats bar (JSON array)</label>
        <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Format: [{"{"}&quot;n&quot;:&quot;06&quot;, &quot;l&quot;:&quot;Global Offices&quot;{"}"}]</p>
        <textarea id="stats" name="stats" rows={4} defaultValue={JSON.stringify(initial.stats, null, 2)} style={inputStyle} />
      </div>

      <div className="pt-2">
        <button type="submit" disabled={pending} className="text-sm font-semibold px-4 py-2.5 rounded-lg disabled:opacity-60" style={{ background: "var(--text-primary)", color: "var(--background)" }}>
          {pending ? "Saving…" : "Save hero settings"}
        </button>
      </div>
    </form>
  );
}
