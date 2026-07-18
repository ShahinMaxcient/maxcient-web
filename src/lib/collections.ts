// ─────────────────────────────────────────────────────────────
// Config-driven content collections.
// Each collection maps to a Prisma model and drives a generic
// admin CRUD UI + the public fallback/seed data.
// ─────────────────────────────────────────────────────────────

export type FieldType = "text" | "textarea" | "number" | "image" | "select" | "tags";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  help?: string;
};

export type CollectionConfig = {
  key: string; // URL slug + fetch key
  model: string; // Prisma delegate name
  label: string; // plural
  singular: string;
  fields: Field[];
  listColumns: string[]; // field names shown in the admin table
  defaults: Record<string, unknown>[];
};

const SPAN_OPTIONS = [
  { value: "lg:col-span-4", label: "Small (4)" },
  { value: "lg:col-span-5", label: "Medium (5)" },
  { value: "lg:col-span-6", label: "Half (6)" },
  { value: "lg:col-span-7", label: "Wide (7)" },
  { value: "lg:col-span-8", label: "Wider (8)" },
  { value: "lg:col-span-7 lg:row-span-2", label: "Feature (7×2)" },
];

export const COLLECTIONS: Record<string, CollectionConfig> = {
  marquee: {
    key: "marquee",
    model: "marqueeItem",
    label: "Marquee Items",
    singular: "marquee item",
    listColumns: ["order", "text"],
    fields: [
      { name: "text", label: "Text", type: "text", required: true, placeholder: "DYNAMICS 365" },
    ],
    defaults: [
      { text: "DYNAMICS 365", order: 0 },
      { text: "POWER PLATFORM", order: 1 },
      { text: "AZURE", order: 2 },
      { text: "OPENAI", order: 3 },
      { text: "SETTLEMINT", order: 4 },
      { text: "IoT", order: 5 },
    ],
  },

  companyValues: {
    key: "companyValues",
    model: "companyValue",
    label: "Company Values",
    singular: "value",
    listColumns: ["order", "title"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
    defaults: [
      { title: "Integrity", description: "Maintaining highest standards in actions and decisions, building trust through transparency and accountability.", order: 0 },
      { title: "Innovation", description: "Creating forward-thinking solutions for emerging challenges, staying ahead of the technology curve.", order: 1 },
      { title: "Collaboration", description: "Leveraging teamwork for enhanced outcomes, partnering closely with clients to achieve shared goals.", order: 2 },
    ],
  },

  aboutStats: {
    key: "aboutStats",
    model: "aboutStat",
    label: "About Stats",
    singular: "stat",
    listColumns: ["order", "label", "value"],
    fields: [
      { name: "label", label: "Label", type: "text", required: true, placeholder: "Founded" },
      { name: "value", label: "Value", type: "text", required: true, placeholder: "2017" },
    ],
    defaults: [
      { label: "Founded", value: "2017", order: 0 },
      { label: "Countries", value: "3", order: 1 },
      { label: "Degree Holders", value: "100%", order: 2 },
      { label: "2+ Year Tenure", value: "70%", order: 3 },
      { label: "Senior Specialists", value: "86%", order: 4 },
      { label: "Client Rating", value: "5/5", order: 5 },
    ],
  },

  pageFeatures: {
    key: "pageFeatures",
    model: "pageFeature",
    label: "Page Features",
    singular: "feature",
    listColumns: ["pageSlug", "order", "title"],
    fields: [
      { name: "pageSlug", label: "Page slug", type: "text", required: true, placeholder: "erp-and-crm", help: "The URL path without leading slash, e.g. microsoft-dynamics-365" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
    defaults: [],
  },

  industries: {
    key: "industries",
    model: "industry",
    label: "Industries",
    singular: "industry",
    listColumns: ["order", "title", "num"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "num", label: "Label / number", type: "text", placeholder: "I/01" },
      { name: "href", label: "Link", type: "text", placeholder: "/manufacturing" },
      { name: "image", label: "Background image URL", type: "image", required: true },
      { name: "span", label: "Card size", type: "select", options: SPAN_OPTIONS },
    ],
    defaults: [
      { title: "Manufacturing", num: "I/01", href: "/manufacturing", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80", span: "lg:col-span-7 lg:row-span-2", order: 0 },
      { title: "Real Estate", num: "I/02", href: "/real-estate", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80", span: "lg:col-span-5", order: 1 },
      { title: "Retail", num: "I/03", href: "/retail", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80", span: "lg:col-span-5", order: 2 },
      { title: "Distribution", num: "I/04", href: "/distribution", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80", span: "lg:col-span-4", order: 3 },
      { title: "Professional Services", num: "I/05", href: "/professional-services", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80", span: "lg:col-span-8", order: 4 },
    ],
  },

  technologies: {
    key: "technologies",
    model: "technology",
    label: "Technologies",
    singular: "technology",
    listColumns: ["order", "title", "letter"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "letter", label: "Badge text", type: "text", placeholder: "D365" },
      { name: "href", label: "Link", type: "text", placeholder: "/microsoft-dynamics-365" },
    ],
    defaults: [
      { title: "Microsoft Dynamics 365", description: "Intuitive, adaptable enterprise applications that grow with you.", letter: "D365", href: "/microsoft-dynamics-365", order: 0 },
      { title: "Power Platform", description: "Connect data, build apps, and automate workflows for everyone.", letter: "PP", href: "/microsoft-power-platform", order: 1 },
      { title: "Microsoft Azure", description: "Endless cloud capabilities and global infrastructure.", letter: "Az", href: "/microsoft-azure", order: 2 },
      { title: "Settlemint Blockchain", description: "Unmatched security and transparency for transactions.", letter: "BC", href: "/settlemint-blockchain", order: 3 },
      { title: "OpenAI", description: "Advanced AI models to drive innovation and automate processes.", letter: "AI", href: "/open-ai", order: 4 },
      { title: "IoT", description: "Real-time insights and control from the edge to the cloud.", letter: "IoT", href: "/iot-internet-of-things", order: 5 },
    ],
  },

  products: {
    key: "products",
    model: "product",
    label: "Products",
    singular: "product",
    listColumns: ["order", "title", "num"],
    fields: [
      { name: "num", label: "Number", type: "text", placeholder: "P/01" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "desc", label: "Description", type: "textarea", required: true },
      { name: "tags", label: "Tags (comma-separated)", type: "tags", placeholder: "Property Management, Tenant Portal" },
      { name: "href", label: "Link", type: "text" },
      { name: "image", label: "Image URL", type: "image" },
    ],
    defaults: [
      { num: "P/01", title: "RealtyAI", desc: "Property management for the AI-first era. Tenants, maintenance, billing, and real-time portfolio analytics — fully UAE-compliant.", tags: ["Property Management", "Tenant Portal", "AI Insights", "RERA / UAE"], href: "/realtyai-property-management-solution", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80", order: 0 },
      { num: "P/02", title: "SmartFees", desc: "School financial operations — invoicing, expense tracking, payroll, and board-ready financial reports, in one place.", tags: ["Invoicing", "Expense Tracking", "Payroll", "Compliance"], href: "/smartfees-school-admin-solution", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80", order: 1 },
      { num: "P/03", title: "MaxPayroll", desc: "Modern HR + payroll for UAE employers. Employee self-service, attendance, leave, EOSB, and WPS in a single workflow.", tags: ["HR Management", "Payroll", "Employee Portal", "WPS Ready"], href: "/maxpayroll-hr-management-solution-2", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80", order: 2 },
    ],
  },

  clients: {
    key: "clients",
    model: "client",
    label: "Clients (Trusted by)",
    singular: "client",
    listColumns: ["order", "name"],
    fields: [
      { name: "name", label: "Client name", type: "text", required: true },
      { name: "logo", label: "Logo URL", type: "image", required: true, help: "Path in /public (e.g. /clients/logos-01.png) or a full URL." },
    ],
    defaults: [
      { name: "Ellington Properties", logo: "/clients/logos-01.png", order: 0 },
      { name: "Evolution", logo: "/clients/logos-02.png", order: 1 },
      { name: "Veolia", logo: "/clients/logos-03.png", order: 2 },
      { name: "Renna Mobile", logo: "/clients/logos-04.png", order: 3 },
      { name: "Sharqiyah Desalination", logo: "/clients/logos-05.png", order: 4 },
      { name: "Muscat International Airport", logo: "/clients/logos-06.png", order: 5 },
    ],
  },

  faqs: {
    key: "faqs",
    model: "faq",
    label: "FAQ",
    singular: "FAQ",
    listColumns: ["order", "question"],
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
    ],
    defaults: [
      { question: "What makes Maxcient a leader in driving digital transformation?", answer: "Maxcient stands at the forefront of digital transformation by leveraging Microsoft Dynamics 365, IoT, and AI with proven expertise delivering scalable solutions.", order: 0 },
      { question: "What are the core benefits of partnering with Maxcient?", answer: "Access to cutting-edge technology, bespoke solutions tailored to industry-specific needs, operational efficiency gains, enhanced analytics, robust cybersecurity, and dedicated support.", order: 1 },
      { question: "How does Maxcient empower businesses with technology?", answer: "We provide comprehensive solutions that simplify complex processes, automate routine tasks, and enhance data analytics, converting data into actionable insights.", order: 2 },
      { question: "What innovation does Maxcient bring to data-driven decision-making?", answer: "We integrate AI and machine learning into analytics, offering predictive and prescriptive insights for strategic advantage.", order: 3 },
      { question: "What strategies does Maxcient use to ensure data security?", answer: "Implementation includes encryption, secure access controls, and regular audits, adhering to international standards for compliance.", order: 4 },
      { question: "Can Maxcient support cloud service transitions?", answer: "We specialize in smooth transitions to cloud services, leveraging Microsoft Azure with meticulous planning and phased rollouts.", order: 5 },
      { question: "How does Maxcient utilize Blockchain technology?", answer: "We use Settlemint for decentralized applications that streamline supply chain management, smart contracts, and transactions.", order: 6 },
      { question: "Can Maxcient help with custom application development?", answer: "We excel in custom development, creating solutions tailor-made for your unique business challenges using cutting-edge technology.", order: 7 },
    ],
  },

  stats: {
    key: "stats",
    model: "stat",
    label: "Stats",
    singular: "stat",
    listColumns: ["order", "value", "label"],
    fields: [
      { name: "value", label: "Value (number)", type: "number", required: true },
      { name: "suffix", label: "Suffix", type: "text", placeholder: "% or + or /5" },
      { name: "eyebrow", label: "Eyebrow", type: "text", placeholder: "01 — DELIVERY" },
      { name: "label", label: "Label", type: "textarea", required: true },
    ],
    defaults: [
      { value: 100, suffix: "%", eyebrow: "01 — DELIVERY", label: "On-time project completion across all engagements since 2017.", order: 0 },
      { value: 50, suffix: "+", eyebrow: "02 — EXPERIENCE", label: "Years of combined Microsoft Dynamics expertise on the team.", order: 1 },
      { value: 5, suffix: "/5", eyebrow: "03 — RATING", label: "Average client rating across our active engagements.", order: 2 },
      { value: 6, suffix: "", eyebrow: "04 — REACH", label: "Offices across Dubai, Oman, KSA, India, and the UK.", order: 3 },
    ],
  },

  offices: {
    key: "offices",
    model: "office",
    label: "Offices",
    singular: "office",
    listColumns: ["order", "region", "city"],
    fields: [
      { name: "region", label: "Region", type: "text", required: true, placeholder: "MENA" },
      { name: "city", label: "City", type: "text", required: true },
      { name: "address", label: "Address", type: "textarea", required: true },
    ],
    defaults: [
      { region: "MENA", city: "Dubai", address: "Office No. 2912, Churchill Tower, Business Bay, UAE, PO Box: 118467", order: 0 },
      { region: "MENA", city: "Oman", address: "5th Floor, Office# 517, Almaktabi Building, Watayyah, Muscat", order: 1 },
      { region: "MENA", city: "KSA", address: "415, Tower B, Olaya Towers, MBZ Road, Riyadh", order: 2 },
      { region: "India", city: "Bengaluru", address: "101 & 102, “VISIBLE”, 100 Feet Road, Indiranagar", order: 3 },
      { region: "India", city: "Kochi", address: "4th Floor, Office# 101, Crescens Tower, Monlash Business Center, Ernakulam", order: 4 },
      { region: "EU", city: "U.K.", address: "Southfield Square, Bradford, West Yorkshire BD8 7SN", order: 5 },
    ],
  },
};

export const COLLECTION_LIST = Object.values(COLLECTIONS);

export function getCollectionConfig(key: string): CollectionConfig | undefined {
  return COLLECTIONS[key];
}
