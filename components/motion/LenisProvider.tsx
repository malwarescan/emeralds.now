"use client";

import { useEffect, useRef } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        duration: 1.2,
      });
      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
        lenisRef.current = null;
      };
    });
  }, []);

  return <>{children}</>;
}
