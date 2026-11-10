"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import AdminNav from "./AdminNav";

/**
 * Admin navigation below the lg breakpoint, where the sidebar is hidden.
 *
 * Rendering AdminNav inline in the sticky header made that header ~600px tall
 * on a phone — the grouped list is vertical — so it covered most of every
 * admin page. Instead the header carries a "Menu" button, and the nav drops
 * down over the page only while it is open.
 *
 * The panel is absolutely positioned against the <header> (its nearest
 * positioned ancestor, being sticky), so opening it overlays the content
 * rather than pushing it down.
 */
export default function MobileAdminNav() {
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  // The layout persists across navigations, so the open state would survive a
  // page change. Close whenever the path changes, which also covers browser
  // back/forward. Done during render (React's "adjust state when a prop
  // changes" pattern) rather than in an effect, so there is no frame where
  // the new page shows under a still-open menu.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="lg:hidden inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
        style={{
          color: "var(--text-secondary)",
          border: "1px solid var(--border)",
          background: open ? "var(--background)" : "transparent",
        }}
      >
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
        Menu
      </button>

      {/* Scrim: dims the page under the open menu; tapping it closes the menu.
          Starts below the 4rem header row so the header stays usable. */}
      {open && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-x-0 bottom-0 top-16"
          style={{ background: "color-mix(in srgb, var(--text-primary) 22%, transparent)" }}
        />
      )}

      <div
        id={panelId}
        hidden={!open}
        className="lg:hidden absolute inset-x-0 top-full p-3 overflow-y-auto overscroll-contain"
        style={{
          maxHeight: "calc(100dvh - 4rem)",
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "var(--shadow)",
        }}
      >
        {/* onNavigate closes the menu as soon as a link is followed, including
            the link to the page already open, where the path doesn't change. */}
        <AdminNav onNavigate={() => setOpen(false)} />
      </div>
    </>
  );
}
