import FeatureGrid from "./FeatureGrid";
import { getPageOverride } from "@/lib/pages";

/**
 * Self-fetching FeatureGrid: pulls the feature list + section headings for a
 * page from the database (Admin → Pages). Renders nothing when a page has no
 * features, so it is safe to drop into any page. The single source of truth is
 * the DB — there is no hardcoded content here.
 */
export default async function PageFeatures({ slug, id }: { slug: string; id?: string }) {
  const o = await getPageOverride(slug);
  if (!o?.features || o.features.length === 0) return null;
  return (
    <FeatureGrid
      id={id}
      title={o.featuresTitle ?? ""}
      subtitle={o.featuresSubtitle ?? ""}
      features={o.features}
    />
  );
}
