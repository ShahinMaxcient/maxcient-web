import IndustryDetail from "@/components/IndustryDetail";

// Content mirrors www.maxcient.com/real-estate.
export default function RealEstate() {
  return (
    <IndustryDetail
      slug="real-estate"
      title="Real Estate"
      subtitle="The real estate sector is undergoing significant transformation, propelled by societal shifts, technological innovations, and evolving preferences of property buyers. From sustainable construction to the adoption of smart home technologies, real estate developers are innovating to meet contemporary demands. At Maxcient, we're primed to assist businesses in navigating these revolutionary trends."
      heroImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/hero-real-estate.webp"
      trends={[
        { title: "Proptech-enabled Customer Journey", body: "Real estate companies are utilizing property technology (Proptech) to streamline the buying and selling process. From secure transactions to platforms for efficient property listing and management, these tools are revolutionizing the customer journey." },
        { title: "Market Analytics for Targeted Sales", body: "Leveraging big data and advanced analytics, real estate firms can now predict market trends, identify lucrative investment opportunities, and tailor sales strategies to meet the evolving demands of the market." },
        { title: "Remote Transaction Facilitation", body: "As remote work becomes commonplace, real estate sellers are enabling remote transactions, offering virtual closings and online paperwork processing to accommodate the new wave of digital-first clients." },
      ]}
      solutionImages={[
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/real-estate-sol-1.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/real-estate-sol-2.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/real-estate-sol-3.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/real-estate-sol-4.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/real-estate-sol-5.webp",
      ]}
      solutionsHeading="Services For Real Estate Industry"
      solutionsIntro="From conceptualization to final construction, our bespoke services optimize real estate projects, infusing innovation, and enhancing operational efficiency in the property market."
      solutions={[
        {
          heading: "Empowering Real Estate Ventures with Digital Transformation",
          body: "Streamlining operations for real estate businesses by integrating property management tools, enhancing tenant relations, optimizing facility maintenance, and driving strategic investment decisions.",
          features: ["Property portfolio management", "Lease management", "Facility and maintenance scheduling", "Tenant relationship management", "Investment analytics and insights", "Document and contract management", "Listing and advertisement management", "Financial reporting"],
        },
        {
          heading: "Driving Informed Property Decisions with Data",
          body: "Elevate your real estate ventures with data-driven insights. Our solutions offer a comprehensive view of market trends, property valuations, and customer preferences, ensuring every investment is a calculated and informed one.",
          features: ["Property valuation analytics", "Market trend predictions", "Buyer behavior analysis", "Investment risk assessment", "Property turnover rates", "Location and demographic analysis", "Competitive benchmarking", "Lease management analytics"],
        },
        {
          heading: "Enhancing Real Estate Operations through Automation",
          body: "Revolutionize property management, client interactions, and transactional processes in the real estate sector with intelligent automation. Automate manual tasks, enhance property analytics, and ensure seamless tenant interactions.",
          features: ["Automated property listings", "Virtual property tours", "Tenant & lease management", "Predictive property market analytics", "Transaction automation & documentation", "Maintenance scheduling & coordination", "Client relationship management", "Financial reporting & analysis"],
        },
        {
          heading: "Enhancing Real Estate Dynamics with Custom Applications",
          body: "Infuse tech-driven innovation into real estate processes, enhancing client experiences and operational efficiency. Our bespoke applications cater to every facet of the industry, ensuring seamless transactions and improved property management.",
          features: ["Comprehensive property listing platforms", "Augmented reality property viewing apps", "Digital tenant & lease management systems", "Real-time property market analysis tools", "Transactional and document management apps", "Maintenance scheduling platforms", "CRM systems tailored for real estate", "Financial analytics & reporting apps"],
        },
        {
          heading: "Revolutionizing Real Estate with Innovative Applications",
          body: "Redefine the real estate landscape with applications that simplify property management, optimize client interactions, and automate transactional processes.",
          features: ["Comprehensive property listing & management tools", "Immersive virtual property tour platforms", "Efficient tenant & lease management systems", "Data-driven property market analytics tools", "Transaction automation & documentation systems", "Maintenance scheduling & coordination platforms", "Client relationship management tools", "Financial reporting & analysis platforms"],
        },
      ]}
      techCards={[
        { name: "Microsoft Dynamics 365", body: "In the real estate sector, Microsoft Dynamics 365 ensures efficient property management, streamlined sales processes, and enhanced buyer relationships. Our expertise in deploying Dynamics 365 for real estate businesses has led to improved operational efficiency, real-time inventory management, and enriched customer experiences." },
        { name: "Microsoft Power Platform", body: "In the realm of real estate, Microsoft Power Platform offers agility in operations, ensuring seamless property management and enhanced buyer interactions. With our deep expertise, businesses benefit from optimized sales funnels, real-time analytics, and interactive property listings." },
        { name: "Microsoft Azure", body: "In real estate, Microsoft Azure offers robust cloud solutions, powering PropTech innovations, AI-driven insights, and real-time data analytics. Our extensive experience with Azure ensures seamless property management, enhanced security, and data-driven decision-making for real estate businesses." },
        { name: "Azure AI", body: "In the real estate sector, Azure AI provides a catalogue of models — Azure OpenAI, vision, language and document intelligence — as managed cloud services. Plugged into Dynamics 365 and the Power Platform, your CRM and ERP gain property and lead copilots, market and valuation forecasting, automated contract and document processing, and sentiment insight from client interactions." },
        { name: "Microsoft Dataverse", body: "In the real estate sector, Microsoft Dataverse unifies your Dynamics 365 CRM and ERP data — properties, leases, tenants and transactions — in one secure, governed model. With enforced security and business rules, Power Apps, Power Automate and analytics run on a single source of truth across sales, leasing and facilities." },
        { name: "IoT (Internet of Things)", body: "For the real estate industry, IoT brings transformative improvements in smart home systems, security, and energy management. Our extensive experience in implementing IoT solutions ensures enhanced living experiences, real-time monitoring, and efficient property management." },
      ]}
      valueTitle="Delivering Unique Solutions, Tailored for You."
      valueBody="In a rapidly evolving digital landscape, our approach is distinct. We prioritize your unique needs, combining expertise and innovation to craft solutions that truly resonate. Dive into a bespoke experience where your aspirations become reality."
      ctaTitle="Transform Your Real Estate Operations"
      ctaSubtitle="Connect with our real estate technology experts to explore PropTech, analytics, and smart solutions built for property businesses."
    />
  );
}
