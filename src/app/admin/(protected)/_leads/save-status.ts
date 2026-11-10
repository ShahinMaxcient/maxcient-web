"use client";

import type { LeadStatusValue } from "@/lib/lead-query";
import { updateLeadStatus, type UpdateLeadStatusResult } from "../actions";

/**
 * Calls the updateLeadStatus Server Action and always returns a result.
 *
 * The action reports its own failures as a result, but the call itself can
 * still reject before the action runs: the network drops, the host returns a
 * 5xx or times out, or a new deployment no longer recognises the action. A
 * rejection inside a transition is re-thrown to the nearest error boundary,
 * which would replace the whole admin page, so it is turned into a result the
 * table can show as a notification.
 */
export async function saveLeadStatus(id: string, status: LeadStatusValue): Promise<UpdateLeadStatusResult> {
  try {
    return await updateLeadStatus(id, status);
  } catch (err) {
    console.error("Lead status request failed:", err);
    return {
      ok: false,
      error: "The status could not be saved. Check your connection and try again. If the admin was just updated, reload the page first.",
    };
  }
}
