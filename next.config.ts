import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [65, 75],
  },
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
