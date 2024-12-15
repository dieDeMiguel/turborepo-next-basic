import type { NextConfig } from "next";
import { createRequire } from 'module'; 

const require = createRequire(import.meta.url);

const withVercelToolbar = require('@vercel/toolbar/plugins/next')();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { 
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default withVercelToolbar(nextConfig);
