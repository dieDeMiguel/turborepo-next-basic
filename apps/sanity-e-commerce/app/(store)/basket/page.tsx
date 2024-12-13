import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';

const BasketPage = dynamic(() => import('@/components/BasketPage'), {
  loading: () => <Loader />,
});

export default function BasketRoute() {
  return <BasketPage />;
}
