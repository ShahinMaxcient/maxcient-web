import TechnologyDetail from "@/components/TechnologyDetail";

// Content mirrors www.maxcient.com/microsoft-azure.
export default function MicrosoftAzure() {
  return (
    <TechnologyDetail
      slug="microsoft-azure"
      title="Microsoft Azure"
      subtitle="Cloud Computing Redefined."
      description="We design, migrate and run the cloud foundation your business depends on — compute, storage, networking, identity and security, sized to what you actually need. Maxcient handles the move from on-premises, sets up the governance and cost controls, and keeps your Azure estate secure and compliant for UAE and GCC operations."
      heroImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1451187580459-43490279c0fa.webp"
      whatIsHeading="What is Microsoft Azure?"
      whatIsBody="Microsoft Azure is a comprehensive cloud computing platform by Microsoft, offering a plethora of services ranging from infrastructure-as-a-service (IaaS), platform-as-a-service (PaaS), to software-as-a-service (SaaS). With Azure, businesses can build, deploy, and manage applications through Microsoft's vast global network of data centers, ensuring scalability, security, and continuous innovation."
      whatIsImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/azure-whatis.webp"
      callouts={[
        { title: "Unparalleled Scalability", body: "Azure provides instant scalability, adapting to your business's growing demands, ensuring optimal performance and cost-effectiveness." },
        { title: "Advanced Security Measures", body: "Benefit from Microsoft's multi-layered security features, protecting your data and applications from potential threats and ensuring compliance with industry regulations." },
        { title: "Integrated Development Environment", body: "With tools like Visual Studio and Azure DevOps, Azure offers a cohesive development environment, accelerating application deployment and promoting innovation." },
      ]}
      servicesHeading="Microsoft Azure Services"
      services={[
        { title: "Azure Cloud Migration", body: "Smoothly transition your applications and data to Azure's cloud environment, ensuring minimal business disruption and optimal performance.", bullets: ["Seamless migration, zero data loss.", "Enhanced scalability and cost-efficiency.", "Reliable, high-performance cloud hosting."] },
        { title: "Azure DevOps Implementation", body: "Streamline your development process by integrating Azure DevOps, enhancing collaboration, continuous integration, and deployment efficiency.", bullets: ["Foster team collaboration and agility.", "Faster releases, higher code quality.", "Optimize every step of your pipeline."] },
        { title: "Azure Security & Compliance Consulting", body: "Safeguard your Azure deployments with our expert-led security assessments and ensure adherence to industry compliance standards.", bullets: ["Minimize downtime, maximize productivity.", "Rely on experts for consistent performance.", "Stay updated, stay competitive."] },
      ]}
      serviceImages={[
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/azure-svc-1.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/azure-svc-2.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/azure-svc-3.webp",
      ]}
      modulesHeading="Microsoft Azure Products & Services"
      modulesIntro="Harness the versatility of Azure's diverse product suite."
      modules={[
        { name: "Virtual Machines", body: "Deploy and manage virtualized applications seamlessly, ensuring scalability and high availability for your business-critical applications." },
        { name: "Azure Kubernetes Service (AKS)", body: "Orchestrate containerized applications with efficiency, using Kubernetes management, automated scaling, and integrated developer tools." },
        { name: "Azure Blob Storage", body: "Store massive amounts of unstructured data with high durability and availability, tailored for cloud-native and web-based applications." },
        { name: "Azure Active Directory (AAD)", body: "Enhance identity and access management, providing a secure foundation for your business through single sign-on and multi-factor authentication." },
        { name: "Azure Cosmos DB", body: "A globally distributed database service that enables multi-model and multi-region scalability, ensuring low-latency data access." },
        { name: "Azure Functions", body: "Build event-driven solutions with serverless compute, optimizing resources, and improving scalability without managing the infrastructure." },
        { name: "Azure Logic Apps", body: "Automate workflows and integrate services, apps, and data across cloud and on-premises environments." },
        { name: "Azure DevTest Labs", body: "Create, test, and replicate environments, ensuring faster development and deployment while minimizing waste and costs." },
      ]}
      industryIntro="Leveraging Azure to drive digital transformation across sectors."
      industryCallouts={[
        { name: "Manufacturing", body: "Azure accelerates smart manufacturing, optimizing operations through IoT integrations, AI-driven insights, and real-time data analytics, ensuring seamless production workflows." },
        { name: "Real Estate", body: "Azure revolutionizes property management and transactions, offering cloud solutions for virtual tours, predictive analytics, and streamlined property portfolio management." },
        { name: "Retail", body: "With Azure, retailers achieve omnichannel excellence, utilizing AI for personalized shopping experiences, robust e-commerce platforms, and efficient supply chain management." },
        { name: "Distribution", body: "Azure streamlines distribution chains, ensuring real-time inventory tracking, optimized logistics, and data-driven demand forecasting, maximizing operational efficiency." },
        { name: "Professional Services", body: "Azure empowers service firms with collaborative tools, secure data storage, and AI-enhanced analytics, ensuring top-notch service delivery and client satisfaction." },
      ]}
      ctaTitle="Build on Azure with Confidence"
      ctaSubtitle="Talk to our cloud experts about migration, DevOps, and security on Microsoft Azure — tailored to your workloads."
    />
  );
}
