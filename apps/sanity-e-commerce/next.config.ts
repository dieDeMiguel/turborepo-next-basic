import type { NextConfig } from "next";
import { withVercelToolbar } from '@vercel/toolbar/plugins/next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true, // Enable Partial Prerendering
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
     { 
      hostname: 'cdn.sanity.io'
    }
    ]
  },
  devIndicators: {
    appIsrStatus: true,
  },
};

export default withVercelToolbar()(nextConfig);
