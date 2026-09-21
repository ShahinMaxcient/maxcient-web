"use client";

import { useEffect, useState } from "react";

/**
 * Teaser bubble for the Dynamics 365 chat launcher.
 *
 * Microsoft's own proactive chat is a single on/off toggle: it fires on its own
 * schedule, on every page load, with no styling control. On a B2B site that is
 * the wrong trade — the visitors worth the most are usually the ones who
 * dislike being interrupted. This does the same job with the three things that
 * make it tolerable: a delay long enough that the visitor is reading rather
 * than arriving, once per browsing session, and a real dismiss control.
 *
 * Clicking it opens the actual widget through the SDK the bootstrapper exposes,
 * so there is one chat, not a fake one that has to hand over.
 */

// The teaser appears as soon as the widget can actually handle a click, rather
// than after a fixed delay. A fixed delay is a guess racing the widget: too
// short and the teaser is skipped because the SDK has not arrived, too long and
// the visitor has already scrolled past. The widget loads on browser idle, so
// its readiness is the only honest signal of when this is safe to show.
const POLL_MS = 400;
const GIVE_UP_MS = 20_000;

// A breath after the launcher appears, so the two do not pop in together.
const SETTLE_MS = 1_200;

// sessionStorage, not localStorage: suppressed for this visit, but someone
// returning next week is a new conversation and should see it again.
const DISMISSED_KEY = "mx-chat-teaser-dismissed";

/** The launcher is a 96px square pinned bottom-left (see globals.css). */
const LAUNCHER_SIZE = 96;

type Sdk = { startChat: (opts?: unknown) => void };

function getSdk(): Sdk | null {
  const w = window as unknown as {
    Microsoft?: { Omnichannel?: { LiveChatWidget?: { SDK?: Sdk } } };
  };
  const sdk = w.Microsoft?.Omnichannel?.LiveChatWidget?.SDK;
  return typeof sdk?.startChat === "function" ? sdk : null;
}

/** Storage throws outright in some privacy modes, so every access is guarded. */
function wasDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    sessionStorage.setItem(DISMISSED_KEY, "1");
  } catch {
    /* Private mode — the in-memory state below still hides it for this page. */
  }
}

type State = { visible: boolean; entered: boolean; reduceMotion: boolean };

const HIDDEN: State = { visible: false, entered: false, reduceMotion: false };

export default function ChatTeaser() {
  // One object rather than three flags: everything here is set together, in a
  // callback, which also keeps setState out of the effect body.
  const [{ visible, entered, reduceMotion }, setState] = useState<State>(HIDDEN);

  useEffect(() => {
    if (wasDismissed()) return;

    let settle = 0;

    const show = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Reduced motion starts already "entered", so there is nothing to animate.
      setState({ visible: true, entered: reduce, reduceMotion: reduce });
      if (!reduce) {
        // Next frame, so the transition has a start state to animate from.
        requestAnimationFrame(() => setState((s) => ({ ...s, entered: true })));
      }
    };

    // Watch for the widget rather than guessing how long it will take. If it
    // never loads, this simply gives up — a teaser that cannot open anything is
    // worse than no teaser, so staying silent is the right failure mode.
    const startedAt = Date.now();
    const poll = window.setInterval(() => {
      if (getSdk()) {
        window.clearInterval(poll);
        settle = window.setTimeout(show, SETTLE_MS);
      } else if (Date.now() - startedAt > GIVE_UP_MS) {
        window.clearInterval(poll);
      }
    }, POLL_MS);

    // If the visitor opens the chat themselves, the teaser has served its
    // purpose and would otherwise sit on top of the open panel.
    const hide = () => {
      setState(HIDDEN);
      markDismissed();
    };
    const events = ["lcw:threadUpdate", "lcw:chatQueued", "lcw:chatRetrieved"];
    events.forEach((e) => window.addEventListener(e, hide));

    return () => {
      window.clearInterval(poll);
      window.clearTimeout(settle);
      events.forEach((e) => window.removeEventListener(e, hide));
    };
  }, []);

  if (!visible) return null;

  const open = () => {
    markDismissed();
    setState(HIDDEN);
    getSdk()?.startChat();
  };

  const dismiss = () => {
    markDismissed();
    setState(HIDDEN);
  };

  return (
    <div
      className="fixed flex items-start gap-2"
      style={{
        left: 12,
        bottom: LAUNCHER_SIZE + 8,
        maxWidth: "min(280px, calc(100vw - 24px))",
        // Below Microsoft's 9999999 so this can never cover the launcher it
        // is pointing at.
        zIndex: 9999990,
        opacity: entered || reduceMotion ? 1 : 0,
        transform: entered || reduceMotion ? "none" : "translateY(8px)",
        transition: reduceMotion ? "none" : "opacity .28s ease, transform .28s ease",
      }}
    >
      <button
        type="button"
        onClick={open}
        className="text-left"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "12px 14px",
          boxShadow: "0 16px 40px -18px rgba(20,16,31,0.35)",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
          }}
        >
          Hi, I&rsquo;m Maxie
        </span>
        <span
          style={{
            display: "block",
            marginTop: 2,
            fontSize: 13,
            lineHeight: 1.45,
            color: "var(--text-muted)",
          }}
        >
          Maxcient&rsquo;s virtual assistant. Ask me about Dynamics&nbsp;365, ERP or CRM.
        </span>
      </button>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss chat invitation"
        style={{
          flexShrink: 0,
          width: 24,
          height: 24,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
          cursor: "pointer",
          lineHeight: 1,
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
