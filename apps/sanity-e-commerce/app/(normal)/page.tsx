import BlackFridayBanner from '@/components/store/BlackFridayBanner';
import ProductsView from '@/components/store/ProductsView';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { cookies } from 'next/headers';

export const dynamic = 'force-static';
export const revalidate = 60;

export default async function Page() {
  const products = await getAllProducts();
  const cookieStore = await cookies();
  const country = cookieStore.get('x-country')?.value || 'unknown';
  console.log(`Country: ${country}`);

  return (
    <div>
      <BlackFridayBanner />
      <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100 p-4">
        <ProductsView products={products} />
        <h2>Country: {country}</h2>
      </div>
    </div>
  );
}
