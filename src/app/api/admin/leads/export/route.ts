import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { buildLeadsWorkbook } from "@/lib/leads-export";
import { leadOrderBy, leadWhere, parseLeadQuery } from "@/lib/lead-query";

/**
 * Excel export for the admin Leads page.
 *
 * Route Handlers sit outside the admin layout, so the layout's sign-in redirect
 * does not protect this: it checks the session itself.
 *
 * POST rather than GET because a selection can be hundreds of ids, more than a
 * URL comfortably carries. The export is read-only, and the session cookie is
 * SameSite=Lax, so another site cannot make a signed-in browser download it.
 */

// One spreadsheet holds at most this many leads. Far above today's volume; it
// exists so a runaway request cannot exhaust the function's memory.
const MAX_ROWS = 20_000;

const bodySchema = z.discriminatedUnion("scope", [
  // Exactly the leads ticked in the table, on any page.
  z.object({ scope: z.literal("selected"), ids: z.array(z.string().min(1).max(64)).min(1).max(MAX_ROWS) }),
  // Every lead matching the current search and filters, across all pages.
  z.object({ scope: z.literal("filtered"), query: z.record(z.string(), z.string()) }),
  // Every lead, ignoring filters.
  z.object({ scope: z.literal("all") }),
]);

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Your session has expired. Sign in again to export." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid export request." }, { status: 400 });
  }

  const input = parsed.data;
  // The selected and all-leads exports use the table's default order (newest
  // first); a filtered export keeps whatever sort the admin is looking at.
  const query = parseLeadQuery(input.scope === "filtered" ? input.query : {});
  const where =
    input.scope === "selected"
      ? { id: { in: input.ids } }
      : input.scope === "filtered"
        ? leadWhere(query)
        : {};

  try {
    const count = await prisma.lead.count({ where });
    if (count === 0) {
      return Response.json({ error: "There are no leads to export." }, { status: 404 });
    }
    if (count > MAX_ROWS) {
      return Response.json(
        { error: `That is ${count.toLocaleString()} leads, more than the ${MAX_ROWS.toLocaleString()} one export can hold. Narrow the filters and export in parts.` },
        { status: 413 },
      );
    }

    const leads = await prisma.lead.findMany({ where, orderBy: leadOrderBy(query), take: MAX_ROWS });
    const workbook = await buildLeadsWorkbook(leads);

    const date = new Date().toISOString().slice(0, 10);
    const suffix = input.scope === "all" ? "all" : input.scope;
    const filename = `maxcient-leads-${suffix}-${date}.xlsx`;

    return new Response(new Uint8Array(workbook), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
        // Read by the Leads page to confirm how many rows were exported.
        "X-Lead-Count": String(leads.length),
      },
    });
  } catch (err) {
    console.error("Failed to export leads:", err);
    return Response.json({ error: "The export could not be created. Please try again." }, { status: 500 });
  }
}
