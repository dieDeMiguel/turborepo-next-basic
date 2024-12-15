import { cookies } from 'next/headers';
import countriesData from '@/lib/countries.json';
import { Country } from '@/types/country';
import { Suspense } from 'react';

const countries: Country[] = countriesData;

export const dynamic = 'force-dynamic';

export default async function CountryInfo() {
  const cookieStore = await cookies();
  const countryCode = cookieStore.get('x-country')?.value || 'GB';
  const flag = cookieStore.get('x-flag')?.value || '🇬🇧';

  const countryInfo =
    countries.find((country) => country.cca2 === countryCode) || countries.find((c) => c.cca2 === 'GB');

  const countryName = getCountryName(countryInfo);
  const flagEmoji = flag;

  return (
    <Suspense fallback={<div>Loading country info...</div>}>
      <div className="mb-4 flex items-center justify-center space-x-4">
        <span className="text-4xl">{flagEmoji}</span>
        <span className="text-xl font-medium text-gray-700">{countryName}</span>
      </div>
    </Suspense>
  );
}

const getCountryName = (country?: Country): string => {
  return country?.name?.common || 'Great Britain';
};
