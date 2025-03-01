import { baseApi } from '@/redux/api/baseApi';
import { TResponseRedux } from '@/types';
import { TOrder, TSurjoPayResponse } from '@/types/order.type';

const orderApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Create order
    createOrder: builder.mutation({
      query: orderInfo => ({
        url: '/orders',
        method: 'POST',
        body: orderInfo,
      }),
      invalidatesTags: ['Orders'],
    }),

    // get order by user email
    getOrdersByUserEmail: builder.query({
      query: email => ({
        url: `/orders/user/${email}`,
        method: 'GET',
      }),
      providesTags: ['Orders'], // will be set in user browser as Orders
      transformResponse: (response: TResponseRedux<TOrder[]>) => response.data,
    }),

    // Verify Payment
    verifyPayment: builder.query({
      query: order_id => ({
        url: '/orders/verify',
        params: { order_id },
        method: 'GET',
      }),
      providesTags: ['Orders'], // will be set in user browser as Orders
      transformResponse: (response: TResponseRedux<TSurjoPayResponse[]>) =>
        response?.data?.[0],
    }),

    // for admin auth only
    // Get All Orders
    getAllOrders: builder.query({
      query: () => {
        return { url: '/orders/all', method: 'GET' };
      },
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return response.data;
      },
      providesTags: ['Orders'], // will be set in admin browser as Orders
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersByUserEmailQuery,
  useGetAllOrdersQuery,
  useVerifyPaymentQuery,
} = orderApi;
