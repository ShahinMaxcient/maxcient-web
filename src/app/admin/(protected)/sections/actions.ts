"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { DEFAULT_SECTIONS, type SectionHeaders } from "@/lib/settings";

export type SectionsFormState = { error?: string; ok?: boolean } | undefined;

const SECTION_KEYS = Object.keys(DEFAULT_SECTIONS) as (keyof SectionHeaders)[];

export async function saveSectionHeaders(
  _prev: SectionsFormState,
  formData: FormData,
): Promise<SectionsFormState> {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const value: Record<string, { eyebrow: string; title: string; body: string }> = {};

  for (const key of SECTION_KEYS) {
    value[key] = {
      eyebrow: String(formData.get(`${key}.eyebrow`) ?? "").trim(),
      title: String(formData.get(`${key}.title`) ?? "").trim(),
      body: String(formData.get(`${key}.body`) ?? "").trim(),
    };
  }

  await prisma.siteSetting.upsert({
    where: { key: "sections" },
    update: { value },
    create: { key: "sections", value },
  });

  revalidatePath("/", "layout");
  return { ok: true };
}
