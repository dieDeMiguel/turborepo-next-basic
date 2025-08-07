import ProductGrid from '@/components/store/ProductGrid';
import { searchProductsByName } from '@/sanity/lib/products/searchProductsByName';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  if (!products.length) {
    return (
      <div className="justify-top flex min-h-screen flex-col items-center bg-gray-100 p-4">
        <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-3xl font-bold">No products found for: {query}</h1>
          <p className="text-center text-gray-600">Try searching with different keywords</p>
        </div>
      </div>
    );
  }

  return (
    <div className="justify-top flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-4xl rounded-lg bg-card/80 backdrop-blur-sm border border-border p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-foreground">Search results for {query}</h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
