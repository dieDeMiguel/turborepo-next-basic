import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import BlackFridayBanner from '@/components/store/BlackFridayBanner';
import ProductsView from '@/components/store/ProductsView';

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <div>
      <BlackFridayBanner />
      <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
