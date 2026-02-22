## Summary

Brief summary:

## Change type

- [ ] Feature
- [ ] Fix
- [ ] Refactor
- [ ] UI polish

## Maison Proof Pack (required for UI PRs)

Attach screenshots and verify all gates before requesting review.

- [ ] 390px — Featured ring card (proves no ghost plate, 56vh discipline, warm matte)
- [ ] 390px — Featured earrings card (proves subject occupancy and hooks/ring bias)
- [ ] 390px — Featured section with two consecutive cards
- [ ] 320px — Featured card / section scan (tightest constraint)
- [ ] Desktop — Featured section (full section layout + hierarchy)

If any of the above screenshots are missing, this PR must not be merged.

## Maison QA gates (hard pass/fail)

- [ ] A) Ghost plate regression (single mount surface only; no secondary rounded plate)
- [ ] B) Image viewport discipline (title + price + spec + View piece visible in one 390px scan)
- [ ] C) Subject occupancy consistency (category bias + focal scale applied where needed)
- [ ] D) Matte/paper tone + vignette restraint (warm tone, no white field, no obvious vignette effect)
- [ ] E) Typography hierarchy (shortTitle on cards, consistent price formatting, controlled spec tracking)
- [ ] F) Concierge collision (dot-only or moved up when overlap is detected)

## Notes

- Mention any blockers, assumptions, or follow-up items.
