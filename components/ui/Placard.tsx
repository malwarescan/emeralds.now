"use client";

import { GoldHairline } from "./GoldHairline";

type PlacardProps = {
  title?: string;
  caption?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Gallery-label style container. Frames content with hairline and spacing — not a generic card.
 */
export function Placard({ title, caption, children, className = "" }: PlacardProps) {
  return (
    <figure
      className={className}
      style={{
        margin: 0,
        padding: "var(--space-lg)",
        border: "var(--hairline-gold)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-mist)",
      }}
    >
      {(title || caption) && (
        <>
          <figcaption className="text-caption text-technical mb-4 block">
            {title && <span className="block">{title}</span>}
            {caption && (
              <span className="opacity-78 mt-1 block">{caption}</span>
            )}
          </figcaption>
          <GoldHairline className="mb-4" />
        </>
      )}
      {children}
    </figure>
  );
}
