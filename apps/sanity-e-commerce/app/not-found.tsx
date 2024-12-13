'use client';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-5 text-center">
      <h1 className="mb-4 text-2xl">Oops! Something went wrong.</h1>
      <p className="mb-8 text-base">We can&apos;t seem to find the page you&apos;re looking for.</p>
      <Link
        className="rounded border border-blue-500 px-4 py-2 text-base text-blue-500 no-underline transition-colors duration-300 hover:bg-blue-500 hover:text-white"
        href="/"
        passHref
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
