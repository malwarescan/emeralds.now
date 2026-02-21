"use client";

import { useState } from "react";
import Image from "next/image";
import { LightingToggle, useLightingMode, useSetLightingMode } from "./LightingToggle";

export type PdpImage = {
  url: string;
  alt?: string;
  width: number;
  height: number;
  /** Cloudinary public_id or URL for candle/daylight variants */
  candleUrl?: string;
  daylightUrl?: string;
};

type PdpGalleryProps = {
  images: PdpImage[];
  productName: string;
  /** Blur placeholder data URL or small image URL (emerald tint) */
  placeholder?: string;
};

/**
 * PDP hero + gallery. Blur-up; lighting toggle crossfade 250–450ms.
 */
export function PdpGallery({ images, productName, placeholder }: PdpGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mode = useLightingMode();
  const setMode = useSetLightingMode();

  const primary = images[0];
  if (!primary) return null;

  const primaryUrl = mode === "candle" && primary.candleUrl ? primary.candleUrl : primary.daylightUrl ?? primary.url;
  const hasValidImage = Boolean(primaryUrl && (primaryUrl.startsWith("/") || primaryUrl.startsWith("http")));

  return (
    <figure className="relative">
      {/* Matte frame so white catalog shots don’t bleed; card sits on abyssal */}
      <div
        className="relative overflow-hidden rounded-lg bg-[#041E15] p-2 md:p-3 ring-1 ring-[rgba(197,160,89,0.2)]"
        style={{
          aspectRatio: "1",
          maxHeight: "min(85vh, 720px)",
        }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-md bg-[var(--color-mist)]">
        {hasValidImage ? (
          <Image
            key={`${selectedIndex}-${mode}`}
            src={primaryUrl}
            alt={primary.alt ?? productName}
            width={primary.width}
            height={primary.height}
            priority
            placeholder={placeholder ? "blur" : "empty"}
            blurDataURL={placeholder}
            sizes="(max-width: 960px) 100vw, 60vw"
            className="object-contain w-full h-full transition-opacity duration-300"
            style={{ opacity: 1 }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-micro tracking-[0.1em] uppercase opacity-60"
            style={{ background: "var(--color-mist)" }}
            aria-hidden
          >
            Image forthcoming
          </div>
        )}
        </div>
      </div>

      <figcaption className="sr-only">
        {productName} — view {selectedIndex + 1} of {images.length}
      </figcaption>

      <div
        className="absolute bottom-4 left-4 right-4 flex justify-between items-end"
        style={{ padding: "var(--space-sm)" }}
      >
        <LightingToggle mode={mode} onChange={setMode} />
        {images.length > 1 && (
          <div className="flex gap-2" role="tablist" aria-label="Gallery thumbnails">
            {images.slice(0, 5).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={selectedIndex === i}
                onClick={() => setSelectedIndex(i)}
                className="w-2 h-2 rounded-full border border-[var(--color-gold-subtle)] transition-colors"
                style={{
                  background: selectedIndex === i ? "var(--color-gold)" : "transparent",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </figure>
  );
}
