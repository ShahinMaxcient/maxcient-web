import TrustedBy from "./TrustedBy";
import Blog from "./Blog";
import { getCollectionItems } from "@/lib/content";
import { getPublishedPosts } from "@/lib/posts";
import { getSectionHeaders, getProductClients } from "@/lib/settings";

/**
 * Shared bottom-of-page band for product pages: the client logo wall and the
 * latest journal posts — matching the depth of the maxcient.com product pages.
 *
 * When the page's slug has a roster in the `product.clients` setting, the wall
 * narrows to just those logos — the clients actually related to this product —
 * mirroring how maxcient.com scopes its RealtyAI page to property companies.
 * Without a roster it falls back to the full wall, as before.
 */
export default async function ProductExtras({ slug }: { slug?: string }) {
  const [clients, posts, sections, roster] = await Promise.all([
    getCollectionItems<{ name: string; logo: string }>("clients"),
    getPublishedPosts(4),
    getSectionHeaders(),
    slug ? getProductClients(slug) : Promise.resolve([]),
  ]);

  let wall = clients;
  if (roster.length > 0) {
    const byName = new Map(clients.map((c) => [c.name.toLowerCase(), c]));
    const scoped = roster
      .map((n) => byName.get(n.toLowerCase()))
      .filter((c): c is { name: string; logo: string } => !!c?.logo);
    // A roster that resolves to nothing falls back to the full wall rather
    // than deleting the section.
    if (scoped.length > 0) wall = scoped;
  }

  return (
    <>
      <TrustedBy clients={wall} header={{ ...sections.trustedBy, title: "Trusted by industry leaders" }} />
      {posts.length > 0 && <Blog posts={posts} header={sections.blog} />}
    </>
  );
}
