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
});

const faqArraySchema = z.array(
  z.object({ question: z.string().trim().min(1), answer: z.string().trim().min(1) }),
);

export async function savePage(slug: string, _prev: PageEditState, formData: FormData): Promise<PageEditState> {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  if (!KNOWN_PAGE_SLUGS.has(slug)) return { error: "Unknown page." };

  const parsed = pageSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid data." };
  const d = parsed.data;

  // Prisma needs JsonNull (not raw null) to clear a nullable Json column.
  let faqs: Prisma.InputJsonValue | typeof Prisma.JsonNull = Prisma.JsonNull;
  if (d.faqsJson && d.faqsJson.trim()) {
    try {
      const json = JSON.parse(d.faqsJson);
      const result = faqArraySchema.safeParse(json);
      if (!result.success) {
        return { error: 'FAQs must be a JSON array of { "question": "…", "answer": "…" } objects.' };
      }
      faqs = result.data;
    } catch {
      return { error: "FAQs is not valid JSON." };
    }
  }

  const data = {
    title: d.title || "",
    subtitle: d.subtitle || null,
    heroImage: d.heroImage || null,
    faqs,
  };

  await prisma.page.upsert({
    where: { slug },
    update: data,
    create: { slug, ...data },
  });

  revalidatePath("/admin/pages");
  revalidatePath(`/${slug}`);
  redirect("/admin/pages");
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
