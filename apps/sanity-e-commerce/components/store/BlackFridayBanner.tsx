import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode';

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode();

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="to-cyan mx-4 mb-8 rounded-lg bg-gradient-to-r from-blue-600 px-6 py-10 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h3 className="mb-4 text-left text-3xl font-extrabold sm:text-5xl">{sale.title}</h3>
          <p className="mb-6 text-left text-xl font-semibold sm:text-3xl">{sale.description}</p>
          <div className="flex">
            <span className="transform rounded-full bg-white px-6 py-4 text-black shadow-md transition duration-300 hover:scale-105">
              <span className="text-base font-bold sm:text-xl">
                Use code: <span className="text-red-600">{sale.couponCode}</span>
              </span>
              <span className="ml-2 text-base font-bold sm:text-xl">for {sale.discountAmount}% OFF</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlackFridayBanner;
