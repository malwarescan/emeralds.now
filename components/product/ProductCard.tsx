"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import GalleryMount from "@/components/product/GalleryMount";
import ProductLoupe from "@/components/product/ProductLoupe";
import type { NormalizedProduct } from "@/lib/catalog/types";

function getSeoFilename(url: string): string {
  const withoutQuery = url.split("?")[0];
  return withoutQuery.split("/").pop() ?? withoutQuery;
}

export interface ProductCardProps {
  product: NormalizedProduct;
  children?: React.ReactNode;
  /** Optional class for the ProductCard wrapper. */
  className?: string;
  /** Override focal point for this product, e.g. "50% 30%" */
  objectPosition?: string;
  sizes?: string;
  /** Optional gallery mount class overrides for compact/feature-specific treatment. */
  mountClassName?: string;
  /** Optional per-image max height on the viewport wrapper. */
  mountMaxHeight?: string;
  /** Optional class for the mount frame. */
  mountFrameClassName?: string;
  /** Optional class for content link. */
  contentClassName?: string;
  /** Include mount area in concierge overlap-safe zones. */
  conciergeSafeImageArea?: boolean;
}

export default function ProductCard({
  product,
  children,
  className = "",
  objectPosition: objectPositionProp,
  sizes = "(max-width: 430px) 100vw, 400px",
  mountClassName = "",
  mountMaxHeight,
  mountFrameClassName = "",
  contentClassName = "",
  conciergeSafeImageArea = false,
}: ProductCardProps) {
  const [loupeOpen, setLoupeOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgSrc = product.localImagePath ?? product.image_url;
  const images = [{ src: imgSrc, alt: product.alt_text }];
  const seoFilename = getSeoFilename(imgSrc);
  const category = `${product.primary_category ?? ""} ${product.jewelry_type ?? ""}`.toLowerCase();
  const applyBias =
    category.includes("ring")
      ? 0.06
      : category.includes("earring")
      ? -0.06
      : category.includes("pendant")
      ? -0.03
      : 0;

  const getBiasBounds = () => {
    if (category.includes("ring")) return { min: 0.35, max: 0.72 };
    if (category.includes("earring")) return { min: 0.2, max: 0.6 };
    if (category.includes("pendant")) return { min: 0.2, max: 0.62 };
    return { min: 0.05, max: 0.95 };
  };

  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
  const objectPosition =
    objectPositionProp ??
    (product.focalPoint
      ? `${Math.round(product.focalPoint.focusX * 100)}% ${Math.round(clamp(product.focalPoint.focusY + applyBias, getBiasBounds().min, getBiasBounds().max) * 100)}%`
      : undefined);
  const imageScale = product.focalScale ? Math.min(1.18, Math.max(1.08, product.focalScale)) : 1;

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const root = cardRef.current;
    if (!root || !seoFilename) return;

    const matchesImageToken = (value: string) =>
      value.includes(imgSrc) || value.includes(seoFilename);

    let occurrenceCount = 0;
    const nodes = [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))];
    for (const node of nodes) {
      for (const attr of Array.from(node.attributes)) {
        if (matchesImageToken(attr.value)) {
          occurrenceCount += 1;
        }
      }

      const computed = getComputedStyle(node);
      const before = getComputedStyle(node, "::before");
      const after = getComputedStyle(node, "::after");
      if (matchesImageToken(computed.backgroundImage) || matchesImageToken(computed.content)) {
        occurrenceCount += 1;
      }
      if (matchesImageToken(before.backgroundImage) || matchesImageToken(before.content)) {
        occurrenceCount += 1;
      }
      if (matchesImageToken(after.backgroundImage) || matchesImageToken(after.content)) {
        occurrenceCount += 1;
      }
    }

    // Expected: one <img src="..."> reference from GalleryMount.
    if (occurrenceCount > 1) {
      console.warn("[ux-qa] Duplicate image reference inside ProductCard", {
        productId: product.product_id,
        filename: seoFilename,
        occurrences: occurrenceCount,
      });
    }
  }, [imgSrc, product.product_id, seoFilename]);

  return (
    <>
      <div ref={cardRef} className={`product-card-wrapper block ${className}`.trim()} data-product-card={product.product_id}>
        <div className="flex flex-col">
          <div
            data-concierge-safe={conciergeSafeImageArea ? "1" : undefined}
            className="concierge-safe-image-area"
          >
            <GalleryMount
              src={imgSrc}
              alt={product.alt_text}
              objectPosition={objectPosition}
              sizes={sizes}
              imageScale={imageScale}
              className={mountClassName}
              frameStyle={mountMaxHeight ? { maxHeight: mountMaxHeight } : undefined}
              frameClassName={mountFrameClassName}
              onImageTap={() => setLoupeOpen(true)}
            />
          </div>
          <Link
            href={`/product/${product.handle}`}
            className={`block mt-3 [&_.view-piece]:hover:text-[#f5f0e8] ${contentClassName}`.trim()}
          >
            {children}
          </Link>
        </div>
      </div>
      <ProductLoupe
        images={images}
        isOpen={loupeOpen}
        onClose={() => setLoupeOpen(false)}
      />
    </>
  );
}
