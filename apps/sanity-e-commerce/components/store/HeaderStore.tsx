'use client'

import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Form from 'next/form'
import { PackageIcon, TrolleyIcon } from '@sanity/icons'
import { SignedIn } from '@clerk/clerk-react'
import useBasketStore from '@/app/store/store'

function HeaderStore() {
  const { user } = useUser()
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  )

  /**
   * Cool way to secure login with a passkey
   */
  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey()
      console.log('Response: ', JSON.stringify(response, null, 2))
    } catch (error) {
      console.error('Error: ', JSON.stringify(error, null, 2))
    }

    const response = await fetch('/api/clerk/create-passkey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    console.log(response)
  }

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      {/* Top Row  */}
      <div className="flex w-full flex-wrap justify-center items-center">
        <Link
          href="/store"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          Shopr
        </Link>

        <Form
          action="/store/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:otuline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 border w-full max-w-4xl"
            type="text"
            name="query"
            placeholder="Search for products"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
            href="/store/basket"
          >
            <TrolleyIcon className="w-6 h-6" />
            {/* Span item count // Global  */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
            <span className="hidden sm:block">My Basket</span>
          </Link>

          {/* // User area stuff - Only if logged in */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
                href="/store/orders"
              >
                <PackageIcon className="w-6 h-6" />
                {/* Span item count // Global  */}
                <span className="hidden sm:block">My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />

                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0 && (
              <button
                className="bg-white hover:bg-blue-700 hover:text-white motion-safe:animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border text-xs text-nowrap"
                onClick={createClerkPasskey}
              >
                Create passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  )
}
export default HeaderStore
