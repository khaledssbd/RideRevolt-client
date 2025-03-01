import LoadingSpinner from '@/components/LoadingSpinner';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGetAllOrdersQuery } from '@/redux/features/order/orderApi';

const ManageOrders = () => {
  const { data: allOrders, isLoading } = useGetAllOrdersQuery(undefined);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="my-10 text-black dark:text-white">
      <h3 className="text-xl md:text-4xl text-center my-10">
        Manage orders ({allOrders?.length})
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
        {allOrders?.length ? (
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
                    Catagory
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Customer Email
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
                {allOrders
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
                      <td className="px-6 py-4">{order?.product?.category}</td>
                      <td className="px-6 py-4">{order?.user?.email}</td>
                      <td className="px-6 py-4">{order?.quantity}</td>
                      <td className="px-6 py-4">{order?.totalPrice}</td>
                      <td className="px-6 py-4">
                        {order?.status}

                        {/* <select
                          className="p-2 border rounded-lg focus:outline-green-500"
                          required
                          onChange={e =>
                            handleOrderStatusChange(e.target.value, order._id)
                          }
                          defaultValue={order.status}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Paid">Paid</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Completed">Completed</option>
                        </select> */}
                      </td>
                      <td className="px-6 py-4">{order?.transaction.id}</td>
                      <td className="px-6 py-4">
                        {/* {new Date(product?.createdAt).toLocaleDateString()} */}
                        {moment(new Date(order?.estimatedDeliveryDate)).format(
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

export default ManageOrders;
