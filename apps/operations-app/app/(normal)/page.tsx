import BlackFridayBanner from '@/components/store/BlackFridayBanner';
import ProductsView from '@/components/store/ProductsView';
import { getAllOrders } from '@/sanity/lib/orders/getAllOrders';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';

export const dynamic = 'force-static';
export const revalidate = 60;

export default async function Page() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const orders = await getAllOrders();
  console.log('orders', orders);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </>
  );
}
