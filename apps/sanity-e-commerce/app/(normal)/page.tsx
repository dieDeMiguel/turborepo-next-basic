import React, { Suspense } from 'react';
import BlackFridayBanner from '@/components/store/BlackFridayBanner';
import CountryInfo from '@/components/store/CountryInfo';
import ProductsView from '@/components/store/ProductsView';
import { showCountry } from '@/experiments/flags';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { FlagValues } from '@vercel/flags/react';
import ProductGridSkeleton from '@/components/ui/skeleton';

export const revalidate = 1800; // ISR: revalidate every 30 minutes

const LoadingCountryInfo = () => <ProductGridSkeleton />;
const LoadingProducts = () => <ProductGridSkeleton />;

export default async function Page() {
  const [products, categories, shouldShowCountry] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    showCountry(),
  ]);

  return (
    <div className="mb-4 mt-4 flex flex-col gap-8 rounded-lg bg-gray-100 py-8">
      <BlackFridayBanner />
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        <Suspense fallback={<LoadingCountryInfo />}>{shouldShowCountry && <CountryInfo />}</Suspense>
        <Suspense fallback={<LoadingProducts />}>
          <ProductsView products={products} categories={categories} />
        </Suspense>
        <Suspense>
          <FlagValues values={{ 'show-country': shouldShowCountry }} />
        </Suspense>
      </div>
    </div>
  );
}
