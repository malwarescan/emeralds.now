#!/usr/bin/env tsx
/**
 * CI schema validation stub. Run: npm run schema:validate
 * In production: validate emitted JSON-LD against schema.org or Rich Results rules.
 */
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";

async function main() {
  const { organization, webSite, webPage, breadcrumbList } = await import("./emit");
  const org = organization();
  const site = webSite(false);
  const page = webPage("/", "Home", "Emeralds.now — authorized Muzem emerald jewelry");
  const breadcrumb = breadcrumbList([{ name: "Home", path: "/" }]);

  const graphs = [org, site, page, breadcrumb];
  for (const g of graphs) {
    if (!("@type" in g)) {
      console.error("Invalid schema: missing @type", g);
      process.exit(1);
    }
  }
  console.log("Schema emit check passed. Sample @id:", org["@id"], site["@id"]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
