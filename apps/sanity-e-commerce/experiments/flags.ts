import { unstable_flag as flag } from '@vercel/flags/next';

export const showCountry = flag({
  key: 'show-country',
  decide: () => process.env.SHOW_COUNTRY === 'true',
});

export const showAorB = flag({
  key: 'show-a-or-b',
  decide: () => Math.random() > 0.5, // 50% chance to show
});
