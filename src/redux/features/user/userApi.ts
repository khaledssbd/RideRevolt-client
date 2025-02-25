import { baseApi } from '@/redux/api/baseApi';
import { TResponseRedux, TUser } from '@/types';

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Get All Users
    getAllUsers: builder.query({
      query: () => {
        return { url: '/users', method: 'GET' };
      },
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return response.data;
      },
      providesTags: ['Users'],
    }),

    // change User Status
    changeUserStatus: builder.mutation({
      query: data => ({
        url: `/users/block-user/${data.userId}`,
        method: 'POST',
        body: { status: data.status },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetAllUsersQuery, useChangeUserStatusMutation } = userApi;

// as now the site is not heavy loaded I dont create a bikeSlice to save bikes in the state... I will think it later if I need to.
