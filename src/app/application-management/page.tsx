import ServiceDetail from "@/components/ServiceDetail";

// Content mirrors www.maxcient.com/application-management.
export default function ApplicationManagement() {
  return (
    <ServiceDetail
      slug="application-management"
      title="Application Management"
      subtitle="Ensuring Optimal Performance & Continuous Improvement."
      heroImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1558494949-ef010cbdcc31.webp"
      guidance={[
        {
          title: "We Optimize Your Application Landscape",
          body: "In the dynamic domain of application management, the Annual Maintenance Service (AMS) stands out as a beacon of efficiency. We keep your application landscape optimized, secure, and aligned with your evolving business needs.",
          points: [
            "Solely relying on traditional maintenance can lead to escalating costs and inefficiencies.",
            "A standard maintenance path overlooks the unique needs of your application landscape.",
          ],
        },
        {
          title: "We Create Custom AMS Strategies for Sustained Excellence",
          body: "Standard maintenance rarely fits every system. We craft bespoke AMS strategies and ticketing workflows around the specific needs of your applications and industry requirements.",
        },
        {
          title: "We Harmonize Your Applications for Consistent Performance",
          body: "We integrate and harmonize your applications for consistent updates, reduced downtimes, and regular training opportunities — so performance stays reliable across the estate.",
          points: ["A segmented application maintenance approach can result in disjointed operations."],
        },
      ]}
      industriesIntro="We keep applications healthy across every sector — proactive monitoring, updates, and support tuned to how each industry runs."
      industries={[
        {
          name: "Manufacturing",
          heading: "Sustaining Smart Manufacturing Operations",
          body: "Keep production systems running at peak performance with proactive maintenance, monitoring, and support tailored to modern manufacturing.",
          features: ["Tailored production cycle management tools", "Advanced supply chain & inventory management systems", "Real-time equipment monitoring & predictive maintenance apps", "Quality assurance and defect detection platforms", "Raw material sourcing and procurement tools", "Workforce task optimization platforms", "Logistics and transportation coordination systems", "Regulatory & compliance management platforms"],
        },
        {
          name: "Real Estate",
          heading: "Keeping Real Estate Platforms Performing",
          body: "Maintain and optimize the systems that run your property portfolio, from listings to tenant management.",
          features: ["Comprehensive property listing & management tools", "Immersive virtual property tour platforms", "Efficient tenant & lease management systems", "Data-driven property market analytics tools", "Transaction automation & documentation systems", "Maintenance scheduling & coordination platforms", "Client relationship management tools", "Financial reporting & analysis platforms"],
        },
        {
          name: "Retail",
          heading: "Reliable Retail Systems, Always On",
          body: "Ensure your retail applications stay fast, secure, and available across every channel and season.",
          features: ["Insightful customer behavior analytics platforms", "Dynamic inventory management & forecasting systems", "Seamless checkout & transaction processing tools", "AI-driven marketing & promotions management apps", "Supply chain optimization platforms", "Virtual fitting and product trial systems", "Returns & warranty management tools", "Feedback and review analysis platforms"],
        },
        {
          name: "Distribution",
          heading: "Uninterrupted Distribution Operations",
          body: "Keep distribution and logistics platforms optimized for uptime, accuracy, and timely delivery.",
          features: ["Advanced warehouse & inventory management systems", "Dynamic route optimization & tracking platforms", "Efficient load planning & fleet management apps", "Demand forecasting & analytics tools", "Integrated vendor & partner collaboration platforms", "Automated documentation & reporting systems", "AI-powered customer support chatbots", "Compliance & regulatory management apps"],
        },
        {
          name: "Professional Services",
          heading: "Dependable Systems for Service Delivery",
          body: "Maintain the platforms that power projects, clients, and billing so your teams can focus on delivery.",
          features: ["Advanced project tracking and management platforms", "Dynamic client relationship management systems", "Seamless billing & invoice processing tools", "AI-driven resource allocation & scheduling apps", "Service delivery optimization platforms", "Virtual collaboration and communication systems", "Contract & document management tools", "Feedback and performance analysis platforms"],
        },
      ]}
      techPlatform={{
        name: "Microsoft Dynamics 365",
        intro: "We provide end-to-end management for your Microsoft Dynamics 365 estate — proactive monitoring, maintenance, and optimization across CRM and ERP so your platform stays secure, current, and performing.",
        features: ["End-to-end application management", "Proactive monitoring of CRM modules (Sales, Service, Marketing)", "Streamlined ERP management for Finance and Operations", "Effective Field Service handling", "AI-enhanced analytics for performance monitoring", "Integrated solutions management across business domains", "Unified data model for efficient data flow", "Customization and integration maintenance", "Advanced data governance and security practices", "Seamless updates and deployment handling"],
        deployment: ["Cloud Service (Dynamics 365 Service)", "On-Premises Support & Maintenance", "Mobile (Dynamics 365 Mobile apps)"],
        suitableFor: "Enterprises and mid-sized businesses aiming for optimal performance, security, and scalability.",
      }}
      valueTitle="Facilitating Robust Digital Maintenance"
      valueBody="Transition to a world where application glitches are a thing of the past with our top-tier Application Management services."
      ctaTitle="Crafting Custom Management Solutions"
      ctaSubtitle="We tailor our approach to your specific application challenges — blending deep expertise with innovation to keep every system performing at its best."
    />
  );
}
