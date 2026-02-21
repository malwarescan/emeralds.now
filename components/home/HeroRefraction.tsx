"use client";

/**
 * Emerald Refraction hero. Spec: WebGL (R3F + postprocessing) with fallback for low-power/reduced-motion.
 * Gradient fallback keeps LCP safe; add HeroRefractionWebGL (see spec §8.4) when R3F is wired.
 */
export function HeroRefraction() {
  return (
    <div
      className="absolute inset-0 -z-10"
      aria-hidden
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 30%, rgba(197, 160, 89, 0.05) 0%, transparent 50%),
          radial-gradient(ellipse 100% 80% at 70% 60%, transparent 0%, transparent 70%)
        `,
      }}
    />
  );
}
