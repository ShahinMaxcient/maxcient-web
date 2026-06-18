"use client";

import { useActionState } from "react";
import { updateSettings, type SettingsFormState } from "./actions";
import type { SiteSettings } from "@/lib/settings";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 6,
  color: "var(--text-secondary)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--surface)",
  color: "var(--text-primary)",
  fontSize: 14,
  outline: "none",
};

export default function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [state, formAction, pending] = useActionState<SettingsFormState, FormData>(updateSettings, undefined);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state?.error && (
        <div className="text-sm px-4 py-3 rounded-lg" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>
          {state.error}
        </div>
      )}
      {state?.ok && (
        <div className="text-sm px-4 py-3 rounded-lg" style={{ background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0" }}>
          Settings saved.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle} htmlFor="contactEmail">Contact email</label>
          <input id="contactEmail" name="contactEmail" type="email" defaultValue={initial.contactEmail} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="contactPhone">Contact phone</label>
          <input id="contactPhone" name="contactPhone" defaultValue={initial.contactPhone} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="linkedinUrl">LinkedIn URL</label>
        <input id="linkedinUrl" name="linkedinUrl" defaultValue={initial.linkedinUrl} style={inputStyle} placeholder="https://www.linkedin.com/company/…" />
      </div>

      <div>
        <label style={labelStyle} htmlFor="footerTagline">Footer tagline</label>
        <textarea id="footerTagline" name="footerTagline" rows={3} defaultValue={initial.footerTagline} style={inputStyle} />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={pending}
          className="text-sm font-semibold px-4 py-2.5 rounded-lg disabled:opacity-60"
          style={{ background: "var(--text-primary)", color: "var(--background)" }}
        >
          {pending ? "Saving…" : "Save settings"}
        </button>
      </div>
    </form>
  );
}
