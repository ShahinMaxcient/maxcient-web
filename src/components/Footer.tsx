import Link from "next/link";

const offices = [
  { city: "Dubai", address: "Churchill Tower, Business Bay" },
  { city: "Oman", address: "Almaktabi Building, Muscat" },
  { city: "Saudi Arabia", address: "Olaya Towers, Riyadh" },
  { city: "Bengaluru", address: "Indiranagar, 100 Feet Road" },
  { city: "Kochi", address: "Crescens Tower, Monlash" },
  { city: "U.K.", address: "Southfield Square, Bradford" },
];

const services = ["ERP & CRM", "Data Analytics", "Intelligent Automation", "Application Development", "Application Management", "Smart Teams"];
const industries = ["Manufacturing", "Real Estate", "Retail", "Distribution", "Professional Services"];

export default function Footer() {
  return (
    <footer id="contact" className="relative" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="absolute inset-0" style={{ background: "var(--surface)" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] via-[var(--violet)] to-[var(--accent)] flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Maxcient</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed max-w-sm" style={{ color: "var(--text-muted)" }}>Enterprise-grade solutions tailored for UAE and GCC markets. Your trusted technology partner.</p>
            <div className="mt-6 space-y-3">
              <a href="mailto:hello@maxcient.com" className="flex items-center gap-3 text-sm hover:text-[var(--primary-light)] transition-colors" style={{ color: "var(--text-muted)" }}>
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                hello@maxcient.com
              </a>
              <a href="tel:+97143293710" className="flex items-center gap-3 text-sm hover:text-[var(--primary-light)] transition-colors" style={{ color: "var(--text-muted)" }}>
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +971 4 329 3710
              </a>
            </div>
            <div className="mt-6">
              <a href="https://www.linkedin.com/company/maxcient" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-xl glass-light transition-colors">
                <svg className="w-4 h-4" style={{ color: "var(--text-muted)" }} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Services</h3>
            <ul className="mt-5 space-y-3">{services.map((s) => <li key={s}><Link href="#services" className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-secondary)" }}>{s}</Link></li>)}</ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Industries</h3>
            <ul className="mt-5 space-y-3">{industries.map((i) => <li key={i}><Link href="#industries" className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-secondary)" }}>{i}</Link></li>)}</ul>
          </div>
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Global Offices</h3>
            <ul className="mt-5 grid grid-cols-2 gap-4">{offices.map((o) => <li key={o.city}><div className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{o.city}</div><div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{o.address}</div></li>)}</ul>
          </div>
        </div>
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>&copy; {new Date().getFullYear()} Maxcient Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms-of-use" className="text-xs transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>Terms</Link>
            <Link href="/privacy-policy" className="text-xs transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>Privacy</Link>
            <Link href="/cookie-policy" className="text-xs transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
