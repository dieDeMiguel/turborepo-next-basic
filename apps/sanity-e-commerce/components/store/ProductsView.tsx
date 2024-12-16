import { Category, Product } from '@/sanity.types';
import ProductGrid from './ProductGrid';
import CategoryDropdown from '../ui/CategoryDropdown';

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView: React.FC<ProductsViewProps> = ({ products, categories }) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="mb-4 w-full sm:w-[200px]">
        <CategoryDropdown categories={categories} />
      </div>
      <div className="flex-1">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductsView;
