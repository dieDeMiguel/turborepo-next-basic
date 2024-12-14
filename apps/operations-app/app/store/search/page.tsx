import { searchOrdersByCustomerName } from '@/sanity/lib/orders/searchOrdersByCustomerName';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const { query } = await searchParams;
  const orders = await searchOrdersByCustomerName(query);
  console.log('orders', orders);
  if (!orders.length) {
    return (
      <div className="justify-top flex min-h-screen flex-col items-center bg-gray-100 p-4">
        <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-3xl font-bold">No orders found with name: {query}</h1>
          <p className="text-center text-gray-600">Try searching with different names</p>
        </div>
      </div>
    );
  }

  return (
    <div className="justify-top flex min-h-screen flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">Search results for "{query}"</h1>
        <table className="min-w-full border bg-white">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Order Number</th>
              <th className="border-b px-4 py-2">Order Date</th>
              <th className="border-b px-4 py-2">Customer Name</th>
              <th className="border-b px-4 py-2">Email</th>
              <th className="border-b px-4 py-2">Total Price</th>
              <th className="border-b px-4 py-2">Currency</th>
              <th className="border-b px-4 py-2">Status</th>
              <th className="border-b px-4 py-2">Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order?.orderNumber}>
                <td className="border-b px-4 py-2">{order?.orderNumber}</td>
                <td className="border-b px-4 py-2">
                  {order?.orderDate ? new Date(order?.orderDate).toLocaleString() : 'N/A'}
                </td>
                <td className="border-b px-4 py-2">{order?.customerName}</td>
                <td className="border-b px-4 py-2">{order?.email}</td>
                <td className="border-b px-4 py-2">£{(order?.totalPrice ?? 0).toFixed(2)}</td>
                <td className="border-b px-4 py-2">{(order?.currency ?? 'N/A').toUpperCase()}</td>
                <td className="border-b px-4 py-2 capitalize">{order?.status}</td>
                <td className="border-b px-4 py-2">
                  {order?.products && order?.products.length > 0 ? (
                    <ul key={order._id} className="list-disc pl-5">
                      {order?.products.map((product) => (
                        <li key={product?._id}>
                          {product?.name} (x{product?.stock})
                        </li>
                      ))}
                    </ul>
                  ) : order?.items && order?.items.length > 0 ? (
                    <ul key={order?._id} className="list-disc pl-5">
                      {order?.items.map((item) => (
                        <li key={item?._key}>
                          {item?.product.name} (x{item?.quantity})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No products</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
