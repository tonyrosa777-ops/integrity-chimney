import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LocalBusinessSchema, WebsiteSchema } from "@/components/seo";
import { GlobalEmberLayer } from "@/components/animations/GlobalEmberLayer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://integritychimney.com"
  ),
  title: {
    default:
      "Integrity Chimney Services LLC | Bow, NH Chimney + Masonry + Roofing",
    template: "%s | Integrity Chimney Services LLC",
  },
  description:
    "Chimney, masonry, and roofing across central New Hampshire. One craftsman who answers the phone. Free estimates, fully insured, same-week scheduling for transactions under contract.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Integrity Chimney Services LLC",
    title:
      "Integrity Chimney Services LLC | Bow, NH Chimney + Masonry + Roofing",
    description:
      "Chimney, masonry, and roofing across central New Hampshire. Owner-operated. We answer the phone or your free estimate is on us.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Integrity Chimney Services LLC | Bow, NH Chimney + Masonry + Roofing",
    description:
      "Chimney, masonry, and roofing across central New Hampshire. Owner-operated. We answer the phone or your free estimate is on us.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base">
        <LocalBusinessSchema />
        <WebsiteSchema />
        <GlobalEmberLayer />
        <Navigation />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
