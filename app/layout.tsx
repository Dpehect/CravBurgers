import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif, Manrope } from "next/font/google";
import AppProviders from "@/components/AppProviders";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "CRAV | Artisan Smashed Burgers",
    template: "%s | CRAV",
  },
  description:
    "Experience the ultimate artisan smashed burgers at CRAV. Fresh ingredients, bold flavors, and zero guilt. Est. 1997 — Navarra, España.",
  metadataBase: new URL("https://www.cravburgers.shop"),
  openGraph: {
    title: "CRAV | Artisan Smashed Burgers",
    description:
      "Experience the ultimate artisan smashed burgers at CRAV. Fresh ingredients, bold flavors, and zero guilt.",
    images: ["/img-webp/og-image.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${manrope.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AppProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
