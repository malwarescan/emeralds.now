# Critical Path Video Script (60-90s)

Goal: capture one smooth run of the core commerce path.

## Path

1. Home (`/`)
2. Collection (`/collections/rings`)
3. Product detail (`/product/[handle]`)
4. Add to cart / acquire action
5. Cart and checkout handoff

## Recording Checklist

- [ ] Start with clean session (incognito)
- [ ] Show URL bar on each route
- [ ] Click one hero CTA and one card CTA
- [ ] Verify selected product title/price remain consistent PDP -> cart
- [ ] Show checkout summary line items
- [ ] Keep total duration between 60 and 90 seconds

## Current Blockers

- `Acquire` currently links to `/cart?add=...` but no cart route is implemented in app.
- Concierge fallback route (`/concierge`) is missing.

Resolve blockers before final recording.

