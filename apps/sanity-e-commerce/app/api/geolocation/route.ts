import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { withSpan } from '../../../src/utils/tracing';

export async function GET() {
  return withSpan('api-geolocation', async (span) => {
    span.setAttributes({
      'api.route': '/api/geolocation',
      'api.method': 'GET',
    });

    try {
      const headersList = await headers();
      
      // Get the real IP address from various possible headers
      const forwarded = headersList.get('x-forwarded-for');
      const realIp = headersList.get('x-real-ip');
      const cfConnectingIp = headersList.get('cf-connecting-ip');
      
      // Extract IP address, prioritizing Cloudflare, then x-real-ip, then x-forwarded-for
      let clientIp = cfConnectingIp || realIp || forwarded?.split(',')[0] || '127.0.0.1';
      
      // Clean up the IP address
      clientIp = clientIp.trim();
      
      span.setAttributes({
        'geo.client_ip': clientIp,
        'geo.ip_source': cfConnectingIp ? 'cloudflare' : realIp ? 'real-ip' : forwarded ? 'forwarded' : 'default',
      });
    
      // For development/localhost, use a default IP (German IP for testing)
      if (clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.startsWith('192.168.') || clientIp.startsWith('10.')) {
        clientIp = '79.208.50.195'; // German IP for testing
        span.addEvent('ip-fallback-local');
      }
      
      // Use a free geolocation service
      span.addEvent('geolocation-api-start', { service: 'ip-api.com' });
      const geoResponse = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,country,countryCode,region,city,lat,lon,timezone,isp`);
      
      if (!geoResponse.ok) {
        span.addEvent('geolocation-api-error', { status: geoResponse.status });
        throw new Error('Geolocation service failed');
      }
      
      const geoData = await geoResponse.json();
      span.addEvent('geolocation-api-success');
    
      if (geoData.status === 'fail') {
        span.addEvent('geolocation-fallback-uk');
        span.setAttributes({
          'geo.result': 'fallback',
          'geo.country_code': 'GB',
        });
        
        // Fallback to UK if geolocation fails
        return NextResponse.json({
          ip: clientIp,
          countryCode: 'GB',
          country: 'United Kingdom',
          region: 'England',
          city: 'London',
          flag: '🇬🇧'
        });
      }
    
    // Map country code to flag emoji
    const getFlagEmoji = (countryCode: string): string => {
      const flagMap: Record<string, string> = {
        'DE': '🇩🇪',
        'GB': '🇬🇧',
        'US': '🇺🇸',
        'FR': '🇫🇷',
        'IT': '🇮🇹',
        'ES': '🇪🇸',
        'NL': '🇳🇱',
        'BE': '🇧🇪',
        'AT': '🇦🇹',
        'CH': '🇨🇭',
        'CA': '🇨🇦',
        'AU': '🇦🇺',
        'JP': '🇯🇵',
        'KR': '🇰🇷',
        'CN': '🇨🇳',
        'IN': '🇮🇳',
        'BR': '🇧🇷',
        'MX': '🇲🇽',
        'AR': '🇦🇷',
        'RU': '🇷🇺',
        'PL': '🇵🇱',
        'SE': '🇸🇪',
        'NO': '🇳🇴',
        'DK': '🇩🇰',
        'FI': '🇫🇮'
      };
      
      return flagMap[countryCode] || '🌍';
    };
    
      span.setAttributes({
        'geo.result': 'success',
        'geo.country_code': geoData.countryCode,
        'geo.country': geoData.country,
        'geo.region': geoData.region,
        'geo.city': geoData.city,
      });
      
      span.addEvent('geolocation-completed', {
        country: geoData.country,
        city: geoData.city,
      });

      return NextResponse.json({
        ip: clientIp,
        countryCode: geoData.countryCode,
        country: geoData.country,
        region: geoData.region,
        city: geoData.city,
        flag: getFlagEmoji(geoData.countryCode),
        timezone: geoData.timezone,
        isp: geoData.isp,
        coordinates: {
          lat: geoData.lat,
          lon: geoData.lon
        }
      });
      
    } catch (error) {
      span.recordException(error as Error);
      span.addEvent('geolocation-error-fallback');
      console.error('Geolocation error:', error);
      
      // Fallback response
      return NextResponse.json({
        ip: '127.0.0.1',
        countryCode: 'GB',
        country: 'United Kingdom',
        region: 'England',
        city: 'London',
        flag: '🇬🇧',
        error: 'Failed to detect location'
      });
    }
  });
}