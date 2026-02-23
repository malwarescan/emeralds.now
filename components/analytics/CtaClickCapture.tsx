"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export default function CtaClickCapture() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const cta = target.closest<HTMLElement>("[data-cta-id]");
      if (!cta) return;

      const ctaId = cta.dataset.ctaId;
      if (!ctaId) return;
      const ctaLabel = cta.dataset.ctaLabel ?? "";
      const href = (cta as HTMLAnchorElement).href ?? "";

      const payload = {
        event: "cta_click",
        cta_id: ctaId,
        cta_label: ctaLabel,
        page_path: pathname,
        href,
      };

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
      window.dispatchEvent(new CustomEvent("analytics:cta_click", { detail: payload }));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
