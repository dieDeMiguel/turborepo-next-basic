'use server'

import { BasketItem } from '@/app/store/store'
import stripe from '@/lib/stripe'
import { imageUrl } from '@/sanity/lib/imageUrl'

export type Metadata = {
  orderNumber: string
  customerName: string
  customerEmail: string
  clerkUserId: string
}

export type GroupedBasketItem = {
  product: BasketItem['product']
  quantity: number
}

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    // check if some products do not have price for some reason
    const itemsWithoutPrice = items.filter((item) => !item.product.price)
    if (itemsWithoutPrice.length > 0) {
      throw new Error('Items without price')
    }

    // check if the user is already a customer
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    })

    let customerId: string | undefined
    if (customers.data.length > 0) {
      customerId = customers.data[0].id
    }

    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? `${process.env.PRODUCTION_URL}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`

    const successUrl = `${baseUrl}/store/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`

    const cancelUrl = `${baseUrl}/store/basket`

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : 'always', // create a new customer if not exists
      customer_email: !customerId ? metadata.customerEmail : undefined, // only set email if creating a new customer
      metadata,
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: successUrl, // will be prefilled by Stripe,
      cancel_url: cancelUrl,
      line_items: items.map((item) => ({
        price_data: {
          currency: 'gbp',
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || 'Unnamed Product',
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    })

    return session.url
  } catch (error) {
    console.error('Error creating checkout session: ', error)
    throw error
  }
}
