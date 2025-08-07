import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
     { 
      hostname: 'cdn.sanity.io'
    }
    ]
  },
  experimental: {
    instrumentationHook: true,
  },
  devIndicators: {
    appIsrStatus: true,
  },
};

const withVercelToolbar = require('@vercel/toolbar/plugins/next')();

export default withVercelToolbar(nextConfig);
