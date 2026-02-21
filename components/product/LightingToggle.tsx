"use client";

import { useCallback, useSyncExternalStore } from "react";

export type LightingMode = "candle" | "daylight";

const STORAGE_KEY = "emeraude-pdp-lighting";

function getSnapshot() {
  if (typeof window === "undefined") return "daylight" as LightingMode;
  return (localStorage.getItem(STORAGE_KEY) as LightingMode) ?? "daylight";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useLightingMode() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useSetLightingMode() {
  return useCallback((mode: LightingMode) => {
    localStorage.setItem(STORAGE_KEY, mode);
    window.dispatchEvent(new Event("storage"));
  }, []);
}

type LightingToggleUIProps = {
  mode: LightingMode;
  onChange: (mode: LightingMode) => void;
  className?: string;
};

/**
 * Gallery lighting switch: minimalist — small gold dot + label. Not a toggle button.
 */
export function LightingToggle({ mode, onChange, className = "" }: LightingToggleUIProps) {
  return (
    <div
      className={className}
      role="group"
      aria-label="Lighting"
      style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}
    >
      <button
        type="button"
        onClick={() => onChange("candle")}
        aria-pressed={mode === "candle"}
        aria-label="Candlelight 2700K"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2xs)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-on-abyssal-muted)",
          fontFamily: "var(--font-technical)",
          fontSize: "var(--text-caption)",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: mode === "candle" ? "var(--color-gold)" : "var(--color-mist)",
            transition: "background var(--duration-normal) var(--ease-soft-decel)",
          }}
        />
        Candlelight
      </button>
      <span style={{ color: "var(--color-gold-subtle)", fontSize: "0.75rem" }}>|</span>
      <button
        type="button"
        onClick={() => onChange("daylight")}
        aria-pressed={mode === "daylight"}
        aria-label="Daylight 5600K"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2xs)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-on-abyssal-muted)",
          fontFamily: "var(--font-technical)",
          fontSize: "var(--text-caption)",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: mode === "daylight" ? "var(--color-gold)" : "var(--color-mist)",
            transition: "background var(--duration-normal) var(--ease-soft-decel)",
          }}
        />
        Daylight
      </button>
    </div>
  );
}
