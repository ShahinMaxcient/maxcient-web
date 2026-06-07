import Link from "next/link";

const offices = [
  { city: "Dubai", address: "Churchill Tower, Business Bay" },
  { city: "Oman", address: "Almaktabi Building, Muscat" },
  { city: "Saudi Arabia", address: "Olaya Towers, Riyadh" },
  { city: "Bengaluru", address: "Indiranagar, 100 Feet Road" },
  { city: "Kochi", address: "Crescens Tower, Monlash" },
  { city: "U.K.", address: "Southfield Square, Bradford" },
];

const services = [
  { label: "ERP & CRM", href: "/erp-and-crm" },
  { label: "Data Analytics", href: "/data-analytics" },
  { label: "Intelligent Automation", href: "/intelligent-automation" },
  { label: "Application Development", href: "/application-development" },
  { label: "Application Management", href: "/application-management" },
  { label: "Smart Teams", href: "/dedicated-development-team" },
];
const products = [
  { label: "RealtyAI", href: "/realtyai-property-management-solution" },
  { label: "SmartFees", href: "/smartfees-school-admin-solution" },
  { label: "MaxPayroll", href: "/maxpayroll-hr-management-solution-2" },
];

function ColHead({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: "22px" }}>{children}</h3>;
}

export default function Footer() {
  return (
    <footer id="contact" style={{ background: "var(--background)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2.4fr_1fr_1fr_1.2fr] gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 flex items-center justify-center font-extrabold text-lg" style={{ background: "var(--text-primary)", color: "var(--background)", borderRadius: "2px" }}>M</div>
              <span className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Maxcient</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "320px" }}>
              Enterprise systems integrator. Microsoft Gold Partner. Headquartered in Dubai, operating across the UAE, GCC, India, and the UK.
            </p>
            <div className="mt-6 space-y-1" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12.5px" }}>
              <a href="mailto:hello@maxcient.com" className="block transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-primary)" }}>hello@maxcient.com →</a>
              <a href="tel:+97143293710" className="block transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-primary)" }}>+971 4 329 3710 →</a>
            </div>
          </div>

          {/* Services */}
          <div>
            <ColHead>Services</ColHead>
            <ul className="space-y-2.5">
              {services.map((s) => <li key={s.label}><Link href={s.href} className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-secondary)" }}>{s.label}</Link></li>)}
            </ul>
          </div>

          {/* Products */}
          <div>
            <ColHead>Products</ColHead>
            <ul className="space-y-2.5">
              {products.map((p) => <li key={p.label}><Link href={p.href} className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-secondary)" }}>{p.label}</Link></li>)}
            </ul>
            <div className="mt-8">
              <ColHead>About</ColHead>
              <ul className="space-y-2.5">
                <li><Link href="/about-us" className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-secondary)" }}>About Us</Link></li>
                <li><Link href="/request-a-consultation" className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-secondary)" }}>Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Offices */}
          <div>
            <ColHead>Global Offices</ColHead>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              {offices.map((o) => (
                <li key={o.city}>
                  <div className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{o.city}</div>
                  <div className="text-xs mt-0.5 leading-snug" style={{ color: "var(--text-muted)" }}>{o.address}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-7 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)", fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          <p style={{ color: "var(--text-muted)" }}>© {new Date().getFullYear()} Maxcient Technologies</p>
          <div className="flex items-center gap-7">
            <Link href="/terms-of-use" className="transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>Terms</Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>Privacy</Link>
            <Link href="/cookie-policy" className="transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
