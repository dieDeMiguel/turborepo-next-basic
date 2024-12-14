import BlackFridayBanner from '@/components/store/BlackFridayBanner'
import ProductsView from '@/components/store/ProductsView'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getAllProducts } from '@/sanity/lib/products/getAllProducts'

export const dynamic = 'force-static'
export const revalidate = 60 // revalidate at most every 60 seconds

export default async function Page() {
  const products = await getAllProducts()
  const categories = await getAllCategories()

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>> Rerendered the home page cache with ${products.length} products and ${categories.length} categories`
  )

  return (
    <div>
      <BlackFridayBanner />

      <div className=" flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>

      {/* <ul>
        {products.map((product: any) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul> */}
    </div>
  )
}
