import { notFound } from "next/navigation";
import PageHeroView from "./PageHeroView";
import { getPageOverride, isPageHidden } from "@/lib/pages";

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  /** When set, admin overrides for this page slug replace the defaults below. */
  slug?: string;
}

export default async function PageHero({ title, subtitle, image, slug }: PageHeroProps) {
  if (slug && (await isPageHidden(slug))) notFound();
  const override = slug ? await getPageOverride(slug) : null;
  return (
    <PageHeroView
      title={override?.title || title}
      subtitle={override?.subtitle || subtitle}
      image={override?.heroImage || image}
    />
  );
}
