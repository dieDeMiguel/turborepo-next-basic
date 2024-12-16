import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import { SanityLive } from '@/sanity/lib/live';
import { draftMode } from 'next/headers';
import { DisableDraftMode } from '@/components/store/DisableDraftModeButton';
import { VisualEditing } from 'next-sanity';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/store/Header';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { VercelToolbar } from '@vercel/toolbar/next';

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
  title: 'Shopr E-Commerce',
  openGraph: {
    title: 'A place to buy all your favorite products',
    description:
      'Shopr is the best place to buy all your favorite products. We have a wide range of products for you to choose from.',
    url: 'https://sanity-e-commerce-demo.vercel.app/',
    siteName: 'Shopr',
    images: [
      {
        width: 300,
        height: 300,
        url: './opengraph-image.jpg',
        alt: 'Imagen de un Formulario de Anmeldung',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldInjectToolbar = process.env.NODE_ENV === 'development';
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} mx-auto max-w-5xl antialiased`}>
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
        <ClerkProvider dynamic>
          <main className="page__wrapper bg-white px-5 pb-6">
            <Header />
            {children}
          </main>
          {shouldInjectToolbar && <VercelToolbar />}
        </ClerkProvider>
        <SanityLive />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
