import { getSiteSettings } from "@/lib/settings";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

/**
 * Organization + LocalBusiness JSON-LD for the whole site.
 *
 * Googling the brand currently surfaces a knowledge panel describing a
 * "Software company in Bengaluru, Karnataka" with an 080 landline, because
 * nothing on either the old or new site ever told Google what this entity is —
 * it inferred one from third-party sources. The site itself says Dubai is the
 * head office and Bengaluru is one of six locations.
 *
 * This declares that directly: Dubai as the registered address, the +971
 * number as the contact point, and the other five offices as additional
 * locations. Structured data alone will not rewrite the knowledge panel —
 * that is driven mainly by the Google Business Profile, which still shows as
 * unclaimed — but it is the on-site half, and it is what Google reads first.
 *
 * Addresses are transcribed from the footer so there is a single source of
 * truth on the page; phone, email and LinkedIn come from Admin → Settings so
 * they cannot drift out of sync with the rest of the site.
 */

const OFFICES = [
  { name: "Dubai", street: "Office No. 2912, Churchill Tower, Business Bay", locality: "Dubai", country: "AE", postalCode: "118467" },
  { name: "Muscat", street: "5th Floor, Office# 517, Almaktabi Building, Watayyah", locality: "Muscat", country: "OM" },
  { name: "Riyadh", street: "415, Tower B, Olaya Towers, MBZ Road", locality: "Riyadh", country: "SA" },
  { name: "Bengaluru", street: "101 & 102, VISIBLE, 100 Feet Road, Indiranagar", locality: "Bengaluru", country: "IN" },
  { name: "Kochi", street: "4th Floor, Office# 101, Crescens Tower, Monlash Business Center", locality: "Ernakulam", country: "IN" },
  { name: "Bradford", street: "Southfield Square", locality: "Bradford, West Yorkshire", country: "GB", postalCode: "BD8 7SN" },
];

const [HQ, ...BRANCHES] = OFFICES;

const address = (o: (typeof OFFICES)[number]) => ({
  "@type": "PostalAddress",
  streetAddress: o.street,
  addressLocality: o.locality,
  addressCountry: o.country,
  ...(o.postalCode ? { postalCode: o.postalCode } : {}),
});

export default async function OrganizationSchema() {
  const settings = await getSiteSettings().catch(() => null);
  const phone = settings?.contactPhone || "+971 4 329 3710";
  const email = settings?.contactEmail || "hello@maxcient.com";
  const linkedin = settings?.linkedinUrl;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Maxcient",
    url: SITE_URL,
    logo: `${SITE_URL}/maxcient-mark-2.png`,
    image: DEFAULT_OG_IMAGE,
    description:
      "A digital enabler for the UAE and GCC. Microsoft Solutions Partner delivering Dynamics 365, Power Platform, Azure and AI, headquartered in Dubai.",
    foundingDate: "2014",
    email,
    telephone: phone,
    // The head office, stated explicitly so it is not inferred from whichever
    // location a third-party directory happens to list.
    address: address(HQ),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phone,
        email,
        contactType: "sales",
        areaServed: ["AE", "OM", "SA", "QA", "KW", "BH"],
        availableLanguage: ["English", "Arabic"],
      },
    ],
    location: BRANCHES.map((o) => ({
      "@type": "Place",
      name: `${SITE_NAME} — ${o.name}`,
      address: address(o),
    })),
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Place", name: "GCC" },
    ],
    knowsAbout: [
      "Microsoft Dynamics 365",
      "Microsoft Power Platform",
      "Microsoft Azure",
      "Azure AI",
      "Microsoft Copilot",
      "ERP implementation",
      "CRM implementation",
    ],
    ...(linkedin ? { sameAs: [linkedin] } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // Serialised through JSON.stringify, so every value is escaped as JSON —
      // no unescaped markup can reach the page from the settings table.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
