"use client";

import { useCallback, useEffect, useOptimistic, useRef, useState, useTransition, type RefObject } from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LEAD_QUERY,
  LEAD_SOURCES,
  LEAD_SOURCE_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_COLORS,
  LEAD_STATUS_LABELS,
  LEAD_STATUS_TEXT_COLORS,
  PAGE_SIZES,
  hasActiveFilters,
  isLeadStatus,
  leadQueryHref,
  type LeadQuery,
  type LeadSortField,
  type LeadSourceValue,
  type LeadStatusValue,
} from "@/lib/lead-query";
import ExportMenu from "./ExportMenu";
import LeadDetailsDialog from "./LeadDetailsDialog";
import LeadStatusSelect from "./LeadStatusSelect";
import { saveLeadStatus } from "./save-status";
import { clearLeadSelection, setLeadsSelected, toggleLead, useLeadSelection } from "./selection";
import { ToastProvider, useToast } from "./toast";
import type { LeadRow } from "./types";

type Props = {
  rows: LeadRow[];
  query: LeadQuery;
  /** Leads matching the search and filters, across all pages. */
  matching: number;
  /** Every lead, ignoring filters. */
  total: number;
  pageCount: number;
  /** Leads per status, ignoring filters. */
  statusCounts: Record<LeadStatusValue, number>;
};

export default function LeadsView(props: Props) {
  return (
    <ToastProvider>
      <LeadsViewInner {...props} />
    </ToastProvider>
  );
}

type NavigateFn = (next: Partial<LeadQuery>, mode?: "push" | "replace") => void;

function LeadsViewInner({ rows, query, matching, total, pageCount, statusCounts }: Props) {
  const router = useRouter();
  const [navigating, startNavigation] = useTransition();
  const [, startUndo] = useTransition();
  const toast = useToast();
  const selection = useLeadSelection();
  const [openLead, setOpenLead] = useState<LeadRow | null>(null);

  // The query the admin has asked for, ahead of the server. Every control
  // shows and builds on this, not on the last rendered query: otherwise a
  // filter chosen while a search is still loading would be built from the
  // old URL, replace the pending search, and leave the search box showing a
  // term the table ignores. It falls back to the rendered query once the
  // navigations finish.
  const [wanted, addWanted] = useOptimistic(query, (current: LeadQuery, next: Partial<LeadQuery>) => ({
    ...current,
    ...next,
  }));

  // Every search, filter, sort and page change is a URL change, so the view
  // can be bookmarked, shared, reloaded and walked back with the Back button.
  // The server renders the matching page; the transition keeps the current
  // table on screen, dimmed, until it arrives.
  const navigate = useCallback<NavigateFn>(
    (next, mode = "push") => {
      const href = leadQueryHref({ ...wanted, ...next });
      startNavigation(() => {
        addWanted(next);
        if (mode === "replace") router.replace(href, { scroll: false });
        else router.push(href, { scroll: false });
      });
    },
    [wanted, addWanted, router],
  );

  const onSearch = useCallback((q: string) => navigate({ q, page: 1 }, "replace"), [navigate]);

  const statusChanged = useCallback(
    (lead: LeadRow, previous: LeadStatusValue, next: LeadStatusValue) => {
      toast.success(`${lead.name} is now ${LEAD_STATUS_LABELS[next]}.`, {
        label: "Undo",
        // Runs from the notification, after the row may have left the table
        // (a status filter hides it), so it does not depend on the row.
        onClick: () =>
          startUndo(async () => {
            const result = await saveLeadStatus(lead.id, previous);
            if (result.ok) toast.success(`${lead.name} is back to ${LEAD_STATUS_LABELS[previous]}.`);
            else toast.error(`${lead.name}: ${result.error}`);
          }),
      });
    },
    [toast],
  );

  // Focus targets for controls that disappear or change under the cursor.
  const searchRef = useRef<HTMLInputElement>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLSpanElement>(null);
  const focusSummaryOnPage = useRef(false);

  // After a page change from the pagination controls, move focus to the
  // result summary at the top of the table, which also brings it into view.
  useEffect(() => {
    if (!focusSummaryOnPage.current) return;
    focusSummaryOnPage.current = false;
    summaryRef.current?.focus();
  }, [query.page]);

  const goToPage = (page: number) => {
    focusSummaryOnPage.current = true;
    navigate({ page });
  };

  const filtersActive = hasActiveFilters(wanted);
  const pageIds = rows.map((r) => r.id);
  const selectedOnPage = pageIds.filter((id) => selection.has(id)).length;
  const allOnPage = pageIds.length > 0 && selectedOnPage === pageIds.length;
  const firstRow = matching === 0 ? 0 : (query.page - 1) * query.pageSize + 1;
  const lastRow = Math.min(query.page * query.pageSize, matching);

  // The dialog shows the row as it is now, so a status changed elsewhere in
  // the meantime is reflected when it is open.
  const dialogLead = openLead ? rows.find((r) => r.id === openLead.id) ?? openLead : null;

  return (
    <div>
      {/* Status summary. Each card filters the table to that status; pressing
          the active card clears the filter. Counts are across all leads. */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {LEAD_STATUSES.map((s) => {
          const active = wanted.status === s;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={active}
              onClick={() => navigate({ status: active ? null : s, page: 1 })}
              className="p-4 rounded-xl text-left transition-shadow hover:shadow-sm"
              style={{
                background: "var(--card-bg)",
                border: `1px solid ${active ? LEAD_STATUS_COLORS[s] : "var(--border)"}`,
                boxShadow: active ? `inset 0 0 0 1px ${LEAD_STATUS_COLORS[s]}` : undefined,
              }}
            >
              <div className="text-2xl font-bold" style={{ color: LEAD_STATUS_TEXT_COLORS[s] }}>
                {statusCounts[s].toLocaleString()}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>
                {LEAD_STATUS_LABELS[s]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <SearchBox value={wanted.q} onSearch={onSearch} inputRef={searchRef} />
        <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          <span className="block mb-1">Status</span>
          <select
            value={wanted.status ?? ""}
            onChange={(e) => navigate({ status: isLeadStatus(e.target.value) ? e.target.value : null, page: 1 })}
            className="px-2.5 py-2 rounded-md text-sm"
            style={controlStyle}
          >
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>{LEAD_STATUS_LABELS[s]}</option>
            ))}
          </select>
        </label>
        <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          <span className="block mb-1">Source</span>
          <select
            value={wanted.source ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              navigate({ source: (LEAD_SOURCES as readonly string[]).includes(v) ? (v as LeadSourceValue) : null, page: 1 });
            }}
            className="px-2.5 py-2 rounded-md text-sm"
            style={controlStyle}
          >
            <option value="">All sources</option>
            {LEAD_SOURCES.map((s) => (
              <option key={s} value={s}>{LEAD_SOURCE_LABELS[s]}</option>
            ))}
          </select>
        </label>
        {filtersActive && (
          <button
            type="button"
            onClick={() => {
              navigate({ q: "", status: null, source: null, page: 1 });
              // This button disappears once filters are clear; keep focus in
              // the toolbar rather than losing it.
              searchRef.current?.focus();
            }}
            className="text-sm font-medium px-3 py-2 rounded-md"
            style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}
          >
            Clear filters
          </button>
        )}
        <div className="ml-auto">
          <ExportMenu
            selectedIds={[...selection]}
            query={query}
            filtersActive={hasActiveFilters(query)}
            matching={matching}
            total={total}
          />
        </div>
      </div>

      {/* Result count and selection */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-sm min-h-8" style={{ color: "var(--text-muted)" }}>
        <span ref={summaryRef} tabIndex={-1} aria-live="polite" className="outline-offset-2">
          {matching === 0
            ? "No leads to show"
            : `Showing ${firstRow.toLocaleString()}–${lastRow.toLocaleString()} of ${matching.toLocaleString()} ${hasActiveFilters(query) ? "matching " : ""}${matching === 1 ? "lead" : "leads"}`}
          {navigating && " · Loading…"}
        </span>
        {selection.size > 0 && (
          <span className="flex items-center gap-3">
            <span style={{ color: "var(--text-primary)" }}>
              <strong>{selection.size.toLocaleString()}</strong> selected
              {selection.size !== selectedOnPage && ` (${selectedOnPage.toLocaleString()} on this page)`}
            </span>
            <button
              type="button"
              onClick={() => {
                clearLeadSelection();
                // This button disappears with the selection.
                selectAllRef.current?.focus();
              }}
              className="font-medium underline underline-offset-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Clear selection
            </button>
          </span>
        )}
      </div>

      {rows.length === 0 ? (
        <div
          className="p-12 text-center rounded-xl"
          style={{ background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
        >
          {total === 0
            ? "No leads yet. Submissions from the consultation and product demo forms will appear here."
            : "No leads match the current search and filters."}
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden transition-opacity"
          style={{ border: "1px solid var(--border)", opacity: navigating ? 0.6 : 1 }}
          aria-busy={navigating}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--surface-alt)", color: "var(--text-secondary)" }}>
                  <th className="w-10 px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      aria-label={allOnPage ? "Deselect all leads on this page" : "Select all leads on this page"}
                      checked={allOnPage}
                      ref={(el) => {
                        selectAllRef.current = el;
                        if (el) el.indeterminate = selectedOnPage > 0 && !allOnPage;
                      }}
                      onChange={() => setLeadsSelected(pageIds, !allOnPage)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <SortHeader field="name" label="Name" query={wanted} onSort={navigate} />
                  <th className="text-left font-semibold px-4 py-3">Contact</th>
                  <th className="text-left font-semibold px-4 py-3">Service</th>
                  <th className="text-left font-semibold px-4 py-3">Message</th>
                  <SortHeader field="createdAt" label="Received (UAE)" query={wanted} onSort={navigate} />
                  <SortHeader field="status" label="Status" query={wanted} onSort={navigate} />
                </tr>
              </thead>
              <tbody>
                {rows.map((lead) => {
                  const checked = selection.has(lead.id);
                  return (
                    <tr
                      key={lead.id}
                      style={{ borderTop: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--text-primary)" }}
                    >
                      {/* A selected row is marked with a bar, not a tinted
                          background, which would drop the muted text below
                          AA contrast. */}
                      <td
                        className="px-4 py-3 align-top"
                        style={{ boxShadow: checked ? "inset 3px 0 0 var(--primary)" : undefined }}
                      >
                        <input
                          type="checkbox"
                          aria-label={`Select ${lead.name}`}
                          checked={checked}
                          onChange={() => toggleLead(lead.id)}
                          className="w-4 h-4 mt-0.5 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 align-top">
                        <button
                          type="button"
                          onClick={() => setOpenLead(lead)}
                          aria-label={`${lead.name}, view details`}
                          className="font-semibold text-left hover:underline break-words"
                          style={{ color: "var(--primary)" }}
                        >
                          {lead.name}
                        </button>
                        {lead.company && (
                          <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{lead.company}</div>
                        )}
                        {lead.enrichment && (lead.enrichment.jobTitle || lead.enrichment.companyName) && (
                          <div className="mt-1.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                            {[lead.enrichment.jobTitle, lead.enrichment.companyName].filter(Boolean).join(" · ")}
                          </div>
                        )}
                      </td>
                      {/* Wide enough for a typical address on one line; break-words
                          only splits an address that cannot fit at all. */}
                      <td className="px-4 py-3 align-top" style={{ minWidth: 200 }}>
                        <a href={`mailto:${lead.email}`} className="hover:underline break-words" style={{ color: "var(--primary)" }}>{lead.email}</a>
                        {lead.phone && (
                          <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{lead.phone}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top" style={{ color: "var(--text-secondary)" }}>
                        <div>{lead.service || "—"}</div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{lead.sourceLabel}</div>
                      </td>
                      <td className="px-4 py-3 align-top" style={{ color: "var(--text-secondary)", minWidth: 220, maxWidth: 320 }}>
                        {lead.message ? (
                          <MessagePreview message={lead.message} name={lead.name} onOpen={() => setOpenLead(lead)} />
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 align-top whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                        {lead.receivedLabel}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <LeadStatusSelect
                          leadId={lead.id}
                          leadName={lead.name}
                          status={lead.status}
                          onChanged={(previous, next) => statusChanged(lead, previous, next)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
        <label className="flex items-center gap-2">
          Rows per page
          <select
            value={wanted.pageSize}
            onChange={(e) => navigate({ pageSize: Number(e.target.value), page: 1 })}
            className="px-2 py-1.5 rounded-md text-sm"
            style={controlStyle}
          >
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
        {pageCount > 1 && (
          <nav aria-label="Leads pages" className="flex items-center gap-1">
            <PageButton label="Previous" unavailable={query.page <= 1} onClick={() => goToPage(query.page - 1)} />
            {pageWindow(query.page, pageCount).map((p, i) =>
              p === null ? (
                <span key={`gap-${i}`} className="px-2" aria-hidden>…</span>
              ) : (
                <PageButton key={p} label={String(p)} current={p === query.page} onClick={() => goToPage(p)} />
              ),
            )}
            <PageButton label="Next" unavailable={query.page >= pageCount} onClick={() => goToPage(query.page + 1)} />
          </nav>
        )}
      </div>

      <LeadDetailsDialog lead={dialogLead} onClose={() => setOpenLead(null)} />
    </div>
  );
}

const controlStyle: React.CSSProperties = {
  background: "var(--surface)",
  color: "var(--text-primary)",
  border: "1px solid var(--border)",
};

/**
 * The first two lines of a message, with a "View full message" button
 * whenever the text is actually cut off. Measured rather than guessed from
 * the length: how much fits depends on the column width and the words.
 */
function MessagePreview({ message, name, onOpen }: { message: string; name: string; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Called once on observe and again whenever the column resizes.
    const observer = new ResizeObserver(() => setClamped(el.scrollHeight > el.clientHeight + 1));
    observer.observe(el);
    return () => observer.disconnect();
  }, [message]);

  return (
    <>
      <div ref={ref} className="line-clamp-2 whitespace-pre-line break-words">{message}</div>
      {clamped && (
        <button
          type="button"
          onClick={onOpen}
          className="mt-1 text-xs font-semibold hover:underline"
          style={{ color: "var(--primary)" }}
          aria-label={`View full message from ${name}`}
        >
          View full message
        </button>
      )}
    </>
  );
}

/**
 * The search field. It searches as the admin types, after a short pause, and
 * on Enter at once. It keeps its own text so typing is never interrupted by
 * the navigation it triggers, and takes the requested value when the search
 * is changed from outside it (Clear filters, the Back button).
 */
function SearchBox({
  value,
  onSearch,
  inputRef,
}: {
  value: string;
  onSearch: (q: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const [text, setText] = useState(value);
  // The requested value last seen, and the value this box last sent. A change
  // that matches what was sent is this box's own search and must not
  // overwrite newer typing; any other change came from outside.
  const [seen, setSeen] = useState(value);
  const [sent, setSent] = useState(value);
  if (value !== seen) {
    setSeen(value);
    if (value !== sent) {
      setText(value);
      setSent(value);
    }
  }

  useEffect(() => {
    const q = text.trim();
    if (q === sent) return;
    const timer = setTimeout(() => {
      setSent(q);
      onSearch(q);
    }, 350);
    return () => clearTimeout(timer);
  }, [text, sent, onSearch]);

  return (
    <form
      role="search"
      className="flex-1 min-w-[220px] max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        const q = text.trim();
        if (q === sent) return;
        setSent(q);
        onSearch(q);
      }}
    >
      <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
        <span className="block mb-1">Search</span>
        <input
          ref={inputRef}
          type="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Name, email, phone, company, message…"
          maxLength={200}
          className="w-full px-3 py-2 rounded-md text-sm"
          style={controlStyle}
        />
      </label>
    </form>
  );
}

function SortHeader({
  field,
  label,
  query,
  onSort,
}: {
  field: LeadSortField;
  label: string;
  query: LeadQuery;
  onSort: NavigateFn;
}) {
  const active = query.sort === field;
  // Dates start newest first; names and statuses start A–Z / pipeline order.
  const firstDir = field === "createdAt" ? "desc" : "asc";
  const nextDir = active ? (query.dir === "asc" ? "desc" : "asc") : firstDir;
  return (
    <th
      className="text-left font-semibold px-4 py-3 whitespace-nowrap"
      aria-sort={active ? (query.dir === "asc" ? "ascending" : "descending") : "none"}
    >
      <button
        type="button"
        onClick={() =>
          // Back to the default order rather than a third "unsorted" state.
          onSort(
            active && query.dir !== firstDir
              ? { sort: DEFAULT_LEAD_QUERY.sort, dir: DEFAULT_LEAD_QUERY.dir, page: 1 }
              : { sort: field, dir: nextDir, page: 1 },
          )
        }
        className="inline-flex items-center gap-1 hover:underline"
      >
        {label}
        <span aria-hidden className="text-xs" style={{ opacity: active ? 1 : 0.35 }}>
          {active ? (query.dir === "asc" ? "▲" : "▼") : "↕"}
        </span>
      </button>
    </th>
  );
}

/**
 * A pagination button. Never natively disabled: a disabled button cannot
 * hold focus, so disabling the page button just pressed (or Next on reaching
 * the last page) would drop keyboard focus. Unavailable and current buttons
 * are announced as such and ignore presses instead.
 */
function PageButton({
  label,
  onClick,
  unavailable,
  current,
}: {
  label: string;
  onClick: () => void;
  unavailable?: boolean;
  current?: boolean;
}) {
  const inert = unavailable || current;
  return (
    <button
      type="button"
      onClick={() => {
        if (!inert) onClick();
      }}
      aria-current={current ? "page" : undefined}
      aria-disabled={unavailable || undefined}
      aria-label={/^\d+$/.test(label) ? `Page ${label}` : undefined}
      className={`min-w-9 px-2.5 py-1.5 rounded-md text-sm font-medium ${inert ? "cursor-default" : "hover:bg-[var(--surface-alt)]"}`}
      style={
        current
          ? { background: "var(--text-primary)", color: "var(--background)" }
          : { color: unavailable ? "var(--text-muted)" : "var(--text-secondary)", border: "1px solid var(--border)", opacity: unavailable ? 0.5 : 1 }
      }
    >
      {label}
    </button>
  );
}

/** Page numbers to show: the ends, the current page and its neighbours, with gaps as null. */
function pageWindow(current: number, count: number): (number | null)[] {
  const pages = new Set([1, count, current - 1, current, current + 1].filter((p) => p >= 1 && p <= count));
  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | null)[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push(null);
    out.push(p);
  });
  return out;
}
