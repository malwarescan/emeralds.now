"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function estimateConciergeRect(isPDP: boolean) {
  const safeBottomPx = isPDP ? 88 : 24;
  const pillHeight = 34;
  const top = window.innerHeight - safeBottomPx - pillHeight;
  const bottom = window.innerHeight - safeBottomPx;
  const right = window.innerWidth;
  const left = right - 188;
  return { top, bottom, left, right };
}

export default function ConciergeLiveDot() {
  const pathname = usePathname();
  const isPDP = pathname?.startsWith("/product/");
  const [dotOnly, setDotOnly] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkOverlap = () => {
      const zones = Array.from(document.querySelectorAll<HTMLElement>("[data-concierge-safe='1']"));
      if (!zones.length) {
        if (dotOnly) setDotOnly(false);
        return;
      }

      const rect = estimateConciergeRect(!!isPDP);
      const overlap = zones.some((zone) => {
        const zRect = zone.getBoundingClientRect();
        const verticalOverlap = zRect.top <= rect.bottom + 8 && zRect.bottom >= rect.top - 8;
        const sideBand = zRect.right >= rect.left;
        return verticalOverlap && sideBand;
      });

      setDotOnly(overlap);
    };

    checkOverlap();
    window.addEventListener("scroll", checkOverlap, { passive: true });
    window.addEventListener("resize", checkOverlap);

    return () => {
      window.removeEventListener("scroll", checkOverlap);
      window.removeEventListener("resize", checkOverlap);
    };
  }, [isPDP]);

  useEffect(() => {
    setDotOnly(false);
    const timeout = window.setTimeout(() => {
      // rerun after route transition
      const event = new Event("resize");
      window.dispatchEvent(event);
    }, 200);
    return () => window.clearTimeout(timeout);
  }, [isPDP, pathname]);

  return (
    <Link
      href="/concierge"
      className={`tap-scale concierge-shell ${dotOnly ? "concierge-shell--dot" : ""}`}
      style={{ bottom: isPDP ? "5.5rem" : "1.5rem" }}
      aria-label="An artisan is available — open concierge"
      data-cta-id="floating_concierge_pill"
      data-cta-label="An artisan is available"
    >
      <span
        className="concierge-dot h-2 w-2 rounded-full bg-[rgba(201,162,39,0.9)]"
        aria-hidden
      />
      <span
        className={`${dotOnly ? "sr-only" : "concierge-label"} text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#f5f0e8]/90`}
      >
        An artisan is available.
      </span>
    </Link>
  );
}
