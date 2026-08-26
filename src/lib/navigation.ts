import { cache } from "react";
import { getCollectionItems } from "./content";
import { getServices } from "./homepage";
import { getHiddenSlugs } from "./pages";

export type NavChild = { label: string; href: string; children?: { label: string; href: string }[] };

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

type ProductNav = { title: string; href: string; subItems?: { label: string; href: string }[] | null };

// Short labels for the Services dropdown, keyed by href. Lets a service keep a
// descriptive title on its homepage card while showing a concise menu label.
const SERVICE_NAV_LABELS: Record<string, string> = {
  "/erp-and-crm": "CRM and ERP",
};

async function getNavItems__uncached(): Promise<NavItem[]> {
  const [services, industries, products, technologies, hidden] = await Promise.all([
    getServices(),
    getCollectionItems<{ title: string; href: string }>("industries"),
    getCollectionItems<ProductNav>("products"),
    getCollectionItems<{ title: string; href: string }>("technologies"),
    getHiddenSlugs(),
  ]);

  // Drop links whose page has been hidden in Admin → Pages.
  const visible = (href: string) => !hidden.has(href.replace(/^\//, "").split("#")[0]);

  return [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "#",
      children: services.filter((s) => visible(s.href)).map((s) => ({ label: SERVICE_NAV_LABELS[s.href] ?? s.title, href: s.href })),
    },
    {
      label: "Industries",
      href: "#",
      children: industries.filter((i) => visible(i.href)).map((i) => ({ label: i.title, href: i.href })),
    },
    {
      label: "Products",
      href: "#",
      children: products.filter((p) => visible(p.href)).map((p) => {
        const subs = Array.isArray(p.subItems) ? p.subItems.filter((s) => s?.label) : [];
        return subs.length > 0
          ? { label: p.title, href: p.href, children: subs }
          : { label: p.title, href: p.href };
      }),
    },
    {
      label: "Technologies",
      href: "#",
      children: technologies.filter((t) => visible(t.href)).map((t) => ({ label: t.title, href: t.href })),
    },
    { label: "About", href: "/about-us" },
  ];
}

/** Request-level dedupe: repeated calls in one render hit the DB once. */
export const getNavItems = cache(getNavItems__uncached);
