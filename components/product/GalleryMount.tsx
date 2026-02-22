"use client";

import type { CSSProperties } from "react";

const DEFAULT_OBJECT_POSITION = "50% 45%";

export interface GalleryMountProps {
  src: string;
  alt: string;
  objectPosition?: string;
  sizes?: string;
  width?: number;
  height?: number;
  imageScale?: number;
  /** Optional class for the inner atmosphere layer. */
  matClassName?: string;
  /** Optional class for the frame layer (for compact cards vs billboards). */
  frameClassName?: string;
  /** Optional additional outer frame style classes. */
  imageClassName?: string;
  /** When set, the image area is focusable and calls this on tap/click (e.g. open loupe). */
  onImageTap?: () => void;
  /** Optional class for the outer mount wrapper (e.g. when used inside a card). */
  className?: string;
  /** Optional inline style for frame clamp and layout overrides. */
  frameStyle?: CSSProperties;
  /** Optional inline style for mat overrides. */
  matStyle?: CSSProperties;
  /** Optional inline style for image overrides. */
  imageStyle?: CSSProperties;
}

/**
 * One shared image wrapper for all product images: Home Featured, Collection pages, PDP.
 * Mount layers: outer frame (abyssal + hairline gold) → inner mat (warm paper gradient) → 4:5 image → vignette + glass.
 */
export default function GalleryMount({
  src,
  alt,
  objectPosition = DEFAULT_OBJECT_POSITION,
  sizes = "(max-width: 430px) 100vw, 400px",
  width = 400,
  height = 500,
  imageScale = 1,
  matClassName = "",
  frameClassName = "",
  imageClassName = "",
  frameStyle,
  matStyle,
  imageStyle,
  onImageTap,
  className = "",
}: GalleryMountProps) {
  const content = (
    <>
      <div className={`gallery-mount-mat ${matClassName}`.trim()} style={matStyle}>
        <div className={`gallery-mount-frame ${frameClassName}`.trim()} style={frameStyle}>
          <img
            src={src}
            alt={alt}
            className={`gallery-mount-img ${imageClassName}`.trim()}
            style={{ objectPosition, transform: `scale(${imageScale})`, ...imageStyle }}
            width={width}
            height={height}
            sizes={sizes}
          />
          <div className="gallery-mount-vignette" aria-hidden />
          <div className="gallery-mount-glass" aria-hidden />
        </div>
      </div>
    </>
  );

  const frameContent = onImageTap ? (
    <button
      type="button"
      className="block w-full cursor-zoom-in text-left"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onImageTap();
      }}
      aria-label="View larger"
    >
      {content}
    </button>
  ) : (
    content
  );

  return (
    <div className={`product-card-outer ${className}`.trim()}>
      {frameContent}
    </div>
  );
}
