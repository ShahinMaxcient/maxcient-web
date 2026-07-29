import TrustedBy from "./TrustedBy";
import Blog from "./Blog";
import { getCollectionItems } from "@/lib/content";
import { getPublishedPosts } from "@/lib/posts";
import { getSectionHeaders } from "@/lib/settings";

/**
 * Shared bottom-of-page band for product pages: the client logo wall and the
 * latest journal posts — matching the depth of the maxcient.com product pages.
 * Both are database-driven and editable in the admin.
 */
export default async function ProductExtras() {
  const [clients, posts, sections] = await Promise.all([
    getCollectionItems<{ name: string; logo: string }>("clients"),
    getPublishedPosts(4),
    getSectionHeaders(),
  ]);

  return (
    <>
      <TrustedBy clients={clients} header={{ ...sections.trustedBy, title: "Trusted by industry leaders" }} />
      {posts.length > 0 && <Blog posts={posts} header={sections.blog} />}
    </>
  );
}
