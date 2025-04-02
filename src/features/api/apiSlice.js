import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    // ... other endpoints
  }),
});

export const { useGetUsersQuery } = apiSlice;
