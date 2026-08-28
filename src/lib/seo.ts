import type { Metadata } from "next";
import { getPageOverride } from "./pages";

/**
 * Canonical origin for the site.
 *
 * Defaults to the production domain rather than the Vercel preview URL on
 * purpose: canonical tags pointing at www.maxcient.com stop the
 * *.vercel.app copy being indexed as duplicate content, which would compete
 * with the real domain. Override with NEXT_PUBLIC_SITE_URL if the site is ever
 * served from somewhere else.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.maxcient.com").replace(/\/$/, "");

export const SITE_NAME = "Maxcient Technologies";

/** Fallback social preview image, used when a page has no hero of its own. */
export const DEFAULT_OG_IMAGE =
  "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/hero-city-dubai-1785600574998.webp";

/** Trim to a length search engines actually display, breaking on a word. */
function clamp(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\-—\s]+$/, "")}…`;
}

type PageMetaInput = {
  /** Route segment without the leading slash — also the Page override key. */
  slug: string;
  /** Human title for this page, without the brand suffix. */
  title: string;
  /** Fallback description when Admin has not set an seoDescription. */
  description: string;
  /** Page hero, used as the social preview image. */
  image?: string;
};

/**
 * Build a page's metadata, preferring what an editor set in Admin → Pages.
 *
 * The Page model has carried seoTitle / seoDescription since the CMS was
 * built, but nothing ever read them — every page inherited the root layout's
 * title, so 26 routes told Google they were the same document. Reading them
 * here makes the existing admin fields work and gives each page a unique
 * title, description and canonical URL.
 */
export async function pageMetadata({ slug, title, description, image }: PageMetaInput): Promise<Metadata> {
  // Never let a database hiccup break the page — fall back to the literals.
  const override = await getPageOverride(slug).catch(() => null);

  const resolvedTitle = clamp(override?.seoTitle?.trim() || `${title} | ${SITE_NAME}`, 60);
  const resolvedDescription = clamp(override?.seoDescription?.trim() || description, 158);
  const path = `/${slug.replace(/^\//, "")}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: path },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_AE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage],
    },
  };
}
