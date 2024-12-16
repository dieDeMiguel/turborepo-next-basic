import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { geolocation } from '@vercel/functions';
import { showAorB } from './experiments/flags';

// Country flags mapping
const countryFlags: Record<string, string> = {
  GB: '🇬🇧',
  AT: '🇦🇹',
  DE: '🇩🇪',
  CH: '🇨🇭',
  FR: '🇫🇷',
};

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Handle protected routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  const { pathname, hostname } = req.nextUrl;
  const isLocal = hostname === 'localhost';
  const geo = (await geolocation(req)) || {};
  const countryCode = isLocal ? 'GB' : geo.country || 'unknown';
  const flag = countryFlags[countryCode] || '🌍';

  // Set cookies for geolocation
  const response = NextResponse.next();
  response.cookies.set('x-country', countryCode, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  response.cookies.set('x-flag', flag, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  // Add logic for `/performance` route
  if (pathname.startsWith('/performance')) {
    const showVariantB = await showAorB();
    const version = showVariantB ? '/performance-b' : '/performance-a';

    // Rewrite the request to the appropriate version
    const nextUrl = new URL(version, req.url);
    return NextResponse.rewrite(nextUrl);
  }

  return response;
});

export const config = {
  matcher: [
    // Include existing patterns and the `/performance` route
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/performance',
  ],
};
