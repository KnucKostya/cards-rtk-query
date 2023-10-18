import { baseApi } from '@/services/api.ts'
import {
  GetMeQueryResponseData,
  LoginArgs,
  LogInResponseData,
  RecoverPasswordArgs,
  SignUpArgs,
  SignUpResponseData,
} from '@/services/auth-service'
import { ResetPasswordArgs } from '@/services/deck-service'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<GetMeQueryResponseData, void>({
        query: () => {
          return {
            url: `/v1/auth/me`,
          }
        },
        providesTags: ['Me'],
      }),
      logIn: builder.mutation<LogInResponseData, LoginArgs>({
        query: body => {
          return {
            url: `/v1/auth/login`,
            method: 'POST',
            body,
          }
        },
        invalidatesTags: ['Me'],
      }),
      logOut: builder.mutation<void, void>({
        query: () => {
          return {
            url: `/v1/auth/logout`,
            method: 'POST',
          }
        },
        invalidatesTags: ['Me'],
      }),
      signUp: builder.mutation<SignUpResponseData, SignUpArgs>({
        query: body => {
          return {
            url: `/v1/auth/sign-up`,
            method: 'POST',
            body,
          }
        },
      }),
      recoverPassword: builder.mutation<void, RecoverPasswordArgs>({
        query: body => {
          return {
            url: `/v1/auth/recover-password`,
            method: 'POST',
            body,
          }
        },
      }),
      resetPassword: builder.mutation<void, ResetPasswordArgs>({
        query: ({ token, ...args }) => {
          return {
            url: `/v1/auth/reset-password/${token}`,
            method: 'POST',
            body: { ...args },
          }
        },
      }),
    }
  },
})

export const {
  useLogInMutation,
  useMeQuery,
  useLogOutMutation,
  useSignUpMutation,
  useRecoverPasswordMutation,
  useResetPasswordMutation,
} = authService

// onQueryStarted: async (_, { getState, dispatch, queryFulfilled }) => {
//   try {
//     await queryFulfilled
//     dispatch(authService.util.updateQueryData('me', undefined, () => null))
//   } catch (error) {}
// },
