import { NextResponse } from 'next/server';
import type { NextRequest as OriginalNextRequest } from 'next/server';

interface NextRequest extends OriginalNextRequest {
  geo?: {
    country?: string;
  };
}

export function middleware(request: NextRequest) {
  // Check if running locally (localhost or custom dev domain)
  const isLocal = request.nextUrl.hostname === 'localhost';

  // Mock the country for local development
  const country = isLocal ? 'DE' : request.geo?.country || 'unknown';

  const response = NextResponse.next();
  response.headers.set('x-country', country);

  return response;
}