import { flag } from 'flags/next';

export const showCountry = flag({
  key: 'show-country',
  decide: () => process.env.SHOW_COUNTRY === 'true',
});

export const showAorB = flag({
  key: 'show-a-or-b',
  decide: () => Math.random() > 0.5, // 50% chance to show
});

export const showSummerBanner = flag({
  key: 'show-summer-banner',
  decide: () => process.env.SHOW_SUMMER_BANNER === 'true',
});

export const showPoolImage = flag({
  key: 'show-pool-image',
  decide: () => process.env.SHOW_POOL_IMAGE === 'true',
});
