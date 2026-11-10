"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

/**
 * Small notification stack for the Leads page: confirms saves and exports,
 * and reports failures. Announced to screen readers through live regions.
 */

type ToastKind = "success" | "error";
type ToastAction = { label: string; onClick: () => void };
type Toast = { id: number; kind: ToastKind; message: string; action?: ToastAction };

type ToastApi = {
  success: (message: string, action?: ToastAction) => void;
  error: (message: string) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

// Long enough to read a sentence; longer when there is an Undo button to reach.
const SUCCESS_MS = 6000;
const ACTION_MS = 10000;
const ERROR_MS = 10000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (kind: ToastKind, message: string, action?: ToastAction) => {
      const id = ++nextId.current;
      // Newest last, at most three on screen.
      setToasts((list) => [...list.slice(-2), { id, kind, message, action }]);
      setTimeout(() => dismiss(id), kind === "error" ? ERROR_MS : action ? ACTION_MS : SUCCESS_MS);
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({
      success: (message, action) => push("success", message, action),
      error: (message) => push("error", message),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Always rendered, so screen readers are already watching the region
          when a notification is added to it. */}
      <div aria-live="polite" className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 flex flex-col gap-2 sm:w-96 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.kind === "error" ? "alert" : undefined}
            className="pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg text-sm shadow-lg"
            style={
              t.kind === "error"
                ? { background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }
                : { background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0" }
            }
          >
            <span className="flex-1 leading-snug">{t.message}</span>
            {t.action && (
              <button
                type="button"
                className="font-semibold underline underline-offset-2 shrink-0"
                onClick={() => {
                  dismiss(t.id);
                  t.action?.onClick();
                }}
              >
                {t.action.label}
              </button>
            )}
            <button type="button" aria-label="Dismiss notification" className="shrink-0 opacity-70 hover:opacity-100" onClick={() => dismiss(t.id)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error("useToast must be used inside <ToastProvider>.");
  return api;
}
