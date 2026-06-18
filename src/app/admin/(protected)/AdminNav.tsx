"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Leads", exact: true },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            style={{
              background: active ? "var(--text-primary)" : "transparent",
              color: active ? "var(--background)" : "var(--text-secondary)",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
