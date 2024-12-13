import { imageUrl } from '@/sanity/lib/imageUrl';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import React from 'react';
import Image from 'next/image';
import { PortableText } from 'next-sanity';
import AddToBasketButton from '@/components/AddToBasketButton';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const isOutOfStock = product?.stock !== null && (product?.stock ?? 0) <= 0;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? 'opacity-50' : ''}`}
        >
          {product?.image && (
            <Image
              src={imageUrl(product?.image).url()}
              alt={product?.name ?? 'Product image'}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-lg font-bold text-white">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="mb-4 text-3xl font-bold">{product?.name}</h1>
          <div className="mb-4 text-xl font-semibold">${product?.price?.toFixed(2)}</div>
          <div className="prose mb-6 max-w-none">
            {Array.isArray(product?.description) && <PortableText value={product?.description} />}
          </div>
        </div>
        <div className="mt-6">{product && <AddToBasketButton product={product} disabled={isOutOfStock} />}</div>
      </div>
    </div>
  );
}
