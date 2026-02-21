import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["gsap", "three", "@react-three/fiber", "@react-three/drei"],
  },
};

export default nextConfig;
