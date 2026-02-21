import { readFileSync } from "fs";
import { join } from "path";

let cachedFaq: Record<string, unknown> | null = null;

export function getCrawlFaqSchema(): Record<string, unknown> | null {
  if (cachedFaq) return cachedFaq;
  try {
    const path = join(process.cwd(), "crawl", "aeo", "faq_schema.jsonld");
    const raw = readFileSync(path, "utf-8");
    cachedFaq = JSON.parse(raw) as Record<string, unknown>;
    return cachedFaq;
  } catch {
    return null;
  }
}
