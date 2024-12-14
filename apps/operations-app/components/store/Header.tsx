'use client';
import Link from 'next/link';
import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Form from 'next/form';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';
import useBasketStore from '@/app/store/store';
import StyledLink from '@repo/ui/styled-link';

export default function Header() {
  const { user } = useUser();

  const itemCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  const createClerkPasskey = async () => {
    try {
      await user?.createPasskey();
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2">
      <div className="mt-2 flex w-full flex-wrap items-center justify-between">
        <Link href="/" className="mx-auto cursor-pointer text-2xl font-bold text-blue-500 hover:opacity-50 sm:mx-0">
          Shopr
        </Link>
        <Form
          action="/store/search"
          className="mt-2 w-full sm:mx-4 sm:mt-0 sm:w-auto sm:flex-1"
          name="query"
          placeholder="Search for products"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="w-full max-w-4xl rounded border bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </Form>
        <div className="flex-items-center flex justify-center space-x-4">
          <ClerkLoaded>
            <StyledLink href="/store/basket" label="My Basket">
              <TrolleyIcon className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {itemCount}
              </span>
            </StyledLink>

            <SignedIn>
              <StyledLink href="/store/orders" label="My Orders">
                <PackageIcon className="h-6 w-6" />
              </StyledLink>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden text-xs sm:block">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="animate-pulse rounded border border-blue-300 bg-white px-4 py-2 font-bold text-blue-500 hover:bg-blue-700 hover:text-white"
              >
                Create a passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
