import Link from "next/link";
import TestimonialForm from "../../TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/homepage" className="text-sm" style={{ color: "var(--text-muted)" }}>← Back to homepage</Link>
        <h1 className="text-2xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>New card</h1>
      </div>
      <TestimonialForm id={null} submitLabel="Create card" />
    </div>
  );
}
