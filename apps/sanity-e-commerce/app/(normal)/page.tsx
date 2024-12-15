import BlackFridayBanner from '@/components/store/BlackFridayBanner';
import ProductsView from '@/components/store/ProductsView';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { cookies } from 'next/headers';
import { FC, Suspense } from 'react';
import countries from '../../lib/countries.json';

export const dynamic = 'force-static';
export const revalidate = 60;

const HomePage: FC = async () => {
  // Fetch products and categories from Sanity
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  // Access cookies
  const cookieStore = await cookies();
  const countryCode = cookieStore.get('x-country')?.value || 'GB';

  // Find country information
  const countryInfo =
    countries.find((country) => country.cca2 === countryCode) || countries.find((c) => c.cca2 === 'GB');

  const countryName = countryInfo ? getCountryName(countryInfo) : 'Great Britain';
  const flagEmoji = countryInfo?.flag || '🇬🇧';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Black Friday Banner */}
      <BlackFridayBanner />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome!</h1>
          <div className="flex items-center space-x-4">
            <span className="text-5xl">{flagEmoji}</span>
            <span className="text-2xl font-semibold text-gray-700">{countryName}</span>
          </div>
        </div>

        {/* Products View */}
        <ProductsView products={products} categories={categories} />

        {/* Optional: Display Country and Flag in Suspense */}
        <Suspense fallback={<div className="text-center text-gray-500">Loading country information...</div>}>
          <div className="mt-8 flex items-center justify-center space-x-4">
            <span className="text-4xl">{flagEmoji}</span>
            <span className="text-xl font-medium text-gray-700">{countryName}</span>
          </div>
        </Suspense>
      </div>
    </div>
  );
};

const getCountryName = (country: { cca2: string; name?: { common: string; official: string } }) => {
  return country.name?.common || country.cca2;
};

export default HomePage;
