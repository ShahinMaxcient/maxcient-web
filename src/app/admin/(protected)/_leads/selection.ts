"use client";

import { useSyncExternalStore } from "react";

/**
 * The leads ticked for export.
 *
 * Kept in a module-level store rather than component state so the selection
 * survives paging, sorting and filtering: each of those is a navigation that
 * re-renders the page, and the store outlives it. A full reload clears it,
 * which is the expected behaviour for a selection.
 *
 * The set is replaced, never mutated, so React sees every change.
 */

const EMPTY: ReadonlySet<string> = new Set();
let selected: ReadonlySet<string> = EMPTY;
const listeners = new Set<() => void>();

function commit(next: ReadonlySet<string>) {
  selected = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useLeadSelection(): ReadonlySet<string> {
  return useSyncExternalStore(
    subscribe,
    () => selected,
    () => EMPTY,
  );
}

export function toggleLead(id: string) {
  const next = new Set(selected);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  commit(next);
}

/** Selects or deselects several leads at once, e.g. every lead on a page. */
export function setLeadsSelected(ids: string[], on: boolean) {
  const next = new Set(selected);
  for (const id of ids) {
    if (on) next.add(id);
    else next.delete(id);
  }
  commit(next);
}

export function clearLeadSelection() {
  commit(EMPTY);
}
