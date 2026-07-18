import { getHeroSettings } from "@/lib/settings";
import HeroForm from "./HeroForm";

export const dynamic = "force-dynamic";

export default async function HeroAdmin() {
  const hero = await getHeroSettings();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Hero Banner</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Edit the homepage hero section: headline, subtitle, CTA buttons, stats bar, and background.
        </p>
      </div>
      <HeroForm initial={hero} />
    </div>
  );
}
