"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { SETTINGS_KEY } from "@/lib/settings";

const settingsSchema = z.object({
  contactEmail: z.string().trim().email("Enter a valid email."),
  contactPhone: z.string().trim().min(1, "Phone is required."),
  linkedinUrl: z.string().trim().url("Enter a valid URL.").or(z.literal("")),
  footerTagline: z.string().trim().min(1, "Footer tagline is required."),
});

export type SettingsFormState = { error?: string; ok?: boolean } | undefined;

export async function updateSettings(
  _prevState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const parsed = settingsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data." };
  }

  const ctaValue = {
    title: String(formData.get("ctaTitle") ?? "").trim(),
    subtitle: String(formData.get("ctaSubtitle") ?? "").trim(),
    image: String(formData.get("ctaImage") ?? "").trim(),
    ctaText: String(formData.get("ctaButtonText") ?? "").trim(),
  };

  await Promise.all([
    prisma.siteSetting.upsert({
      where: { key: SETTINGS_KEY },
      update: { value: parsed.data },
      create: { key: SETTINGS_KEY, value: parsed.data },
    }),
    prisma.siteSetting.upsert({
      where: { key: "cta" },
      update: { value: ctaValue },
      create: { key: "cta", value: ctaValue },
    }),
  ]);

  revalidatePath("/", "layout");
  return { ok: true };
}
