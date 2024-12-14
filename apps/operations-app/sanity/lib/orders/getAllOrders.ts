import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';
import { ALL_ORDERS_QUERYResult } from '@/sanity.types';

export async function getAllOrders(): Promise<ALL_ORDERS_QUERYResult> {
  const ALL_ORDERS_QUERY = defineQuery(`
    *[_type == "order"] | order(orderDate desc) {
      ...,
      products[]{
        ...,
        product->
      }
    }
  `);

  try {
    // Use sanityFetch to send the query
    const orders = await sanityFetch({
      query: ALL_ORDERS_QUERY,
    });

    // Return the list of orders, or an empty array if none are found
    return orders.data || [];
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw new Error('Error fetching all orders');
  }
}
