import Link from "next/link";
import { COLLECTION_LIST } from "@/lib/collections";
import { delegate } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContentIndex() {
  const counts = await Promise.all(
    COLLECTION_LIST.map(async (c) => {
      try {
        return await delegate(c.model).count();
      } catch {
        return 0;
      }
    }),
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Content</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Manage every content section of the site — add, edit, reorder, and delete items.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COLLECTION_LIST.map((c, i) => (
          <Link
            key={c.key}
            href={`/admin/content/${c.key}`}
            className="p-5 rounded-xl transition-colors"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold" style={{ color: "var(--text-primary)" }}>{c.label}</div>
              <div className="text-xs font-semibold px-2 py-1 rounded-md" style={{ background: "var(--surface-alt)", color: "var(--text-secondary)" }}>{counts[i]}</div>
            </div>
            <div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Manage {c.label.toLowerCase()} →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
