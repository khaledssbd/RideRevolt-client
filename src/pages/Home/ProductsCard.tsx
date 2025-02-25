import { Button } from '@/components/ui/button';
import { TProductProps } from '@/types';
import moment from 'moment';
import { AiFillHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { FaCalendar } from 'react-icons/fa';
import { SiBrandfolder } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { MdOutlineModelTraining } from 'react-icons/md';

const ProductsCard = ({ product }: TProductProps) => {
  return (
    <div
      className="w-full shadow-md rounded-lg overflow-hidden border border-amber-500 hover:scale-[1.05] transition-all duration-400 ease-in-out"
      data-aos="zoom-out-up"
    >
      <figure>
        <img src={product.imageUrl} alt={product.name || 'Product image'} />
      </figure>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-between justify-between gap-2 text-black dark:text-white bg-white-100">
          <div className="flex items-center justify-center gap-1 text-black dark:text-white bg-white-100 rounded-full">
            Listed on: <FaCalendar />
            {/* {new Date(product.createdAt).toLocaleDateString()} */}
            {/* {moment(new Date(product.createdAt)).format('MMMM Do YYYY')} */}
            {moment(new Date(product.createdAt)).format('MMMM')}
          </div>

          <div>Price: ${product.price}</div>
        </div>
        <h2 className="text-xl font-bold mt-4">
          {product.name.length > 30
            ? product.name.slice(0, 30) + '...'
            : product.name}
        </h2>
        <p className="text-gray-400 mt-2">
          {product.description.length > 100
            ? product.description.slice(0, 60) + '...'
            : product.description}
        </p>
        <div className="flex flex-col justify-between items-center gap-3 mt-5">
          <div className="flex items-center gap-2">
            Model: <MdOutlineModelTraining />
            <span className="text-gray-500"> {product.model}</span>
          </div>
          <div className="flex items-center gap-2">
            Brand: <SiBrandfolder />
            <span className="text-gray-500"> {product.brand}</span>
          </div>
          <div className="flex items-center gap-2">
            Category: <BiCategory />
            <span className="text-gray-500"> {product.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <AiFillHome className="text-xl mr-1" />
            <span className="text-gray-500">
              {product.inStock ? `${product.quantity} In-Stock` : 'Stock-out'}
            </span>
          </div>
        </div>
      </div>
      <Link to={`/product/${product._id}`}>
        <Button
          variant="default"
          className="my-5 hover:bg-black hover:text-amber-500 dark:bg-white dark:text-black dark:hover:bg-amber-500 dark:hover:text-white"
        >
          Details
        </Button>
      </Link>
    </div>
  );
};

export default ProductsCard;
