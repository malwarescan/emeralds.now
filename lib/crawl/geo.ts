import { readFileSync } from "fs";
import { join } from "path";

let cachedOrg: Record<string, unknown> | null = null;
let cachedLocal: Record<string, unknown> | null = null;
let cachedWeb: Record<string, unknown> | null = null;

function loadJsonld(filename: string): Record<string, unknown> | null {
  try {
    const path = join(process.cwd(), "crawl", "geo", filename);
    const raw = readFileSync(path, "utf-8");
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function getCrawlOrganizationSchema(): Record<string, unknown> | null {
  if (cachedOrg) return cachedOrg;
  cachedOrg = loadJsonld("organization_schema.jsonld");
  return cachedOrg;
}

export function getCrawlLocalBusinessSchema(): Record<string, unknown> | null {
  if (cachedLocal) return cachedLocal;
  cachedLocal = loadJsonld("localbusiness_schema.jsonld");
  return cachedLocal;
}

export function getCrawlWebsiteSchema(): Record<string, unknown> | null {
  if (cachedWeb) return cachedWeb;
  cachedWeb = loadJsonld("website_schema.jsonld");
  return cachedWeb;
}

/** All GEO schemas as a single @graph for layout injection. */
export function getCrawlGeoGraph(): unknown[] {
  const org = getCrawlOrganizationSchema();
  const local = getCrawlLocalBusinessSchema();
  const web = getCrawlWebsiteSchema();
  const graph: unknown[] = [];
  if (org && !("@graph" in org)) graph.push(org);
  if (local && "@graph" in local && Array.isArray(local["@graph"])) graph.push(...(local["@graph"] as unknown[]));
  else if (local) graph.push(local);
  if (web && "@graph" in web && Array.isArray(web["@graph"])) graph.push(...(web["@graph"] as unknown[]));
  else if (web) graph.push(web);
  return graph;
}
