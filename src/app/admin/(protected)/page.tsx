import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  LEAD_SOURCE_LABELS,
  LEAD_STATUSES,
  compareLeadsByName,
  type LeadSourceValue,
  type LeadStatusValue,
  leadOrderBy,
  leadWhere,
  parseLeadQuery,
} from "@/lib/lead-query";
import LeadsView from "./_leads/LeadsView";
import type { LeadRow } from "./_leads/types";
import { requireAdmin } from "@/lib/admin-auth";

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

/**
 * One page of leads in name order. The matching ids are sorted in code (see
 * compareLeadsByName), then only that page's rows are loaded.
 */
async function findPageByName(where: Prisma.LeadWhereInput, dir: "asc" | "desc", skip: number, take: number) {
  const keys = await prisma.lead.findMany({ where, select: { id: true, name: true, createdAt: true } });
  const ids = keys.sort(compareLeadsByName(dir)).slice(skip, skip + take).map((k) => k.id);
  const rows = await prisma.lead.findMany({ where: { id: { in: ids } } });
  const position = new Map(ids.map((id, i) => [id, i]));
  return rows.sort((a, b) => position.get(a.id)! - position.get(b.id)!);
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();
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

  const skip = (page - 1) * query.pageSize;
  const leads =
    query.sort === "name"
      ? await findPageByName(where, query.dir, skip, query.pageSize)
      : await prisma.lead.findMany({ where, orderBy: leadOrderBy(query), skip, take: query.pageSize });

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

  const countMap = new Map(counts.map((c) => [c.status, c._count._all]));
  const statusCounts = Object.fromEntries(LEAD_STATUSES.map((s) => [s, countMap.get(s) ?? 0])) as Record<LeadStatusValue, number>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Leads</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {total.toLocaleString()} {total === 1 ? "submission" : "submissions"} from the consultation and product demo forms.
        </p>
      </div>

      <LeadsView
        rows={rows}
        query={effectiveQuery}
        matching={matching}
        total={total}
        pageCount={pageCount}
        statusCounts={statusCounts}
      />
    </div>
  );
}
