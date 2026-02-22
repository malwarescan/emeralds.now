"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const HERO_VIDEO = "/images/hero/emeralds-intro.mp4";
const HERO_POSTER = "/images/hero/emeraldsnow-hero-image.webp";

function useAllowVideo(): boolean {
  const [allow, setAllow] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setAllow(false);
      return;
    }
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const saveData = conn?.saveData === true;
    const effectiveType = conn?.effectiveType;
    const slowConnection = saveData || effectiveType === "2g" || effectiveType === "slow-2g";
    setAllow(!slowConnection);
  }, []);

  return allow;
}

export default function Hero() {
  const allowVideo = useAllowVideo();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !allowVideo) return;
    const play = () => {
      v.muted = true;
      v.play().catch(() => {});
    };
    if (v.readyState >= 2) play();
    else {
      v.addEventListener("loadeddata", play, { once: true });
      v.addEventListener("canplay", play, { once: true });
    }
    return () => {
      v.removeEventListener("loadeddata", play);
      v.removeEventListener("canplay", play);
    };
  }, [allowVideo]);

  return (
    <section
      className="relative flex min-h-[72vh] max-h-[78vh] w-full flex-col justify-end overflow-hidden bg-[var(--abyssal)] px-4 pb-10 pt-24 sm:min-h-[75vh] sm:pb-16"
      style={{ minHeight: "72vh", maxHeight: "78vh" }}
    >
      {/* Layer 1: Video — always in DOM so it loads; hidden when gated */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ visibility: allowVideo ? "visible" : "hidden" }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          preload="auto"
          muted
          loop
          playsInline
          autoPlay
          disablePictureInPicture
          onCanPlay={(e) => {
            if (allowVideo) e.currentTarget.play().catch(() => {});
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          aria-hidden
        />
      </div>

      {/* Layer 2: Image fallback — always present for LCP and when video is gated or fails */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_POSTER}
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Layer 3: Bottom dissolve scrim — blends video/poster into abyss (no hard cutoff) */}
      <div className="hero-bottom-scrim pointer-events-none absolute inset-x-0 bottom-0 z-[2]" aria-hidden />

      {/* Layer 4: Veil — text-safe, abyssal green only, calmer center/bottom */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 75%, transparent 0%, rgba(13, 31, 23, 0.35) 45%, rgba(13, 31, 23, 0.82) 100%), linear-gradient(to top, rgba(13, 31, 23, 0.88) 0%, rgba(13, 31, 23, 0.15) 45%, transparent 70%)",
        }}
      />

      {/* Layer 5: Content rail */}
      <div className="relative z-[4] mx-auto w-full max-w-[var(--max-rail)] translate-y-10 text-center sm:translate-y-12">
        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[#f5f0e8]/70">
          Official Online Retailer for MUZEM EMERALDS
        </p>
        <h1 className="hero-title mt-1 mb-2 font-serif font-normal text-[#f5f0e8]">
          MUZEM EMERALDS
        </h1>
        <p className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#f5f0e8]/90">
          Certified Colombian Emeralds · Fourth Generation Artisans
        </p>
        <Link
          href="/collections/rings"
          className="hero-cta tap-scale inline-block bg-transparent px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#f5f0e8] sm:text-[0.7rem]"
          aria-label="Enter the collection"
        >
          Enter the collection
        </Link>
      </div>
    </section>
  );
}
