import ProductsView from '@/components/store/ProductsView';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory';

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  const categories = await getAllCategories();

  return (
    <div className="justify-top flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-4xl rounded-lg bg-card/80 backdrop-blur-sm border border-border p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-foreground">
          {slug
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}{' '}
          Collection
        </h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
export default CategoryPage;
