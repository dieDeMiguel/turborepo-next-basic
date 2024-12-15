import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { geolocation } from '@vercel/functions';

const countryFlags: Record<string, string> = {
  GB: '🇬🇧',
  AT: '🇦🇹',
  DE: '🇩🇪',
  CH: '🇨🇭',
  FR: '🇫🇷',
};
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  const response = NextResponse.next();

  const isLocal = req.nextUrl.hostname === 'localhost';
  console.log('isLocal', isLocal);

  const geo = await geolocation(req) || {};
  const countryCode = isLocal ? 'DE' : geo.country || 'unknown';

  const flag = countryFlags[countryCode] || '🌍'; 
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

  return response;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
