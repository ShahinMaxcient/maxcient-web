import { pageMetadata } from "@/lib/seo";

// Unique title/description per page; Admin → Pages can override both.
export const generateMetadata = () =>
  pageMetadata({
    slug: "cookie-policy",
    title: "Cookie Policy",
    description:
      "How Maxcient Technologies uses cookies and browser storage on this website.",
  });


export default function CookiePolicy() {
  return (
    <>
      <main className="pt-28 pb-20 t-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold t-heading">Cookie Policy</h1>
          <div className="mt-8 space-y-6 t-body leading-relaxed">
            <p>This website does not use advertising or tracking cookies. The few things it does store, including what the Microsoft chat window may store, are listed below.</p>
            <h2 className="text-xl font-bold t-heading mt-8">What Are Cookies</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They help a website recognize your device and remember information between visits.</p>
            <h2 className="text-xl font-bold t-heading mt-8">What This Site Actually Stores</h2>
            <p><strong>No cookies of our own on public pages.</strong> This website sets no cookies for ordinary visitors, and runs no advertising or cross-site tracking. We count page views and measure loading speed with Vercel&rsquo;s analytics, which works without cookies and records visits anonymously rather than tying them to you.</p>
            <p><strong>Live chat.</strong> The chat window is provided by Microsoft Dynamics 365 Contact Center and loads from Microsoft&rsquo;s servers on every public page, whether or not you open it. It runs in its own frame on a Microsoft domain and may store information in your browser, for example to keep an open conversation connected when you move between pages or reload. See our <a href="/privacy-policy" className="text-[var(--primary)] hover:underline">Privacy Policy</a> for how chat conversations are handled.</p>
            <p><strong>One item of session storage.</strong> When you first arrive, a short welcome animation plays. So that it does not replay on every page, your browser stores a single value (<code>mx-intro-seen</code>) in session storage. It contains no personal information, is never sent to our servers, and is erased automatically when you close the tab.</p>
            <p><strong>A sign-in cookie for staff only.</strong> Maxcient employees signing in to the private content-management area receive a session cookie so they stay authenticated. This is strictly necessary for that area to work and is never set for ordinary visitors.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Information You Send Us</h2>
            <p>If you complete a form or use the chat on this site, we receive the details you type in so we can respond to your enquiry. That is information you have chosen to send us, not something collected automatically by a cookie. See our <a href="/privacy-policy" className="text-[var(--primary)] hover:underline">Privacy Policy</a> for how it is handled.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Managing Cookies</h2>
            <p>You can control and delete cookies and other stored data through your browser settings at any time. This site sets no cookies for ordinary visitors, so blocking them will not affect your browsing here, though blocking storage for other sites may stop an open chat from reconnecting after you change pages.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Contact</h2>
            <p>For questions about our cookie policy, email <a href="mailto:hello@maxcient.com" className="text-[var(--primary)] hover:underline">hello@maxcient.com</a>.</p>
          </div>
        </div>
      </main>
    </>
  );
}
