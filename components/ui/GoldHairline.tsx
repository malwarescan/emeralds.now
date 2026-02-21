"use client";

import { type CSSProperties } from "react";

type GoldHairlineProps = {
  className?: string;
  vertical?: boolean;
  style?: CSSProperties;
};

export function GoldHairline({ className = "", vertical, style }: GoldHairlineProps) {
  return (
    <hr
      role="presentation"
      aria-hidden
      className={className}
      style={{
        border: "none",
        borderTop: vertical ? "none" : "var(--hairline-gold)",
        borderLeft: vertical ? "var(--hairline-gold)" : "none",
        width: vertical ? "1px" : "100%",
        height: vertical ? "100%" : "1px",
        margin: 0,
        ...style,
      }}
    />
  );
}
