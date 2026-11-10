import type { Prisma } from "@prisma/client";

/**
 * The Leads page's search, filter, sort and pagination state, and the Prisma
 * queries it maps to.
 *
 * Shared by the admin page (one page of results), the client toolbar (to build
 * URLs) and the Excel export (every matching row), so all three always agree on
 * what "the leads matching these filters" means. Kept free of runtime Prisma
 * imports so the client bundle can use it.
 */

export const LEAD_STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"] as const;
export type LeadStatusValue = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatusValue, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  WON: "Won",
  LOST: "Lost",
};

export const LEAD_STATUS_COLORS: Record<LeadStatusValue, string> = {
  NEW: "#7c3aed",
  CONTACTED: "#2563eb",
  QUALIFIED: "#0891b2",
  WON: "#059669",
  LOST: "#9ca3af",
};

// Mirrors the allowlist in the public /api/leads schema.
export const LEAD_SOURCES = ["consultation-form", "product-demo"] as const;
export type LeadSourceValue = (typeof LEAD_SOURCES)[number];

export const LEAD_SOURCE_LABELS: Record<LeadSourceValue, string> = {
  "consultation-form": "Consultation form",
  "product-demo": "Product demo",
};

export const LEAD_SORT_FIELDS = ["createdAt", "name", "status"] as const;
export type LeadSortField = (typeof LEAD_SORT_FIELDS)[number];

export const PAGE_SIZES = [25, 50, 100] as const;
const DEFAULT_PAGE_SIZE = 25;

// Longest search term accepted; anything longer is cut, not rejected.
const MAX_SEARCH_LENGTH = 200;

export function isLeadStatus(value: unknown): value is LeadStatusValue {
  return typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value);
}

export type LeadQuery = {
  q: string;
  status: LeadStatusValue | null;
  source: LeadSourceValue | null;
  sort: LeadSortField;
  dir: "asc" | "desc";
  page: number;
  pageSize: number;
};

export const DEFAULT_LEAD_QUERY: LeadQuery = {
  q: "",
  status: null,
  source: null,
  sort: "createdAt",
  dir: "desc",
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Reads the query from URL search params. Anything missing or invalid falls
 * back to the default rather than erroring, because these come from a URL an
 * admin can edit or bookmark.
 */
export function parseLeadQuery(params: RawParams): LeadQuery {
  const q = (first(params.q) ?? "").trim().slice(0, MAX_SEARCH_LENGTH);
  const status = first(params.status);
  const source = first(params.source);
  const sort = first(params.sort);
  const dir = first(params.dir);
  const page = Number.parseInt(first(params.page) ?? "", 10);
  const pageSize = Number.parseInt(first(params.pageSize) ?? "", 10);

  return {
    q,
    status: isLeadStatus(status) ? status : null,
    source: (LEAD_SOURCES as readonly string[]).includes(source ?? "") ? (source as LeadSourceValue) : null,
    sort: (LEAD_SORT_FIELDS as readonly string[]).includes(sort ?? "") ? (sort as LeadSortField) : DEFAULT_LEAD_QUERY.sort,
    dir: dir === "asc" || dir === "desc" ? dir : DEFAULT_LEAD_QUERY.dir,
    page: Number.isFinite(page) && page > 0 ? page : 1,
    pageSize: (PAGE_SIZES as readonly number[]).includes(pageSize) ? pageSize : DEFAULT_PAGE_SIZE,
  };
}

/** True when a search or filter narrows the list (sorting and paging do not). */
export function hasActiveFilters(query: LeadQuery): boolean {
  return query.q !== "" || query.status !== null || query.source !== null;
}

/**
 * The URL for a query, writing only values that differ from the defaults so
 * the plain /admin address stays the default view.
 */
export function leadQueryHref(query: LeadQuery, pathname = "/admin"): string {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.status) params.set("status", query.status);
  if (query.source) params.set("source", query.source);
  if (query.sort !== DEFAULT_LEAD_QUERY.sort || query.dir !== DEFAULT_LEAD_QUERY.dir) {
    params.set("sort", query.sort);
    params.set("dir", query.dir);
  }
  if (query.pageSize !== DEFAULT_LEAD_QUERY.pageSize) params.set("pageSize", String(query.pageSize));
  if (query.page > 1) params.set("page", String(query.page));
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

/** The Prisma filter for a query's search and filters. */
export function leadWhere(query: Pick<LeadQuery, "q" | "status" | "source">): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {};
  if (query.status) where.status = query.status;
  if (query.source) where.source = query.source;
  if (query.q) {
    const contains = { contains: query.q, mode: "insensitive" as const };
    // Everything an admin is likely to remember about a lead, including the
    // message body and what Apollo returned.
    where.OR = [
      { name: contains },
      { email: contains },
      { phone: contains },
      { company: contains },
      { service: contains },
      { message: contains },
      { jobTitle: contains },
      { companyName: contains },
    ];
  }
  return where;
}

/**
 * The Prisma ordering for a query. The id tiebreaker makes the order total, so
 * rows with equal sort keys (the same status, the same name) cannot shift
 * between pages and appear twice or not at all.
 */
export function leadOrderBy(query: Pick<LeadQuery, "sort" | "dir">): Prisma.LeadOrderByWithRelationInput[] {
  const order: Prisma.LeadOrderByWithRelationInput[] = [{ [query.sort]: query.dir }];
  // Within a status or a name, newest first reads most naturally.
  if (query.sort !== "createdAt") order.push({ createdAt: "desc" });
  order.push({ id: "asc" });
  return order;
}
