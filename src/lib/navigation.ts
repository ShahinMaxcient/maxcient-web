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

export async function getNavItems(): Promise<NavItem[]> {
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
      children: services.filter((s) => visible(s.href)).map((s) => ({ label: s.title, href: s.href })),
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
