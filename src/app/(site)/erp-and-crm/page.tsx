import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import FramedImage from "@/components/FramedImage";
import IndustryTabs from "@/components/IndustryTabs";
import GetInTouch from "@/components/GetInTouch";
import Reveal from "@/components/Reveal";
import ProcessTimeline from "@/components/ProcessTimeline";


import { pageMetadata } from "@/lib/seo";

// Unique title/description per page; Admin → Pages can override both.
export const generateMetadata = () =>
  pageMetadata({
    slug: "erp-and-crm",
    title: "CRM and ERP Solutions",
    description:
      "Integrated Microsoft Dynamics 365 CRM and ERP implementation for UAE and GCC businesses — unifying sales, finance, supply chain and operations.",
  });

const IMG = "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site";

// The three ways we help — each now an alternating image/text row so the page
// carries the same photography as www.maxcient.com/erp-and-crm.
const guidance = [
  {
    tag: "Evaluate",
    title: "We Guide You In Evaluating ERP & CRM",
    body: "Navigating the ERP & CRM landscape can be daunting. With our expertise, we guide businesses through the selection process, ensuring that the chosen solution aligns seamlessly with their objectives and financial plans.",
    warnings: [
      "A wrong ERP choice can derail your entire operation and cost you precious time and money.",
      "A generic system might overlook your unique needs, leading to inefficiencies and missed opportunities.",
    ],
    image: `${IMG}/erp-guide-evaluate.webp`,
    alt: "Consultants evaluating ERP and CRM options with a client",
  },
  {
    tag: "Develop",
    title: "We Develop ERP & CRM Systems For Your Unique Needs",
    body: "In a world where every business is unique, a one-size-fits-all solution doesn't cut it. Our team crafts industry-leading ERP & CRM systems, focusing on the specific modules and integrations that cater to your distinct industry requirements.",
    warnings: [],
    image: `${IMG}/erp-guide-develop.webp`,
    alt: "Team designing a tailored ERP and CRM system",
  },
  {
    tag: "Implement",
    title: "We Ensure Smooth & On-Time Implementation Of ERP & CRM Solutions",
    body: "Transitioning to a new ERP or CRM system is a monumental task. Our team oversees the deployment process from start to finish, ensuring that businesses experience a smooth and hassle-free transition.",
    warnings: ["A rocky implementation can disrupt operations, causing downtime and lost revenue."],
    image: `${IMG}/erp-guide-implement.webp`,
    alt: "Specialists implementing an ERP and CRM rollout",
  },
];

// A concrete four-step delivery process — the section was previously just an
// empty heading on both sites.
const process = [
  { title: "Evaluate", body: "We assess your operations, goals and budget, then map the ERP & CRM landscape to the fit that's right for you." },
  { title: "Design & Develop", body: "We craft the modules, workflows and integrations around your industry — never a generic, off-the-shelf template." },
  { title: "Implement", body: "We oversee migration, configuration and go-live end to end, so the switch never disrupts day-to-day operations." },
  { title: "Support & Optimize", body: "Post-launch we train your teams, monitor adoption and keep tuning the system as your business grows." },
];

const industries = [
  {
    name: "Manufacturing",
    heading: "Revolutionizing Traditional Operations with Smart Factory Solutions",
    body: "Leveraging advanced solutions for manufacturing sectors, we transform traditional operations into smart factories. Our approach ensures real-time insights into production cycles, enhances asset management, and paves the way for a sustainable, efficient manufacturing environment.",
    image: `${IMG}/photo-1581091226825-a6a2a5aee158.webp`,
    features: ["Warehouse management", "Order processing and fulfillment", "Inventory tracking and forecasting", "Vendor relationship management", "Transportation and logistics planning", "Returns and warranty management", "Pricing and discount management", "Customer service and support tools"],
  },
  {
    name: "Real Estate",
    heading: "Empowering Real Estate Ventures with Digital Transformation",
    body: "Streamlining operations for real estate businesses by integrating property management tools, enhancing tenant relations, optimizing facility maintenance, and driving strategic investment decisions.",
    image: `${IMG}/photo-1560518883-ce09059eeffa.webp`,
    features: ["Property portfolio management", "Lease management", "Facility and maintenance scheduling", "Tenant relationship management", "Investment analytics and insights", "Document and contract management", "Listing and advertisement management", "Financial reporting"],
  },
  {
    name: "Retail",
    heading: "Elevating Retail Experiences through Innovative Tech Integration",
    body: "Enhancing retail operations by integrating cutting-edge technology solutions, personalizing customer experiences, optimizing inventory management, and promoting strategic sales strategies.",
    image: `${IMG}/photo-1441986300917-64674bd600d8.webp`,
    features: ["Inventory and stock management", "Point of sale integration", "Customer relationship management", "E-commerce and online sales optimization", "Sales analytics and insights", "Promotions and discount management", "Digital marketing and advertisement strategies", "Financial and sales reporting"],
  },
  {
    name: "Distribution",
    heading: "Optimizing Distribution Channels with Intelligent Systems",
    body: "Empowering distributors with solutions that optimize supply chain operations, enhance vendor relationships, manage inventory efficiently, and drive timely deliveries.",
    image: `${IMG}/photo-1586528116311-ad8dd3c8310d.webp`,
    features: ["Warehouse management", "Order processing and fulfillment", "Inventory tracking and forecasting", "Vendor relationship management", "Transportation and logistics planning", "Returns and warranty management", "Pricing and discount management", "Customer service and support tools"],
  },
  {
    name: "Professional Services",
    heading: "Reimagining Service Excellence with Integrated Solutions",
    body: "Harnessing the power of ERP & CRM tailored for the Professional Services sector, we elevate service delivery and client experiences. Our solutions provide real-time insights into project progress, streamline resource management, and drive unparalleled service success.",
    image: `${IMG}/photo-1521737711867-e3b97375f902.webp`,
    features: ["Client relationship management", "Project lifecycle tracking", "Resource allocation & management", "Billing & invoice management", "Performance analytics", "Collaboration tools", "Contract & document management", "Feedback & service improvement"],
  },
];

function WarnIcon() {
  return (
    <svg className="w-[18px] h-[18px] mt-0.5 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  );
}

export default function ERPAndCRM() {
  return (
    <>
      <main>
        <PageHero
          slug="erp-and-crm"
          title="ERP and CRM"
          subtitle="Setting the stage for your exponential growth."
          description="We bring your customer relationships and core operations onto one connected Microsoft Dynamics 365 platform, with sales, service, finance and supply chain sharing a single source of truth. From first implementation to deep customization, Maxcient helps UAE and GCC teams replace disconnected systems with unified CRM and ERP that scales as you grow."
          image={`${IMG}/hero-erp-crm.webp`}
        />

        {/* How we help — three alternating image/text rows */}
        <section className="py-16 lg:py-24 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="up" className="max-w-3xl mb-14 lg:mb-20">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">How we help</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading leading-tight">
                From the first decision to a system your teams rely on
              </h2>
              <p className="mt-4 t-body leading-relaxed">
                We stay with you across the full ERP &amp; CRM journey — choosing the right platform, shaping it around your industry, and standing up the rollout without disrupting the business.
              </p>
            </Reveal>

            <div className="space-y-16 lg:space-y-28">
              {guidance.map((item, i) => {
                const flip = i % 2 === 1;
                return (
                  <div key={item.title} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <Reveal direction={flip ? "right" : "left"} className={flip ? "lg:order-2" : ""}>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{item.tag}</span>
                      <h3 className="mt-3 text-2xl sm:text-3xl font-bold t-heading leading-snug">{item.title}</h3>
                      <p className="mt-4 t-body leading-relaxed">{item.body}</p>
                      {item.warnings.length > 0 && (
                        <div className="mt-6 space-y-3">
                          {item.warnings.map((wtext) => (
                            <div
                              key={wtext}
                              className="flex items-start gap-3 p-4 rounded-xl"
                              style={{ background: "var(--surface-alt)", border: "1px solid var(--border)" }}
                            >
                              <WarnIcon />
                              <p className="text-sm t-label leading-relaxed">{wtext}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </Reveal>
                    <Reveal direction={flip ? "left" : "right"} delay={0.08} className={flip ? "lg:order-1" : ""}>
                      <FramedImage src={item.image} alt={item.alt} />
                    </Reveal>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Process — four-step delivery band */}
        <section className="py-16 lg:py-20 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Our Process</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">How We Deliver ERP and CRM Services</h2>
              <p className="mt-4 t-body leading-relaxed">
                A clear, four-step path from first assessment to a system your teams keep getting value from.
              </p>
            </Reveal>
            <ProcessTimeline steps={process} />
          </div>
        </section>

        {/* Industry Solutions — alternating rows */}
        <section className="py-16 lg:py-24 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Who we work with</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">Industry Solutions</h2>
              <p className="mt-4 t-body leading-relaxed">
                Our custom ERP &amp; CRM solutions are designed to resonate with specific industry nuances, ensuring seamless integration, enhanced productivity, and a competitive edge. Explore how our expertise turns industry-specific challenges into opportunities.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.05}>
              <IndustryTabs industries={industries} />
            </Reveal>
          </div>
        </section>

        {/* Value proposition paired with a consultation image */}
        <section className="py-16 lg:py-20 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <Reveal direction="right" className="lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold t-heading leading-tight">Delivering Unique Solutions, Tailored for You.</h2>
                <p className="mt-5 t-body leading-relaxed">
                  In a rapidly evolving digital landscape, our approach is distinct. We prioritize your unique needs, combining expertise and innovation to craft solutions that truly resonate. Dive into a bespoke experience where your aspirations become reality.
                </p>
                <p className="mt-4 t-body leading-relaxed">
                  Reach our transformation experts today — connect with our UAE-based certified consultants specializing in CRM implementation, ERP deployment, and supply chain optimization tailored to the GCC region. Our local experts understand UAE regulatory requirements and regional business practices.
                </p>
              </Reveal>
              <Reveal direction="left" delay={0.08} className="lg:order-1">
                <FramedImage src={`${IMG}/erp-value-consult.webp`} alt="UAE-based Maxcient consultants meeting with a client" />
              </Reveal>
            </div>
          </div>
        </section>

        <CTASection
          title="Start Your Digital Transformation Journey with Maxcient"
          subtitle="Embrace the future with Maxcient's Services and Products. We assure you enhanced collaboration and improved outcomes. Experience the change where technology meets business excellence."
        />
        <PageFAQ slug="erp-and-crm" />
        <GetInTouch />
      </main>
    </>
  );
}
