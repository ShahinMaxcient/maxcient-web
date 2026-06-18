import PageFAQView from "./PageFAQView";
import { getPageOverride } from "@/lib/pages";

interface FAQItem {
  question: string;
  answer: string;
}

export default async function PageFAQ({ faqs, slug }: { faqs: FAQItem[]; slug?: string }) {
  const override = slug ? await getPageOverride(slug) : null;
  const items = override?.faqs && override.faqs.length > 0 ? override.faqs : faqs;
  return <PageFAQView faqs={items} />;
}
