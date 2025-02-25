import LatestProductsCard from './LatestProductsCard';
import { TProductsProps } from '@/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductsCard from './ProductsCard';

const LatestProducts = ({ products }: TProductsProps) => {
  return (
    <div className="my-32">
      <h1 className="text-3xl text-center py-5 font-bold text-amber-500 dark:text-white">
        Latest Products From{' '}
        <span className="text-black dark:text-amber-500">RideRevolt</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        {products?.slice(0, 2).map(product => (
          <LatestProductsCard key={product._id} product={product} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-8">
        {products?.slice(2, 5).map(product => (
          <ProductsCard key={product._id} product={product} />
        ))}
      </div>
      <div className="text-center">
        <Link to="/all-products">
          <Button
            variant="default"
            size="lg"
            className="my-14 bg-black hover:bg-amber-500 hover:text-black dark:bg-amber-500 dark:text-white dark:hover:bg-white dark:hover:text-black text-lg"
          >
            View All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LatestProducts;
