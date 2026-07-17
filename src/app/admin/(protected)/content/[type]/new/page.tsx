import Link from "next/link";
import { notFound } from "next/navigation";
import { COLLECTIONS } from "@/lib/collections";
import CollectionForm from "../../CollectionForm";

export default async function NewItem({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const cfg = COLLECTIONS[type];
  if (!cfg) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href={`/admin/content/${type}`} className="text-sm" style={{ color: "var(--text-muted)" }}>← Back to {cfg.label}</Link>
        <h1 className="text-2xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>New {cfg.singular}</h1>
      </div>
      <CollectionForm
        collectionKey={type}
        id={null}
        fields={cfg.fields}
        initial={{}}
        backHref={`/admin/content/${type}`}
        submitLabel={`Create ${cfg.singular}`}
      />
    </div>
  );
}
