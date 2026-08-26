import ServiceDetail from "@/components/ServiceDetail";

// Content mirrors www.maxcient.com/data-analytics.
export default function DataAnalytics() {
  return (
    <ServiceDetail
      slug="data-analytics"
      title="Data Analytics"
      subtitle="Transforming Data into Business Intelligence."
      description="We turn scattered operational data into clear, decision-ready insight with Microsoft Power BI and the Azure data stack. Maxcient builds the dashboards, models and predictive analytics that surface what matters — giving leaders across the UAE and GCC a live, trusted view of performance to act on with confidence."
      heroImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/hero-data-analytics.webp"
      guidance={[
        {
          tag: "Insights",
          image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/da-guide-insights.webp",
          title: "We Help You Unveil Insights From Your Data",
          body: "In the realm of big data, extracting meaningful information is crucial. Our team of analysts employs state-of-the-art tools and techniques to turn raw data into actionable insights that drive business growth.",
          points: [
            "Not leveraging your data can keep you in the dark, missing out on game-changing opportunities.",
            "A one-size-fits-all solution may not capture the nuances of your industry or business model, leading to misguided strategies.",
          ],
        },
        {
          tag: "Develop",
          image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/da-guide-develop.webp",
          title: "We Develop Bespoke Data Analytics Solutions",
          body: "Today's dynamic business environment requires tailored data solutions. We develop custom analytics platforms that cater to your specific needs, ensuring you can sift through the noise and get to the information that matters most.",
        },
        {
          tag: "Visualize",
          image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/da-guide-visualize.webp",
          title: "We Help Transform Numbers into Visuals",
          body: "Understanding data is easier when it's visual. Our team specializes in creating intuitive data visualization tools that present complex datasets in a clear, comprehensible manner.",
          points: ["A picture is worth a thousand words, and missing out on visual insights could mean overlooking potential business goldmines."],
        },
      ]}
      guidanceHeading="From raw data to decisions your teams act on"
      guidanceIntro="We stay with you across the full analytics journey — surfacing the insights hidden in your data, building the models around your business, and turning the numbers into visuals anyone can read."
      processHeading="How We Deliver Data Analytics Solutions"
      processSteps={[
        { title: "Assess", body: "We map your data sources, goals and KPIs to understand exactly what decisions the data needs to drive." },
        { title: "Model & Build", body: "We engineer the pipelines and data models, cleaning and structuring your data into one reliable source of truth." },
        { title: "Visualize", body: "We turn the numbers into intuitive Power BI dashboards and reports your teams can read at a glance." },
        { title: "Optimize & Support", body: "We monitor adoption, refine the models and scale the analytics as your data and business grow." },
      ]}
      useIndustryTabs
      showGetInTouch
      industriesIntro="Our data analytics solutions decode the signals unique to every sector — turning raw information into decisions that compound into growth."
      industries={[
        {
          name: "Manufacturing",
          heading: "Optimizing Production Through Advanced Data Analysis",
          body: "Harness the power of data to refine manufacturing processes. Our data analytics services provide in-depth insights into production efficiencies, predictive maintenance, and real-time monitoring to drive optimal output and reduce wastage.",
          features: ["Production cycle analytics", "Predictive equipment maintenance", "Supply chain optimization", "Quality assurance analytics", "Inventory forecasting", "Real-time monitoring tools", "Waste reduction analytics", "Process bottleneck identification"],
        },
        {
          name: "Real Estate",
          heading: "Driving Informed Property Decisions with Data",
          body: "Elevate your real estate ventures with data-driven insights. Our solutions offer a comprehensive view of market trends, property valuations, and customer preferences, ensuring every investment is a calculated and informed one.",
          features: ["Property valuation analytics", "Market trend predictions", "Buyer behavior analysis", "Investment risk assessment", "Property turnover rates", "Location and demographic analysis", "Competitive benchmarking", "Lease management analytics"],
        },
        {
          name: "Retail",
          heading: "Refining the Shopping Experience through Data Insights",
          body: "Transform your retail business by understanding the nuances of consumer behavior. We provide analytics that delve into purchase histories, seasonal trends, and customer feedback, ensuring personalized shopping experiences and maximized sales.",
          features: ["Purchase pattern analysis", "Seasonal sales forecasting", "Inventory turnover analytics", "Customer loyalty insights", "Product placement optimization", "Pricing and discount analytics", "Supply chain analytics", "Customer feedback analysis"],
        },
        {
          name: "Distribution",
          heading: "Streamlining Distribution with Predictive Analytics",
          body: "Efficiency is paramount in distribution. Our services employ data analytics to optimize route planning, forecast demand, and manage inventory, ensuring timely deliveries and maximized profit margins.",
          features: ["Route optimization analytics", "Demand forecasting", "Inventory distribution analysis", "Supplier performance analytics", "Freight and logistics insights", "Real-time tracking tools", "Customer demand patterns", "Return and warranty analytics"],
        },
        {
          name: "Professional Services",
          heading: "Transforming Decision-Making with Data-Driven Insights",
          body: "Empowering the Professional Services sector with cutting-edge Data Analytics Services. Our solutions decipher complex data, uncovering actionable insights to improve service delivery, enhance client relationships, and optimize operational efficiency.",
          features: ["Advanced Data Visualization", "Client Behavior Analysis", "Service Efficiency Metrics", "Real-time Reporting Dashboards", "Predictive Analytics for Project Outcomes", "Resource Utilization Analytics", "Feedback Analysis & Improvement Metrics", "Financial Performance Analytics"],
        },
      ]}
      techPlatform={{
        name: "Microsoft Power BI",
        intro: "As an authorized Microsoft Power BI partner, we are adept at harnessing the full potential of this analytics service to transform your raw data into meaningful insights. Power BI integrates with various sources, providing interactive visualizations, and business intelligence capabilities with an intuitive interface suitable for end-users.",
        features: ["Interactive dashboards and reports", "Data modeling and structuring", "Real-time analytics and visualizations", "Seamless integration with various data sources", "Custom visualization tools", "Advanced AI-driven insights", "Collaborative workspaces", "Embedded analytics for apps and websites", "Automated machine learning capabilities", "Dataflow storage and management"],
        deployment: ["Desktop (Power BI Desktop)", "Cloud Service (Power BI Service)", "Mobile (Power BI Mobile apps)"],
        suitableFor: "Businesses of all sizes looking to make data-driven decisions through visual analytics and advanced reporting tools.",
      }}
      valueTitle="Tailored Insights, Tangible Growth."
      valueBody="In the vast sea of data, we find the pearls of insights tailored to your business. Our team's expertise ensures your data becomes a strategic partner in your growth journey."
      ctaTitle="Navigating the Data Landscape, Crafting Business Excellence."
      ctaSubtitle="Amidst the vast expanse of information, we discern the critical data points that align with your business vision. Our analytical acumen transforms this data into impactful strategies, propelling your journey towards market leadership."
    />
  );
}
