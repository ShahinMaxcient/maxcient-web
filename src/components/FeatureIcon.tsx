/**
 * Themed outline mark for a product capability, picked from its title.
 *
 * Capability lists run 8–14 items per product, so a photograph per item would
 * be impractical and would land on generic stock. A keyword-matched icon gives
 * each card a distinct face while staying honest about what it depicts.
 *
 * Rules are ordered most-specific first, and short tokens are word-bounded —
 * an unanchored `unit` matched "Community", which is exactly the kind of
 * substring trap that makes this sort of matcher look broken.
 */

type Kind =
  | "utility" | "map" | "travel" | "insurance" | "money" | "shield" | "bell"
  | "chart" | "doc" | "gear" | "trend" | "search" | "mobile" | "wrench"
  | "building" | "people" | "calendar" | "identity" | "grid" | "layers";

/** Exported for testing the matcher against real capability titles. */
export function featureIconKind(name: string): Kind {
  const n = name.toLowerCase();
  if (/meter|btu|disconnection|reconnection|tariff|consumption|utilit|energy|electric|water/.test(n)) return "utility";
  if (/air ticket|flight|travel|airfare/.test(n)) return "travel";
  if (/medical|insurance|health/.test(n)) return "insurance";
  // Compliance outranks money: "Regulatory Compliance & VAT" is about the rule,
  // not the tax line.
  if (/complian|security|audit|regulat|privacy|governance/.test(n)) return "shield";
  if (/payroll|salary|wage|payment|billing|invoic|financ|expense|currency|commission|scholarship|\bvat\b|revenue|pricing|\bfee|\baccounts?\b/.test(n)) return "money";
  if (/notif|alert|remind/.test(n)) return "bell";
  if (/report|analytic|dashboard|intelligen|insight|forecast|metric|statistic/.test(n)) return "chart";
  if (/contract|certificat|document|agreement|statement|\brecord|renewal|terminat/.test(n)) return "doc";
  // Sales is tested before the marine rules: a title naming both should read
  // as sales, not as a map pin.
  if (/sales|\bcrm\b|lead\b|deal\b|pipeline/.test(n)) return "trend";
  if (/navigation|\bmap\b|marina|berth|boat|route/.test(n)) return "map";
  if (/discover|search|listing|catalog|browse/.test(n)) return "search";
  // Onboarding is about people, even when the noun beside it is a tenant.
  if (/onboard/.test(n)) return "people";
  if (/portal|mobile|self-service|kiosk|online|\bapp\b/.test(n)) return "mobile";
  if (/workflow|automat|integrat|migrat|synchron|approval|scalab/.test(n)) return "gear";
  if (/propert|facilit|asset|tenanc|tenant|owner|investment|estate|\bunits?\b|building|campus|school|student|handover/.test(n)) return "building";
  if (/event|calendar|schedul|appointment|leave|shift|roster/.test(n)) return "calendar";
  if (/communit|broker|agency|agent|employee|staff|\bteam|guest|member|people|support|engagement|help desk|service/.test(n)) return "people";
  if (/identity|experience|brand/.test(n)) return "identity";
  if (/control cent|command|console|management tool|comprehensive/.test(n)) return "grid";
  return "layers";
}

export default function FeatureIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  const p = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };

  switch (featureIconKind(name)) {
    case "utility":
      return <svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /></svg>;
    case "map":
      return <svg {...p}><path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2z" /><path d="M9 4v14M15 6v14" /></svg>;
    case "travel":
      return <svg {...p}><path d="M2 13.5 21 3l-4.5 18-4-7.5z" /><path d="m12.5 13.5-3.5 6v-4" /></svg>;
    case "insurance":
      return <svg {...p}><path d="M12 22s8-3.5 8-9.5V5.5L12 2 4 5.5V12.5C4 18.5 12 22 12 22z" /><path d="M12 9v6M9 12h6" /></svg>;
    case "money":
      return <svg {...p}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 12h.01M18 12h.01" /></svg>;
    case "shield":
      return <svg {...p}><path d="M12 22s8-3.5 8-9.5V5.5L12 2 4 5.5V12.5C4 18.5 12 22 12 22z" /><path d="m9 12 2 2 4-4" /></svg>;
    case "bell":
      return <svg {...p}><path d="M18 9a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7z" /><path d="M10.5 20a2 2 0 0 0 3 0" /></svg>;
    case "chart":
      return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 16v-4M12 16v-7M16 16v-2" /></svg>;
    case "doc":
      return <svg {...p}><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" /><path d="M14 2v5h5" /><path d="M9 13h6M9 17h4" /></svg>;
    case "trend":
      return <svg {...p}><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /><circle cx="19" cy="8" r="1.6" /></svg>;
    case "search":
      return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
    case "mobile":
      return <svg {...p}><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M11 18h2" /></svg>;
    case "gear":
      return <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8" /></svg>;
    case "wrench":
      return <svg {...p}><path d="M14.7 6.3a4 4 0 0 1-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5z" /></svg>;
    case "building":
      return <svg {...p}><path d="M3 21h18M5 21V8l7-4 7 4v13" /><path d="M9.5 21v-5h5v5" /><path d="M9 11h.01M15 11h.01" /></svg>;
    case "people":
      return <svg {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M17 11.5a3 3 0 0 0 0-6M18.5 20a6 6 0 0 0-3-5.2" /></svg>;
    case "calendar":
      return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="M8 15h3" /></svg>;
    case "identity":
      return <svg {...p}><rect x="2.5" y="5" width="19" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M5.5 16.2a4 4 0 0 1 7 0M15 10h4M15 14h3" /></svg>;
    case "grid":
      return <svg {...p}><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></svg>;
    default:
      return <svg {...p}><path d="m12 2 9 5-9 5-9-5 9-5z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></svg>;
  }
}
