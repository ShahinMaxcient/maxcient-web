import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ServiceForm from "../../../ServiceForm";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await prisma.service.findUnique({ where: { id } });
  if (!s) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/homepage" className="text-sm" style={{ color: "var(--text-muted)" }}>← Back to homepage</Link>
        <h1 className="text-2xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>Edit service</h1>
      </div>
      <ServiceForm
        id={s.id}
        submitLabel="Save changes"
        initial={{ num: s.num, title: s.title, desc: s.desc, href: s.href, span: s.span, variant: s.variant, order: s.order }}
      />
    </div>
  );
}
