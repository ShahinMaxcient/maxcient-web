import WhyChoose from "./WhyChoose";
import { getPageOverride } from "@/lib/pages";

/**
 * Self-fetching "Why {product}" band: pulls the reason list for a page from the
 * database (Admin → Pages). Renders nothing when a page has no reasons. The
 * product label stays a prop since it is the page's identity, not body content.
 */
export default async function PageReasons({ slug, product }: { slug: string; product: string }) {
  const o = await getPageOverride(slug);
  if (!o?.reasons || o.reasons.length === 0) return null;
  return <WhyChoose product={product} reasons={o.reasons} />;
}
