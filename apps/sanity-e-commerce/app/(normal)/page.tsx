import BlackFridayBanner from '@/components/store/BlackFridayBanner';
import ProductsView from '@/components/store/ProductsView';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { Country } from '@/types/country';
import { cookies } from 'next/headers';
import countriesData from '@/lib/countries.json';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const countries: Country[] = countriesData;

export default async function Page() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  const cookieStore = await cookies();
  const countryCode = cookieStore.get('x-country')?.value || 'GB';
  const flag = cookieStore.get('x-flag')?.value || '🇬🇧';

  const countryInfo =
    countries.find((country) => country.cca2 === countryCode) || countries.find((c) => c.cca2 === 'GB');

  const countryName = getCountryName(countryInfo);
  const flagEmoji = flag;

  return (
    <div className="min-h-screen bg-gray-100">
      <BlackFridayBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome!</h1>
          <div className="flex items-center space-x-4">
            <span className="text-5xl">{flagEmoji}</span>
            <span className="text-2xl font-semibold text-gray-700">{countryName}</span>
          </div>
        </div>
        <ProductsView products={products} categories={categories} />
        <Suspense fallback={<div>Loading country info...</div>}>
          <div className="mt-8 flex items-center justify-center space-x-4">
            <span className="text-4xl">{flagEmoji}</span>
            <span className="text-xl font-medium text-gray-700">{countryName}</span>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

const getCountryName = (country?: Country): string => {
  return country?.name?.common || 'Great Britain';
};
