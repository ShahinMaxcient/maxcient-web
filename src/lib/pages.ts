import { prisma } from "./prisma";

export type FaqItem = { question: string; answer: string };

export type PageOverride = {
  title: string | null;
  subtitle: string | null;
  heroImage: string | null;
  intro: string | null;
  faqs: FaqItem[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
  published: boolean;
};

function coerceFaqs(value: unknown): FaqItem[] | null {
  if (!Array.isArray(value)) return null;
  const items = value
    .filter((v): v is Record<string, unknown> => !!v && typeof v === "object")
    .map((v) => ({ question: String(v.question ?? ""), answer: String(v.answer ?? "") }))
    .filter((v) => v.question && v.answer);
  return items.length ? items : null;
}

/**
 * True when a detail page should be taken off the live site (404).
 * A page is hidden when it is explicitly hidden in Admin → Pages, OR when its
 * matching collection item (industry / technology / product / service) is unpublished.
 * Never throws.
 */
export async function isPageHidden(slug: string): Promise<boolean> {
  try {
    const page = await prisma.page.findUnique({ where: { slug }, select: { published: true } });
    if (page && page.published === false) return true;

    const href = `/${slug}`;
    const [industry, technology, product, service] = await Promise.all([
      prisma.industry.findFirst({ where: { href }, select: { published: true } }),
      prisma.technology.findFirst({ where: { href }, select: { published: true } }),
      prisma.product.findFirst({ where: { href }, select: { published: true } }),
      prisma.service.findFirst({ where: { href }, select: { published: true } }),
    ]);
    return [industry, technology, product, service].some((r) => r != null && r.published === false);
  } catch {
    return false;
  }
}

/** Slugs explicitly hidden in Admin → Pages — used to drop them from the navbar. */
export async function getHiddenSlugs(): Promise<Set<string>> {
  try {
    const rows = await prisma.page.findMany({ where: { published: false }, select: { slug: true } });
    return new Set(rows.map((r) => r.slug));
  } catch {
    return new Set();
  }
}

/** Editable overrides for a service/solution page, or null if none saved. Never throws. */
export async function getPageOverride(slug: string): Promise<PageOverride | null> {
  try {
    const row = await prisma.page.findUnique({ where: { slug } });
    if (!row) return null;
    return {
      title: row.title || null,
      subtitle: row.subtitle,
      heroImage: row.heroImage,
      intro: row.intro,
      faqs: coerceFaqs(row.faqs),
      seoTitle: row.seoTitle,
      seoDescription: row.seoDescription,
      published: row.published,
    };
  } catch {
    return null;
  }
}
