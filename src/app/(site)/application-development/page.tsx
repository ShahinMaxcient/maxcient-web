import ServiceDetail from "@/components/ServiceDetail";

// Content mirrors www.maxcient.com/application-development.
export default function ApplicationDevelopment() {
  return (
    <ServiceDetail
      slug="application-development"
      title="Application Development"
      subtitle="Bespoke application solutions tailored to your unique business needs."
      heroImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/hero-application-development.webp"
      guidance={[
        {
          tag: "Develop",
          image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/ad-guide-develop.webp",
          title: "We Help You Develop Robust Applications",
          body: "In the dynamic domain of application development, determining the right blueprint is crucial. Our expertise assists businesses in outlining the perfect development strategy and tools, ensuring the applications built are both resilient and perfectly attuned to business goals.",
          points: [
            "Not formulating the correct development approach can jeopardize the application's functionality.",
            "Settling for a standard design might not encapsulate the unique attributes of your business.",
          ],
        },
        {
          tag: "Build",
          image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/ad-guide-build.webp",
          title: "We Build Custom Applications for Unique Needs",
          body: "The arena of application development is vast, and generic designs might not address the specialized requirements of every business. Our team meticulously constructs custom applications, focusing on specific functionalities and integrations that resonate with your industry and organizational needs.",
        },
        {
          tag: "Test",
          image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/ad-guide-test.webp",
          title: "We Test Your Applications for Optimal Performance",
          body: "The transition from application conception to deployment is multifaceted. We prioritize thorough testing and refinement processes, ensuring that every feature functions as intended and the final product stands out in the competitive market.",
          points: ["Releasing an application with overlooked flaws can compromise user satisfaction."],
        },
      ]}
      guidanceHeading="Custom applications, built and proven around your needs"
      guidanceIntro="We take your applications from idea to production — engineering robust foundations, building around your unique requirements, and testing rigorously so they perform under real-world load."
      processSteps={[
        { title: "Discover", body: "We work through your goals, users and requirements, then define the architecture and scope of the build." },
        { title: "Build", body: "We engineer the application to your needs — robust, scalable foundations and the features that matter most." },
        { title: "Test", body: "We test rigorously across functionality, performance and security so the application is ready for real-world load." },
        { title: "Launch & Support", body: "We deploy, hand over and stay on to support, monitor and evolve the application as you grow." },
      ]}
      useIndustryTabs
      showGetInTouch
      processHeading="How We Deliver Application Development Services"
      industriesIntro="From factory floors to storefronts, we craft applications tuned to the way each industry actually works — resilient, integrated, and built around your goals."
      industries={[
        {
          name: "Manufacturing",
          heading: "Empowering Manufacturing with Advanced Applications",
          body: "Unlock the potential of digitized manufacturing by integrating bespoke applications tailored to industry needs. Our development solutions allow manufacturers to manage operations efficiently, ensuring real-time visibility and streamlined production workflows.",
          features: ["Customized production management systems", "Quality control & defect tracking apps", "Digital supply chain & inventory platforms", "Equipment maintenance applications", "Real-time analytics dashboards", "Workforce management apps", "Procurement and sourcing platforms", "Integrated logistics & transportation apps"],
        },
        {
          name: "Real Estate",
          heading: "Enhancing Real Estate Dynamics with Custom Applications",
          body: "Infuse tech-driven innovation into real estate processes, enhancing client experiences and operational efficiency. Our bespoke applications cater to every facet of the industry, ensuring seamless transactions and improved property management.",
          features: ["Comprehensive property listing platforms", "Augmented reality property viewing apps", "Digital tenant & lease management systems", "Real-time property market analysis tools", "Transactional and document management apps", "Maintenance scheduling platforms", "CRM systems tailored for real estate", "Financial analytics & reporting apps"],
        },
        {
          name: "Retail",
          heading: "Reimagining Retail with Innovative Applications",
          body: "Elevate the retail experience with applications designed to engage customers, manage inventory, and optimize sales strategies. Our solutions harness technology to keep retailers at the forefront of an ever-evolving marketplace.",
          features: ["In-depth customer analytics platforms", "Inventory management & forecasting apps", "Seamless digital checkout solutions", "AI-driven marketing & promotion tools", "Supply chain management platforms", "Augmented reality product trial apps", "Efficient returns & warranty systems", "Sentiment analysis & customer feedback apps"],
        },
        {
          name: "Distribution",
          heading: "Accelerating Distribution with Strategic Applications",
          body: "Fuel the distribution sector with applications that enhance network efficiency, ensure timely deliveries, and streamline supply chain processes. Our development prowess ensures that distribution channels remain agile and responsive to market demands.",
          features: ["Advanced warehouse & inventory management systems", "Dynamic route optimization & tracking platforms", "Efficient load planning & fleet management apps", "Demand forecasting & analytics tools", "Integrated vendor & partner collaboration platforms", "Automated documentation & reporting systems", "AI-powered customer support chatbots", "Compliance & regulatory management apps"],
        },
        {
          name: "Professional Services",
          heading: "Transforming Professional Services through Dynamic Application Development",
          body: "Revolutionize the service industry with tailored applications that enhance client engagements, streamline project management, and optimize service delivery strategies. Our tech solutions are crafted to place service providers at the pinnacle of a competitive landscape.",
          features: ["Client Relationship Management Platforms", "Project Lifecycle Tracking & Reporting Apps", "Resource Allocation & Scheduling Tools", "Automated Billing & Invoice Systems", "Performance Analysis & Forecasting Platforms", "Collaborative Workspace Solutions", "Contract & Document Management Tools", "Feedback Collection & Service Improvement Apps"],
        },
      ]}
      techPlatform={{
        name: "Microsoft Dynamics 365",
        intro: "As a certified Microsoft Dynamics 365 partner, we pride ourselves on harnessing the immense potential of this comprehensive suite to craft tailored applications, optimize business processes, and drive digital innovation. Dynamics 365 combines CRM and ERP capabilities, offering a unified approach to transform any organization's application landscape.",
        features: ["Modular application development approach", "CRM excellence with Sales, Service, and Marketing modules", "Comprehensive ERP with Finance and Operations", "Efficient field management with Field Service", "AI-driven analytics for informed decisions", "Integrated solutions spanning key business areas", "Cohesive data model for application unity", "Extensive customization and third-party integrations", "Role-based data governance and security", "Rapid, user-friendly application deployment"],
        deployment: ["Cloud Service (Dynamics 365 Service)", "On-Premises Installation", "Mobile (Dynamics 365 Mobile apps)"],
        suitableFor: "Enterprises and mid-sized businesses looking to pioneer digital transformation, harnessing the power of customized applications that focus on efficiency, integration, and innovation.",
      }}
      valueTitle="Bridging Business Needs with Technical Excellence"
      valueBody="We understand the intricate balance between business demands and technical capabilities, ensuring that every application is a testament to this harmony."
      ctaTitle="Delivering Custom Solutions for Every Niche"
      ctaSubtitle="Every industry has unique challenges. Our custom solutions cater to these nuances, ensuring your application is not just another software but a strategic asset."
    />
  );
}
