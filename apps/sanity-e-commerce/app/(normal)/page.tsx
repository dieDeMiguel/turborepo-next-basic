import React, { Suspense } from 'react';
import BlackFridayBanner from '@/components/store/BlackFridayBanner';
import CountryInfo from '@/components/store/CountryInfo';
import ProductsView from '@/components/store/ProductsView';
import { showCountry } from '@/experiments/flags';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { FlagValues } from '@vercel/flags/react';

export const revalidate = 1800; // ISR: revalidate every 30 minutes

const LoadingBanner = () => <div>Loading banner...</div>;
const LoadingCountryInfo = () => <div>Loading country information...</div>;
const LoadingProducts = () => <div>Loading products...</div>;

export default async function Page() {
  const [products, categories, shouldShowCountry] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    showCountry(),
  ]);

  return (
    <div className="mb-4 mt-4 flex flex-col gap-8 rounded-lg bg-gray-100 py-8">
      <Suspense fallback={<LoadingBanner />}>
        <BlackFridayBanner />
      </Suspense>
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        {shouldShowCountry && (
          <Suspense fallback={<LoadingCountryInfo />}>
            <CountryInfo />
          </Suspense>
        )}
        <Suspense fallback={<LoadingProducts />}>
          <ProductsView products={products} categories={categories} />
        </Suspense>
        <FlagValues values={{ 'show-country': shouldShowCountry }} />
      </div>
    </div>
  );
}
