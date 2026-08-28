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
            <p>This website does not use cookies to track you, and it does not use advertising or analytics cookies at all. No consent banner is required because there is nothing to consent to.</p>
            <h2 className="text-xl font-bold t-heading mt-8">What Are Cookies</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They help a website recognize your device and remember information between visits.</p>
            <h2 className="text-xl font-bold t-heading mt-8">What This Site Actually Stores</h2>
            <p><strong>No cookies on public pages.</strong> Browsing this website sets no cookies of any kind. We run no analytics, advertising, or third-party tracking software, so nothing about your visit is recorded on your device or shared with anyone else.</p>
            <p><strong>One item of session storage.</strong> When you first arrive, a short welcome animation plays. So that it does not replay on every page, your browser stores a single value (<code>mx-intro-seen</code>) in session storage. It contains no personal information, is never sent to our servers, and is erased automatically when you close the tab.</p>
            <p><strong>A sign-in cookie for staff only.</strong> Maxcient employees signing in to the private content-management area receive a session cookie so they stay authenticated. This is strictly necessary for that area to work and is never set for ordinary visitors.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Information You Send Us</h2>
            <p>If you complete a form on this site, we receive the details you type in so we can respond to your enquiry. That is information you have chosen to send us, not something collected automatically by a cookie. See our <a href="/privacy-policy" className="text-[var(--primary)] hover:underline">Privacy Policy</a> for how it is handled.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Managing Cookies</h2>
            <p>You can control and delete cookies through your browser settings at any time. Because this site sets none for ordinary visitors, blocking them will not affect your browsing here.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Contact</h2>
            <p>For questions about our cookie policy, email <a href="mailto:hello@maxcient.com" className="text-[var(--primary)] hover:underline">hello@maxcient.com</a>.</p>
          </div>
        </div>
      </main>
    </>
  );
}
