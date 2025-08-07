'use client';

import { useTheme } from 'next-themes';
import countriesData from '@/lib/countries.json';
import { Country } from '@/types/country';
import { Suspense, useEffect, useState } from 'react';

const countries: Country[] = countriesData;

export const dynamic = 'force-dynamic';

export default function CountryInfo() {
  const [mounted, setMounted] = useState(false);
  const [countryInfo, setCountryInfo] = useState<{ name: string; flag: string }>({
    name: 'United Kingdom',
    flag: '🇬🇧'
  });
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Simulate getting country info from cookies or API
    const countryCode = 'GB';
    const flag = '🇬🇧';
    const country = countries.find((country) => country.cca2 === countryCode) || countries.find((c) => c.cca2 === 'GB');
    const countryName = getCountryName(country);
    
    setCountryInfo({ name: countryName, flag });
  }, []);

  // Use theme-neutral classes until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="mb-4 flex items-center justify-center space-x-4 border border-border bg-card/50 sm:mb-0 p-2 rounded-lg">
        <span className="text-4xl">🇬🇧</span>
        <span className="text-xl font-medium text-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="text-muted-foreground">Loading country info...</div>}>
      <div className={`mb-4 flex items-center justify-center space-x-4 border sm:mb-0 p-2 rounded-lg backdrop-blur-sm transition-colors duration-200 ${
        theme === 'dark' 
          ? 'border-slate-600 bg-slate-800/50 text-slate-100 hover:border-slate-500' 
          : 'border-gray-300 bg-white/50 text-gray-800 hover:border-gray-400'
      }`}>
        <span className="text-4xl">{countryInfo.flag}</span>
        <span className="text-xl font-medium">{countryInfo.name}</span>
      </div>
    </Suspense>
  );
}

const getCountryName = (country?: Country): string => {
  return country?.name?.common || 'Great Britain';
};
