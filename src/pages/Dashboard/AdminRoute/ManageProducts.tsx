import { cn } from '@/lib/utils';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useGetAllProductsQuery } from '@/redux/features/product/productApi';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DeleteProductDialog from './DeleteProductDialog';
import UpdateProductModal from './UpdateProductModal';

const ManageProducts = () => {
  const { data: allProducts, isLoading } = useGetAllProductsQuery(undefined);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="my-10 text-black dark:text-white">
      <h3 className="text-xl md:text-4xl text-center">
        Manage products ({allProducts?.data?.length})
      </h3>

      <div className="text-right mr-5 mb-5">
        <Link to="/dashboard/add-product">
          <Button
            variant="default"
            className="my-5 text-black bg-amber-500 hover:bg-black hover:text-amber-500  dark:text-black dark:hover:bg-white dark:hover:text-black"
          >
            Add Product
          </Button>
        </Link>
      </div>

      <div>
        {allProducts?.data?.length ? (
          <div className="rounded-lg border border-gray-200 shadow-md overflow-x-auto">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Catagory
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    In-Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    isDeleted
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Posted-on
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Update
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Delete
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {allProducts?.data?.map(product => (
                  <tr key={product?._id} className="hover:bg-gray-50">
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src={product?.imageUrl}
                          alt={product?.name || 'No name'}
                        />
                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {product?.name}
                        </div>
                        <div className="text-gray-400">{product?.model}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{product?.brand}</td>
                    <td className="px-6 py-4">{product?.category}</td>
                    <td className="px-6 py-4">{product?.quantity}</td>
                    <td className="px-6 py-4">{product?.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold ${
                          product?.isDeleted ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        <span
                          className={cn(
                            'h-1.5 w-1.5 rounded-full',
                            product?.isDeleted ? 'bg-red-600' : 'bg-green-600'
                          )}
                        ></span>
                        {product?.isDeleted ? 'Yes' : 'No'}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {/* {new Date(product?.createdAt).toLocaleDateString()} */}
                      {/* {moment(new Date(product?.createdAt)).format('MMMM Do YYYY')} */}
                      {moment(new Date(product?.createdAt)).format('MMMM')}
                    </td>

                    <td className="px-6 py-4">
                      <UpdateProductModal product={product} />
                    </td>

                    <td className="px-6 py-4">
                      <DeleteProductDialog productId={product?._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h3 className="mt-20 md:mt-40 text-4xl font-bold">No user yet</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
