"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { KNOWN_PAGE_SLUGS } from "@/lib/known-pages";

export type PageEditState = { error?: string } | undefined;

const pageSchema = z.object({
  title: z.string().trim().optional(),
  subtitle: z.string().trim().optional(),
  heroImage: z.string().trim().optional(),
  faqsJson: z.string().optional(),
  reasonsJson: z.string().optional(),
  featuresJson: z.string().optional(),
  featuresTitle: z.string().trim().optional(),
  featuresSubtitle: z.string().trim().optional(),
});

const faqArraySchema = z.array(
  z.object({ question: z.string().trim().min(1), answer: z.string().trim().min(1) }),
);

const reasonArraySchema = z.array(
  z.object({ title: z.string().trim().min(1), body: z.string().trim().min(1) }),
);

const featureArraySchema = z.array(
  z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().default(""),
    bullets: z.array(z.string().trim().min(1)).optional(),
  }),
);

/** Parse a hidden JSON field into a validated array, or JsonNull when empty. */
function parseJsonArray<T>(
  raw: string | undefined,
  schema: z.ZodType<T>,
  label: string,
): { value: T | typeof Prisma.JsonNull } | { error: string } {
  if (!raw || !raw.trim()) return { value: Prisma.JsonNull };
  try {
    const json = JSON.parse(raw);
    const result = schema.safeParse(json);
    if (!result.success) return { error: `${label} has invalid entries.` };
    return { value: result.data as T };
  } catch {
    return { error: `${label} is not valid JSON.` };
  }
}

export async function savePage(slug: string, _prev: PageEditState, formData: FormData): Promise<PageEditState> {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  if (!KNOWN_PAGE_SLUGS.has(slug)) return { error: "Unknown page." };

  const parsed = pageSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid data." };
  const d = parsed.data;

  // Prisma needs JsonNull (not raw null) to clear a nullable Json column.
  const faqsParsed = parseJsonArray(d.faqsJson, faqArraySchema, "FAQs");
  if ("error" in faqsParsed) return { error: faqsParsed.error };
  const reasonsParsed = parseJsonArray(d.reasonsJson, reasonArraySchema, "Why-choose reasons");
  if ("error" in reasonsParsed) return { error: reasonsParsed.error };
  const featuresParsed = parseJsonArray(d.featuresJson, featureArraySchema, "Features");
  if ("error" in featuresParsed) return { error: featuresParsed.error };

  const published = formData.get("published") === "on";

  const data = {
    title: d.title || "",
    subtitle: d.subtitle || null,
    heroImage: d.heroImage || null,
    faqs: faqsParsed.value,
    reasons: reasonsParsed.value,
    features: featuresParsed.value,
    featuresTitle: d.featuresTitle || null,
    featuresSubtitle: d.featuresSubtitle || null,
    published,
  };

  await prisma.page.upsert({
    where: { slug },
    update: data,
    create: { slug, ...data },
  });

  revalidatePath("/admin/pages");
  revalidatePath("/", "layout");
  revalidatePath(`/${slug}`);
  redirect("/admin/pages");
}

/** Quick hide/show from the Pages list — upserts a Page row so hidden pages 404. */
export async function setPageVisibility(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const slug = formData.get("slug");
  const published = formData.get("published") === "true";
  if (typeof slug !== "string" || !KNOWN_PAGE_SLUGS.has(slug)) throw new Error("Unknown page.");

  await prisma.page.upsert({
    where: { slug },
    update: { published },
    create: { slug, title: "", published },
  });

  revalidatePath("/admin/pages");
  revalidatePath("/", "layout");
  revalidatePath(`/${slug}`);
}

export async function resetPage(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const slug = formData.get("slug");
  if (typeof slug !== "string") throw new Error("Missing slug.");
  await prisma.page.deleteMany({ where: { slug } });
  revalidatePath("/admin/pages");
  revalidatePath(`/${slug}`);
}
