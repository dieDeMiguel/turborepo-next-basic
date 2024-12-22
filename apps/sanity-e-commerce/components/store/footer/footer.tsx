
import Link from 'next/link'
import React from 'react'

export default function Footer({ href, label }: { href: string, label: string }) {
  return (
    <footer className="py-2 mb-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Link href={href} className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
              {label}
            </Link>
          </div>
        </footer>
  )
}
