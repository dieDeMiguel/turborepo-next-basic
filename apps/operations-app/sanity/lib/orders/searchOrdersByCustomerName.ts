import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { Order } from "@/types/types";

export const searchOrdersByCustomerName = async (searchParam: string): Promise<Order[]> => {
  const ORDER_SEARCH_QUERY = defineQuery(`
    *[
      _type == "order"
      && customerName match $searchParam
    ] | order(orderDate desc){
      _id,
      orderNumber,
      customerName,
      email,
      stripeCustomerId,
      stripePaymentIntentId,
      stripeCheckoutSessionId,
      totalPrice,
      currency,
      status,
      clerkUserId,
      orderDate,
      amountDiscount,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      products[]->{
        _id,
        name,
        price,
        stock,
        description,
        slug,
        categories[]->{
          _id,
          name
        },
        image
      },
      items[]->{
        _key,
        quantity,
        product->{
          _id,
          name,
          price,
          stock,
          description,
          slug,
          categories[]->{
            _id,
            name
          },
          image
        }
      }
    }
  `);

  try {
    const orders = await sanityFetch({
      query: ORDER_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}*`,
      },
    });

    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders by customer name:", error);
    return [];
  }
};
