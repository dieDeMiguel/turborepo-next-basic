import { NextResponse, type NextRequest } from 'next/server';
import { verifyAccess, type ApiData } from '@vercel/flags';
 
export async function GET(request: NextRequest) {
    const access = await verifyAccess(request.headers.get('Authorization'));
    if (!access) return NextResponse.json(null, { status: 401 });
  
    return NextResponse.json<ApiData>({
      definitions: {
        'show-country': { 
          description: 'Controls whether the country info is visible',
          origin: 'https://example.com/#show-country',
          options: [
            { value: false, label: 'Off' },
            { value: true, label: 'On' },
          ],
        },
      },
    });
}