import React, { Suspense } from 'react';
import BlackFridayBanner from '@/components/store/BlackFridayBanner';
import CountryInfo from '@/components/store/CountryInfo';
import ProductsView from '@/components/store/ProductsView';
import { showAorB, showCountry, showPoolImage } from '@/experiments/flags';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { FlagValues } from 'flags/react';
import ProductGridSkeleton from '@/components/ui/skeleton';
import Image from 'next/image';

export const revalidate = 1800; // ISR: revalidate every 30 minutes

const LoadingCountryInfo = () => <ProductGridSkeleton />;
const LoadingProducts = () => <ProductGridSkeleton />;

export default async function Page() {
  const [products, categories, shouldShowCountry, shouldShowAorB, shouldShowPoolImage] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    showCountry(),
    showAorB(),
    showPoolImage(),
  ]);

  const flagValues = {
    'show-country': shouldShowCountry,
    'show-a-or-b': shouldShowAorB,
    'show-pool-image': shouldShowPoolImage,
  };

  return (
    <div className="mb-4 mt-4 flex flex-col gap-8 rounded-lg py-8">
      <BlackFridayBanner />
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        <Suspense fallback={<LoadingCountryInfo />}>{shouldShowCountry && <CountryInfo />}</Suspense>
        <Suspense fallback={<LoadingProducts />}>
          <ProductsView products={products} categories={categories} />
        </Suspense>
        {shouldShowPoolImage && <Image width={1000} height={1000} src="/pool.jpg" alt="Pool" className="mt-4" />}
        <FlagValues values={{ 'show-country': shouldShowCountry, 'show-pool-image': shouldShowPoolImage }} />
      </div>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: `window.__FEATURE_FLAGS__ = ${JSON.stringify(flagValues)};`,
        }}
      />
    </div>
  );
}
