"use client";

import { useEffect, useRef, useState } from "react";

export interface ProductLoupeProps {
  images: { src: string; alt: string }[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductLoupe({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ProductLoupeProps) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const touchRef = useRef<{ startX: number; lastTapTime: number }>({ startX: 0, lastTapTime: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIndex(initialIndex);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - touchRef.current.lastTapTime < 350) {
      setScale((s) => (s === 1 ? 2 : 1));
      setPosition({ x: 0, y: 0 });
    }
    touchRef.current.lastTapTime = now;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current.startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const dx = endX - touchRef.current.startX;
    if (images.length > 1 && scale === 1 && Math.abs(dx) > 50) {
      setIndex((i) => (i + (dx > 0 ? -1 : 1) + images.length) % images.length);
    }
  };

  if (!isOpen) return null;

  const current = images[index];
  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[var(--abyssal)]"
      role="dialog"
      aria-modal="true"
      aria-label="Product image viewer"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(201,162,39,0.35)] text-[#f5f0e8] hover:border-[rgba(201,162,39,0.6)]"
        aria-label="Close viewer"
      >
        <span className="text-lg font-light">×</span>
      </button>

      <div
        ref={containerRef}
        className="flex flex-1 touch-pan-y items-center justify-center overflow-hidden p-4"
        onDoubleClick={handleDoubleTap}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative flex h-full w-full items-center justify-center"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-full w-auto max-w-full select-none object-contain"
            style={{ objectPosition: "50% 45%" }}
            draggable={false}
            onClick={handleDoubleTap}
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2 pb-6">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIndex(i);
                setScale(1);
                setPosition({ x: 0, y: 0 });
              }}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? "bg-[rgba(201,162,39,0.8)]" : "bg-[rgba(201,162,39,0.25)]"
              }`}
              aria-label={`Image ${i + 1} of ${images.length}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
