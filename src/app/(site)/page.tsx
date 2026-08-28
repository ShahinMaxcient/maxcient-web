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
import CTASection from "@/components/CTASection";
import { getPublishedPosts } from "@/lib/posts";
import { getSiteSettings, getHeroSettings, getSectionHeaders, getCTASettings, getLinkedinPosts, getWhoWeAre } from "@/lib/settings";
import { getServices, getTestimonials } from "@/lib/homepage";
import { getCollectionItems } from "@/lib/content";
import { getHiddenSlugs } from "@/lib/pages";

// CMS-driven, but cached: admin saves purge via revalidatePath and the root
// layout's revalidate window handles out-of-band DB edits (see app/layout.tsx).

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
      getCollectionItems<{ num: string; title: string; desc: string; tags: string[]; href: string; image: string; subItems?: { href: string; label: string; desc?: string; tags?: string[]; image?: string }[] | null }>("products"),
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
  // "RealtyAI" and "E-Invoice Connector" are families, not single products —
  // the home grid shows each of their sub-products as its own card, while the
  // nav keeps them grouped under the family name. A product with no sub-items
  // shows as itself. Each sub carries its own image/desc/tags (set in Admin),
  // falling back to the parent's. Visibility is checked per resulting href, so
  // hiding a sub-page in Admin → Pages still drops just that card.
  const products = productsAll
    .flatMap((p) => {
      const subs = Array.isArray(p.subItems) ? p.subItems.filter((s) => s?.href && s?.label) : [];
      if (subs.length === 0) return [p];
      return subs.map((s) => ({
        num: p.num,
        title: s.label,
        desc: s.desc || p.desc,
        tags: s.tags && s.tags.length ? s.tags : p.tags,
        href: s.href,
        image: s.image || p.image,
      }));
    })
    .filter((p) => visible(p.href));
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
    </>
  );
}
