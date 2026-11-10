"use client";

import { useOptimistic, useTransition } from "react";
import { LEAD_STATUSES, LEAD_STATUS_COLORS, LEAD_STATUS_LABELS, isLeadStatus, type LeadStatusValue } from "@/lib/lead-query";
import { updateLeadStatus } from "../actions";
import { useToast } from "./toast";

/**
 * A lead's status, saved as soon as it is changed.
 *
 * The value is controlled React state, not a form field's defaultValue. The
 * old Save-button form showed the previous status again after every save (see
 * updateLeadStatus), and a separate Save step also meant a changed dropdown
 * was silently lost if the admin moved on without clicking it.
 *
 * useOptimistic shows the new status at once. When the action returns, the
 * revalidated page supplies the saved status as the prop; if the save failed,
 * the optimistic value is dropped and the row shows the stored status again.
 */
export default function LeadStatusSelect({
  leadId,
  leadName,
  status,
  onChanged,
}: {
  leadId: string;
  leadName: string;
  status: LeadStatusValue;
  /** Called after a successful save, with the status it replaced. */
  onChanged: (previous: LeadStatusValue, next: LeadStatusValue) => void;
}) {
  const [shown, setShown] = useOptimistic(status);
  const [saving, startTransition] = useTransition();
  const toast = useToast();

  function change(next: LeadStatusValue) {
    const previous = shown;
    if (next === previous) return;
    startTransition(async () => {
      setShown(next);
      const result = await updateLeadStatus(leadId, next);
      if (result.ok) onChanged(previous, result.status);
      else toast.error(`${leadName}: ${result.error}`);
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span aria-hidden className="w-2 h-2 rounded-full shrink-0" style={{ background: LEAD_STATUS_COLORS[shown] }} />
      <select
        value={shown}
        // Disabled while saving, so two quick changes cannot race each other
        // to the database and leave it on whichever request landed last.
        disabled={saving}
        onChange={(e) => {
          if (isLeadStatus(e.target.value)) change(e.target.value);
        }}
        aria-label={`Status for ${leadName}`}
        className="px-2 py-1.5 rounded-md text-xs font-medium outline-none disabled:opacity-60 disabled:cursor-wait"
        style={{ background: "var(--surface)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
      >
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>{LEAD_STATUS_LABELS[s]}</option>
        ))}
      </select>
      {saving && (
        <span className="text-xs" style={{ color: "var(--text-muted)" }} aria-live="polite">
          Saving…
        </span>
      )}
    </div>
  );
}
