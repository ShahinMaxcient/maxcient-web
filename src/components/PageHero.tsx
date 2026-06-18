import PageHeroView from "./PageHeroView";
import { getPageOverride } from "@/lib/pages";

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  /** When set, admin overrides for this page slug replace the defaults below. */
  slug?: string;
}

export default async function PageHero({ title, subtitle, image, slug }: PageHeroProps) {
  const override = slug ? await getPageOverride(slug) : null;
  return (
    <PageHeroView
      title={override?.title || title}
      subtitle={override?.subtitle || subtitle}
      image={override?.heroImage || image}
    />
  );
}
