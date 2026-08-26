import { cache } from "react";
import { prisma } from "./prisma";

export type SiteSettings = {
  contactEmail: string;
  contactPhone: string;
  /** WhatsApp number for the floating chat button. Digits/“+” only, any format. */
  whatsappNumber: string;
  linkedinUrl: string;
  footerTagline: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  contactEmail: "hello@maxcient.com",
  contactPhone: "+971 4 329 3710",
  whatsappNumber: "+971 4 329 3710",
  linkedinUrl: "https://www.linkedin.com/company/maxcient",
  footerTagline:
    "Talk to us about how Maxcient can help you realize business value faster with end-to-end solutions and cloud services. Microsoft Solutions Partner, headquartered in Dubai.",
};

const SETTINGS_KEY = "site";

async function getSiteSettings__uncached(): Promise<SiteSettings> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: SETTINGS_KEY } });
    if (!row?.value || typeof row.value !== "object") return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(row.value as Partial<SiteSettings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export { SETTINGS_KEY };

// ─── Generic setting getter ───────────────────────────────────────────────────

export async function getSettingValue<T extends Record<string, unknown>>(
  key: string,
  defaults: T,
): Promise<T> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key } });
    if (!row?.value || typeof row.value !== "object") return defaults;
    return { ...defaults, ...(row.value as Partial<T>) };
  } catch {
    return defaults;
  }
}

// ─── Hero settings ────────────────────────────────────────────────────────────

export type HeroSettings = {
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaSecondary: string;
  phone: string;
  badge: string;
  image: string; // primary / fallback image
  images: string[]; // up to 4 background images; animated slideshow when >1
  tagline: string;
  stats: { n: string; l: string }[];
};

export const DEFAULT_HERO: HeroSettings = {
  headline: "Maximize Tech ROI.",
  subtitle:
    "A digital enabler for the UAE & GCC. We build enterprise systems with Microsoft Dynamics 365, Power Platform, Azure, AI, and blockchain — delivered by a senior team across 6 global offices.",
  ctaText: "Book a consultation",
  ctaSecondary: "See our work",
  phone: "+971 4 329 3710",
  badge: "Microsoft Solutions Partner",
  image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/hero-skyline.webp",
  images: ["https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/hero-skyline.webp"],
  tagline: "EST · 2017 — DUBAI · UAE",
  stats: [
    { n: "06", l: "Global Offices" },
    { n: "120+", l: "Projects Delivered" },
    { n: "5/5", l: "Client Rating" },
    { n: "98%", l: "Satisfaction" },
  ],
};

async function getHeroSettings__uncached(): Promise<HeroSettings> {
  const hero = await getSettingValue("hero", DEFAULT_HERO);
  // Back-compat: rows saved before multi-image only have `image`.
  if (!Array.isArray(hero.images) || hero.images.length === 0) {
    hero.images = hero.image ? [hero.image] : [];
  }
  return hero;
}

// ─── Section headers ──────────────────────────────────────────────────────────

export type SectionHeader = { eyebrow: string; title: string; body: string };

export type SectionHeaders = {
  services: SectionHeader;
  industries: SectionHeader;
  products: SectionHeader;
  technologies: SectionHeader;
  testimonials: SectionHeader;
  blog: SectionHeader;
  faq: SectionHeader;
  stats: SectionHeader;
  trustedBy: SectionHeader;
};

export const DEFAULT_SECTIONS: SectionHeaders = {
  services: {
    eyebrow: "Our Services",
    title: "Six capabilities, one partner.",
    body: "We cover the full lifecycle of enterprise systems — from strategy and platform selection through implementation, integration, and ongoing managed services.",
  },
  industries: {
    eyebrow: "Industries",
    title: "Sectors we know cold.",
    body: "Deep domain expertise across manufacturing, real estate, retail, distribution, and professional services.",
  },
  products: {
    eyebrow: "Proprietary Products",
    title: "Software we built.",
    body: "Three vertical solutions designed for the GCC market — built on our own IP, delivered as managed SaaS.",
  },
  technologies: {
    eyebrow: "Tech Stack",
    title: "Platforms we master.",
    body: "Cutting-edge platforms and tools — from Microsoft's enterprise ecosystem to blockchain and AI.",
  },
  testimonials: {
    eyebrow: "Who We Are",
    title: "Powered by values and experience.",
    body: "We know the tech world moves fast. Our team stays sharp, committed, and accountable.",
  },
  blog: {
    eyebrow: "Journal",
    title: "Latest thinking.",
    body: "Perspectives on enterprise technology, digital transformation, and the future of work in the GCC.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
    body: "Everything you need to know about working with Maxcient. Still curious? Reach out to a senior consultant directly.",
  },
  stats: {
    eyebrow: "By the Numbers",
    title: "Trusted across the GCC.",
    body: "Nearly a decade of measurable outcomes — from implementation velocity to satisfaction scores that outperform the regional average.",
  },
  trustedBy: {
    eyebrow: "Trusted by",
    title: "Trusted by UAE's leading enterprises",
    body: "",
  },
};

async function getSectionHeaders__uncached(): Promise<SectionHeaders> {
  return getSettingValue("sections", DEFAULT_SECTIONS);
}

// ─── CTA settings ─────────────────────────────────────────────────────────────

export type CTASettings = {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
};

export const DEFAULT_CTA: CTASettings = {
  title: "Get in touch",
  subtitle:
    "Reach our transformation experts today. Connect with our UAE-based certified consultants specializing in CRM, ERP, and Dynamics 365 across the GCC.",
  image:
    "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1451187580459-43490279c0fa.webp",
  ctaText: "Book a consultation",
};

async function getCTASettings__uncached(): Promise<CTASettings> {
  return getSettingValue("cta", DEFAULT_CTA);
}

// ─── About page settings ──────────────────────────────────────────────────────

export type AboutSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  missionEyebrow: string;
  missionTitle: string;
  missionBody: string;
  missionBody2: string;
  missionImage: string;
  statsEyebrow: string;
  statsTitle: string;
  valuesEyebrow: string;
  valuesTitle: string;
};

export const DEFAULT_ABOUT: AboutSettings = {
  heroTitle: "About Maxcient",
  heroSubtitle:
    "Technology is not an option — it's an accelerator. We are a digital enabler helping businesses adapt to and shape the future through technological innovation.",
  heroImage: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1600880292203-757bb62b4baf.webp",
  missionEyebrow: "Our Mission",
  missionTitle: "Empowering Digital Transformation",
  missionBody:
    "Maxcient is a digital enabler that helps businesses adapt to and shape the future through technological innovation. We leverage cutting-edge platforms including Microsoft Dynamics 365, Power Platform, Azure, Blockchain, AI, and IoT to deliver enterprise-grade solutions.",
  missionBody2:
    "Serving industries from manufacturing and real estate to retail and professional services, we bring deep domain expertise and a commitment to delivering measurable business value.",
  missionImage: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1522071820081-009f0129c71c.webp",
  statsEyebrow: "Numbers",
  statsTitle: "Maxcient at a Glance",
  valuesEyebrow: "Values",
  valuesTitle: "What We Stand For",
};

async function getAboutSettings__uncached(): Promise<AboutSettings> {
  return getSettingValue("about", DEFAULT_ABOUT);
}

/** Request-level dedupe: repeated calls in one render hit the DB once. */
export const getSiteSettings = cache(getSiteSettings__uncached);

/** Request-level dedupe: repeated calls in one render hit the DB once. */
export const getHeroSettings = cache(getHeroSettings__uncached);

/** Request-level dedupe: repeated calls in one render hit the DB once. */
export const getSectionHeaders = cache(getSectionHeaders__uncached);

/** Request-level dedupe: repeated calls in one render hit the DB once. */
export const getCTASettings = cache(getCTASettings__uncached);

/** Request-level dedupe: repeated calls in one render hit the DB once. */
export const getAboutSettings = cache(getAboutSettings__uncached);

/** Image + experience badge for the homepage "Who We Are" section. */
export type WhoWeAre = {
  image: string;
  badgeValue: number;
  badgeSuffix: string;
  badgeLabel: string;
};

export const DEFAULT_WHO_WE_ARE: WhoWeAre = {
  image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/who-we-are.webp",
  badgeValue: 500,
  badgeSuffix: "+",
  badgeLabel: "Person Years Experience",
};

async function getWhoWeAre__uncached(): Promise<WhoWeAre> {
  const v = await getSettingValue<Partial<WhoWeAre>>("home.whoWeAre", DEFAULT_WHO_WE_ARE);
  return { ...DEFAULT_WHO_WE_ARE, ...(v || {}) };
}
/** Request-level dedupe: repeated calls in one render hit the DB once. */
export const getWhoWeAre = cache(getWhoWeAre__uncached);

/**
 * Which client logos appear on which product page, keyed by page slug.
 *
 * Empty by default and empty for any slug not listed: pairing a named company
 * with a product asserts a real business relationship, so it is configured
 * rather than guessed. Editable via the `product.clients` setting.
 */
export type ProductClientMap = Record<string, string[]>;

export const DEFAULT_PRODUCT_CLIENTS: ProductClientMap = {};

async function getProductClientsMap__uncached(): Promise<ProductClientMap> {
  const v = await getSettingValue<ProductClientMap>("product.clients", DEFAULT_PRODUCT_CLIENTS);
  return v && typeof v === "object" ? v : DEFAULT_PRODUCT_CLIENTS;
}
/** Request-level dedupe: repeated calls in one render hit the DB once. */
export const getProductClientsMap = cache(getProductClientsMap__uncached);

export async function getProductClients(slug: string): Promise<string[]> {
  const map = await getProductClientsMap();
  const list = map[slug];
  return Array.isArray(list) ? list.filter((s) => typeof s === "string" && s.trim()) : [];
}

async function getLinkedinPosts__uncached(): Promise<string[]> {
  const v = await getSettingValue<{ urls: string[] }>("home.linkedinPosts", { urls: [] });
  return Array.isArray(v?.urls) ? v.urls.filter(Boolean) : [];
}
/** Request-level dedupe: repeated calls in one render hit the DB once. */
export const getLinkedinPosts = cache(getLinkedinPosts__uncached);
