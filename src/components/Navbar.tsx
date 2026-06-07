"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Services", href: "#",
    children: [
      { label: "ERP & CRM", href: "/erp-and-crm" },
      { label: "Data Analytics", href: "/data-analytics" },
      { label: "Intelligent Automation", href: "/intelligent-automation" },
      { label: "Application Development", href: "/application-development" },
      { label: "Application Management", href: "/application-management" },
      { label: "Smart Teams", href: "/dedicated-development-team" },
    ],
  },
  {
    label: "Industries", href: "#",
    children: [
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "Real Estate", href: "/real-estate" },
      { label: "Retail", href: "/retail" },
      { label: "Distribution", href: "/distribution" },
      { label: "Professional Services", href: "/professional-services" },
    ],
  },
  {
    label: "Products", href: "#",
    children: [
      { label: "RealtyAI", href: "/realtyai-property-management-solution" },
      { label: "SmartFees", href: "/smartfees-school-admin-solution" },
      { label: "MaxPayroll", href: "/maxpayroll-hr-management-solution-2" },
    ],
  },
  {
    label: "Technologies", href: "#",
    children: [
      { label: "Microsoft Dynamics 365", href: "/microsoft-dynamics-365" },
      { label: "Power Platform", href: "/microsoft-power-platform" },
      { label: "Microsoft Azure", href: "/microsoft-azure" },
      { label: "Settlemint Blockchain", href: "/settlemint-blockchain" },
      { label: "OpenAI", href: "/open-ai" },
      { label: "IoT", href: "/iot-internet-of-things" },
    ],
  },
  { label: "About Us", href: "/about-us" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHeroArea = !scrolled;
  const navTextClass = isHeroArea
    ? "text-[var(--nav-text-hero)]"
    : `text-[var(--nav-text)]`;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
      style={scrolled ? { background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" } : {}}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] via-[var(--violet)] to-[var(--accent)] flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className={`text-xl font-bold transition-colors ${isHeroArea ? "text-white" : "text-[var(--text-primary)]"}`}>
              Maxcient
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors flex items-center gap-1 py-2 ${
                    isHeroArea ? "text-white/80 hover:text-white" : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
                  }`}
                  onClick={(e) => item.children && e.preventDefault()}
                >
                  {item.label}
                  {item.children && (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-0 pt-2"
                    >
                      <div className="glass rounded-xl py-2 min-w-[220px]" style={{ boxShadow: "var(--shadow)" }}>
                        {item.children.map((child) => (
                          <Link key={child.label} href={child.href} className="block px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--glow-color)] transition-colors">
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

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a href="tel:+97143293710" className={`text-sm transition-colors ${isHeroArea ? "text-white/50" : "text-[var(--text-muted)]"}`}>
              +971 4 329 3710
            </a>
            <Link href="/request-a-consultation" className="bg-gradient-to-r from-[var(--primary)] to-[var(--violet)] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className={`w-6 h-6 ${isHeroArea ? "text-white" : "text-[var(--text-primary)]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass rounded-2xl mt-2 p-6 overflow-hidden"
            >
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)} className="w-full flex items-center justify-between py-3 text-sm font-medium text-[var(--text-primary)]">
                        {item.label}
                        <svg className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="pl-4 pb-2">
                          {item.children.map((child) => (
                            <Link key={child.label} href={child.href} className="block py-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)]" onClick={() => setMobileMenuOpen(false)}>{child.label}</Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} className="block py-3 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--primary)]" onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
                  )}
                </div>
              ))}
              <Link href="/request-a-consultation" className="mt-4 block w-full text-center bg-gradient-to-r from-[var(--primary)] to-[var(--violet)] text-white px-6 py-3 rounded-full text-sm font-semibold" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
