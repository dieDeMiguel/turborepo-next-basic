import type { NextConfig } from "next";
import { withVercelToolbar } from '@vercel/toolbar/plugins/next';

const nextConfig: NextConfig = {
  // Enable Cache Components (includes PPR functionality in Next.js 16)
  // Note: Currently disabled due to ThemeProvider compatibility issues
  // Re-enable after resolving client component wrapper issues
  cacheComponents: false,
  
  // Cache life profiles for Sanity CMS data (will be used when cacheComponents is enabled)
  cacheLife: {
    sanity: {
      stale: 60, // 1 minute - client can serve stale content
      revalidate: 300, // 5 minutes - check for updates
      expire: 3600, // 1 hour - absolute expiration
    },
    sanityProduct: {
      stale: 300, // 5 minutes for product data
      revalidate: 900, // 15 minutes
      expire: 7200, // 2 hours
    },
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
};

export default withVercelToolbar()(nextConfig);
