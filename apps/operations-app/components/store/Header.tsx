'use client';
import Link from 'next/link';
import Form from 'next/form';
import InputField from '@repo/ui/input-field';

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2">
      <div className="mt-2 flex w-full flex-wrap items-center justify-between">
        <Link href="/" className="mx-auto cursor-pointer text-2xl font-bold text-blue-500 hover:opacity-50 sm:mx-0">
          Shopr Operations App
        </Link>
        <Form
          action="/store/search"
          className="mt-2 w-full sm:mx-4 sm:mt-0 sm:w-auto sm:flex-1"
          name="query"
          placeholder="Search for products"
        >
          <InputField type="text" name="query" placeholder="Search order by name" />
        </Form>
        <div className="flex-items-center flex justify-center space-x-4"></div>
      </div>
    </header>
  );
}
