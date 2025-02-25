import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setUser } from '../features/auth/authSlice';
import { TBaseApiError } from '../../types';
import cToast from '@/components/ReactHotToast';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_MY_BACKEND}/api`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `${token}`);
    }
    return headers;
  },
});

// custom base query
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // matching all errors
  if (result?.error) {
    const errorData = result.error as TBaseApiError;
    cToast.error(errorData?.data?.message as string);
  }

  // accessToken expired
  if (result?.error?.status === 401) {
    //* Send Refresh token automatically

    const res = await fetch(
      `${import.meta.env.VITE_MY_BACKEND}/api/auth/refresh-token`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['Bike', 'Users', "Orders"],
  endpoints: () => ({}),
});
