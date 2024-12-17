import { getAllOrders } from '@/sanity/lib/orders/getAllOrders';

export const dynamic = 'force-static';
export const revalidate = 60;

export default async function Page() {
  const orders = await getAllOrders();
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Orders List</h1>
      <table className="min-w-full border bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Order Number</th>
            <th className="border-b px-4 py-2">Order Date</th>
            <th className="border-b px-4 py-2">Customer Name</th>
            <th className="border-b px-4 py-2">Email</th>
            <th className="border-b px-4 py-2">Total</th>
            <th className="border-b px-4 py-2">Currency</th>
            <th className="border-b px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border-b px-4 py-2">{order.orderNumber}</td>
              <td className="border-b px-4 py-2">
                {order.orderDate ? new Date(order.orderDate).toLocaleString() : 'N/A'}
              </td>
              <td className="border-b px-4 py-2">{order.customerName}</td>
              <td className="border-b px-4 py-2">{order.email}</td>
              <td className="border-b px-4 py-2">£{(order.totalPrice ?? 0).toFixed(2)}</td>
              <td className="border-b px-4 py-2">{(order.currency ?? 'N/A').toUpperCase()}</td>
              <td className="border-b px-4 py-2 capitalize">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
