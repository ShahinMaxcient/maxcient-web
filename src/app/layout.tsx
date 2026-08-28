import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import IntroOverlay from "@/components/IntroOverlay";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

// Typography: Bricolage Grotesque for headings, Inter for body. Bricolage is a
// characterful grotesque — it gives the display type a designed, non-generic
// voice, away from the Poppins/Inter pairing every template ships with. Inter
// is aliased to --font-geist-sans so existing components pick it up; Bricolage
// is exposed as --font-display and applied to headings in globals.css.
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  // metadataBase makes every relative canonical/og URL below resolve to the
  // real domain. Without it Next emits relative og:url values, which most
  // social crawlers ignore.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Maxcient Technologies | Enterprise Solutions for UAE & GCC",
    // Pages that set a bare title get the brand appended automatically;
    // pages using pageMetadata() supply their own full string.
    template: "%s",
  },
  description:
    "Unlock business value with Maxcient's enterprise-grade solutions tailored for UAE and GCC markets.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_AE",
    url: "/",
    title: "Maxcient Technologies | Enterprise Solutions for UAE & GCC",
    description:
      "Unlock business value with Maxcient's enterprise-grade solutions tailored for UAE and GCC markets.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxcient Technologies | Enterprise Solutions for UAE & GCC",
    description:
      "Unlock business value with Maxcient's enterprise-grade solutions tailored for UAE and GCC markets.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// Pages are cached and served from the CDN, then re-rendered on demand.
// Freshness comes from two directions: every admin save calls
// revalidatePath(..., "layout"), which purges the cache immediately — so
// editors still see their changes at once — and the 5-minute window below
// catches anything written to the database outside the admin (or a render
// that cached fallback defaults during a DB blip). This replaced
// force-dynamic, which was invoking a function + ~a dozen DB queries on
// EVERY page view (age: 0, x-vercel-cache: MISS) for content that changes
// a few times a week. Admin routes stay fully dynamic via their own
// segment config; anything reading cookies()/headers() opts out anyway.
export const revalidate = 300;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <ScrollToTop />
        {children}
        <IntroOverlay />
      </body>
    </html>
  );
}
