import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/auth",
    credentials: "include", //permintaan akan membawa cookie sesi pengguna yang relevan, misalnya, untuk otentikasi di server yang membutuhkan itu.
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentialUser) => ({
        url: "/login",
        method: "POST",
        body: credentialUser,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      refetchOnMount: true,
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/:${userId}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/:${userId}`,
        method: "PATCH",
      }),
      refetchOnMount: true,
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = authApi;
