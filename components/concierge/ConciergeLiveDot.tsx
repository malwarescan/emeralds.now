"use client";

import { useState } from "react";
import { ConciergeOverlay } from "./ConciergeOverlay";

/**
 * Live concierge: pulsing gold dot + "An artisan is available."
 * Slow, subtle pulse (3.5–6s). Click opens conversational UI.
 */
export function ConciergeLiveDot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="concierge-pill fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3 text-left transition-all duration-300"
        style={{
          border: "1px solid var(--color-gold-subtle)",
          borderRadius: 0,
          background: "var(--abyss)",
          color: "var(--paper)",
        }}
        aria-label="Open concierge — an artisan is available"
      >
        <span
          className="h-2 w-2 rounded-full flex-shrink-0 animate-pulse-slow"
          style={{
            background: "var(--color-gold)",
            boxShadow: "0 0 12px var(--color-gold-muted)",
          }}
        />
        <span className="text-technical text-caption">An artisan is available.</span>
      </button>

      {open && (
        <ConciergeOverlay onClose={() => setOpen(false)} />
      )}
    </>
  );
}
