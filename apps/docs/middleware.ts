import { NextResponse } from 'next/server';
import type { NextRequest as OriginalNextRequest } from 'next/server';

interface NextRequest extends OriginalNextRequest {
  geo?: {
    country?: string;
  };
}

export function middleware(request: NextRequest) {
  const isLocal = request.nextUrl.hostname === 'localhost';

  const country = isLocal ? 'DE' : request.geo?.country || 'unknown';

  const response = NextResponse.next();

  response.cookies.set('x-country', country, { path: '/' });

  return response;
}
