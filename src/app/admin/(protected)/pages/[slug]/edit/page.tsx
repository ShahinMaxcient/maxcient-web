import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getKnownPage } from "@/lib/known-pages";
import PageEditor from "../../PageEditor";

export const dynamic = "force-dynamic";

export default async function EditPagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const known = getKnownPage(slug);
  if (!known) notFound();

  const row = await prisma.page.findUnique({ where: { slug } });

  const faqsJson =
    row?.faqs && Array.isArray(row.faqs) && row.faqs.length > 0
      ? JSON.stringify(row.faqs, null, 2)
      : "";

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/pages" className="text-sm" style={{ color: "var(--text-muted)" }}>← Back to pages</Link>
        <div className="flex items-center justify-between gap-4 mt-2">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{known.name}</h1>
          <a href={`/${slug}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium" style={{ color: "var(--primary)" }}>View live ↗</a>
        </div>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>/{slug}</p>
      </div>
      <PageEditor
        slug={slug}
        initial={{
          title: row?.title ?? "",
          subtitle: row?.subtitle ?? "",
          heroImage: row?.heroImage ?? "",
          faqsJson,
          published: row?.published ?? true,
        }}
      />
    </div>
  );
}
