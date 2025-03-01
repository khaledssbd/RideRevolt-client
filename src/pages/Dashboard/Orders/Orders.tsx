import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { selectUser } from '@/redux/features/auth/authSlice';
import { useGetOrdersByUserEmailQuery } from '@/redux/features/order/orderApi';
import { useAppSelector } from '@/redux/hooks';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Orders = () => {
  const user = useAppSelector(selectUser);
  const { data: orders, isLoading } = useGetOrdersByUserEmailQuery(user?.email);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="my-10 text-black dark:text-white">
      <h3 className="text-xl md:text-4xl text-center">
        All orders ({orders?.length})
      </h3>

      <div className="text-right mr-5 mb-5">
        <Link to="/all-products">
          <Button
            variant="default"
            className="my-5 text-black bg-amber-500 hover:bg-black hover:text-amber-500  dark:text-black dark:hover:bg-amber-500 dark:hover:text-white"
          >
            Buy New Products
          </Button>
        </Link>
      </div>

      <div>
        {orders?.length ? (
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
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Total Price
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Order id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Deliverity Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {orders
                  ?.slice()
                  .reverse()
                  .map(order => (
                    <tr key={order?._id} className="hover:bg-gray-50">
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="relative h-10 w-10">
                          <img
                            className="h-full w-full rounded-full object-cover object-center"
                            src={order?.product?.imageUrl}
                            alt={order?.product?.name || 'No name'}
                          />
                          <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">
                            {order?.product?.name}
                          </div>
                          <div className="text-gray-400">
                            {order?.product?.model}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{order?.product?.brand}</td>
                      <td className="px-6 py-4">{order?.product?.category}</td>
                      <td className="px-6 py-4">{order?.quantity}</td>
                      <td className="px-6 py-4">{order?.totalPrice}</td>
                      <td className="px-6 py-4">{order?.status}</td>
                      <td className="px-6 py-4">{order?.transaction?.id}</td>
                      <td className="px-6 py-4">
                        {/* {new Date(product?.createdAt).toLocaleDateString()} */}
                        {moment(new Date(order.estimatedDeliveryDate)).format(
                          'MMMM Do YYYY'
                        )}
                        {/* {moment(new Date(order.estimatedDeliveryDate)).format(
                        'MMMM'
                      )} */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h3 className="mt-20 md:mt-40 text-4xl font-bold">No order yet</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
