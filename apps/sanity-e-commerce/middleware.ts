// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';
import countries from './lib/countries.json';

// Define the matcher to specify which paths the middleware should run on
export const config = {
  matcher: '/:path*', // Apply to all routes; adjust as needed
};

// Combined Middleware Function
export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  // Run Clerk's middleware first
  const clerkResponse = await clerkMiddleware()(request, event);

  // If Clerk's middleware returns a response (e.g., redirect to sign-in), return it immediately
  if (clerkResponse) {
    return clerkResponse;
  }

  // Proceed with geolocation logic
  const response = NextResponse.next();

  // Determine if the request is from localhost
  const isLocal = request.nextUrl.hostname === 'localhost';

  // Extract geolocation data from Vercel headers
  const countryCode = isLocal
    ? 'GB' // Default to Great Britain in local development
    : request.geo?.country || 'GB'; // Default to GB if not found

  // Find country information from countries.json
  const countryInfo = countries.find((country) => country.cca2 === countryCode);

  // If country not found, default to Great Britain
  const finalCountry = countryInfo || countries.find((c) => c.cca2 === 'GB');

  // Extract flag
  const flag = finalCountry?.flag || '🇬🇧';

  if (finalCountry) {
    // Set cookies with country and flag
    response.cookies.set('x-country', finalCountry.cca2, {
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
  }

  return response;
}
