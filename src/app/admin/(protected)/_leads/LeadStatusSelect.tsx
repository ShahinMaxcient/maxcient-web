"use client";

import { useOptimistic, useRef, useTransition } from "react";
import { LEAD_STATUSES, LEAD_STATUS_COLORS, LEAD_STATUS_LABELS, isLeadStatus, type LeadStatusValue } from "@/lib/lead-query";
import { saveLeadStatus } from "./save-status";
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
 *
 * The select stays enabled while saving. With the keyboard, Up and Down on a
 * closed select change the value on every press in some browsers; disabling
 * it after the first press would drop focus and swallow the rest. Each change
 * is saved, and Next.js runs Server Actions one at a time in the order they
 * were made, so the database ends on the last choice. Only the last change of
 * a quick series is reported, and its Undo returns to the status from before
 * the series began.
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
  // The newest change, so older saves still in flight stay quiet.
  const latestChange = useRef(0);
  // The status before the current series of changes, for Undo.
  const seriesStart = useRef<LeadStatusValue | null>(null);

  function change(next: LeadStatusValue) {
    if (next === shown) return;
    const changeId = ++latestChange.current;
    if (seriesStart.current === null) seriesStart.current = shown;
    const previous = seriesStart.current;

    startTransition(async () => {
      setShown(next);
      const result = await saveLeadStatus(leadId, next);
      if (changeId !== latestChange.current) return;
      seriesStart.current = null;
      if (result.ok) onChanged(previous, result.status);
      else toast.error(`${leadName}: ${result.error}`);
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span aria-hidden className="w-2 h-2 rounded-full shrink-0" style={{ background: LEAD_STATUS_COLORS[shown] }} />
      <select
        value={shown}
        onChange={(e) => {
          if (isLeadStatus(e.target.value)) change(e.target.value);
        }}
        aria-label={`Status for ${leadName}`}
        aria-busy={saving}
        className="px-2 py-1.5 rounded-md text-xs font-medium"
        style={{ background: "var(--surface)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
      >
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>{LEAD_STATUS_LABELS[s]}</option>
        ))}
      </select>
      {saving && (
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          Saving…
        </span>
      )}
    </div>
  );
}
