import { createFlagsDiscoveryEndpoint, getProviderData } from 'flags/next';
import { showAorB, showCountry, showPoolImage } from '../../../experiments/flags';
import { withSpan } from '../../../src/utils/tracing';

export const GET = createFlagsDiscoveryEndpoint(async () => {
  return withSpan('api-flags-discovery', async (span) => {
    span.setAttributes({
      'api.route': '/api/flags',
      'api.method': 'GET',
      'api.type': 'flags-discovery',
    });

    span.addEvent('flags-provider-data-start');
    const apiData = await getProviderData({
      showCountry,
      showAorB,
      showPoolImage,
    });
    
    span.addEvent('flags-provider-data-completed', {
      flags_count: Object.keys(apiData).length,
    });
    
    return apiData;
  });
});
