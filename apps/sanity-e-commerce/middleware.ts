// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { geolocation } from '@vercel/functions';
import { clerkMiddleware } from '@clerk/nextjs/server';

// Define the matcher to specify which paths the middleware should run on
export const config = {
  matcher: '/:path*',
};

// Combine Clerk's middleware with geolocation logic
export default async function middleware(request: NextRequest) {
  // Run Clerk's middleware first
  const clerkResponse = await clerkMiddleware()(request, {} as any);
  
  // If Clerk's middleware returns a response (e.g., redirect to sign-in), return it immediately
  if (clerkResponse) {
    return clerkResponse;
  }

  // Proceed with geolocation logic
  const response = NextResponse.next();

  // Determine if the request is from localhost
  const isLocal = request.nextUrl.hostname === 'localhost';

  // Use Vercel's geolocation helper
  const geo = geolocation(request) || {};
  const country = isLocal ? 'DE' : geo.country || 'unknown';

  // Set the 'x-country' cookie
  response.cookies.set('x-country', country, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return response;
}
