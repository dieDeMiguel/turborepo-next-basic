import AddToBasketButton from '@/components/store/AddToBasketButton'
import { ImageProps } from '@/sanity/lib/customComponents'
import { imageUrl } from '@/sanity/lib/imageUrl'
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import { notFound } from 'next/navigation'

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
          className="object-contain"
        />
      )
    },
  },
}

export const dynamic = 'force-static'
export const revalidate = 60 // revalidate at most every 60 seconds

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return notFound()
  }

  const isOutOfStock = product.stock != null && product.stock <= 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${
            isOutOfStock ? 'opacity-50' : ''
          }`}
        >
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? 'Product image'}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* info  */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
              ${product.price?.toFixed(2)}
            </div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && (
                <PortableText
                  value={product.description}
                  components={customComponents}
                />
              )}
            </div>
          </div>

          <div className="mt-6">
            {/* // TODO: AddToBasketButton component  */}
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductPage
