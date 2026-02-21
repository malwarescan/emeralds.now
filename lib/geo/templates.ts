/**
 * GEO page framework. Localized copy, concierge CTA, FAQ, internal links to products.
 */

export type GeoPageParams = {
  city: string;
  intent: string; // e.g. "emerald-rings", "emerald-necklaces", "custom-emerald-jewelry"
};

export type GeoTemplate = {
  title: string;
  description: string;
  h1: string;
  summary: string;
  ctaCopy: string;
  faqHeading?: string;
  faqs?: Array<{ q: string; a: string }>;
  collectionHandles?: string[];
};

const INTENT_TITLES: Record<string, string> = {
  "emerald-rings": "Emerald Rings",
  "emerald-necklaces": "Emerald Necklaces",
  "emerald-bracelets": "Emerald Bracelets",
  "custom-emerald-jewelry": "Custom Emerald Jewelry",
};

export function getGeoTemplate(city: string, intent: string): GeoTemplate {
  const intentTitle = INTENT_TITLES[intent] ?? intent;
  const cityLabel = city.replace(/-/g, " ");
  return {
    title: `${intentTitle} in ${cityLabel} | Emeralds.now`,
    description: `Discover ${intentTitle.toLowerCase()} in ${cityLabel}. Origin-certified emeralds, atelier craftsmanship, concierge service.`,
    h1: `${intentTitle} in ${cityLabel}`,
    summary: `We serve clients in ${cityLabel} with the same white-glove experience as our atelier. Virtual consultations and in-person appointments available.`,
    ctaCopy: "Speak to an artisan in your region",
    faqHeading: "Frequently asked",
    faqs: [
      { q: "Do you ship to " + cityLabel + "?", a: "Yes. We ship internationally with full insurance and signature delivery." },
      { q: "Can I see pieces in person in " + cityLabel + "?", a: "We offer by-appointment viewings in select cities. Request a conversation to arrange." },
    ],
    collectionHandles: intent.includes("ring") ? ["rings"] : intent.includes("necklace") ? ["necklaces"] : intent.includes("bracelet") ? ["bracelets"] : [],
  };
}
