# Maison Proof Pack (UI)  

## Scope

Use this for all UI PRs where visual product presentation changes.

## Required proof screenshots

- 390px Featured ring card
- 390px Featured earrings card
- 390px Featured list showing two consecutive cards
- 320px Featured card/scan
- Desktop Featured section

## Hard gates (pass/fail)

### A) Ghost plate regression

- Pass: only one mount surface is visible behind each product image (one rounded rectangle).
- Fail: any secondary rounded surface is still visible, even faintly.

### B) Image viewport discipline

- Pass: featured frame cap is `56vh` and title + price + spec + “View piece” are visible in one 390px scan.
- Fail: content requires extra scroll for basic identity.

### C) Subject occupancy consistency

- Pass: rings/earrings/pendants use focal centering with category bias and focalScale only when needed.
- Fail: earrings read as tiny objects floating in void or rings are cropped.

### D) Matte and vignette character

- Pass: matte reads warm paper, not screen white.
- Pass: vignette is restrained and never reads as a graphic effect.
- Fail: white panel dominates or vignette is visually obvious.

### E) Typography hierarchy

- Pass: cards use shortTitle (human-readable), PDP keeps full title.
- Pass: consistent currency formatting.
- Pass: spec remains uppercase micro-copy without excessive tracking.

### F) Concierge collision

- Pass: concierge does not overlap image frame or key card text on any supported breakpoint.
- Fail: concierge overlays object of desire.

## Merge rule

- Do not merge this PR without the full proof pack and all gate checkboxes completed.

## Sequence after Featured lock

1. Our Creations compaction (compact row tiles, mobile target 112px, one frame only)
2. Collections + PDP mount/focal parity
3. Mobile luxury loupe viewer (fullscreen viewer, pinch/zoom, swipe)
