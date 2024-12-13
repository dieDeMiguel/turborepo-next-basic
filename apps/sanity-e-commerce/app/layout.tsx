import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopr',
  description: 'Level up your e-commerce store with Shopr',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
