'use client';

import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';
import { SignedIn } from '@clerk/clerk-react';
import useBasketStore from '@/app/store/store';

function HeaderStore() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  /**
   * Cool way to secure login with a passkey
   */
  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log('Response: ', JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('Error: ', JSON.stringify(error, null, 2));
    }

    const response = await fetch('/api/clerk/create-passkey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    console.log(response);
  };

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2">
      {/* Top Row  */}
      <div className="flex w-full flex-wrap items-center justify-center">
        <Link
          href="/store"
          className="mx-auto cursor-pointer text-2xl font-bold text-blue-500 hover:opacity-50 sm:mx-0"
        >
          Shopr
        </Link>

        <Form action="/store/search" className="mt-2 w-full sm:mx-4 sm:mt-0 sm:w-auto sm:flex-1">
          <input
            className="focus:otuline-none w-full max-w-4xl rounded border bg-gray-100 px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30"
            type="text"
            name="query"
            placeholder="Search for products"
          />
        </Form>

        <div className="mt-4 flex flex-1 items-center space-x-4 sm:mt-0 sm:flex-none">
          <Link
            className="relative flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start"
            href="/store/basket"
          >
            <TrolleyIcon className="h-6 w-6" />
            {/* Span item count // Global  */}
            <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {itemCount}
            </span>
            <span className="hidden sm:block">My Basket</span>
          </Link>

          {/* // User area stuff - Only if logged in */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                className="relative flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start"
                href="/store/orders"
              >
                <PackageIcon className="h-6 w-6" />
                {/* Span item count // Global  */}
                <span className="hidden sm:block">My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />

                <div className="hidden text-xs sm:block">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0 && (
              <button
                className="text-nowrap rounded border border-blue-300 bg-white px-4 py-2 text-xs font-bold text-blue-500 hover:bg-blue-700 hover:text-white motion-safe:animate-pulse"
                onClick={createClerkPasskey}
              >
                Create passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
export default HeaderStore;
