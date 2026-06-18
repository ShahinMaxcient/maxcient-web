import { prisma } from "./prisma";

export type SiteSettings = {
  contactEmail: string;
  contactPhone: string;
  linkedinUrl: string;
  footerTagline: string;
};

// Defaults mirror the original hardcoded values, so the site looks identical
// until an admin overrides them.
export const DEFAULT_SETTINGS: SiteSettings = {
  contactEmail: "hello@maxcient.com",
  contactPhone: "+971 4 329 3710",
  linkedinUrl: "https://www.linkedin.com/company/maxcient",
  footerTagline:
    "Talk to us about how Maxcient can help you realize business value faster with end-to-end solutions and cloud services. Microsoft Gold Partner, headquartered in Dubai.",
};

const SETTINGS_KEY = "site";

/** Site settings merged over defaults. Never throws — falls back to defaults. */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: SETTINGS_KEY } });
    if (!row?.value || typeof row.value !== "object") return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(row.value as Partial<SiteSettings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export { SETTINGS_KEY };
