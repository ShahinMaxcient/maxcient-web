"use client";

import { useEffect } from "react";

/**
 * Last-resort error screen for the admin pages.
 *
 * Expected failures (a status that cannot be saved, an export that fails) are
 * reported as notifications and never reach here. This catches anything
 * unexpected, so the admin sees a way back instead of Next's generic error
 * page, and the sidebar stays usable because the layout is kept.
 */
export default function AdminError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      className="p-8 rounded-xl max-w-xl"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
    >
      <h1 className="text-lg font-bold">This page could not be loaded</h1>
      <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
        Something went wrong while loading or updating it. Your saved data is not affected. Try again, and if it keeps
        happening, reload the page.
        {error.digest && (
          <span className="block mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
            Reference: {error.digest}
          </span>
        )}
      </p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-5 text-sm font-medium px-4 py-2 rounded-md"
        style={{ background: "var(--text-primary)", color: "var(--background)" }}
      >
        Try again
      </button>
    </div>
  );
}
