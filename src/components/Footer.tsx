import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/settings";
import { getCollectionItems } from "@/lib/content";
import { getServices } from "@/lib/homepage";
import { getHiddenSlugs } from "@/lib/pages";

type OfficeRow = { region: string; city: string; address: string };

function groupOffices(rows: OfficeRow[]) {
  const map = new Map<string, { region: string; offices: { city: string; address: string }[] }>();
  for (const o of rows) {
    if (!map.has(o.region)) map.set(o.region, { region: o.region, offices: [] });
    map.get(o.region)!.offices.push({ city: o.city, address: o.address });
  }
  return Array.from(map.values());
}

function ColHead({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: "22px" }}>{children}</h3>;
}

function LinkCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <ColHead>{title}</ColHead>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-secondary)" }}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function Footer() {
  const [settings, officeRows, services, industries, products, technologies, hidden] = await Promise.all([
    getSiteSettings(),
    getCollectionItems<OfficeRow>("offices"),
    getServices(),
    getCollectionItems<{ title: string; href: string }>("industries"),
    getCollectionItems<{ title: string; href: string }>("products"),
    getCollectionItems<{ title: string; href: string }>("technologies"),
    getHiddenSlugs(),
  ]);

  const officeRegions = groupOffices(officeRows);
  const telHref = `tel:${settings.contactPhone.replace(/[^0-9+]/g, "")}`;

  const visible = (href: string) => !hidden.has(href.replace(/^\//, "").split("#")[0]);
  const serviceLinks = services.filter((s) => visible(s.href)).map((s) => ({ label: s.title, href: s.href }));
  const industryLinks = industries.filter((i) => visible(i.href)).map((i) => ({ label: i.title, href: i.href }));
  const productLinks = products.filter((p) => visible(p.href)).map((p) => ({ label: p.title, href: p.href }));
  const technologyLinks = technologies.filter((t) => visible(t.href)).map((t) => ({ label: t.title, href: t.href }));

  return (
    <footer id="contact" style={{ background: "var(--background)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Brand + link columns */}
        <div className="py-16 lg:py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1.2fr] gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Image src="/maxcient-logo-blue.png" alt="Maxcient" width={236} height={32} className="h-[26px] w-auto" />
            <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "320px" }}>
              {settings.footerTagline}
            </p>
            <div className="mt-6 space-y-1" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12.5px" }}>
              <a href={`mailto:${settings.contactEmail}`} className="block transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-primary)" }}>{settings.contactEmail} →</a>
              <a href={telHref} className="block transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-primary)" }}>{settings.contactPhone} →</a>
            </div>
            {/* Working hours */}
            <div className="mt-5">
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "10.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: 4 }}>Call us</div>
              <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Monday – Friday · 9:00 AM – 6:00 PM</div>
            </div>
            {/* Social */}
            <div className="mt-6 flex items-center gap-3" style={{ display: settings.linkedinUrl ? undefined : "none" }}>
              <a
                href={settings.linkedinUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Maxcient on LinkedIn"
                className="flex items-center justify-center transition-colors"
                style={{ width: 36, height: 36, border: "1px solid var(--border-strong)", borderRadius: "4px", color: "var(--text-primary)" }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
            </div>
          </div>

          <LinkCol title="Services" links={serviceLinks} />
          <LinkCol title="Industries" links={industryLinks} />
          <LinkCol title="Products" links={productLinks} />
          <LinkCol title="Technologies" links={technologyLinks} />
        </div>

        {/* Office locations */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10" style={{ borderTop: "1px solid var(--border)" }}>
          {officeRegions.map((r) => (
            <div key={r.region}>
              <ColHead>{r.region}</ColHead>
              <ul className="space-y-4">
                {r.offices.map((o) => (
                  <li key={o.city}>
                    <div className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{o.city}</div>
                    <div className="text-xs mt-0.5 leading-snug" style={{ color: "var(--text-muted)", maxWidth: "320px" }}>{o.address}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-7 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)", fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          <p style={{ color: "var(--text-muted)" }}>© {new Date().getFullYear()} Maxcient Technologies</p>
          <div className="flex items-center gap-7">
            <Link href="/terms-of-use" className="transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>Terms of Use</Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>Privacy Policy</Link>
            <Link href="/cookie-policy" className="transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
