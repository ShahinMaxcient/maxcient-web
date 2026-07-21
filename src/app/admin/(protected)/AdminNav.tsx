"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; exact?: boolean; icon: React.ReactNode };
type Group = { title: string; items: Item[] };

const I = {
  inbox: <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M3 9h4l2 3h6l2-3h4" />,
  hero: <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v14H4z M4 15l4-4 4 4 3-3 5 5" />,
  layers: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5z M3 13l9 5 9-5" />,
  heading: <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 12h10M4 19h16" />,
  grid: <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z" />,
  pages: <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13H7z M14 3v5h5" />,
  info: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z M12 8h.01M11 12h1v4h1" />,
  blog: <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h11l3 3v13H5z M9 9h7M9 13h7M9 17h4" />,
  cog: <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z M19 12a7 7 0 00-.1-1l2-1.5-2-3.5-2.4 1a7 7 0 00-1.7-1L14.5 2h-4l-.3 2.5a7 7 0 00-1.7 1l-2.4-1-2 3.5L4.1 11a7 7 0 000 2l-2 1.5 2 3.5 2.4-1a7 7 0 001.7 1l.3 2.5h4l.3-2.5a7 7 0 001.7-1l2.4 1 2-3.5-2-1.5a7 7 0 00.1-1z" />,
};

const GROUPS: Group[] = [
  {
    title: "Main",
    items: [{ href: "/admin", label: "Leads", exact: true, icon: I.inbox }],
  },
  {
    title: "Homepage",
    items: [
      { href: "/admin/hero", label: "Hero Banner", icon: I.hero },
      { href: "/admin/homepage", label: "Services & Reviews", icon: I.layers },
      { href: "/admin/sections", label: "Section Headers", icon: I.heading },
    ],
  },
  {
    title: "Pages & Content",
    items: [
      { href: "/admin/content", label: "Content Library", icon: I.grid },
      { href: "/admin/pages", label: "Pages", icon: I.pages },
      { href: "/admin/about", label: "About Page", icon: I.info },
      { href: "/admin/blog", label: "Blog", icon: I.blog },
    ],
  },
  {
    title: "Configuration",
    items: [{ href: "/admin/settings", label: "Site Settings", icon: I.cog }],
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-5">
      {GROUPS.map((group) => (
        <div key={group.title}>
          <div
            className="px-3 mb-1.5"
            style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--text-muted)" }}
          >
            {group.title}
          </div>
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{
                    background: active ? "var(--text-primary)" : "transparent",
                    color: active ? "var(--background)" : "var(--text-secondary)",
                  }}
                >
                  <svg
                    className="w-[17px] h-[17px] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    viewBox="0 0 24 24"
                    style={{ opacity: active ? 0.9 : 0.6 }}
                  >
                    {item.icon}
                  </svg>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
