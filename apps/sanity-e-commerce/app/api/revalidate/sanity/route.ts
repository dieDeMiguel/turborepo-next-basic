import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(req, process.env.SANITY_WEBHOOK_SECRET);

    // Validate the webhook signature
    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request - Missing _type', { status: 400 });
    }

    // Revalidate based on the document type
    const tags: string[] = ['sanity-all']; // Always revalidate the general sanity tag

    switch (body._type) {
      case 'product':
        tags.push('products');
        if (body.slug?.current) {
          tags.push(`product-${body.slug.current}`);
        }
        break;
      case 'category':
        tags.push('categories');
        if (body.slug?.current) {
          tags.push(`category-${body.slug.current}`);
        }
        break;
      case 'page':
        tags.push('pages');
        if (body.slug?.current) {
          tags.push(`page-${body.slug.current}`);
        }
        break;
      default:
        tags.push(body._type);
    }

    // Revalidate all relevant tags
    for (const tag of tags) {
      revalidateTag(tag, 'max');
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      tags,
      now: Date.now(),
    });
  } catch (err: any) {
    console.error('Error revalidating:', err);
    return new Response(err.message, { status: 500 });
  }
}

