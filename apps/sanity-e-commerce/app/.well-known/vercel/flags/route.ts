import { createFlagsDiscoveryEndpoint, getProviderData } from 'flags/next';
import { showAorB, showCountry, showPoolImage } from '../../../../experiments/flags';

export const GET = createFlagsDiscoveryEndpoint(async () => {
  const apiData = await getProviderData({
    showCountry,
    showAorB,
    showPoolImage,
  });
  return apiData;
});