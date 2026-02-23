import type { Metadata } from "next";
import "./globals.css";
import { SITE_META } from "@/lib/seo/meta";
import { organizationSchema, websiteSchema } from "@/lib/schema/emit";
import ConciergeLiveDot from "@/components/concierge/ConciergeLiveDot";
import RouteTransition from "@/components/motion/RouteTransition";
import CtaClickCapture from "@/components/analytics/CtaClickCapture";

export const metadata: Metadata = SITE_META;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = organizationSchema();
  const webSchema = websiteSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="min-h-screen bg-abyssal text-cream antialiased"
        style={{ background: "var(--abyssal, #0d1f17)", color: "var(--cream, #f5f0e8)" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSchema) }}
        />
        <RouteTransition>{children}</RouteTransition>
        <CtaClickCapture />
        <ConciergeLiveDot />
      </body>
    </html>
  );
}
