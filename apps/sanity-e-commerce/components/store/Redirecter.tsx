'use client';

import { useEffect } from 'react';

export default function Redirecter() {
  useEffect(() => {
    // Check if we're in the browser (window is defined)
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.origin;
      const correctUrl = process.env.NEXT_PUBLIC_BASE_URL;

      // Redirect if the current domain is incorrect
      if (currentUrl !== correctUrl) {
        window.location.replace(`${correctUrl}/store/orders`);
      }
    }
  }, []);

  return <div />;
}
