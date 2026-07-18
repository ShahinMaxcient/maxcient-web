"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

const DEFAULT_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#", children: [
    { label: "ERP & CRM", href: "/erp-and-crm" },
    { label: "Data Analytics", href: "/data-analytics" },
    { label: "Intelligent Automation", href: "/intelligent-automation" },
    { label: "Application Development", href: "/application-development" },
    { label: "Application Management", href: "/application-management" },
    { label: "Smart Teams", href: "/dedicated-development-team" },
  ]},
  { label: "Industries", href: "#", children: [
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Real Estate", href: "/real-estate" },
    { label: "Retail", href: "/retail" },
    { label: "Distribution", href: "/distribution" },
    { label: "Professional Services", href: "/professional-services" },
  ]},
  { label: "Products", href: "#", children: [
    { label: "RealtyAI", href: "/realtyai-property-management-solution" },
    { label: "SmartFees", href: "/smartfees-school-admin-solution" },
    { label: "MaxPayroll", href: "/maxpayroll-hr-management-solution-2" },
  ]},
  { label: "Technologies", href: "#", children: [
    { label: "Microsoft Dynamics 365", href: "/microsoft-dynamics-365" },
    { label: "Power Platform", href: "/microsoft-power-platform" },
    { label: "Microsoft Azure", href: "/microsoft-azure" },
    { label: "Settlemint Blockchain", href: "/settlemint-blockchain" },
    { label: "OpenAI", href: "/open-ai" },
    { label: "IoT", href: "/iot-internet-of-things" },
  ]},
  { label: "About", href: "/about-us" },
];

export default function Navbar({ navItems = DEFAULT_NAV }: { navItems?: NavItem[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The homepage hero is a dark image; when the navbar is transparent over it
  // (top of home, not scrolled), force light text regardless of theme.
  const overHero = pathname === "/" && !scrolled;
  const linkColor = overHero ? "rgba(255,255,255,0.88)" : "var(--nav-text)";
  const markBg = overHero ? "#FFFFFF" : "var(--text-primary)";
  const markFg = overHero ? "#14101F" : "var(--background)";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? { background: "var(--nav-bg)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }
          : { background: "transparent", borderBottom: "1px solid transparent" }
      }
    >
      <nav className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Maxcient home">
            <Image
              src="/maxcient-logo-blue.png"
              alt="Maxcient"
              width={206}
              height={28}
              priority
              style={{ height: 28, width: "auto" }}
            />
          </Link>

          {/* Center nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  onClick={(e) => item.children && e.preventDefault()}
                  className="px-4 py-2 flex items-center gap-1.5 transition-colors duration-150 hover:opacity-100"
                  style={{
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em",
                    color: linkColor, borderRadius: "4px",
                  }}
                >
                  {item.label}
                  {item.children && (
                    <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 pt-2 min-w-[230px]"
                    >
                      <div className="p-1.5" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px", boxShadow: "var(--shadow)" }}>
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-3 py-2 transition-colors duration-150"
                            style={{ fontSize: "13px", color: "var(--text-secondary)", borderRadius: "4px" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--glow-color)"; e.currentTarget.style.color = "var(--primary)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle onHero={overHero} />
            <Link
              href="/request-a-consultation"
              className="group inline-flex items-center gap-2 px-5 py-2.5 transition-all duration-200"
              style={{
                background: markBg, color: markFg,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = markBg)}
            >
              Get Started
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle onHero={overHero && !mobileMenuOpen} />
            <button className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              <svg className="w-6 h-6" style={{ color: overHero && !mobileMenuOpen ? "#FFFFFF" : "var(--text-primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-2 mb-4 p-4 overflow-hidden"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px" }}
            >
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between py-3"
                        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-primary)" }}
                      >
                        {item.label}
                        <svg className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="pl-3 pb-2">
                          {item.children.map((child) => (
                            <Link key={child.label} href={child.href} className="block py-2 text-sm" style={{ color: "var(--text-muted)" }} onClick={() => setMobileMenuOpen(false)}>{child.label}</Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} className="block py-3" style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-primary)" }} onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
                  )}
                </div>
              ))}
              <Link href="/request-a-consultation" className="mt-4 block w-full text-center px-6 py-3" style={{ background: "var(--text-primary)", color: "var(--background)", fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "4px" }} onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
