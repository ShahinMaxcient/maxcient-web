import { getCollectionItems } from "./content";
import { getServices } from "./homepage";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export async function getNavItems(): Promise<NavItem[]> {
  const [services, industries, products, technologies] = await Promise.all([
    getServices(),
    getCollectionItems<{ title: string; href: string }>("industries"),
    getCollectionItems<{ title: string; href: string }>("products"),
    getCollectionItems<{ title: string; href: string }>("technologies"),
  ]);

  return [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "#",
      children: services.map((s) => ({ label: s.title, href: s.href })),
    },
    {
      label: "Industries",
      href: "#",
      children: industries.map((i) => ({ label: i.title, href: i.href })),
    },
    {
      label: "Products",
      href: "#",
      children: products.map((p) => ({ label: p.title, href: p.href })),
    },
    {
      label: "Technologies",
      href: "#",
      children: technologies.map((t) => ({ label: t.title, href: t.href })),
    },
    { label: "About", href: "/about-us" },
  ];
}
