// Each technology's brand colour, for the colourful home "Technologies" grid.
export function techBrandColor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("power bi")) return "#F2C811";
  if (n.includes("power platform") || n.includes("power apps") || n.includes("power automate")) return "#742774";
  if (n.includes("dynamics")) return "#0B53CE";
  if (n.includes("azure") || n.includes("cloud")) return "#0089D6";
  if (n.includes("openai") || n.includes("gpt") || n.includes("copilot") || n.includes("ai builder") || /\bai\b/.test(n)) return "#10A37F";
  if (n.includes("iot") || n.includes("internet of things")) return "#16A34A";
  if (n.includes("automation") || n.includes("rpa")) return "#0EA5E9";
  return "#7c3aed";
}

// Shared technology icon, chosen from the technology name. Used by the home
// "Technologies" grid and the industry-page tech cards so they read the same.
export default function TechIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  const n = name.toLowerCase();
  const p = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24" };
  if (n.includes("power bi") || n.includes("business intelligence"))
    return <svg {...p}><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" rx="1" /><rect x="12" y="8" width="3" height="10" rx="1" /><rect x="17" y="4" width="3" height="14" rx="1" /></svg>;
  if (n.includes("power platform") || n.includes("power apps") || n.includes("power automate"))
    return <svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /></svg>;
  if (n.includes("dynamics"))
    return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
  if (n.includes("azure") || n.includes("cloud"))
    return <svg {...p}><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 9.2 4 4 0 0 0 7 17h10.5z" /></svg>;
  if (n.includes("openai") || n.includes("gpt") || n.includes("copilot") || n.includes("ai builder") || /\bai\b/.test(n))
    return <svg {...p}><path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15l-1.9-4.1L5.5 9l4.6-1.4L12 3z" /><path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15z" /></svg>;
  if (n.includes("iot") || n.includes("internet of things"))
    return <svg {...p}><rect x="8" y="8" width="8" height="8" rx="1.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></svg>;
  if (n.includes("automation") || n.includes("rpa"))
    return <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.9 1.16V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.6 15H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6h.09A1.65 1.65 0 0 0 11 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 2.9 1.16l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 20.91 11H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
  return <svg {...p}><path d="M12 2 3 7v10l9 5 9-5V7l-9-5z" /><path d="M3 7l9 5 9-5M12 22V12" /></svg>;
}
