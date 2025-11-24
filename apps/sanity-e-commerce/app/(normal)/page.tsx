import { Suspense } from 'react';
import CountryInfo from '@/components/store/CountryInfo';
import ProductsView from '@/components/store/ProductsView';
import { showAorB, showCountry, showPoolImage } from '@/experiments/flags';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { FlagValues } from 'flags/react';
import ProductGridSkeleton from '@/components/ui/skeleton';
import Image from 'next/image';

const LoadingCountryInfo = () => <ProductGridSkeleton />;
const LoadingProducts = () => <ProductGridSkeleton />;

// Cached Products Component - uses Cache Components with proper tags
async function CachedProductsSection() {
  // These calls are cached with "use cache" inside the functions
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return <ProductsView products={products} categories={categories} />;
}

// Dynamic Feature Flags Component - always fresh at request time
async function DynamicFeatureFlags() {
  const [shouldShowCountry, shouldShowAorB, shouldShowPoolImage] = await Promise.all([
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
    <>
      {shouldShowCountry && <CountryInfo />}
      {shouldShowPoolImage && <Image width={1000} height={1000} src="/pool.jpg" alt="Pool" className="mt-4" />}
      <FlagValues values={flagValues} />
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Feature flags injection for client-side access
        dangerouslySetInnerHTML={{
          __html: `window.__FEATURE_FLAGS__ = ${JSON.stringify(flagValues)};`,
        }}
      />
    </>
  );
}

export default async function Page() {
  return (
    <div className="mb-4 mt-4 flex flex-col gap-8 rounded-lg py-8">
      {/* Static Banner - automatically prerendered */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 px-4 rounded-lg shadow-lg">
        <p className="text-sm font-medium">🚀 Cache Components + Sanity CMS - Next.js 16 - Deployed via Vercel CI/CD</p>
      </div>
      
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        {/* Cached Sanity Products - included in static shell */}
        <Suspense fallback={<LoadingProducts />}>
          <CachedProductsSection />
        </Suspense>
        
        {/* Dynamic Feature Flags - streams at request time */}
        <Suspense fallback={<LoadingCountryInfo />}>
          <DynamicFeatureFlags />
        </Suspense>
      </div>
    </div>
  );
}
