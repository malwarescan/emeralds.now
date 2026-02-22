"use client";

import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const DURATION = 0.7;
const Y_OFFSET = 14;

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isFirstLoad = previousPathname.current === null;
    if (isFirstLoad) {
      previousPathname.current = pathname;
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0, y: Y_OFFSET },
      { opacity: 1, y: 0, duration: DURATION, ease: "power2.out" }
    );
  }, [pathname]);

  return (
    <div
      ref={ref}
      className="min-h-full bg-[var(--abyssal)]"
      style={{ opacity: 1 }}
    >
      {children}
    </div>
  );
}
