# PR: Hero — background video with mobile-safe gating + poster fallback

## Summary
- Replaced CSS background-image hero with a **layered media stack**: video (when allowed) → image fallback → veil → content.
- Asset paths (do not rename until hero verified):
  - **Video:** `public/images/hero/emeralds-intro.mp4`
  - **Poster/fallback:** `public/images/hero/emeraldsnow-hero-image.webp`
- **Client-side gating:** Video only loads/plays when all of: reduced motion OFF, data saver OFF, connection not slow (no 2g/slow-2g, downlink ≥ 0.5).
- **Video:** muted, loop, playsInline, no controls, `object-fit: cover`, `poster` and `preload="metadata"`. On error, video is hidden and poster image remains visible (no black frame).
- **Veil:** Abyssal green only; calmer center/bottom, lighter top; text-safe zone for H1/CTA.
- **Typography:** H1 responsive (1.95rem @ 320px → 2.25rem @ 390px → 2.75rem @ 640px) with tuned tracking so no collision at 320px.

## QA notes (run before merge)
- **320px / 390px:** Hero readable, no overflow, CTA visible.
- **Reduced motion ON:** Hero shows image only; no `<video>` in DOM (no video load).
- **Low data / slow network:** Image only (gating prevents video).
- **Normal network:** Poster paints immediately; video plays on top when allowed; no layout shift.
- **Safari iOS:** Video plays inline (playsInline), no full-screen hijack.
- **Desktop:** Video plays; scroll performance unchanged.

## Performance
- LCP driven by poster image (always in DOM, `fetchPriority="high"`).
- No CLS: section has fixed min/max height; video and image are `absolute inset-0` with `object-cover`.
- Video fails → `display: none` on `<video>`; image layer remains visible.
