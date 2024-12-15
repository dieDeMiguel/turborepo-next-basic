import { unstable_flag as flag } from '@vercel/flags/next';

export const showCountry = flag({
  key: 'summer-sale',
  decide: () => process.env.SHOW_COUNTRY === 'true',
});
