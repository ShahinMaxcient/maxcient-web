"use client";

import { useEffect } from "react";
import Script from "next/script";
import { getKnownPage } from "@/lib/known-pages";

/**
 * Dynamics 365 Contact Center live chat widget.
 *
 * Loads Microsoft's Live Chat Widget bootstrapper, which renders the floating
 * chat launcher and connects the visitor to the "Maxcient Website" workstream.
 *
 * Loaded with `lazyOnload` — Next's own guide names chat support plugins as the
 * canonical case for it. The widget is never on the critical path, and this
 * site has already been bitten once by third-party JS competing with hydration
 * and delaying navigation clicks (see the comment in HeroGlobe.tsx). Idle-time
 * loading keeps it out of that window entirely.
 *
 * Microsoft's published snippet carries an inline `onerror` handler that swaps
 * in a blob-storage fallback when the CDN is unreachable. That is reproduced
 * below as a real React `onError` callback instead of an inline attribute:
 * same behaviour, but nothing depends on inline handlers being permitted, and
 * it survives React re-rendering the element.
 *
 * Every origin this touches has to be named in the CSP in next.config.ts. If
 * the launcher silently fails to appear, check the console for a CSP violation
 * before assuming the configuration is wrong.
 */

// Identity of the chat widget, taken from "Copy Widget Script" on the
// workstream in Copilot Service admin center (Workstreams → Maxcient Website).
//
// Deliberately the per-widget script rather than the Engagement Ruleset's
// single-tag script. Both deliver the same widget, but the ruleset variant
// identifies itself with data-ruleset-id and serves the classic UI, ignoring
// the brand colour, header and intro page configured on the channel — even
// with the channel's UI version set to Modern. Styling on that path has to be
// hand-written as Config Override JSON on the rule instead. The per-widget
// script uses data-app-id and honours the channel configuration directly.
//
// The trade-off is no rule-based targeting (site areas, proactive invitation
// rules). There is one site and one widget here, so nothing is lost; switch
// back to the ruleset script if per-page behaviour is ever needed.
//
// None of these values are secret
// — they ship in the page HTML by definition — so they are checked in, with an
// env override so the trial environment can be swapped for a production one
// without a code change. The trial org expires, so that swap is coming.
const ORG_ID = process.env.NEXT_PUBLIC_D365_ORG_ID ?? "eb8f27ca-097c-ef11-ac1f-6045bd6a625f";
const ORG_URL =
  process.env.NEXT_PUBLIC_D365_ORG_URL ??
  "https://m-eb8f27ca-097c-ef11-ac1f-6045bd6a625f.ae.omnichannelengagementhub.com";
const APP_ID = process.env.NEXT_PUBLIC_D365_APP_ID ?? "27abab68-6605-490b-8532-77fbd8d2775d";
// Matches the value in the snippet Microsoft generates. Setting "v2" here was
// tried and changed nothing — the bootstrapper already loads the v2 widget
// shell (v2scripts/ and v2public/chatv2.html) regardless of this attribute.
// Microsoft's "Live Chat Widget 2.0" customisation route is a different
// snippet with a data-customization-callback, not this flag.
const LCW_VERSION = process.env.NEXT_PUBLIC_D365_LCW_VERSION ?? "prod";

// The bootstrapper finds its own <script> element by this id to read the
// data-* attributes below, so it must not be renamed.
const WIDGET_ID = "Microsoft_Omnichannel_LCWidget";

// Regional endpoints — UAE. These are paired with the CSP entries in
// next.config.ts, which is why they live in code rather than env: changing
// region means changing both together.
const CDN_SRC = "https://oc-cdn-ocuae-uae.azureedge.net/livechatwidget/scripts/LiveChatBootstrapper.js";
const FALLBACK_SRC =
  "https://ocprodocuaeuaegs.blob.core.windows.net/livechatwidget/scripts/LiveChatBootstrapper.js";

/**
 * Re-inject the bootstrapper from blob storage when the CDN fails.
 *
 * Mirrors Microsoft's own fallback, which carries the same attributes as the
 * primary tag. Guarded so a repeated error cannot stack up duplicate widgets.
 */
let fallbackAttempted = false;

function loadFallback() {
  if (typeof document === "undefined" || fallbackAttempted) return;
  fallbackAttempted = true;

  // Drop the tag that failed, so the bootstrapper cannot find a dead element
  // when it looks itself up by id.
  document.getElementById(WIDGET_ID)?.remove();

  const s = document.createElement("script");
  s.src = FALLBACK_SRC;
  s.id = WIDGET_ID;
  s.setAttribute("data-app-id", APP_ID);
  s.setAttribute("data-lcw-version", LCW_VERSION);
  s.setAttribute("data-org-id", ORG_ID);
  s.setAttribute("data-org-url", ORG_URL);
  document.body.appendChild(s);
}

/**
 * Page context handed to the conversation when a visitor starts a chat.
 *
 * Tells Maxie, and any person the chat is handed to, which page the visitor
 * was reading, so a question asked from the RealtyAI Sales page is understood
 * as a RealtyAI Sales question without the visitor having to say so.
 *
 * Each key becomes a context variable on the conversation. A key with no
 * matching variable on the workstream is created at runtime as a string, so
 * nothing has to exist in Dynamics first. To reach Maxie, each also needs a
 * Copilot Studio global variable of exactly the same name (case-sensitive)
 * with "External sources can set values" turned on. isDisplayable shows the
 * values to the representative in the conversation summary after a handoff.
 */
type ContextValue = { value: string; isDisplayable: boolean };

type LiveChatSDK = {
  setContextProvider: (provider: () => Record<string, ContextValue>) => void;
};

type LiveChatWindow = Window & {
  Microsoft?: { Omnichannel?: { LiveChatWidget?: { SDK?: LiveChatSDK } } };
};

/**
 * Invoked by the widget when a new chat starts, not when this is registered.
 * Reading location and title here, at call time, is what makes the context
 * right after client-side navigation: the widget outlives page changes, so the
 * page the chat starts on is rarely the one the widget loaded on.
 */
function pageContext(): Record<string, ContextValue> {
  const { origin, pathname } = window.location;
  const known = getKnownPage(pathname.replace(/^\/+|\/+$/g, ""));

  const context: Record<string, ContextValue> = {};
  const set = (key: string, value: string | undefined) => {
    if (value) context[key] = { value, isDisplayable: true };
  };

  // Origin and path only. The query string is dropped on purpose: campaign
  // links can carry an email address or tracking token, and none of that
  // belongs in a CRM record.
  set("PageUrl", origin + pathname);
  set("PageTitle", document.title);
  // Only for the service, product, industry and technology pages, named as the
  // site names them. Blog posts and the home page fall back to the title.
  set("PageTopic", known?.name);
  set("PageCategory", known?.group);
  return context;
}

function registerPageContext() {
  const sdk = (window as LiveChatWindow).Microsoft?.Omnichannel?.LiveChatWidget?.SDK;
  if (!sdk) return;
  try {
    sdk.setContextProvider(pageContext);
  } catch (err) {
    // Context is a nicety; a failure here must never stop the chat working.
    console.error("Could not register chat page context:", err);
  }
}

export default function ContactCenterChat() {
  useEffect(() => {
    // The SDK may only be called once the widget raises lcw:ready, which is
    // normally still to come: this effect runs at hydration, long before a
    // lazyOnload script loads.
    //
    // The direct call covers the one case where it has already fired. Leaving
    // for /admin unmounts this layout; coming back remounts it, but
    // next/script never loads the same id twice, so the widget is already up
    // and lcw:ready will not fire again.
    registerPageContext();
    window.addEventListener("lcw:ready", registerPageContext);
    return () => window.removeEventListener("lcw:ready", registerPageContext);
  }, []);

  return (
    <Script
      id={WIDGET_ID}
      src={CDN_SRC}
      strategy="lazyOnload"
      data-app-id={APP_ID}
      data-lcw-version={LCW_VERSION}
      data-org-id={ORG_ID}
      data-org-url={ORG_URL}
      onError={loadFallback}
    />
  );
}
