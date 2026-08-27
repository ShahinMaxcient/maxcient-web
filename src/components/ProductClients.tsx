import InteractiveGrid from "./InteractiveGrid";
import SectionReveal from "./SectionReveal";
import BrandMark from "./BrandMark";
import { getCollectionItems } from "@/lib/content";
import { getProductClients } from "@/lib/settings";

type ClientItem = { name: string; logo: string };

/**
 * Client logo strip for a product page.
 *
 * The roster is per-product and comes from the `product.clients` setting, so
 * which logos sit under which product stays an editorial decision rather than
 * something inferred here — the pairing is a claim about a real business
 * relationship. Renders nothing when a product has no roster configured.
 *
 * The heading is deliberately about Maxcient rather than the product ("trusted
 * by", not "these companies run X"), which stays true for any roster.
 */
export default async function ProductClients({ slug, heading }: { slug: string; heading?: string }) {
  const [all, names] = await Promise.all([
    getCollectionItems<ClientItem>("clients"),
    getProductClients(slug),
  ]);
  if (!names || names.length === 0) return null;

  // Preserve the configured order, and drop any name that no longer resolves
  // to a logo rather than rendering a gap.
  const byName = new Map(all.map((c) => [c.name.toLowerCase(), c]));
  const clients = names
    .map((n) => byName.get(n.toLowerCase()))
    .filter((c): c is ClientItem => !!c?.logo);
  if (clients.length === 0) return null;

  return (
    <section
      className="py-10 lg:py-16"
      style={{ background: "var(--surface-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <p
            className="text-center"
            style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)" }}
          >
            <BrandMark />
            {heading || "Trusted by UAE’s leading enterprises"}
          </p>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-10">
            <InteractiveGrid
              images={clients.map((c) => ({ src: c.logo, label: c.name }))}
              columns={Math.min(6, Math.max(3, clients.length))}
              gap={16}
              rounded={10}
              logoScale={3}
              cardAspect={0.58}
              cardFill="transparent"
              cardBorder="transparent"
              glow={false}
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
