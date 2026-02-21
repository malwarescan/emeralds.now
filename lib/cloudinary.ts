/**
 * Cloudinary: AVIF first, WebP fallback. Blur-up placeholders with emerald tint.
 * Responsive srcset; no 4K full payload on first paint.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

export type LightingVariant = "candle" | "daylight";

export function cloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    format?: "avif" | "webp" | "auto";
    quality?: string;
    blur?: number;
    tint?: string;
    lighting?: LightingVariant;
  } = {}
): string {
  if (!CLOUD_NAME) return publicId.startsWith("http") ? publicId : "";

  const {
    width,
    height,
    crop = "fill",
    format = "auto",
    quality = "auto:good",
    blur,
    tint = "green_0b0f0e", // emerald tint for placeholders
    lighting,
  } = options;

  const base = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  const transforms: string[] = [];

  if (lighting === "candle") transforms.push("e_colorize:30,co_rgb:197_160_89");
  if (lighting === "daylight") transforms.push("e_auto_color");

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  transforms.push(`c_${crop}`, `q_${quality}`, `f_${format}`);

  if (blur) {
    transforms.push(`e_blur:${blur}`, `t_${tint}`);
  }

  const path = transforms.length ? `${transforms.join(",")}/${publicId}` : publicId;
  return `${base}/${path}`;
}

/**
 * Responsive srcset for hero/gallery. Keep initial viewport under budget.
 */
export function cloudinarySrcSet(
  publicId: string,
  widths: number[] = [640, 960, 1280, 1920],
  options: { format?: "avif" | "webp"; lighting?: LightingVariant } = {}
): string {
  return widths
    .map((w) => {
      const url = cloudinaryUrl(publicId, { width: w, ...options });
      return `${url} ${w}w`;
    })
    .join(", ");
}

/**
 * Blur-up placeholder: small, blurred, emerald-tinted.
 */
export function cloudinaryPlaceholder(publicId: string, lighting?: LightingVariant): string {
  return cloudinaryUrl(publicId, {
    width: 80,
    height: 80,
    crop: "fill",
    blur: 40,
    quality: "auto:low",
    format: "webp",
    lighting,
  });
}
