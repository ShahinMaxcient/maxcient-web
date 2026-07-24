import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import AdminNav from "./AdminNav";

// Every admin route reads live data and must never be statically cached.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-60 shrink-0 sticky top-0 h-screen"
        style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
      >
        <Link href="/admin" className="flex items-center gap-2.5 px-5 h-16 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <div
            className="w-7 h-7 flex items-center justify-center font-extrabold text-[15px]"
            style={{ background: "var(--text-primary)", color: "var(--background)", borderRadius: "2px" }}
          >
            M
          </div>
          <span className="font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Maxcient Admin
          </span>
        </Link>
        <div className="p-3 flex-1 overflow-y-auto">
          <AdminNav />
        </div>
        <div className="p-3" style={{ borderTop: "1px solid var(--border)" }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-sm font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            View site ↗
          </a>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header
          className="sticky top-0 z-10"
          style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="px-5 sm:px-8 h-16 flex items-center justify-between">
            {/* Mobile brand (sidebar hidden) */}
            <Link href="/admin" className="flex items-center gap-2.5 lg:hidden">
              <div
                className="w-7 h-7 flex items-center justify-center font-extrabold text-[15px]"
                style={{ background: "var(--text-primary)", color: "var(--background)", borderRadius: "2px" }}
              >
                M
              </div>
              <span className="font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                Admin
              </span>
            </Link>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-4">
              <span className="text-sm hidden sm:inline" style={{ color: "var(--text-muted)" }}>
                {session.user.email}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/admin/login" });
                }}
              >
                <button
                  type="submit"
                  className="text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
                  style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
          {/* Mobile nav */}
          <div className="lg:hidden px-5 pb-3 overflow-x-auto">
            <AdminNav />
          </div>
        </header>
        <main className="flex-1 px-5 sm:px-8 py-8 max-w-[1200px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
