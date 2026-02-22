/**
 * Short title for cards: 1–2 lines, no long catalog codes. PDP keeps full title.
 */
const MAX_CHARS = 52;

export function getShortTitle(fullTitle: string, maxChars = MAX_CHARS): string {
  if (!fullTitle) return fullTitle;
  let t = fullTitle.trim();
  // Drop common catalog-tail metadata that belongs to inventory exports, not card copy.
  t = t
    .replace(/\s*[-–—]\s*MUZEM[\w-]+$/i, "")
    .replace(/\s*(?:\(|\[).*?(?:sku|item|code)\s*[:#]?\s*[^)\]]+?(?:\)|\])\s*$/i, "")
    .replace(/\s*-\s*sku[:\s]*[\w-]+\s*$/i, "")
    .replace(/\s*-\s*item[:\s]*[\w-]+\s*$/i, "")
    .trim();

  if (t.length <= maxChars) return t;
  const cut = t.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > maxChars * 0.6) return cut.slice(0, lastSpace).trim() + "…";
  return cut.trim() + "…";
}
