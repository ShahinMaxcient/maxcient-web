import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import Image from "next/image";

// Three ways we help with ERP & CRM (mirrors www.maxcient.com/erp-and-crm).
const guidance = [
  {
    title: "We Guide You In Evaluating ERP & CRM",
    body: "Navigating the ERP & CRM landscape can be daunting. With our expertise, we guide businesses through the selection process, ensuring that the chosen solutions aligns seamlessly with their objectives and financial plans.",
    points: [
      "A wrong ERP choice can derail your entire operation and cost you precious time and money.",
      "A generic system might overlook your unique needs, leading to inefficiencies and missed opportunities.",
    ],
  },
  {
    title: "We Develop ERP & CRM Systems For Your Unique Needs",
    body: "In a world where every business is unique, a one-size-fits-all solution doesn't cut it. Our team crafts industry-leading ERP & CRM systems, focusing on specific modules and integrations that cater to distinct industry requirements.",
    points: [],
  },
  {
    title: "We Ensure Smooth & On-Time Implementation Of ERP & CRM Solution",
    body: "Transitioning to a new ERP or CRM system is a monumental task. Our team oversees the deployment process from start to finish, ensuring that businesses experience a smooth and hassle-free transition.",
    points: ["A rocky implementation can disrupt operations, causing downtime and lost revenue."],
  },
];

const industries = [
  {
    name: "Manufacturing",
    heading: "Revolutionizing Traditional Operations with Smart Factory Solutions",
    body: "Leveraging advanced solutions for manufacturing sectors, we transform traditional operations into smart factories. Our approach ensures real-time insights into production cycles, enhances asset management, and paves the way for a sustainable, efficient manufacturing environment.",
    image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1581091226825-a6a2a5aee158.webp",
    features: ["Warehouse management", "Order processing and fulfillment", "Inventory tracking and forecasting", "Vendor relationship management", "Transportation and logistics planning", "Returns and warranty management", "Pricing and discount management", "Customer service and support tools"],
  },
  {
    name: "Real Estate",
    heading: "Empowering Real Estate Ventures with Digital Transformation",
    body: "Streamlining operations for real estate businesses by integrating property management tools, enhancing tenant relations, optimizing facility maintenance, and driving strategic investment decisions.",
    image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1560518883-ce09059eeffa.webp",
    features: ["Property portfolio management", "Lease management", "Facility and maintenance scheduling", "Tenant relationship management", "Investment analytics and insights", "Document and contract management", "Listing and advertisement management", "Financial reporting"],
  },
  {
    name: "Retail",
    heading: "Elevating Retail Experiences through Innovative Tech Integration",
    body: "Enhancing retail operations by integrating cutting-edge technology solutions, personalizing customer experiences, optimizing inventory management, and promoting strategic sales strategies.",
    image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1441986300917-64674bd600d8.webp",
    features: ["Inventory and stock management", "Point of sale integration", "Customer relationship management", "E-commerce and online sales optimization", "Sales analytics and insights", "Promotions and discount management", "Digital marketing and advertisement strategies", "Financial and sales reporting"],
  },
  {
    name: "Distribution",
    heading: "Optimizing Distribution Channels with Intelligent Systems",
    body: "Empowering distributors with solutions that optimize supply chain operations, enhance vendor relationships, manage inventory efficiently, and drive timely deliveries.",
    image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1586528116311-ad8dd3c8310d.webp",
    features: ["Warehouse management", "Order processing and fulfillment", "Inventory tracking and forecasting", "Vendor relationship management", "Transportation and logistics planning", "Returns and warranty management", "Pricing and discount management", "Customer service and support tools"],
  },
  {
    name: "Professional Services",
    heading: "Reimagining Service Excellence with Integrated Solutions",
    body: "Harnessing the power of ERP & CRM tailored for the Professional Services sector, we elevate service delivery and client experiences. Our solutions provide real-time insights into project progress, streamline resource management, and drive unparalleled service success.",
    image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1521737711867-e3b97375f902.webp",
    features: ["Client Relationship Management", "Project Lifecycle Tracking", "Resource Allocation & Management", "Billing & Invoice Management", "Performance Analytics", "Collaboration Tools", "Contract & Document Management", "Feedback & Service Improvement"],
  },
];

export default function ERPAndCRM() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="erp-and-crm"
          title="ERP and CRM"
          subtitle="Setting the stage for your exponential growth."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1460925895917-afdab827c52f.webp"
        />

        {/* How we help: evaluate, develop, implement */}
        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {guidance.map((item) => (
                <div key={item.title} className="p-8 rounded-2xl border t-border hover:shadow-lg transition-all flex flex-col">
                  <h3 className="text-lg font-bold t-heading leading-snug">{item.title}</h3>
                  <p className="mt-4 t-body leading-relaxed">{item.body}</p>
                  {item.points.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-sm t-label leading-relaxed">
                          <svg className="w-4 h-4 mt-0.5 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          </svg>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions */}
        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Industries</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">Industry Solutions</h2>
              <p className="mt-4 t-body leading-relaxed">Our custom ERP &amp; CRM solutions are designed to resonate with specific industry nuances, ensuring seamless integration, enhanced productivity, and a competitive edge for businesses.</p>
            </div>
            <div className="space-y-16">
              {industries.map((ind, i) => (
                <div key={ind.name} className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">{ind.name}</span>
                    <h3 className="mt-2 text-2xl font-bold t-heading leading-snug">{ind.heading}</h3>
                    <p className="mt-4 t-body leading-relaxed">{ind.body}</p>
                    <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ind.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm t-label">
                          <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <Image src={ind.image} alt={ind.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value proposition + local expertise */}
        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold t-heading">Delivering Unique Solutions, Tailored for You.</h2>
            <p className="mt-5 t-body leading-relaxed">In a rapidly evolving digital landscape, our approach is distinct. We prioritize your unique needs, combining expertise and innovation to craft solutions that truly resonate. Dive into a bespoke experience where your aspirations become reality.</p>
            <p className="mt-4 t-body leading-relaxed">Reach our transformation experts today — connect with our UAE-based certified consultants specializing in CRM implementation, ERP deployment, and supply chain optimization tailored to the GCC region. Our local experts understand UAE regulatory requirements and regional business practices.</p>
          </div>
        </section>

        <CTASection
          title="Start Your Digital Transformation Journey with Maxcient"
          subtitle="Embrace the future with Maxcient's Services and Products. We assure you enhanced collaboration and improved outcomes. Experience the change where technology meets business excellence."
        />
        <PageFAQ slug="erp-and-crm" />
      </main>
      <Footer />
    </>
  );
}
