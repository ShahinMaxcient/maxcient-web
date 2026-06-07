import { prisma } from "@/lib/prisma";
import { updateLeadStatus } from "./actions";

export const dynamic = "force-dynamic";

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"] as const;

const STATUS_COLORS: Record<string, string> = {
  NEW: "#7c3aed",
  CONTACTED: "#2563eb",
  QUALIFIED: "#0891b2",
  WON: "#059669",
  LOST: "#9ca3af",
};

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default async function AdminDashboard() {
  const [leads, counts] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
    prisma.lead.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const total = leads.length;
  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count._all]));

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Leads</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {total} {total === 1 ? "submission" : "submissions"} from the consultation form.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {STATUSES.map((s) => (
          <div
            key={s}
            className="p-4 rounded-xl"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <div className="text-2xl font-bold" style={{ color: STATUS_COLORS[s] }}>
              {countMap[s] ?? 0}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>
              {s}
            </div>
          </div>
        ))}
      </div>

      {leads.length === 0 ? (
        <div
          className="p-12 text-center rounded-xl"
          style={{ background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
        >
          No leads yet. Submissions from the consultation form will appear here.
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--surface-alt)", color: "var(--text-secondary)" }}>
                  <th className="text-left font-semibold px-4 py-3">Name</th>
                  <th className="text-left font-semibold px-4 py-3">Contact</th>
                  <th className="text-left font-semibold px-4 py-3">Service</th>
                  <th className="text-left font-semibold px-4 py-3">Message</th>
                  <th className="text-left font-semibold px-4 py-3">Received</th>
                  <th className="text-left font-semibold px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} style={{ borderTop: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--text-primary)" }}>
                    <td className="px-4 py-3 align-top">
                      <div className="font-semibold">{lead.name}</div>
                      {lead.company && (
                        <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{lead.company}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <a href={`mailto:${lead.email}`} className="hover:underline" style={{ color: "var(--primary)" }}>{lead.email}</a>
                      {lead.phone && (
                        <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{lead.phone}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top" style={{ color: "var(--text-secondary)" }}>
                      {lead.service || "—"}
                    </td>
                    <td className="px-4 py-3 align-top" style={{ color: "var(--text-secondary)", maxWidth: 280 }}>
                      <div className="line-clamp-3">{lead.message || "—"}</div>
                    </td>
                    <td className="px-4 py-3 align-top whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <form action={updateLeadStatus} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={lead.id} />
                        <select
                          name="status"
                          defaultValue={lead.status}
                          className="px-2 py-1.5 rounded-md text-xs font-medium outline-none"
                          style={{ background: "var(--surface)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="text-xs font-medium px-2.5 py-1.5 rounded-md"
                          style={{ background: "var(--text-primary)", color: "var(--background)" }}
                        >
                          Save
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
