'use client';
import Link from 'next/link';
import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Form from 'next/form';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';
import useBasketStore from '@/app/store/store';
import InputField from '@repo/ui/components/input-field';

export default function Header() {
  const { user } = useUser();

  const itemCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  // const createClerkPasskey = async () => {
  //   try {
  //     await user?.createPasskey();
  //   } catch (err) {
  //     console.error('Error:', JSON.stringify(err, null, 2));
  //   }
  // };

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2">
      <div className="mt-2 flex w-full flex-wrap items-center justify-between gap-4">
        <Link href="/" className="mx-auto cursor-pointer text-2xl font-bold text-blue-500 hover:opacity-50 sm:mx-0">
          Shopr
        </Link>
        <Form
          action="/store/search"
          className="mt-2 w-full sm:mx-4 sm:mt-0 sm:w-auto sm:flex-1"
          name="query"
          placeholder="Search for products"
        >
          <InputField type="text" name="query" placeholder="Search for products" />
        </Form>
        <div className="flex-items-center flex flex-wrap justify-center space-x-4">
          <ClerkLoaded>
            <Link
              href="/store/basket"
              className="relative flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start sm:py-2"
            >
              <TrolleyIcon className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {itemCount}
              </span>
              <span>My Basket</span>
            </Link>
            <SignedIn>
              <Link
                href="/store/orders"
                className="relative flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start sm:py-2"
              >
                <PackageIcon className="h-6 w-6" />
                <span>My Orders</span>
              </Link>
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
            {/* {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="animate-pulse rounded border border-blue-300 bg-white px-4 py-2 font-bold text-blue-500 hover:bg-blue-700 hover:text-white"
              >
                Create a passkey
              </button>
            )} */}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
