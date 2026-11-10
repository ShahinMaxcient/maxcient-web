"use client";

import { useEffect, useRef, useState } from "react";
import type { LeadQuery } from "@/lib/lead-query";
import { useToast } from "./toast";

type ExportBody =
  | { scope: "selected"; ids: string[] }
  | { scope: "filtered"; query: Record<string, string> }
  | { scope: "all" };

const ENDPOINT = "/api/admin/leads/export";

function filenameFrom(disposition: string | null): string | null {
  const match = disposition?.match(/filename="([^"]+)"/);
  return match ? match[1] : null;
}

/**
 * "Export to Excel" with the choices that apply right now: the ticked leads,
 * every lead matching the current search and filters, or every lead.
 *
 * The file is built on the server, so "all" really means all rows, not just
 * the page in the table. It is fetched rather than linked so a failure can be
 * reported in a notification instead of leaving a broken download.
 */
export default function ExportMenu({
  selectedIds,
  query,
  filtersActive,
  matching,
  total,
}: {
  selectedIds: string[];
  query: LeadQuery;
  filtersActive: boolean;
  matching: number;
  total: number;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Close on a click outside or on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function run(body: ExportBody, expected: number) {
    setOpen(false);
    setBusy(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || `The export failed (error ${res.status}).`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filenameFrom(res.headers.get("Content-Disposition")) ?? "maxcient-leads.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Revoked after the browser has started the download.
      setTimeout(() => URL.revokeObjectURL(url), 10_000);

      const exported = Number(res.headers.get("X-Lead-Count")) || 0;
      const missing = expected - exported;
      toast.success(
        `Exported ${exported.toLocaleString()} ${exported === 1 ? "lead" : "leads"} to Excel.` +
          (body.scope === "selected" && missing > 0
            ? ` ${missing.toLocaleString()} selected ${missing === 1 ? "lead no longer exists" : "leads no longer exist"}.`
            : ""),
      );
    } catch (err) {
      // fetch() itself throws a TypeError when the network is unreachable.
      const message =
        err instanceof TypeError ? "Could not reach the server. Check your connection and try again." :
        err instanceof Error ? err.message : "The export failed.";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  const filteredQuery: Record<string, string> = {
    q: query.q,
    status: query.status ?? "",
    source: query.source ?? "",
    sort: query.sort,
    dir: query.dir,
  };

  const itemClass =
    "w-full text-left px-3 py-2 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-[var(--surface-alt)]";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={busy}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md disabled:opacity-60 disabled:cursor-wait"
        style={{ background: "var(--text-primary)", color: "var(--background)" }}
      >
        <svg aria-hidden className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" />
        </svg>
        {busy ? "Preparing…" : "Export to Excel"}
        <svg aria-hidden className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Export to Excel"
          className="absolute right-0 mt-2 w-72 p-1.5 rounded-lg shadow-lg z-20"
          style={{ background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
        >
          <button
            type="button"
            role="menuitem"
            className={itemClass}
            disabled={selectedIds.length === 0}
            onClick={() => run({ scope: "selected", ids: selectedIds }, selectedIds.length)}
          >
            <span className="font-medium">Selected leads</span>
            <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {selectedIds.length === 0
                ? "Tick leads in the table first."
                : `${selectedIds.length.toLocaleString()} selected, across all pages`}
            </span>
          </button>
          {filtersActive && (
            <button
              type="button"
              role="menuitem"
              className={itemClass}
              disabled={matching === 0}
              onClick={() => run({ scope: "filtered", query: filteredQuery }, matching)}
            >
              <span className="font-medium">Leads matching the filters</span>
              <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {matching.toLocaleString()} {matching === 1 ? "lead" : "leads"}, all pages
              </span>
            </button>
          )}
          <button
            type="button"
            role="menuitem"
            className={itemClass}
            disabled={total === 0}
            onClick={() => run({ scope: "all" }, total)}
          >
            <span className="font-medium">All leads</span>
            <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {total.toLocaleString()} {total === 1 ? "lead" : "leads"}, ignoring filters
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
