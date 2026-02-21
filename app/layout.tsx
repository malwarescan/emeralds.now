import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "@/styles/globals.css";
import { TransitionProvider } from "@/components/motion/TransitionProvider";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ConciergeLiveDot } from "@/components/concierge/ConciergeLiveDot";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { getCrawlGeoGraph } from "@/lib/crawl/geo";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Emeralds.now | Authorized Muzem Emerald Jewelry", template: "%s | Emeralds.now" },
  description: "Authentic, licensed distributor of Muzem emerald jewelry. Origin-certified stones, atelier craftsmanship, white-glove service.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now"),
  openGraph: { type: "website" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const geoGraph = getCrawlGeoGraph();
  return (
    <html lang="en" className="lenis lenis-smooth">
      <body className={`${cormorant.variable} antialiased`} style={{ background: "#041E15", color: "var(--text-on-abyssal)" }}>
        {geoGraph.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({ "@context": "https://schema.org", "@graph": geoGraph }),
            }}
          />
        )}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <TransitionProvider>
          <LenisProvider>
          {/* Persistent shell: no white flash; abyssal green only */}
          <div
            className="fixed inset-0 -z-10"
            style={{ background: "#041E15" }}
            aria-hidden
          />
          <GrainOverlay />
          <SiteHeader />
          <main id="main" className="relative min-h-screen z-[1] pt-[60px]">
            {children}
          </main>
          <ConciergeLiveDot />
          </LenisProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
