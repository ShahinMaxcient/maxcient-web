import { prisma } from "./prisma";

export type PublicPost = {
  title: string;
  slug: string | null;
  excerpt: string | null;
  category: string | null;
  image: string;
  date: string;
  content?: string | null;
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80";

// Shown when no posts have been published yet (keeps the section populated).
const FALLBACK_POSTS: PublicPost[] = [
  { title: "Build a Unified Data Platform To Enhance End-To-End Customer Experience", slug: null, excerpt: null, category: "Data", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80", date: "Oct 18, 2023" },
  { title: "It is Time To Outsource Development To An Offshore Development Firm", slug: null, excerpt: null, category: "Development", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80", date: "Oct 18, 2023" },
  { title: "Attaining Operational Flexibility During Uncertain Times", slug: null, excerpt: null, category: "Strategy", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80", date: "Oct 18, 2023" },
  { title: "How To Bring About Rapid Growth With Power Platform?", slug: null, excerpt: null, category: "Power Platform", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80", date: "Oct 18, 2023" },
];

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" }).format(d);
}

/** Published posts for public listings. Falls back to demo posts if none/DB error. */
export async function getPublishedPosts(limit?: number): Promise<PublicPost[]> {
  try {
    const rows = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      ...(limit ? { take: limit } : {}),
    });
    if (rows.length === 0) return limit ? FALLBACK_POSTS.slice(0, limit) : FALLBACK_POSTS;
    return rows.map((p) => ({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      category: p.category,
      image: p.coverImage || FALLBACK_IMAGE,
      date: formatDate(p.publishedAt ?? p.createdAt),
      content: p.content,
    }));
  } catch {
    return limit ? FALLBACK_POSTS.slice(0, limit) : FALLBACK_POSTS;
  }
}

/** Single published post by slug, or null. */
export async function getPostBySlug(slug: string): Promise<PublicPost | null> {
  try {
    const p = await prisma.post.findUnique({ where: { slug } });
    if (!p || p.status !== "PUBLISHED") return null;
    return {
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      category: p.category,
      image: p.coverImage || FALLBACK_IMAGE,
      date: formatDate(p.publishedAt ?? p.createdAt),
      content: p.content,
    };
  } catch {
    return null;
  }
}
