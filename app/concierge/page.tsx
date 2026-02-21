import { ConciergeOverlayTrigger } from "@/components/concierge/ConciergeOverlayTrigger";
import { GoldHairline } from "@/components/ui/GoldHairline";
import { webPage, organization, webSite, breadcrumbList } from "@/lib/schema/emit";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";

export const metadata = {
  title: "Concierge",
  description: "Speak to an artisan. Virtual or in-person appointments. Tailored emerald jewelry experience.",
};

export default function ConciergePage() {
  const schemaGraph = [
    organization(),
    webSite(false),
    webPage(`${base}/concierge`, "Concierge | Emeralds.now", "Speak to an artisan. Virtual or in-person appointments."),
    breadcrumbList([{ name: "Home", path: "/" }, { name: "Concierge", path: "/concierge" }]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph }),
        }}
      />

      <article
        style={{
          paddingLeft: "var(--rail-lg)",
          paddingRight: "var(--rail-lg)",
          paddingTop: "var(--space-2xl)",
          paddingBottom: "var(--space-3xl)",
          maxWidth: "36rem",
        }}
      >
        <h1 className="text-display-1 mb-6">Concierge</h1>
        <p className="text-body opacity-90 mb-8">
          Share your intent, budget, and timeline. We’ll prepare a tailored experience — virtual or in person — and connect you with an artisan.
        </p>
        <GoldHairline className="mb-8" />
        <ConciergeOverlayTrigger />
      </article>
    </>
  );
}
