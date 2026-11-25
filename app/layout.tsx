import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Righteous, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-retro",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uzmarketplace.co.zw"),
  title: {
    default: "UZ Marketplace — Discover. Shop. Sell. Connect.",
    template: "%s — UZ Marketplace",
  },
  description:
    "Buy, sell products and offer services to the University of Zimbabwe community — all in one convenient online marketplace. Early access registration is open — it's free. Launching 15 November 2026.",
  keywords: [
    "UZ Marketplace",
    "University of Zimbabwe",
    "University of Zimbabwe students",
    "UZ online marketplace",
    "sell on campus",
    "student marketplace Zimbabwe",
    "UZ student entrepreneur",
  ],
  authors: [{ name: "UZ Marketplace" }],
  creator: "UZ Marketplace",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://uzmarketplace.co.zw/",
    siteName: "UZ Marketplace",
    title: "Discover. Shop. Sell. Connect.",
    description:
      "Discover products, shop from fellow students, find useful services and showcase your own business — all within the University of Zimbabwe community. Early access registration is open — it's free. Launching 15 November 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover. Shop. Sell. Connect.",
    description:
      "Early access registration is open — it's free. Launching 15 November 2026.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${righteous.variable}`}>
      <body>{children}</body>
    </html>
  );
}
