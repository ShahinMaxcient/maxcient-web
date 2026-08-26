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
import LinkedInPosts from "@/components/LinkedInPosts";
import FloatingActions from "@/components/FloatingActions";
import CTASection from "@/components/CTASection";
import { getPublishedPosts } from "@/lib/posts";
import { getSiteSettings, getHeroSettings, getSectionHeaders, getCTASettings, getLinkedinPosts, getWhoWeAre } from "@/lib/settings";
import { getServices, getTestimonials } from "@/lib/homepage";
import { getCollectionItems } from "@/lib/content";
import { getHiddenSlugs } from "@/lib/pages";

// The homepage is CMS-driven (hero image, sections, products). Render it fresh
// on each request so admin edits always show and never fall back to a stale,
// build-time-cached default.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [posts, settings, hero, sections, cta, servicesAll, testimonials, industriesAll, productsAll, technologiesAll, clients, stats, faqs, marqueeItems, hidden, linkedinPosts, whoWeAre] =
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
      getLinkedinPosts(),
      getWhoWeAre(),
    ]);

  // Drop cards whose detail page has been hidden in Admin → Pages.
  const visible = (href: string) => !hidden.has(href.replace(/^\//, "").split("#")[0]);
  const services = servicesAll.filter((s) => visible(s.href));
  const industries = industriesAll.filter((i) => visible(i.href));
  const products = productsAll.filter((p) => visible(p.href));
  const technologies = technologiesAll.filter((t) => visible(t.href));

  return (
    <>
      <main>
        <Hero data={hero} />
        <Marquee items={marqueeItems.map((m) => m.text)} />
        {/* Section order mirrors www.maxcient.com:
            Services → Industries → Trusted by → Products → Technologies → … */}
        <Services services={services} header={sections.services} />
        <Industries industries={industries} header={sections.industries} />
        <TrustedBy clients={clients} header={sections.trustedBy} />
        <Products products={products} header={sections.products} />
        <Technologies technologies={technologies} header={sections.technologies} />
        <SocialProof stats={stats} header={sections.stats} />
        <Testimonials cards={testimonials} header={sections.testimonials} whoWeAre={whoWeAre} />
        <FAQ faqs={faqs} header={sections.faq} />
        <Blog posts={posts} header={sections.blog} />
        <LinkedInPosts posts={linkedinPosts} companyUrl={settings.linkedinUrl} />
        <CTASection
          title={cta.title}
          subtitle={cta.subtitle}
          phone={settings.contactPhone}
          image={cta.image}
          ctaText={cta.ctaText}
        />
      </main>
      <FloatingActions phone={settings.whatsappNumber || settings.contactPhone} />
    </>
  );
}
