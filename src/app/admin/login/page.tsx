import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Sign In — Maxcient",
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "var(--background)" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl"
        style={{ background: "var(--card-bg)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
      >
        <div className="flex items-center gap-2.5 mb-7">
          <div
            className="w-8 h-8 flex items-center justify-center font-extrabold text-[17px]"
            style={{ background: "var(--text-primary)", color: "var(--background)", borderRadius: "2px" }}
          >
            M
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Maxcient Admin
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          Sign in
        </h1>
        <p className="text-sm mb-7" style={{ color: "var(--text-muted)" }}>
          Access the leads dashboard.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
