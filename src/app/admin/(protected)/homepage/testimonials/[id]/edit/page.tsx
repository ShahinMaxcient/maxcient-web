import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TestimonialForm from "../../../TestimonialForm";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/homepage" className="text-sm" style={{ color: "var(--text-muted)" }}>← Back to homepage</Link>
        <h1 className="text-2xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>Edit card</h1>
      </div>
      <TestimonialForm
        id={t.id}
        submitLabel="Save changes"
        initial={{ tag: t.tag, quote: t.quote, rating: t.rating, order: t.order }}
      />
    </div>
  );
}
