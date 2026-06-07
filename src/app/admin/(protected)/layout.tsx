import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { auth, signOut } from "@/auth";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <header
        className="sticky top-0 z-10"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 flex items-center justify-center font-extrabold text-[15px]"
              style={{ background: "var(--text-primary)", color: "var(--background)", borderRadius: "2px" }}
            >
              M
            </div>
            <span className="font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Maxcient Admin
            </span>
          </div>
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
      </header>
      <main className="max-w-[1200px] mx-auto px-5 sm:px-8 py-8">{children}</main>
    </div>
  );
}
