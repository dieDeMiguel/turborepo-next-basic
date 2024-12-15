import ProductsView from '@/components/store/ProductsView';
import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory';

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  return (
    <div className="justify-top flex min-h-screen flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {slug
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}{' '}
          Collection
        </h1>
        <ProductsView products={products} />
      </div>
    </div>
  );
}
export default CategoryPage;
