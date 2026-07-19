"use client";

import { useActionState } from "react";
import { saveAboutSettings, type AboutFormState } from "./actions";
import type { AboutSettings } from "@/lib/settings";
import ImageUpload from "../ImageUpload";

const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-primary)", fontSize: 14, outline: "none" };

export default function AboutForm({ initial }: { initial: AboutSettings }) {
  const [state, formAction, pending] = useActionState<AboutFormState, FormData>(saveAboutSettings, undefined);

  return (
    <form action={formAction} className="space-y-5 max-w-3xl">
      {state?.error && <div className="text-sm px-4 py-3 rounded-lg" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>{state.error}</div>}
      {state?.ok && <div className="text-sm px-4 py-3 rounded-lg" style={{ background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0" }}>About page settings saved.</div>}

      <fieldset className="p-5 rounded-xl" style={{ border: "1px solid var(--border)" }}>
        <legend className="px-2 text-sm font-bold" style={{ color: "var(--primary)" }}>Hero</legend>
        <div className="space-y-3 mt-2">
          <div><label style={labelStyle} htmlFor="heroTitle">Title</label><input id="heroTitle" name="heroTitle" defaultValue={initial.heroTitle} style={inputStyle} /></div>
          <div><label style={labelStyle} htmlFor="heroSubtitle">Subtitle</label><textarea id="heroSubtitle" name="heroSubtitle" rows={2} defaultValue={initial.heroSubtitle} style={inputStyle} /></div>
          <ImageUpload name="heroImage" value={initial.heroImage} label="Hero image" />
        </div>
      </fieldset>

      <fieldset className="p-5 rounded-xl" style={{ border: "1px solid var(--border)" }}>
        <legend className="px-2 text-sm font-bold" style={{ color: "var(--primary)" }}>Mission Section</legend>
        <div className="space-y-3 mt-2">
          <div><label style={labelStyle} htmlFor="missionEyebrow">Eyebrow</label><input id="missionEyebrow" name="missionEyebrow" defaultValue={initial.missionEyebrow} style={inputStyle} /></div>
          <div><label style={labelStyle} htmlFor="missionTitle">Title</label><input id="missionTitle" name="missionTitle" defaultValue={initial.missionTitle} style={inputStyle} /></div>
          <div><label style={labelStyle} htmlFor="missionBody">Body paragraph 1</label><textarea id="missionBody" name="missionBody" rows={3} defaultValue={initial.missionBody} style={inputStyle} /></div>
          <div><label style={labelStyle} htmlFor="missionBody2">Body paragraph 2</label><textarea id="missionBody2" name="missionBody2" rows={3} defaultValue={initial.missionBody2} style={inputStyle} /></div>
          <ImageUpload name="missionImage" value={initial.missionImage} label="Mission image" />
        </div>
      </fieldset>

      <fieldset className="p-5 rounded-xl" style={{ border: "1px solid var(--border)" }}>
        <legend className="px-2 text-sm font-bold" style={{ color: "var(--primary)" }}>Section Labels</legend>
        <div className="space-y-3 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div><label style={labelStyle} htmlFor="statsEyebrow">Stats eyebrow</label><input id="statsEyebrow" name="statsEyebrow" defaultValue={initial.statsEyebrow} style={inputStyle} /></div>
            <div><label style={labelStyle} htmlFor="statsTitle">Stats title</label><input id="statsTitle" name="statsTitle" defaultValue={initial.statsTitle} style={inputStyle} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label style={labelStyle} htmlFor="valuesEyebrow">Values eyebrow</label><input id="valuesEyebrow" name="valuesEyebrow" defaultValue={initial.valuesEyebrow} style={inputStyle} /></div>
            <div><label style={labelStyle} htmlFor="valuesTitle">Values title</label><input id="valuesTitle" name="valuesTitle" defaultValue={initial.valuesTitle} style={inputStyle} /></div>
          </div>
        </div>
      </fieldset>

      <div className="pt-2">
        <button type="submit" disabled={pending} className="text-sm font-semibold px-4 py-2.5 rounded-lg disabled:opacity-60" style={{ background: "var(--text-primary)", color: "var(--background)" }}>
          {pending ? "Saving…" : "Save about settings"}
        </button>
      </div>
    </form>
  );
}
