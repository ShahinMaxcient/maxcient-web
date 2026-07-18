"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export type AboutFormState = { error?: string; ok?: boolean } | undefined;

const FIELDS = [
  "heroTitle", "heroSubtitle", "heroImage",
  "missionEyebrow", "missionTitle", "missionBody", "missionBody2", "missionImage",
  "statsEyebrow", "statsTitle", "valuesEyebrow", "valuesTitle",
] as const;

export async function saveAboutSettings(
  _prev: AboutFormState,
  formData: FormData,
): Promise<AboutFormState> {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const value: Record<string, string> = {};
  for (const f of FIELDS) {
    value[f] = String(formData.get(f) ?? "").trim();
  }

  await prisma.siteSetting.upsert({
    where: { key: "about" },
    update: { value },
    create: { key: "about", value },
  });

  revalidatePath("/about-us");
  revalidatePath("/", "layout");
  return { ok: true };
}
