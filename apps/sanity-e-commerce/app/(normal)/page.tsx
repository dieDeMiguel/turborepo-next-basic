import BlackFridayBanner from '@/components/store/BlackFridayBanner';
import CountryInfo from '@/components/store/CountryInfo';
import ProductsView from '@/components/store/ProductsView';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';

export default async function Page() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return (
    <div className="min-h-screen bg-gray-100">
      <BlackFridayBanner />
      <div className="container mx-auto px-4 py-8">
        <ProductsView products={products} categories={categories} />
        <CountryInfo />
      </div>
    </div>
  );
}
