/** The service / solution / company pages whose hero + FAQ content is editable. */
export type KnownPage = { slug: string; name: string; group: string };

export const KNOWN_PAGES: KnownPage[] = [
  // Services
  { slug: "erp-and-crm", name: "ERP & CRM", group: "Services" },
  { slug: "intelligent-automation", name: "Intelligent Automation", group: "Services" },
  { slug: "data-analytics", name: "Data Analytics", group: "Services" },
  { slug: "application-development", name: "Application Development", group: "Services" },
  { slug: "application-management", name: "Application Management", group: "Services" },
  { slug: "dedicated-development-team", name: "Smart Teams", group: "Services" },
  // Industries
  { slug: "manufacturing", name: "Manufacturing", group: "Industries" },
  { slug: "real-estate", name: "Real Estate", group: "Industries" },
  { slug: "retail", name: "Retail", group: "Industries" },
  { slug: "distribution", name: "Distribution", group: "Industries" },
  { slug: "professional-services", name: "Professional Services", group: "Industries" },
  // Products
  { slug: "realtyai-property-management-solution", name: "RealtyAI", group: "Products" },
  { slug: "smartfees-school-admin-solution", name: "SmartFees", group: "Products" },
  { slug: "maxpayroll-hr-management-solution-2", name: "MaxPayroll", group: "Products" },
  // Technologies
  { slug: "microsoft-dynamics-365", name: "Microsoft Dynamics 365", group: "Technologies" },
  { slug: "microsoft-power-platform", name: "Microsoft Power Platform", group: "Technologies" },
  { slug: "microsoft-azure", name: "Microsoft Azure", group: "Technologies" },
  { slug: "settlemint-blockchain", name: "SettleMint Blockchain", group: "Technologies" },
  { slug: "open-ai", name: "OpenAI", group: "Technologies" },
  { slug: "iot-internet-of-things", name: "IoT", group: "Technologies" },
  // Company
  { slug: "about-us", name: "About Us", group: "Company" },
];

export const KNOWN_PAGE_SLUGS = new Set(KNOWN_PAGES.map((p) => p.slug));

export function getKnownPage(slug: string): KnownPage | undefined {
  return KNOWN_PAGES.find((p) => p.slug === slug);
}
