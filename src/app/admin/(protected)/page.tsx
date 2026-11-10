import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  LEAD_SOURCE_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_COLORS,
  LEAD_STATUS_LABELS,
  type LeadSourceValue,
  leadOrderBy,
  leadQueryHref,
  leadWhere,
  parseLeadQuery,
} from "@/lib/lead-query";
import LeadsView from "./_leads/LeadsView";
import type { LeadRow } from "./_leads/types";

export const dynamic = "force-dynamic";

// Maxcient is in Dubai, so lead times are shown in UAE time, here and in the
// Excel export, whatever time zone the server runs in.
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Dubai",
});

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseLeadQuery(await searchParams);
  const where = leadWhere(query);

  const [matching, total, counts] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  // A bookmarked or stale page number past the end shows the last page rather
  // than an empty table.
  const pageCount = Math.max(1, Math.ceil(matching / query.pageSize));
  const page = Math.min(query.page, pageCount);
  const effectiveQuery = { ...query, page };

  const leads = await prisma.lead.findMany({
    where,
    orderBy: leadOrderBy(query),
    skip: (page - 1) * query.pageSize,
    take: query.pageSize,
  });

  const rows: LeadRow[] = leads.map((lead) => {
    const enriched =
      lead.jobTitle || lead.companyName || lead.companyDomain || lead.companyIndustry ||
      lead.companySize || lead.personLocation || lead.linkedinUrl;
    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      service: lead.service,
      message: lead.message,
      source: lead.source,
      sourceLabel: LEAD_SOURCE_LABELS[lead.source as LeadSourceValue] ?? lead.source,
      status: lead.status,
      receivedLabel: dateFormat.format(lead.createdAt),
      updatedLabel: dateFormat.format(lead.updatedAt),
      enrichment: enriched
        ? {
            jobTitle: lead.jobTitle,
            companyName: lead.companyName,
            companyDomain: lead.companyDomain,
            companyIndustry: lead.companyIndustry,
            companySize: lead.companySize,
            personLocation: lead.personLocation,
            linkedinUrl: lead.linkedinUrl,
            enrichedLabel: lead.enrichedAt ? dateFormat.format(lead.enrichedAt) : null,
          }
        : null,
    };
  });

  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count._all])) as Record<string, number>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Leads</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {total.toLocaleString()} {total === 1 ? "submission" : "submissions"} from the consultation and product demo forms.
        </p>
      </div>

      {/* Status summary. Each card filters the table to that status; clicking
          the active card clears the filter. Counts are across all leads. */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {LEAD_STATUSES.map((s) => {
          const active = query.status === s;
          return (
            <Link
              key={s}
              href={leadQueryHref({ ...query, status: active ? null : s, page: 1 })}
              aria-current={active ? "true" : undefined}
              className="p-4 rounded-xl transition-shadow hover:shadow-sm"
              style={{
                background: "var(--card-bg)",
                border: `1px solid ${active ? LEAD_STATUS_COLORS[s] : "var(--border)"}`,
                boxShadow: active ? `inset 0 0 0 1px ${LEAD_STATUS_COLORS[s]}` : undefined,
              }}
            >
              <div className="text-2xl font-bold" style={{ color: LEAD_STATUS_COLORS[s] }}>
                {(countMap[s] ?? 0).toLocaleString()}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>
                {LEAD_STATUS_LABELS[s]}
              </div>
            </Link>
          );
        })}
      </div>

      <LeadsView rows={rows} query={effectiveQuery} matching={matching} total={total} pageCount={pageCount} />
    </div>
  );
}
