"use client";

import { useActionState } from "react";
import { authenticate } from "./actions";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-4 py-3 rounded-lg outline-none transition-all"
          style={{ background: "var(--surface)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
          placeholder="admin@maxcient.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full px-4 py-3 rounded-lg outline-none transition-all"
          style={{ background: "var(--surface)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
          placeholder="••••••••"
        />
      </div>

      {errorMessage && (
        <p className="text-sm" style={{ color: "#dc2626" }} role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "var(--text-primary)", color: "var(--background)" }}
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
