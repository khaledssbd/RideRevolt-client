import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // register
    register: builder.mutation({
      query: userInfo => ({
        url: '/auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),

    // login
    login: builder.mutation({
      query: userInfo => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),

    // changePassword
    changePassword: builder.mutation({
      query: data => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),

    // forgot Password
    updateProfile: builder.mutation({
      query: userInfo => ({
        url: '/auth/update-profile',
        method: 'POST',
        body: userInfo,
      }),
    }),

    // forgot Password
    forgotPassword: builder.mutation({
      query: userInfo => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: userInfo,
      }),
    }),

    // reset Password
    resetPassword: builder.mutation({
      query: userInfo => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
