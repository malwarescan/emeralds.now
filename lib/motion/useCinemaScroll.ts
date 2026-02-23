"use client";

import { useEffect, useRef } from "react";

type CinemaOpts = {
  plateMax?: number;
  fgMax?: number;
  fade?: boolean;
  enabled?: boolean;
};

export function useCinemaScroll<T extends HTMLElement>(opts: CinemaOpts = {}) {
  const ref = useRef<T | null>(null);
  const plateMax = opts.plateMax ?? 14;
  const fgMax = opts.fgMax ?? 8;
  const doFade = opts.fade ?? true;
  const enabled = opts.enabled ?? true;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!enabled) {
      el.style.setProperty("--cinema-plate-y", "0px");
      el.style.setProperty("--cinema-fg-y", "0px");
      el.style.setProperty("--cinema-a", "1");
      return;
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) {
      el.style.setProperty("--cinema-plate-y", "0px");
      el.style.setProperty("--cinema-fg-y", "0px");
      el.style.setProperty("--cinema-a", "1");
      return;
    }

    let raf = 0;

    const getScale = () => {
      if (window.innerWidth < 640) return 0.62;
      if (window.innerWidth < 1024) return 0.78;
      return 1;
    };

    const tick = () => {
      raf = 0;

      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const t = 1 - (r.top + r.height * 0.5) / vh;
      const clamped = Math.max(0, Math.min(1, t));
      const centered = (clamped - 0.5) * 2;
      const scale = getScale();

      const plateY = (-centered * plateMax * scale).toFixed(2);
      const fgY = (centered * fgMax * scale).toFixed(2);

      el.style.setProperty("--cinema-plate-y", `${plateY}px`);
      el.style.setProperty("--cinema-fg-y", `${fgY}px`);

      if (doFade) {
        const a = Math.max(0, Math.min(1, (clamped - 0.12) / 0.22));
        el.style.setProperty("--cinema-a", a.toFixed(3));
      } else {
        el.style.setProperty("--cinema-a", "1");
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [plateMax, fgMax, doFade, enabled]);

  return ref;
}
