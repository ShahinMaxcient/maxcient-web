import Navbar from "./Navbar";
import { getNavItems } from "@/lib/navigation";

export default async function NavbarServer() {
  const navItems = await getNavItems();
  return <Navbar navItems={navItems} />;
}
