import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all HTTPS image sources
      },
      {
        protocol: 'http',
        hostname: '**', // optional, allow HTTP too
      },
    ],
  },
};

export default nextConfig;
