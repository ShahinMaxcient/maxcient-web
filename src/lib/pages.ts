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
