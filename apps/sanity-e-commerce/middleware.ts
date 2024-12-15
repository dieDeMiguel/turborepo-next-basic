import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { geolocation } from '@vercel/functions';

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();
  clerkMiddleware()(request, {} as any);

  const isLocal = request.nextUrl.hostname === 'localhost';
  const geo = geolocation(request) || {};
  const country = isLocal ? 'DE' : geo.country || 'unknown';

  if (response) {
    response.cookies.set('x-country', country, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Run for all paths
    '/:path*',
  ],
};
