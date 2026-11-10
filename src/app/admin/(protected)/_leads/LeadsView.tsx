"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LEAD_QUERY,
  LEAD_SOURCES,
  LEAD_SOURCE_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  PAGE_SIZES,
  hasActiveFilters,
  isLeadStatus,
  leadQueryHref,
  type LeadQuery,
  type LeadSortField,
  type LeadSourceValue,
  type LeadStatusValue,
} from "@/lib/lead-query";
import { updateLeadStatus } from "../actions";
import ExportMenu from "./ExportMenu";
import LeadDetailsDialog from "./LeadDetailsDialog";
import LeadStatusSelect from "./LeadStatusSelect";
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
};

export default function LeadsView(props: Props) {
  return (
    <ToastProvider>
      <LeadsViewInner {...props} />
    </ToastProvider>
  );
}

// A message longer than this, or with line breaks, gets a "View full message"
// button; shorter ones fit in the two-line preview.
const PREVIEW_CHARS = 120;

const controlStyle: React.CSSProperties = {
  background: "var(--surface)",
  color: "var(--text-primary)",
  border: "1px solid var(--border)",
};

function LeadsViewInner({ rows, query, matching, total, pageCount }: Props) {
  const router = useRouter();
  const [navigating, startNavigation] = useTransition();
  const [, startUndo] = useTransition();
  const toast = useToast();
  const selection = useLeadSelection();
  const [openLead, setOpenLead] = useState<LeadRow | null>(null);

  // Every search, filter, sort and page change is a URL change, so the view
  // can be bookmarked, shared, reloaded and walked back with the Back button.
  // The server renders the matching page; the transition keeps the current
  // table on screen, dimmed, until it arrives.
  const navigate = useCallback(
    (next: Partial<LeadQuery>, mode: "push" | "replace" = "push") => {
      const href = leadQueryHref({ ...query, ...next });
      startNavigation(() => {
        if (mode === "replace") router.replace(href, { scroll: false });
        else router.push(href, { scroll: false });
      });
    },
    [query, router],
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
            const result = await updateLeadStatus(lead.id, previous);
            if (result.ok) toast.success(`${lead.name} is back to ${LEAD_STATUS_LABELS[previous]}.`);
            else toast.error(`${lead.name}: ${result.error}`);
          }),
      });
    },
    [toast],
  );

  const filtersActive = hasActiveFilters(query);
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
      {/* Toolbar */}
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <SearchBox value={query.q} onSearch={onSearch} />
        <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          <span className="block mb-1">Status</span>
          <select
            value={query.status ?? ""}
            onChange={(e) => navigate({ status: isLeadStatus(e.target.value) ? e.target.value : null, page: 1 })}
            className="px-2.5 py-2 rounded-md text-sm outline-none"
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
            value={query.source ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              navigate({ source: (LEAD_SOURCES as readonly string[]).includes(v) ? (v as LeadSourceValue) : null, page: 1 });
            }}
            className="px-2.5 py-2 rounded-md text-sm outline-none"
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
            onClick={() => navigate({ q: "", status: null, source: null, page: 1 })}
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
            filtersActive={filtersActive}
            matching={matching}
            total={total}
          />
        </div>
      </div>

      {/* Result count and selection */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-sm min-h-8" style={{ color: "var(--text-muted)" }}>
        <span aria-live="polite">
          {matching === 0
            ? "No leads to show"
            : `Showing ${firstRow.toLocaleString()}–${lastRow.toLocaleString()} of ${matching.toLocaleString()} ${filtersActive ? "matching " : ""}${matching === 1 ? "lead" : "leads"}`}
          {navigating && " · Loading…"}
        </span>
        {selection.size > 0 && (
          <span className="flex items-center gap-3">
            <span style={{ color: "var(--text-primary)" }}>
              <strong>{selection.size.toLocaleString()}</strong> selected
              {selection.size !== selectedOnPage && ` (${selectedOnPage.toLocaleString()} on this page)`}
            </span>
            <button type="button" onClick={clearLeadSelection} className="font-medium underline underline-offset-2" style={{ color: "var(--text-secondary)" }}>
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
                        if (el) el.indeterminate = selectedOnPage > 0 && !allOnPage;
                      }}
                      onChange={() => setLeadsSelected(pageIds, !allOnPage)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <SortHeader field="name" label="Name" query={query} onSort={navigate} />
                  <th className="text-left font-semibold px-4 py-3">Contact</th>
                  <th className="text-left font-semibold px-4 py-3">Service</th>
                  <th className="text-left font-semibold px-4 py-3">Message</th>
                  <SortHeader field="createdAt" label="Received (UAE)" query={query} onSort={navigate} />
                  <SortHeader field="status" label="Status" query={query} onSort={navigate} />
                </tr>
              </thead>
              <tbody>
                {rows.map((lead) => {
                  const checked = selection.has(lead.id);
                  const long = !!lead.message && (lead.message.length > PREVIEW_CHARS || lead.message.includes("\n"));
                  return (
                    <tr
                      key={lead.id}
                      style={{
                        borderTop: "1px solid var(--border)",
                        background: checked ? "var(--surface-alt)" : "var(--card-bg)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <td className="px-4 py-3 align-top">
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
                          className="font-semibold text-left hover:underline break-words"
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
                          <>
                            <div className="line-clamp-2 whitespace-pre-line break-words">{lead.message}</div>
                            {long && (
                              <button
                                type="button"
                                onClick={() => setOpenLead(lead)}
                                className="mt-1 text-xs font-semibold hover:underline"
                                style={{ color: "var(--primary)" }}
                                aria-label={`View full message from ${lead.name}`}
                              >
                                View full message
                              </button>
                            )}
                          </>
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
            value={query.pageSize}
            onChange={(e) => navigate({ pageSize: Number(e.target.value), page: 1 })}
            className="px-2 py-1.5 rounded-md text-sm outline-none"
            style={controlStyle}
          >
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
        {pageCount > 1 && (
          <nav aria-label="Leads pages" className="flex items-center gap-1">
            <PageButton label="Previous" disabled={query.page <= 1} onClick={() => navigate({ page: query.page - 1 })} />
            {pageWindow(query.page, pageCount).map((p, i) =>
              p === null ? (
                <span key={`gap-${i}`} className="px-2" aria-hidden>…</span>
              ) : (
                <PageButton
                  key={p}
                  label={String(p)}
                  current={p === query.page}
                  onClick={() => navigate({ page: p })}
                />
              ),
            )}
            <PageButton label="Next" disabled={query.page >= pageCount} onClick={() => navigate({ page: query.page + 1 })} />
          </nav>
        )}
      </div>

      <LeadDetailsDialog lead={dialogLead} onClose={() => setOpenLead(null)} />
    </div>
  );
}

/**
 * The search field. It searches as the admin types, after a short pause, and
 * on Enter at once. It keeps its own text so typing is never interrupted by
 * the navigation it triggers, and takes the URL's value when the search is
 * changed from outside it (Clear filters, the Back button).
 */
function SearchBox({ value, onSearch }: { value: string; onSearch: (q: string) => void }) {
  const [text, setText] = useState(value);
  // The URL value last seen, and the value this box last sent. A URL change
  // that matches what was sent is this box's own search catching up and must
  // not overwrite newer typing; any other change came from outside.
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
          type="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Name, email, phone, company, message…"
          maxLength={200}
          className="w-full px-3 py-2 rounded-md text-sm outline-none"
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
  onSort: (next: Partial<LeadQuery>) => void;
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

function PageButton({
  label,
  onClick,
  disabled,
  current,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  current?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || current}
      aria-current={current ? "page" : undefined}
      aria-label={/^\d+$/.test(label) ? `Page ${label}` : undefined}
      className="min-w-9 px-2.5 py-1.5 rounded-md text-sm font-medium disabled:cursor-default enabled:hover:bg-[var(--surface-alt)]"
      style={
        current
          ? { background: "var(--text-primary)", color: "var(--background)" }
          : { color: disabled ? "var(--text-muted)" : "var(--text-secondary)", border: "1px solid var(--border)", opacity: disabled ? 0.5 : 1 }
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
