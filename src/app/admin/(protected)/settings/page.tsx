import { getSiteSettings } from "@/lib/settings";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsAdmin() {
  const settings = await getSiteSettings();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Contact details and footer content shown across the site.
        </p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
