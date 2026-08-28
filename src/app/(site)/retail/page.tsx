import IndustryDetail from "@/components/IndustryDetail";


import { pageMetadata } from "@/lib/seo";

// Unique title/description per page; Admin → Pages can override both.
export const generateMetadata = () =>
  pageMetadata({
    slug: "retail",
    title: "Dynamics 365 for Retail",
    description:
      "Unified commerce on Microsoft Dynamics 365 — POS, inventory, loyalty and omnichannel experiences for retailers across the UAE and GCC.",
  image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/hero-retail.webp",
  });

// Content mirrors www.maxcient.com/retail.
export default function Retail() {
  return (
    <IndustryDetail
      slug="retail"
      title="Retail"
      subtitle="The retail sector is undergoing significant transformation, influenced by evolving technology and changing consumer behaviors. From omnichannel shopping experiences to augmented reality trials, retailers are innovating to offer immersive experiences and remain relevant. At Maxcient, we're positioned to steer businesses through this dynamic retail landscape."
      heroImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/hero-retail.webp"
      trends={[
        { title: "Omnichannel Shopping", body: "The seamless integration of physical stores with digital platforms ensures that consumers enjoy a consistent shopping experience, irrespective of the channel they choose. This approach helps retailers in connecting with their audience effectively." },
        { title: "Augmented Reality", body: "Harnessing AR & VR technologies, retailers are providing customers with virtual try-ons and immersive product experiences, revolutionizing the way consumers shop." },
        { title: "Personalized Shopping", body: "With the rise of data analytics, retailers are tailoring shopping experiences to individual preferences, leading to enhanced customer loyalty and increased sales." },
      ]}
      solutionImages={[
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/retail-sol-1.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/retail-sol-2.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/retail-sol-3.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/retail-sol-4.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/retail-sol-5.webp",
      ]}
      solutionsHeading="Services For Retail Industry"
      solutionsIntro="From storefront design to digital customer experiences, our tailored services transform the retail landscape. We focus on innovation, optimizing operations, and driving excellence across all facets of the retail journey."
      solutions={[
        {
          heading: "Elevating Retail Experiences through Innovative Tech Integration",
          body: "Enhancing retail operations by integrating cutting-edge technology solutions, personalizing customer experiences, optimizing inventory management, and promoting strategic sales strategies.",
          features: ["Inventory and stock management", "Point of sale integration", "Customer relationship management", "E-commerce and online sales optimization", "Sales analytics and insights", "Promotions and discount management", "Digital marketing and advertisement strategies", "Financial and sales reporting"],
        },
        {
          heading: "Refining the Shopping Experience through Data Insights",
          body: "Transform your retail business by understanding the nuances of consumer behavior. We provide analytics that delve into purchase histories, seasonal trends, and customer feedback, ensuring personalized shopping experiences and maximized sales.",
          features: ["Purchase pattern analysis", "Seasonal sales forecasting", "Inventory turnover analytics", "Customer loyalty insights", "Product placement optimization", "Pricing and discount analytics", "Supply chain analytics", "Customer feedback analysis"],
        },
        {
          heading: "Elevating Retail Experiences with Intelligent Automation",
          body: "Transform the retail landscape with automation that offers personalized customer experiences, efficient inventory management, and streamlined operations. Our solutions enable retailers to stay ahead of market trends and deliver exceptional service.",
          features: ["Customer behavior analytics", "Automated inventory management", "Seamless checkout processes", "Personalized marketing & promotions", "Supply chain optimization", "Virtual fitting and product trials", "Returns & warranty management", "Feedback and review analysis"],
        },
        {
          heading: "Reimagining Retail with Innovative Applications",
          body: "Elevate the retail experience with applications designed to engage customers, manage inventory, and optimize sales strategies. Our solutions harness technology to keep retailers at the forefront of an ever-evolving marketplace.",
          features: ["In-depth customer analytics platforms", "Inventory management & forecasting apps", "Seamless digital checkout solutions", "AI-driven marketing & promotion tools", "Supply chain management platforms", "Augmented reality product trial apps", "Efficient returns & warranty systems", "Sentiment analysis & customer feedback apps"],
        },
        {
          heading: "Optimizing Retail Through Comprehensive Application Support",
          body: "Enhance the retail journey with dedicated management services that ensure your applications run smoothly, efficiently, and consistently. Our expertise ensures that retailers remain agile and adaptive in a dynamic market landscape.",
          features: ["Continuous monitoring", "Proactive maintenance", "Streamlined updates", "Management of marketing tools", "Support for augmented reality trial applications", "Handling of return and warranty application processes", "Overseeing sentiment and feedback application tools"],
        },
      ]}
      techCards={[
        { name: "Microsoft Dynamics 365", body: "Within the retail domain, Microsoft Dynamics 365 guarantees streamlined inventory management, enhanced sales tracking, and improved customer loyalty. Our prowess in implementing Dynamics 365 for retail establishments leads to streamlined checkouts, real-time product tracking, and personalized shopping experiences." },
        { name: "Microsoft Power Platform", body: "In the fast-paced world of retail, Microsoft Power Platform ensures operational agility, resulting in streamlined store management and enriched shopper engagement. Leveraging our deep knowledge, retailers witness enhanced point-of-sale systems, real-time sales analytics, and dynamic product displays." },
        { name: "Microsoft Azure", body: "In retail, Microsoft Azure provides formidable cloud infrastructures, fueling e-commerce platforms, AI-infused shopping recommendations, and instant data analysis. Our comprehensive work with Azure guarantees smooth online shopping experiences, heightened data protection, and data-informed strategies for retailers." },
        { name: "Azure AI", body: "In the retail sector, Azure AI brings a rich catalogue of models — Azure OpenAI, vision, language and recommendation services — as managed cloud services. Wired into Dynamics 365 and the Power Platform, your CRM and ERP gain shopping copilots, demand and inventory forecasting, automated product tagging and personalized recommendations, and sentiment analysis on customer feedback — all from your live commerce data." },
        { name: "Microsoft Dataverse", body: "In the retail sector, Microsoft Dataverse unifies your Dynamics 365 CRM and ERP data — customers, orders, inventory and loyalty — in one secure, governed model. With enforced security and business rules, Power Apps, Power Automate and analytics work from a single source of truth across stores, e-commerce and the back office." },
        { name: "IoT (Internet of Things)", body: "In the retail sector, IoT introduces revolutionary enhancements in smart store setups, security measures, and inventory tracking. Our seasoned experience in deploying IoT solutions translates to intelligent shelf systems, real-time inventory updates, and efficient store operations." },
      ]}
      valueTitle="Delivering Unique Solutions, Tailored for You."
      valueBody="In a rapidly evolving digital landscape, our approach is distinct. We prioritize your unique needs, combining expertise and innovation to craft solutions that truly resonate. Dive into a bespoke experience where your aspirations become reality."
      ctaTitle="Transform Your Retail Business"
      ctaSubtitle="Connect with our retail technology experts to explore omnichannel, analytics, and automation solutions built for modern retail."
    />
  );
}
