"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type NavChild = { label: string; href: string; children?: { label: string; href: string }[] };
type NavItem = { label: string; href: string; children?: NavChild[] };

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
    { label: "RealtyAI", href: "/realtyai-sales" },
    { label: "SmartFees", href: "/smartfees-school-admin-solution" },
    { label: "MaxPayroll", href: "/maxpayroll-hr-management-solution-2" },
    { label: "MaxMarina", href: "/maxmarina-marina-management-solution" },
    { label: "MaxUtility", href: "/maxutility-facility-utility-management-solution" },
  ]},
  { label: "Technologies", href: "#", children: [
    { label: "Microsoft Dynamics 365", href: "/microsoft-dynamics-365" },
    { label: "Power Platform", href: "/microsoft-power-platform" },
    { label: "Microsoft Azure", href: "/microsoft-azure" },
    { label: "Azure AI", href: "/azure-ai" },
    { label: "Microsoft Copilot", href: "/microsoft-copilot" },
    { label: "IoT", href: "/iot-internet-of-things" },
  ]},
  { label: "About", href: "/about-us" },
];

function DropdownChild({ child }: { child: NavChild }) {
  const [subOpen, setSubOpen] = useState(false);
  const hasSub = !!child.children && child.children.length > 0;

  const rowStyle: React.CSSProperties = { fontSize: "14px", color: "var(--text-secondary)", borderRadius: "4px" };
  const hoverIn = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.background = "var(--glow-color)"; e.currentTarget.style.color = "var(--primary)"; };
  const hoverOut = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; };
  const chevron = (
    <svg className="w-3 h-3 opacity-50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => hasSub && setSubOpen(true)}
      onMouseLeave={() => setSubOpen(false)}
    >
      {hasSub ? (
        // Parent that only groups sub-items — a header, not a link.
        <div
          className="flex items-center justify-between gap-3 px-3 py-2 cursor-default transition-colors duration-150 select-none"
          style={rowStyle}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          {child.label}
          {chevron}
        </div>
      ) : (
        <Link
          href={child.href}
          className="flex items-center justify-between gap-3 px-3 py-2 transition-colors duration-150"
          style={rowStyle}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          {child.label}
        </Link>
      )}

      <AnimatePresence>
        {hasSub && subOpen && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-0 left-full pl-1.5 min-w-[210px]"
          >
            <div className="p-1.5" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px", boxShadow: "var(--shadow)" }}>
              {child.children!.map((sub) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  className="block px-3 py-2 transition-colors duration-150"
                  style={{ fontSize: "14px", color: "var(--text-secondary)", borderRadius: "4px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--glow-color)"; e.currentTarget.style.color = "var(--primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

  // Most pages open with a dark/colored hero (violet PageHero, product heroes,
  // consultation gradient) — while the navbar is transparent over those, force
  // light text + the white logo regardless of theme.
  // These routes have a plain light top instead. "/" is here because the
  // homepage hero is now the light globe ground, not a dark photograph.
  const PLAIN_TOPS = ["/", "/blog", "/terms-of-use", "/privacy-policy", "/cookie-policy"];
  const plainTop = PLAIN_TOPS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const overHero = !plainTop && !scrolled;
  // A top-level item counts as active when the route is its own page or any
  // page beneath it — so "Technologies" stays lit while you read Azure AI.
  const onRoute = (href?: string) =>
    !!href && href !== "#" && (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
  const isActive = (item: NavItem) =>
    onRoute(item.href) ||
    !!item.children?.some((c) => onRoute(c.href) || c.children?.some((g) => onRoute(g.href)));

  const linkColor = overHero ? "rgba(255,255,255,0.92)" : "var(--nav-text)";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6"
      style={{ paddingTop: "14px" }}
    >
      {/* Floating capsule. It keeps a surface at all times rather than fading
          to transparent over dark heroes — a pill with no fill has no shape —
          so the glass simply switches from ink to paper. */}
      <nav
        className="max-w-[1320px] mx-auto px-4 sm:px-6 transition-all duration-300"
        style={{
          borderRadius: 999,
          background: overHero ? "rgba(18,14,30,0.44)" : "rgba(252,251,254,0.88)",
          border: `1px solid ${overHero ? "rgba(255,255,255,0.16)" : "var(--border)"}`,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: overHero
            ? "0 18px 44px -20px rgba(0,0,0,0.6)"
            : "0 14px 34px -18px rgba(20,16,40,0.28)",
        }}
      >
        <div className="flex items-center justify-between h-[62px]">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Maxcient home">
            {overHero ? (
              <Image
                src="/maxcient-logo-white.png"
                alt="Maxcient"
                width={206}
                height={28}
                priority
                className="h-[22px] sm:h-[23px] w-auto"
              />
            ) : (
              <>
                <Image
                  src="/maxcient-logo-blue.png"
                  alt="Maxcient"
                  width={206}
                  height={28}
                  priority
                  className="nav-logo-light h-[22px] sm:h-[23px] w-auto"
                />
                <Image
                  src="/maxcient-logo-white.png"
                  alt="Maxcient"
                  width={206}
                  height={28}
                  priority
                  className="nav-logo-dark h-[22px] sm:h-[23px] w-auto"
                />
              </>
            )}
          </Link>

          {/* Center nav */}
          <div className="hidden lg:flex items-stretch gap-1 h-full">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative h-full flex items-center"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {isActive(item) && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-1/2 -translate-x-1/2"
                    style={{
                      width: "56%", height: 3, borderRadius: 999,
                      background: overHero ? "#FFFFFF" : "var(--primary)",
                      boxShadow: overHero
                        ? "0 0 12px 1px rgba(255,255,255,0.65)"
                        : "0 0 12px 1px rgba(124,58,237,0.55)",
                    }}
                  />
                )}
                <Link
                  href={item.href}
                  onClick={(e) => item.children && e.preventDefault()}
                  aria-current={isActive(item) ? "page" : undefined}
                  className="px-4 py-2 flex items-center gap-1.5 transition-colors duration-150 hover:opacity-100"
                  style={{
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: isActive(item) ? 700 : 500,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                    color: isActive(item) ? (overHero ? "#FFFFFF" : "var(--primary)") : linkColor,
                    borderRadius: "4px",
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
                          <DropdownChild key={child.label} child={child} />
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
            <Link
              href="/request-a-consultation"
              className="mx-nav-cta group inline-flex items-center gap-2 px-6 py-2.5"
              style={{
                background: "linear-gradient(110deg, var(--primary-light) 0%, var(--primary) 55%, var(--primary-dark) 100%)",
                color: "#FFFFFF",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                borderRadius: 999,
                boxShadow: "0 10px 24px -10px rgba(124,58,237,0.75)",
              }}
            >
              Get Started
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
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
                            <div key={child.label}>
                              {child.children && child.children.length > 0 ? (
                                <>
                                  <div className="py-2 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{child.label}</div>
                                  <div className="pl-3 border-l" style={{ borderColor: "var(--border)" }}>
                                    {child.children.map((sub) => (
                                      <Link key={sub.label} href={sub.href} className="block py-1.5 text-[14px]" style={{ color: "var(--text-muted)", opacity: 0.85 }} onClick={() => setMobileMenuOpen(false)}>{sub.label}</Link>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <Link href={child.href} className="block py-2 text-sm" style={{ color: "var(--text-muted)" }} onClick={() => setMobileMenuOpen(false)}>{child.label}</Link>
                              )}
                            </div>
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
