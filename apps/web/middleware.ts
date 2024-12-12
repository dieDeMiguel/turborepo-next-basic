import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { geolocation } from '@vercel/functions';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const isLocal = request.nextUrl.hostname === 'localhost';

  const geo = geolocation(request) || {};

  console.log("Geolocation Data:", geo);

  const country = isLocal ? 'DE' : geo.country || 'unknown';

  response.cookies.set('x-country', country, {
    path: '/',
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'lax', 
  });

  return response;
}
export const config = {
  matcher: '/:path*',
};
