import { prisma } from "./prisma";

export type SiteSettings = {
  contactEmail: string;
  contactPhone: string;
  linkedinUrl: string;
  footerTagline: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  contactEmail: "hello@maxcient.com",
  contactPhone: "+971 4 329 3710",
  linkedinUrl: "https://www.linkedin.com/company/maxcient",
  footerTagline:
    "Talk to us about how Maxcient can help you realize business value faster with end-to-end solutions and cloud services. Microsoft Solutions Partner, headquartered in Dubai.",
};

const SETTINGS_KEY = "site";

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
  image: string;
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
  image: "/hero-code.jpg",
  tagline: "EST · 2017 — DUBAI · UAE",
  stats: [
    { n: "06", l: "Global Offices" },
    { n: "120+", l: "Projects Delivered" },
    { n: "5/5", l: "Client Rating" },
    { n: "98%", l: "Satisfaction" },
  ],
};

export async function getHeroSettings(): Promise<HeroSettings> {
  return getSettingValue("hero", DEFAULT_HERO);
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

export async function getSectionHeaders(): Promise<SectionHeaders> {
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
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80",
  ctaText: "Book a consultation",
};

export async function getCTASettings(): Promise<CTASettings> {
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
  heroImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80",
  missionEyebrow: "Our Mission",
  missionTitle: "Empowering Digital Transformation",
  missionBody:
    "Maxcient is a digital enabler that helps businesses adapt to and shape the future through technological innovation. We leverage cutting-edge platforms including Microsoft Dynamics 365, Power Platform, Azure, Blockchain, AI, and IoT to deliver enterprise-grade solutions.",
  missionBody2:
    "Serving industries from manufacturing and real estate to retail and professional services, we bring deep domain expertise and a commitment to delivering measurable business value.",
  missionImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  statsEyebrow: "Numbers",
  statsTitle: "Maxcient at a Glance",
  valuesEyebrow: "Values",
  valuesTitle: "What We Stand For",
};

export async function getAboutSettings(): Promise<AboutSettings> {
  return getSettingValue("about", DEFAULT_ABOUT);
}
