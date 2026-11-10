"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { LEAD_STATUS_COLORS, LEAD_STATUS_LABELS, LEAD_STATUS_TEXT_COLORS } from "@/lib/lead-query";
import type { LeadRow } from "./types";

/**
 * Everything about one lead, including the complete message.
 *
 * A native <dialog> opened with showModal(): the browser supplies the focus
 * trap, Escape to close, the backdrop and inert background, and returns focus
 * to the button that opened it.
 */
export default function LeadDetailsDialog({ lead, onClose }: { lead: LeadRow | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  // Whether the current click started on the backdrop. A text selection that
  // starts in the message and is released over the backdrop also ends in a
  // click on the <dialog> element, and must not close it.
  const pressedOnBackdrop = useRef(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (lead && !dialog.open) dialog.showModal();
    if (!lead && dialog.open) dialog.close();
  }, [lead]);

  async function copyMessage() {
    if (!lead?.message) return;
    try {
      await navigator.clipboard.writeText(lead.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused; the text is still selectable.
    }
  }

  return (
    <dialog
      ref={ref}
      onClose={() => {
        setCopied(false);
        onClose();
      }}
      // Clicking the backdrop (the dialog element itself, outside the panel)
      // closes it, but only when the press started there too.
      onPointerDown={(e) => {
        pressedOnBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (pressedOnBackdrop.current && e.target === e.currentTarget) e.currentTarget.close();
        pressedOnBackdrop.current = false;
      }}
      aria-labelledby="lead-details-title"
      className="m-auto w-[min(720px,calc(100vw-2rem))] max-h-[calc(100vh-2rem)] rounded-xl p-0 backdrop:bg-black/50"
      style={{ background: "var(--card-bg)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
    >
      {lead && (
        <div className="flex flex-col max-h-[calc(100vh-2rem)]">
          <div className="flex items-start justify-between gap-4 px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="min-w-0">
              <h2 id="lead-details-title" className="text-lg font-bold break-words">{lead.name}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: LEAD_STATUS_TEXT_COLORS[lead.status] }}>
                  <span aria-hidden className="w-2 h-2 rounded-full" style={{ background: LEAD_STATUS_COLORS[lead.status] }} />
                  {LEAD_STATUS_LABELS[lead.status]}
                </span>
                <span>·</span>
                <span>Received {lead.receivedLabel} (UAE)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="shrink-0 text-sm font-medium px-3 py-1.5 rounded-md"
              style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}
            >
              Close
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-5 space-y-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <Field label="Email">
                <a href={`mailto:${lead.email}`} className="hover:underline break-all" style={{ color: "var(--primary)" }}>{lead.email}</a>
              </Field>
              <Field label="Phone">
                {lead.phone ? (
                  <a href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`} className="hover:underline" style={{ color: "var(--primary)" }}>{lead.phone}</a>
                ) : null}
              </Field>
              <Field label="Company">{lead.company}</Field>
              <Field label="Service">{lead.service}</Field>
              <Field label="Source">{lead.sourceLabel}</Field>
              <Field label="Last updated">{`${lead.updatedLabel} (UAE)`}</Field>
            </dl>

            <section>
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Message{lead.message ? ` · ${lead.message.length.toLocaleString()} characters` : ""}
                </h3>
                {lead.message && (
                  <button
                    type="button"
                    onClick={copyMessage}
                    className="text-xs font-medium px-2.5 py-1 rounded-md"
                    style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                  >
                    {copied ? "Copied" : "Copy message"}
                  </button>
                )}
              </div>
              {lead.message ? (
                // pre-wrap keeps the visitor's line breaks; break-words stops a
                // long unbroken string (a URL) from widening the dialog.
                <div
                  className="text-sm leading-relaxed whitespace-pre-wrap break-words rounded-lg px-4 py-3"
                  style={{ background: "var(--surface-alt)", color: "var(--text-primary)" }}
                >
                  {lead.message}
                </div>
              ) : (
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>No message was submitted.</p>
              )}
            </section>

            {lead.enrichment && (
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                  From Apollo{lead.enrichment.enrichedLabel ? ` · ${lead.enrichment.enrichedLabel} (UAE)` : ""}
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <Field label="Job title">{lead.enrichment.jobTitle}</Field>
                  <Field label="Company">{lead.enrichment.companyName}</Field>
                  <Field label="Company domain">{lead.enrichment.companyDomain}</Field>
                  <Field label="Industry">{lead.enrichment.companyIndustry}</Field>
                  <Field label="Company size">
                    {lead.enrichment.companySize ? `${lead.enrichment.companySize.toLocaleString()} staff` : null}
                  </Field>
                  <Field label="Location">{lead.enrichment.personLocation}</Field>
                  <Field label="LinkedIn">
                    {/* Only http(s) links are made clickable: the value comes from a
                        third-party API, not from this site. */}
                    {lead.enrichment.linkedinUrl && /^https?:\/\//i.test(lead.enrichment.linkedinUrl) ? (
                      <a href={lead.enrichment.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline break-all" style={{ color: "var(--primary)" }}>
                        {lead.enrichment.linkedinUrl}
                      </a>
                    ) : lead.enrichment.linkedinUrl}
                  </Field>
                </dl>
              </section>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{label}</dt>
      <dd className="mt-0.5 break-words">{children ?? <span style={{ color: "var(--text-muted)" }}>—</span>}</dd>
    </div>
  );
}
