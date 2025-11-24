import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allow production builds to complete even with type errors
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
     { 
      hostname: 'cdn.sanity.io'
    }
    ]
  }
};

export default nextConfig;
