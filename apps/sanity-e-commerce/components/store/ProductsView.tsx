import { Category, Product } from '@/sanity.types';
import ProductGrid from './ProductGrid';
import CategoryDropdown from '../ui/CategoryDropdown';

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView: React.FC<ProductsViewProps> = ({ products, categories }) => {
  return (
    <div className="flex flex-col">
      {/* Categories Dropdown */}
      <div className="mb-4 w-full sm:w-[200px]">
        <CategoryDropdown categories={categories} />
      </div>

      {/* Products */}
      <div className="flex-1">
        <ProductGrid products={products} />

        <hr className="mt-4 w-1/2 sm:w-3/4" />
      </div>
    </div>
  );
};

export default ProductsView;
