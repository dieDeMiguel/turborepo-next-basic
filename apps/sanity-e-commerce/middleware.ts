import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { geolocation } from '@vercel/functions';
import { showAorB } from './experiments/flags';
import { countryFlags } from './constants/flags';
import { trace } from '@opentelemetry/api';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const tracer = trace.getTracer('sanity-e-commerce-middleware', '1.0.0');
  
  return tracer.startActiveSpan('middleware-execution', {
    attributes: {
      'http.method': req.method,
      'http.url': req.url,
      'http.route': req.nextUrl.pathname,
    }
  }, async (span) => {
    try {
      // Handle protected routes
      if (isProtectedRoute(req)) {
        span.addEvent('checking-protected-route');
        await auth.protect();
      }

      const { pathname, hostname } = req.nextUrl;
      const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
      
      let countryCode = 'GB'; // Default fallback
      let flag = '🇬🇧';
      
      span.setAttributes({
        'geo.hostname': hostname,
        'geo.is_local': isLocal,
        'request.pathname': pathname,
      });
      
      try {
        span.addEvent('geolocation-start');
        // Get geolocation data from Vercel
        const geo = await geolocation(req);
        
        if (geo && geo.country) {
          countryCode = geo.country;
          flag = countryFlags[countryCode] || '🌍';
          span.addEvent('geolocation-success', { country: countryCode });
        } else if (isLocal) {
          // For local development, simulate the German IP for testing
          countryCode = 'DE';
          flag = countryFlags['DE'] || '🇩🇪';
          span.addEvent('geolocation-local-fallback');
        }
        
        span.setAttributes({
          'geo.country_code': countryCode,
          'geo.flag': flag,
        });
      } catch (error) {
        span.recordException(error as Error);
        span.addEvent('geolocation-error');
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
        span.addEvent('performance-ab-test-start');
        const showVariantB = await showAorB();
        const version = showVariantB ? '/performance-b' : '/performance-a';
        
        span.setAttributes({
          'ab_test.variant': version,
          'ab_test.show_variant_b': showVariantB,
        });
        span.addEvent('performance-ab-test-completed', { variant: version });

        // Rewrite the request to the appropriate version
        const nextUrl = new URL(version, req.url);
        return NextResponse.rewrite(nextUrl);
      }

      span.setStatus({ code: 1 }); // OK status
      return response;
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({ code: 2, message: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    } finally {
      span.end();
    }
  });
});

export const config = {
  matcher: [
    // Include existing patterns and the `/performance` route
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/performance',
  ],
};
