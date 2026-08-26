import TechnologyDetail from "@/components/TechnologyDetail";

// Content mirrors www.maxcient.com/iot-internet-of-things.
export default function IoT() {
  return (
    <TechnologyDetail
      slug="iot-internet-of-things"
      title="IoT (Internet of Things)"
      subtitle="Connecting Devices, Transforming Lives."
      description="We connect the equipment, vehicles and facilities you already own to the systems that run your business. Maxcient builds the sensing, ingestion and analytics layer on Azure IoT, then wires the signal into Dynamics 365 — so a rising temperature or a stalled line becomes a work order, not a phone call after the fact."
      heroImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1518770660439-4636190af475.webp"
      whatIsHeading="What is IoT?"
      whatIsBody="IoT, or Internet of Things, refers to the interconnected nature of devices and systems that communicate with each other over the internet. Devices, ranging from everyday household items to sophisticated industrial instruments, are embedded with sensors and software, enabling them to collect and exchange data. This integration results in improved efficiency, accuracy, and economic benefit, while providing a platform for innovative applications and services."
      whatIsImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/iot-whatis.webp"
      callouts={[
        { title: "Enhanced Efficiency", body: "IoT automates tasks and processes, leading to significant time and cost savings. Intelligent devices can optimize resource use and reduce wastage." },
        { title: "Real-time Data Access", body: "IoT devices provide real-time data insights, facilitating timely decision-making and proactive interventions, elevating the user experience." },
        { title: "Innovative Opportunities", body: "The vastness of IoT opens doors for novel applications and business models, granting companies a competitive edge in the ever-evolving market landscape." },
      ]}
      servicesHeading="IoT Services"
      services={[
        { title: "IoT Consultation", body: "Our experts assess your business needs, recommending tailored IoT solutions that align with your goals, ensuring optimal performance.", bullets: ["Make informed decisions with expert guidance.", "Achieve faster ROI with strategic implementation.", "Future-proof your business with IoT."] },
        { title: "Device Integration & Management", body: "We seamlessly integrate IoT devices into your existing infrastructure and offer comprehensive device management, maintaining a smooth operation.", bullets: ["Simplify complex integration processes.", "Enjoy uninterrupted business operations.", "Maximize device efficiency and lifespan."] },
        { title: "Data Analytics & Insight Generation", body: "Harness the power of IoT data with our advanced analytics services. We translate raw data into actionable insights for informed decision-making.", bullets: ["Turn data into your competitive advantage.", "Drive innovations with data-backed insights.", "Optimize operations with real-time analytics."] },
      ]}
      serviceImages={[
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/iot-svc-1.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/iot-svc-2.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/iot-svc-3.webp",
      ]}
      modulesHeading="IoT Products & Solutions"
      modulesIntro="From sensors and wearables to industrial and fleet systems, we build connected solutions tailored to your environment."
      modules={[
        { name: "Sensors & Monitoring Systems", body: "Capture real-time data on various parameters, enabling proactive decision-making and operational efficiency in diverse settings." },
        { name: "Wearable Devices", body: "Wearable devices designed to enhance user experience, track health metrics, or provide real-time notifications and insights." },
        { name: "Smart Home Solutions", body: "Transform traditional homes into smart homes, enhancing comfort, energy efficiency, and security through automated controls." },
        { name: "Industrial IoT", body: "Optimize manufacturing and industry operations with sensors and devices tailored for real-time monitoring and automation." },
        { name: "Fleet Management", body: "Track, manage, and maintain vehicle fleets efficiently, reducing costs and ensuring safety." },
        { name: "Retail IoT Solutions", body: "Equip retail spaces with IoT to offer personalized experiences, manage inventory efficiently, and gather customer insights." },
      ]}
      industryIntro="Pioneering IoT integrations across diverse sectors."
      industryCallouts={[
        { name: "Manufacturing", body: "Leveraging IoT, we've transformed manufacturing floors into smart factories, enhancing real-time monitoring, predictive maintenance, and efficient production cycles." },
        { name: "Real Estate", body: "Our IoT solutions in real estate focus on creating smart buildings and homes, elevating energy efficiency, security, and tenant experiences through automated systems." },
        { name: "Retail", body: "In the retail domain, we've incorporated IoT for personalized shopping experiences, real-time inventory management, and insightful customer behavior analytics." },
        { name: "Distribution", body: "IoT has redefined our approach in this sector, ensuring efficient inventory management, real-time fleet monitoring, and seamless distribution channels." },
        { name: "Professional Services", body: "We've enhanced service delivery standards by integrating IoT into operations, enabling real-time data analytics, client engagement, and optimized service delivery." },
      ]}
      ctaTitle="Connect Your Business with IoT"
      ctaSubtitle="Talk to our IoT experts about consultation, device integration, and analytics to turn connected data into results."
    />
  );
}
