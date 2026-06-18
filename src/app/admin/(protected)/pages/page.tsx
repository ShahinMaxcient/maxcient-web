import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { KNOWN_PAGES } from "@/lib/known-pages";
import { resetPage } from "./actions";

export const dynamic = "force-dynamic";

export default async function PagesAdmin() {
  const overrides = await prisma.page.findMany({ select: { slug: true } });
  const customized = new Set(overrides.map((o) => o.slug));

  const groups = Array.from(new Set(KNOWN_PAGES.map((p) => p.group)));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Pages</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Override the hero and FAQs of your service, industry, product, and technology pages. Untouched pages use their built-in content.
        </p>
      </div>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group}>
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>{group}</h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <tbody>
                  {KNOWN_PAGES.filter((p) => p.group === group).map((p) => {
                    const isCustom = customized.has(p.slug);
                    return (
                      <tr key={p.slug} style={{ borderTop: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--text-primary)" }}>
                        <td className="px-4 py-3">
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>/{p.slug}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="text-xs font-semibold px-2 py-1 rounded-md"
                            style={isCustom ? { background: "#eef2ff", color: "var(--primary)" } : { background: "var(--surface-alt)", color: "var(--text-muted)" }}
                          >
                            {isCustom ? "Customized" : "Default"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-3">
                            <a href={`/${p.slug}`} target="_blank" rel="noopener noreferrer" className="font-medium" style={{ color: "var(--text-muted)" }}>View ↗</a>
                            <Link href={`/admin/pages/${p.slug}/edit`} className="font-medium" style={{ color: "var(--primary)" }}>Edit</Link>
                            {isCustom && (
                              <form action={resetPage}>
                                <input type="hidden" name="slug" value={p.slug} />
                                <button type="submit" className="font-medium" style={{ color: "#dc2626" }}>Reset</button>
                              </form>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
