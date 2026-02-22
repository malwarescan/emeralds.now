"use client";

import { useState } from "react";
import GalleryMount from "@/components/product/GalleryMount";
import ProductLoupe from "@/components/product/ProductLoupe";
import type { NormalizedProduct } from "@/lib/catalog/types";

export default function PdpGallery({ product }: { product: NormalizedProduct }) {
  const [loupeOpen, setLoupeOpen] = useState(false);
  const imgSrc = product.localImagePath ?? product.image_url;
  const images = [{ src: imgSrc, alt: product.alt_text }];
  const objectPosition = product.focalPoint
    ? `${Math.round(product.focalPoint.focusX * 100)}% ${Math.round(product.focalPoint.focusY * 100)}%`
    : undefined;

  return (
    <>
      <GalleryMount
        src={imgSrc}
        alt={product.alt_text}
        objectPosition={objectPosition}
        sizes="(max-width: 430px) 100vw, 600px"
        width={600}
        height={750}
        onImageTap={() => setLoupeOpen(true)}
      />
      <ProductLoupe
        images={images}
        isOpen={loupeOpen}
        onClose={() => setLoupeOpen(false)}
      />
    </>
  );
}
