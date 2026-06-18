import Link from "next/link";
import ServiceForm from "../../ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/homepage" className="text-sm" style={{ color: "var(--text-muted)" }}>← Back to homepage</Link>
        <h1 className="text-2xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>New service</h1>
      </div>
      <ServiceForm id={null} submitLabel="Create service" />
    </div>
  );
}
