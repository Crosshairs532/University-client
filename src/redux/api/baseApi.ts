import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:2000/api/v1",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
