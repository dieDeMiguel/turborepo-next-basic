import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import { SanityLive } from '@/sanity/lib/live';
import Header from '@/components/store/Header';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Operations App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} mx-auto max-w-5xl antialiased`}>
        <Header />
        <main className="page__wrapper bg-white px-5 py-6">{children}</main>
        <SanityLive />
      </body>
    </html>
  );
}
