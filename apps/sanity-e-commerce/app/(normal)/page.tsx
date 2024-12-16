import BlackFridayBanner from '@/components/store/BlackFridayBanner';
import CountryInfo from '@/components/store/CountryInfo';
import ProductsView from '@/components/store/ProductsView';
import { showCountry } from '@/experiments/flags';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { FlagValues } from '@vercel/flags/react';

export default async function Page() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);
  const shouldShowCountry = await showCountry();

  return (
    <div className="mb-4 min-h-screen rounded-lg bg-gray-100 py-12">
      <BlackFridayBanner />
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-8">
        {shouldShowCountry && <CountryInfo />}
        <ProductsView products={products} categories={categories} />
        <FlagValues values={{ 'show-country': shouldShowCountry }} />
      </div>
    </div>
  );
}
