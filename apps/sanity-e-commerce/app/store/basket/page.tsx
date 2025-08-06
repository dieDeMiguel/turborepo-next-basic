'use client';

import { SignInButton, useAuth, useUser } from '@clerk/nextjs';
import useBasketStore from '../store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddToBasketButton from '@/components/store/AddToBasketButton';
import Image from 'next/image';
import { imageUrl } from '@/sanity/lib/imageUrl';
import Loader from '@/components/Loader';
import { createCheckoutSession, type Metadata } from '@/actions/createCheckoutSession';

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? 'Unknown',
        customerEmail: user?.emailAddresses[0].emailAddress ?? 'Unknown',
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Error creating session checkout: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (slug: string | undefined) => {
    if (slug) {
      router.push(`/store/product/${slug}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, slug: string | undefined) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleProductClick(slug);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center p-4 bg-background">
        <h1 className="mb-6 text-2xl font-bold text-foreground">Your Basket</h1>
        <p className="text-lg text-muted-foreground">Your basket is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl p-4 bg-background">
      <h1 className="mb-4 text-2xl font-bold text-foreground">Your Basket</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-grow">
          {groupedItems?.map((item) => (
            <div key={item.product._id} className="mb-4 flex items-center justify-between rounded border p-4 bg-card">
              <button
                type="button"
                className="flex min-w-0 flex-1 cursor-pointer items-center text-left"
                onClick={() => handleProductClick(item.product.slug?.current)}
                onKeyDown={(e) => handleKeyDown(e, item.product.slug?.current)}
              >
                <div className="mr-4 h-20 w-20 flex-shrink-0 sm:h-24 sm:w-24">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? 'Product image'}
                      className="h-full w-full rounded object-cover"
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold text-foreground sm:text-xl">{item.product.name}</h2>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    Price: £{((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </button>

              <div className="ml-4 flex flex-shrink-0 items-center">
                <AddToBasketButton disabled={false} product={item.product} />
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 order-first h-fit w-full rounded border bg-card p-6 lg:sticky lg:left-auto lg:top-4 lg:order-last lg:w-80">
          <h3 className="text-xl font-semibold text-foreground">Order Summary</h3>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-foreground">
              <span>Items:</span>
              <span>{groupedItems.reduce((total, item) => total + item.quantity, 0)}</span>
            </div>
            <p className="flex justify-between border-t pt-2 text-2xl font-bold text-foreground">
              <span>Total:</span>
              <span>£{useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
            </p>
          </div>

          {isSignedIn ? (
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isLoading}
              className={`mt-4 w-full rounded bg-primary px-4 py-2 text-primary-foreground ${
                isLoading ? 'bg-muted' : 'hover:bg-primary/90'
              }`}
            >
              {isLoading ? 'Processing...' : 'Checkout'}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button 
                type="button"
                className="mt-4 w-full rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              >
                Sign in to Checkout
              </button>
            </SignInButton>
          )}
        </div>

        <div className="h-64 lg:h-0">{/* Spacer for fixed checkout on mobile */}</div>
      </div>
    </div>
  );
}
export default BasketPage;
