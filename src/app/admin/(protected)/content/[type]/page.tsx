import Link from "next/link";
import { notFound } from "next/navigation";
import { COLLECTIONS } from "@/lib/collections";
import { getAllItems } from "@/lib/content";
import RowDelete from "../RowDelete";

export const dynamic = "force-dynamic";

function cell(value: unknown): string {
  if (value == null) return "—";
  if (Array.isArray(value)) return value.join(", ");
  const s = String(value);
  return s.length > 70 ? s.slice(0, 70) + "…" : s;
}

export default async function CollectionList({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const cfg = COLLECTIONS[type];
  if (!cfg) notFound();

  const items = await getAllItems(type);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/content" className="text-sm" style={{ color: "var(--text-muted)" }}>← All content</Link>
        <div className="flex items-center justify-between gap-4 mt-2">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{cfg.label}</h1>
          <Link href={`/admin/content/${type}/new`} className="text-sm font-semibold px-4 py-2 rounded-lg" style={{ background: "var(--text-primary)", color: "var(--background)" }}>+ Add {cfg.singular}</Link>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-sm p-6 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
          No items yet. Add one — until then the site shows the built-in default content.
        </p>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--surface-alt)", color: "var(--text-secondary)" }}>
                {cfg.listColumns.map((col) => (
                  <th key={col} className="text-left font-semibold px-4 py-3 capitalize">{col}</th>
                ))}
                <th className="text-left font-semibold px-4 py-3">Status</th>
                <th className="text-right font-semibold px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const id = String(item.id);
                const title = String(item[cfg.listColumns[1] ?? "id"] ?? id);
                return (
                  <tr key={id} style={{ borderTop: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--text-primary)" }}>
                    {cfg.listColumns.map((col, idx) => (
                      <td key={col} className={`px-4 py-3 ${idx === 1 ? "font-semibold" : ""}`} style={idx !== 1 ? { color: "var(--text-secondary)" } : undefined}>{cell(item[col])}</td>
                    ))}
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2 py-1 rounded-md" style={item.published !== false ? { background: "#ecfdf5", color: "#059669" } : { background: "var(--surface-alt)", color: "var(--text-muted)" }}>
                        {item.published !== false ? "Published" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/content/${type}/${id}/edit`} className="font-medium" style={{ color: "var(--primary)" }}>Edit</Link>
                        <RowDelete collectionKey={type} id={id} label={title} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
