import { baseApi } from '@/redux/api/baseApi';
import { TProduct, TData, TQueryParam, TResponseRedux } from '@/types';

const productApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // add a new Product
    postProduct: builder.mutation({
      query: product => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Bike'],
    }),

    // Get All Product
    getAllProducts: builder.query({
      query: args => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/products',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['Bike'],
      transformResponse: (response: TResponseRedux<TData<TProduct[]>>) => {
        return {
          data: response.data?.result,
          meta: response.data?.meta,
        };
      },
    }),

    // Get Product By Id
    getProductById: builder.query({
      query: id => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      providesTags: ['Bike'],
      transformResponse: (response: TResponseRedux<TProduct>) => response.data,
    }),

    // update a Product
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/update/${id}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Bike'],
    }),

    // delete a bike
    deleteProduct: builder.mutation({
      query: id => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bike'],
    }),
  }),
});

export const {
  usePostProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

// as now the site is not heavy loaded I dont create a bikeSlice to save bikes in the state... I will think it later if I need to.
