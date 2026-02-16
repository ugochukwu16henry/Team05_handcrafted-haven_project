import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Rewrite /api/products/:id/reviews to a flat route to avoid Windows EISDIR readlink on [id]/reviews/route.ts
  async rewrites() {
    return [
      {
        source: "/api/products/:id/reviews",
        destination: "/api/product-reviews?productId=:id",
      },
    ];
  },
  turbopack: {},
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
