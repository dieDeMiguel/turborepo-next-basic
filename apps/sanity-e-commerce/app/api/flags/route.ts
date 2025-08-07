import { createFlagsDiscoveryEndpoint, getProviderData } from 'flags/next';
import { showAorB, showCountry, showPoolImage, showSummerBanner } from '@/experiments/flags';

export const GET = createFlagsDiscoveryEndpoint(async () => {
  const apiData = await getProviderData({
    showCountry,
    showAorB,
    showSummerBanner,
    showPoolImage,
  });
  return apiData;
});
