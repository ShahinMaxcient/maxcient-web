import Link from "next/link";
import { prisma } from "@/lib/prisma";
import RowDelete from "./RowDelete";

export const dynamic = "force-dynamic";

export default async function HomepageAdmin() {
  const [services, testimonials] = await Promise.all([
    prisma.service.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    prisma.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
  ]);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Homepage</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Manage the Services and Who-We-Are cards on the homepage. Empty sections fall back to the original content.
        </p>
      </div>

      {/* Services */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Services <span style={{ color: "var(--text-muted)" }}>({services.length})</span></h2>
          <Link href="/admin/homepage/services/new" className="text-sm font-semibold px-3.5 py-2 rounded-lg" style={{ background: "var(--text-primary)", color: "var(--background)" }}>+ Add service</Link>
        </div>
        {services.length === 0 ? (
          <p className="text-sm p-6 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
            No custom services — the homepage shows the default 7 cards. Add one to override.
          </p>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--surface-alt)", color: "var(--text-secondary)" }}>
                  <th className="text-left font-semibold px-4 py-3">Order</th>
                  <th className="text-left font-semibold px-4 py-3">Title</th>
                  <th className="text-left font-semibold px-4 py-3">Style</th>
                  <th className="text-right font-semibold px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} style={{ borderTop: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--text-primary)" }}>
                    <td className="px-4 py-3" style={{ color: "var(--text-muted)" }}>{s.order}</td>
                    <td className="px-4 py-3 font-semibold">{s.title}</td>
                    <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{s.variant}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/homepage/services/${s.id}/edit`} className="font-medium" style={{ color: "var(--primary)" }}>Edit</Link>
                        <RowDelete id={s.id} label={s.title} kind="service" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Who We Are <span style={{ color: "var(--text-muted)" }}>({testimonials.length})</span></h2>
          <Link href="/admin/homepage/testimonials/new" className="text-sm font-semibold px-3.5 py-2 rounded-lg" style={{ background: "var(--text-primary)", color: "var(--background)" }}>+ Add card</Link>
        </div>
        {testimonials.length === 0 ? (
          <p className="text-sm p-6 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
            No custom cards — the homepage shows the default 2 cards. Add one to override.
          </p>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--surface-alt)", color: "var(--text-secondary)" }}>
                  <th className="text-left font-semibold px-4 py-3">Order</th>
                  <th className="text-left font-semibold px-4 py-3">Tag</th>
                  <th className="text-left font-semibold px-4 py-3">Quote</th>
                  <th className="text-right font-semibold px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t.id} style={{ borderTop: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--text-primary)" }}>
                    <td className="px-4 py-3" style={{ color: "var(--text-muted)" }}>{t.order}</td>
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">{t.tag}</td>
                    <td className="px-4 py-3" style={{ color: "var(--text-secondary)", maxWidth: 360 }}><div className="line-clamp-2">{t.quote}</div></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/homepage/testimonials/${t.id}/edit`} className="font-medium" style={{ color: "var(--primary)" }}>Edit</Link>
                        <RowDelete id={t.id} label={t.tag} kind="testimonial" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
