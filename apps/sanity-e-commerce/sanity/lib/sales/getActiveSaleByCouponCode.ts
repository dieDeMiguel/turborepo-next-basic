import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { COUPON_CODES } from "./couponCodes";

export const getActiveSaleByCouponCode = async () => {
  const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
    *[
      _type == "sale"
      && isActive == true
      && couponCode == $couponCode
    ] | order(validFrom desc)[0]
  `);

  for (const couponCode of Object.values(COUPON_CODES)) {
    try {
      const activeSale = await sanityFetch({
        query: ACTIVE_SALE_BY_COUPON_QUERY,
        params: { couponCode },
      });

      if (activeSale?.data) {
        return activeSale.data;
      }
    } catch (error) {
      console.error(`Error fetching active sale for coupon code ${couponCode}:`, error);
    }
  }

  return null;
};
