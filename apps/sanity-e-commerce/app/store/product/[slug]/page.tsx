import AddToBasketButton from '@/components/store/AddToBasketButton';
import { cn } from '@/lib/utils';
import { ImageProps } from '@/sanity/lib/customComponents';
import { imageUrl } from '@/sanity/lib/imageUrl';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const customComponents = {
  types: {
    image: (props: ImageProps) => {
      return (
        <Image
          src={imageUrl(props.value.asset).url()}
          alt={props.value.alt ?? 'Product image'}
          width={600}
          height={400}
          layout="responsive"
          className="rounded-lg object-contain"
        />
      );
    },
  },
};

export const dynamic = 'force-static';
export const revalidate = 60;

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <div
          className={cn('relative mt-12 aspect-square w-[300px] overflow-hidden rounded-lg shadow-lg lg:w-[500px]', {
            'opacity-50': isOutOfStock,
          })}
        >
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? 'Product image'}
              fill
              className="mb-4 object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-lg font-bold text-white">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="mt-4 flex flex-col justify-between lg:col-span-2 xl:col-span-3">
          <div>
            <h1 className="mb-4 text-4xl font-extrabold text-gray-800">{product.name}</h1>
            <div className="mb-4 text-2xl font-semibold text-green-600">${product.price?.toFixed(2)}</div>
            <div className="prose mb-6 max-w-none text-gray-700">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} components={customComponents} />
              )}
            </div>
          </div>

          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
