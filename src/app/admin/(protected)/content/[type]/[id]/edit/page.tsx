import Link from "next/link";
import { notFound } from "next/navigation";
import { COLLECTIONS } from "@/lib/collections";
import { delegate } from "@/lib/content";
import CollectionForm from "../../../CollectionForm";

export const dynamic = "force-dynamic";

export default async function EditItem({ params }: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = await params;
  const cfg = COLLECTIONS[type];
  if (!cfg) notFound();

  const item = await delegate(cfg.model).findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href={`/admin/content/${type}`} className="text-sm" style={{ color: "var(--text-muted)" }}>← Back to {cfg.label}</Link>
        <h1 className="text-2xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>Edit {cfg.singular}</h1>
      </div>
      <CollectionForm
        collectionKey={type}
        id={id}
        fields={cfg.fields}
        initial={item}
        backHref={`/admin/content/${type}`}
        submitLabel="Save changes"
      />
    </div>
  );
}
