import { getAboutSettings } from "@/lib/settings";
import AboutForm from "./AboutForm";

export const dynamic = "force-dynamic";

export default async function AboutAdmin() {
  const about = await getAboutSettings();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>About Page</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Edit the About Us page content. Company values and stats are managed under Content.
        </p>
      </div>
      <AboutForm initial={about} />
    </div>
  );
}
