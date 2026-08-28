import TechnologyDetail from "@/components/TechnologyDetail";


import { pageMetadata } from "@/lib/seo";

// Unique title/description per page; Admin → Pages can override both.
export const generateMetadata = () =>
  pageMetadata({
    slug: "microsoft-power-platform",
    title: "Microsoft Power Platform Solutions",
    description:
      "Power Apps, Power Automate and Power BI — low-code apps, automated workflows and analytics built on your Dynamics 365 data.",
  image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1519389950473-47ba0277781c.webp",
  });

// Content mirrors www.maxcient.com/microsoft-power-platform.
export default function MicrosoftPowerPlatform() {
  return (
    <TechnologyDetail
      slug="microsoft-power-platform"
      title="Microsoft Power Platform"
      subtitle="Empowering Businesses Through Agile Solutions."
      description="We help your teams build the apps, automations and dashboards they need without waiting on a development backlog. Using Power Apps, Power Automate and Power BI on your governed Dataverse data, Maxcient turns spreadsheets and manual handoffs into working software — with the guardrails that keep a growing low-code estate maintainable."
      heroImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1519389950473-47ba0277781c.webp"
      whatIsHeading="What is Microsoft Power Platform?"
      whatIsBody="The Microsoft Power Platform is a comprehensive suite of business application tools designed to empower organizations with customized app development, data analytics, and process automation. Comprising Power BI for data visualization, Power Apps for application development, Power Automate for workflow automation, and Power Virtual Agents for AI chatbots, it allows businesses to create tailored solutions without the need for extensive coding. Seamlessly integrating with other Microsoft solutions, the Power Platform transforms data into actionable insights, fostering innovation and enhancing operational efficiency."
      whatIsImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/pp-whatis.webp"
      callouts={[
        { title: "Seamless Integration & Customization", body: "The Power Platform effortlessly integrates with Microsoft 365, Dynamics 365, and Azure, allowing businesses to extend their applications and create custom solutions tailored to their unique requirements." },
        { title: "Empower Citizen Developers", body: "With its low-code and no-code capabilities, Power Platform democratizes application development. Non-technical users can create apps, automate workflows, and generate business insights without deep coding expertise." },
        { title: "Accelerated Digital Transformation", body: "By leveraging the Power Platform's analytics, automation, and application development capabilities, organizations can fast-track their digital transformation journey, fostering innovation and enhancing operational efficiency." },
      ]}
      servicesHeading="Microsoft Power Platform Services"
      services={[
        { title: "Custom App Development", body: "Harness the full potential of Power Platform by building tailored applications that cater specifically to your business needs, ensuring operational efficiency and enhanced user engagement.", bullets: ["Personalized solutions for unique challenges.", "Boost ROI with efficient, custom tools.", "Drive engagement, optimize business processes."] },
        { title: "Workflow Automation with Power Automate", body: "Streamline business processes by automating repetitive tasks, improving productivity, and ensuring seamless data flow across your applications with Power Automate.", bullets: ["Free up time, focus on core tasks.", "Enhance accuracy, reduce manual errors.", "Connect apps, optimize data usage."] },
        { title: "Business Analytics with Power BI", body: "Unlock actionable insights from your data by leveraging Power BI's robust analytics capabilities, offering visually appealing dashboards and comprehensive reporting for informed decision-making.", bullets: ["Turn data into strategic assets.", "Enhance clarity with visual representation.", "Stay ahead with data-driven decisions."] },
      ]}
      serviceImages={[
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/pp-svc-1.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/pp-svc-2.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/pp-svc-3.webp",
      ]}
      modulesHeading="Power Platform Components"
      modulesIntro="Discover our prowess in optimizing Power Platform's diverse tools. We merge data analytics, app development, and automation, enabling businesses to redefine operational excellence."
      modules={[
        { name: "Power Apps", body: "A suite of apps, services, connectors, and a data platform that provides an environment to build custom apps tailored to your business needs without extensive coding." },
        { name: "Power Automate", body: "An automation tool that enables users to create workflows between applications and services, streamlining repetitive tasks and enhancing data synchronicity across platforms." },
        { name: "Power BI", body: "A business analytics tool that visualizes data and shares insights across organizations, or embeds them in an app or website, offering comprehensive dashboards and interactive reports." },
        { name: "Power Virtual Agents", body: "Easily build chatbots to engage with customers and employees, streamlining inquiries and operations without the need for coding or AI expertise." },
        { name: "Power Pages", body: "Create websites that allow external users to interact with the data stored in the Common Data Service, extending your reach and offering valuable user experiences." },
        { name: "AI Builder", body: "A turnkey solution within Power Platform that empowers users to leverage AI capabilities for enhancing applications with minimal expertise." },
        { name: "Dataverse", body: "A cloud-based tool that allows users to securely store and manage data used by business applications, ensuring consistency, interoperability, and reliability." },
        { name: "Connectors", body: "Facilitate integration by connecting with a wide array of external services and platforms, ensuring seamless data flow and improving the overall functionality of applications." },
      ]}
      industryIntro="Leveraging Microsoft Power Platform, we've transformed industries from manufacturing to retail. Our deep-rooted expertise understands sector-specific challenges, offering bespoke solutions that drive efficiency and innovation."
      industryCallouts={[
        { name: "Manufacturing", body: "Power Platform boosts operations, production, and inventory. Resulting in transparent supply chains and proactive equipment maintenance for manufacturers." },
        { name: "Real Estate", body: "Power Platform offers advanced property management and customer engagement. Accelerated decisions, seamless tenant interactions, and robust property analytics." },
        { name: "Retail", body: "Power Platform supports connected retail from supply to customer. Amplifying real-time inventory insights and innovative strategies for dynamic retail." },
        { name: "Distribution", body: "Power Platform refines supply logistics and inventory oversight. Improving logistical efficiency, relationship management, and precise inventory control." },
        { name: "Professional Services", body: "Power Platform enhances project management and client rapport. Streamlined processes, elevated client engagements, and robust project oversight deliver excellence." },
      ]}
      ctaTitle="Do More with the Power Platform"
      ctaSubtitle="Talk to our experts about low-code apps, workflow automation, and Power BI analytics built around your business."
    />
  );
}
