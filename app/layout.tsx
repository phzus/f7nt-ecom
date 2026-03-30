// Migrado de: /layout/theme.liquid
// Root layout — equivalent to Shopify's theme.liquid

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/layout/Providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "f7nt.co — Win a 2026 BMW M4 Cummins + $10,000",
    template: "%s | f7nt.co",
  },
  description:
    "Shop f7nt.co and automatically earn entries to win a 2026 Limited BMW M4 Cummins + $10,000 cash. Every $1 spent = 200 entries.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://f7nt.co"
  ),
  openGraph: {
    siteName: "f7nt.co",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full`} suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "Montserrat, sans-serif" }}
        suppressHydrationWarning
      >
        <AnnouncementBar />
        <Header />
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
