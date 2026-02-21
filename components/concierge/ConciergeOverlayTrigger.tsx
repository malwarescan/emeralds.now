"use client";

import { useState } from "react";
import { ConciergeOverlay } from "./ConciergeOverlay";

export function ConciergeOverlayTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="cta-primary" onClick={() => setOpen(true)}>
        Begin conversation
      </button>
      {open && <ConciergeOverlay onClose={() => setOpen(false)} />}
    </>
  );
}
