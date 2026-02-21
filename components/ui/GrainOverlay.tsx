"use client";

/**
 * Soft grain texture overlay at 3% opacity — high-end paper/velvet feel.
 */
export function GrainOverlay() {
  return (
    <div
      className="grain-overlay"
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -9,
        pointerEvents: "none",
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' fill='%23fff'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
