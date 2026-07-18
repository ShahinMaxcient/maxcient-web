import { getSectionHeaders } from "@/lib/settings";
import SectionsForm from "./SectionsForm";

export const dynamic = "force-dynamic";

export default async function SectionsAdmin() {
  const sections = await getSectionHeaders();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Section Headers</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Edit the eyebrow, title, and body text for each homepage section.
        </p>
      </div>
      <SectionsForm initial={sections} />
    </div>
  );
}
