import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

// Matches www.maxcient.com typography: Poppins for headings, Inter for body.
// Inter is aliased to --font-geist-sans so existing components pick it up;
// Poppins is exposed as --font-poppins and applied to headings in globals.css.
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Maxcient Technologies | Enterprise Solutions for UAE & GCC",
  description:
    "Unlock business value with Maxcient's enterprise-grade solutions tailored for UAE and GCC markets.",
};

// Render every route dynamically (server-rendered on each request) so admin
// edits always show instantly and the build never queries the database — which
// also keeps Vercel deploys fast. Applies to all nested segments.
export const dynamic = "force-dynamic";

// Pages are statically cached and served instantly from the CDN. Every admin
// save calls revalidatePath(...), which rebuilds the affected pages with fresh
// database content immediately — fast for visitors, current for editors.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
