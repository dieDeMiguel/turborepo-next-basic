import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

const withVercelToolbar = require('@vercel/toolbar/plugins/next')();

export default withVercelToolbar(nextConfig);
