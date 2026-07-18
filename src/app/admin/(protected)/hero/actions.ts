"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export type HeroFormState = { error?: string; ok?: boolean } | undefined;

export async function saveHeroSettings(
  _prev: HeroFormState,
  formData: FormData,
): Promise<HeroFormState> {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  let stats: { n: string; l: string }[];
  try {
    stats = JSON.parse(String(formData.get("stats") ?? "[]"));
    if (!Array.isArray(stats)) throw new Error();
  } catch {
    return { error: "Stats must be a valid JSON array." };
  }

  const value = {
    headline: String(formData.get("headline") ?? "").trim(),
    subtitle: String(formData.get("subtitle") ?? "").trim(),
    ctaText: String(formData.get("ctaText") ?? "").trim(),
    ctaSecondary: String(formData.get("ctaSecondary") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    badge: String(formData.get("badge") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    tagline: String(formData.get("tagline") ?? "").trim(),
    stats,
  };

  await prisma.siteSetting.upsert({
    where: { key: "hero" },
    update: { value },
    create: { key: "hero", value },
  });

  revalidatePath("/", "layout");
  return { ok: true };
}
