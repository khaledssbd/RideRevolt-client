import { Link, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '@/redux/features/product/productApi';
import { FaCalendar } from 'react-icons/fa';
import moment from 'moment';
import { AiFillHome } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';

const ProductDetails = () => {
  const { productId } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(productId);

  return isLoading ? (
    <ProductDetailsSkeleton />
  ) : (
    <article className="w-4/5 rounded-lg mx-auto">
      <h2 className="text-center text-4xl font-semibold my-5">
        {product?.name}
      </h2>
      {/* figure */}
      <figure className="mb-5">
        <img
          src={product?.imageUrl}
          width={600}
          height={100}
          alt={product?.name || 'Product image'}
          className="rounded-lg w-full object-cover"
        />
      </figure>
      {/* createdAt */}
      <div className="flex justify-between items-center mb-3 rounded-lg gap-2 dark:text-white">
        <p className="flex items-center justify-center">
          <span className="text-gray-500"> Listed on: </span>
          <FaCalendar className="mx-2" />
          {/* {new Date(product?.createdAt).toLocaleDateString()} */}
          {/* {moment(new Date(product?.createdAt)).format('MMMM Do YYYY')} */}
          {product?.createdAt
            ? moment(new Date(product.createdAt)).format('DD-MMMM-YY')
            : 'N/A'}
        </p>
        {/* brand */}
        <div className="text-lg font-medium">
          <span className="text-gray-500">Brand:</span> {product?.brand}
        </div>
      </div>

      <div className="flex justify-between items-center mb-3 rounded-lg dark:text-white">
        {/* Model */}
        <div className="text-lg font-medium">
          <span className="text-gray-500">Model:</span> {product?.model}
        </div>

        {/* Price */}
        <div className="text-lg font-medium">
          <span className="text-gray-500">Price:</span> ${product?.price}
        </div>
      </div>

      <div className="flex justify-between items-center mb-3 rounded-lg gap-2 dark:text-white">
        {/* Category */}
        <div className="text-lg font-medium">
          <span className="text-gray-500">Category:</span> ${product?.category}
        </div>

        {/* Stock Count */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AiFillHome className="text-xl mr-1" />
            <span className="text-gray-500">
              {product?.inStock
                ? `${product?.quantity}: In-Stock`
                : 'Stock-out'}
            </span>
          </div>
        </div>
      </div>
      {/* description */}
      <div className="text-gray-700 text-lg leading-relaxed">
        <p className="text-justify text-gray-500 whitespace-pre-line">
          {product?.description}
        </p>
      </div>

      {product?.inStock ? (
        <Button
          disabled={!product?.inStock}
          variant="default"
          className="mt-10 hover:bg-black hover:text-amber-500 rounded-full px-8 py-6 text-lg"
        >
          <Link to={`/checkout/${product?._id}`}>Buy Now</Link>
        </Button>
      ) : (
        <div className="my-10 text-red-500 text-xl font-bold">
          <span>Out of Stock</span>
        </div>
      )}
    </article>
  );
};

export default ProductDetails;
