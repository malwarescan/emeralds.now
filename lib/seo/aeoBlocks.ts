/**
 * AEO: Answer-first blocks. 2–4 sentence summary + bullet specs.
 * Structured headings map to intents: origin, certification, treatments, return, shipping, sizing, custom.
 */

export type AeoBlock = {
  heading: string;
  summary: string;
  bullets?: string[];
};

export function renderAeoBlock(block: AeoBlock): string {
  let out = `<h2>${block.heading}</h2>\n<p>${block.summary}</p>`;
  if (block.bullets?.length) {
    out += `\n<ul>${block.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`;
  }
  return out;
}

/** PDP: The Stone — origin, carat, treatment, certification */
export const PDP_STONE_HEADING = "The Stone";
export const PDP_STONE_INTENTS = ["origin", "certification", "carat", "treatment", "mine"] as const;

/** PDP: The Setting — metal, craftsmanship, atelier */
export const PDP_SETTING_HEADING = "The Setting";

/** PDP: Proof — certificates, grading, authenticity */
export const PDP_PROOF_HEADING = "Proof";

/** PDP: Care — storage, wear, maintenance */
export const PDP_CARE_HEADING = "Care";

/** PDP: Delivery & Returns — luxury concise */
export const PDP_DELIVERY_HEADING = "Delivery & Returns";
