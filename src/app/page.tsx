import NavbarServer from "@/components/NavbarServer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Products from "@/components/Products";
import Technologies from "@/components/Technologies";
import SocialProof from "@/components/SocialProof";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getPublishedPosts } from "@/lib/posts";
import { getSiteSettings, getHeroSettings, getSectionHeaders, getCTASettings } from "@/lib/settings";
import { getServices, getTestimonials } from "@/lib/homepage";
import { getCollectionItems } from "@/lib/content";
import { getHiddenSlugs } from "@/lib/pages";

// The homepage is CMS-driven (hero image, sections, products). Render it fresh
// on each request so admin edits always show and never fall back to a stale,
// build-time-cached default.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [posts, settings, hero, sections, cta, servicesAll, testimonials, industriesAll, productsAll, technologiesAll, clients, stats, faqs, marqueeItems, hidden] =
    await Promise.all([
      getPublishedPosts(4),
      getSiteSettings(),
      getHeroSettings(),
      getSectionHeaders(),
      getCTASettings(),
      getServices(),
      getTestimonials(),
      getCollectionItems<{ title: string; num: string; href: string; image: string; span: string }>("industries"),
      getCollectionItems<{ num: string; title: string; desc: string; tags: string[]; href: string; image: string }>("products"),
      getCollectionItems<{ title: string; description: string; letter: string; href: string }>("technologies"),
      getCollectionItems<{ name: string; logo: string }>("clients"),
      getCollectionItems<{ eyebrow: string; value: number; suffix: string; label: string }>("stats"),
      getCollectionItems<{ question: string; answer: string }>("faqs"),
      getCollectionItems<{ text: string }>("marquee"),
      getHiddenSlugs(),
    ]);

  // Drop cards whose detail page has been hidden in Admin → Pages.
  const visible = (href: string) => !hidden.has(href.replace(/^\//, "").split("#")[0]);
  const services = servicesAll.filter((s) => visible(s.href));
  const industries = industriesAll.filter((i) => visible(i.href));
  const products = productsAll.filter((p) => visible(p.href));
  const technologies = technologiesAll.filter((t) => visible(t.href));

  return (
    <>
      <NavbarServer />
      <main>
        <Hero data={hero} />
        <Marquee items={marqueeItems.map((m) => m.text)} />
        <TrustedBy clients={clients} header={sections.trustedBy} />
        <Services services={services} header={sections.services} />
        <Industries industries={industries} header={sections.industries} />
        <Products products={products} header={sections.products} />
        <Technologies technologies={technologies} header={sections.technologies} />
        <SocialProof stats={stats} header={sections.stats} />
        <Testimonials cards={testimonials} header={sections.testimonials} />
        <FAQ faqs={faqs} header={sections.faq} />
        <Blog posts={posts} header={sections.blog} />
        <CTASection
          title={cta.title}
          subtitle={cta.subtitle}
          phone={settings.contactPhone}
          image={cta.image}
          ctaText={cta.ctaText}
        />
      </main>
      <Footer />
    </>
  );
}
