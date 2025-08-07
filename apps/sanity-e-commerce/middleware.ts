import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { geolocation } from '@vercel/functions';
import { showAorB } from './experiments/flags';
import { countryFlags } from './constants/flags';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Handle protected routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  const { pathname, hostname } = req.nextUrl;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
  
  let countryCode = 'GB'; // Default fallback
  let flag = '🇬🇧';
  
  try {
    // Get geolocation data from Vercel
    const geo = await geolocation(req);
    
    if (geo && geo.country) {
      countryCode = geo.country;
      flag = countryFlags[countryCode] || '🌍';
    } else if (isLocal) {
      // For local development, simulate the German IP for testing
      countryCode = 'DE';
      flag = countryFlags['DE'] || '🇩🇪';
    }
  } catch (error) {
    console.error('Geolocation error in middleware:', error);
    // Keep default values
  }

  // Set cookies for geolocation
  const response = NextResponse.next();
  response.cookies.set('x-country', countryCode, {
    path: '/',
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  response.cookies.set('x-flag', flag, {
    path: '/',
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
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
