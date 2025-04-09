// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    // Companies endpoint
    getCompanies: builder.query({
      query: () => '/companies',
    }),
    // Investments endpoint
    getInvestments: builder.query({
      query: () => '/investments',
    }),
    // Funds endpoint
    getFunds: builder.query({
      query: () => '/funds',
    }),
    // Documents endpoint
    getDocuments: builder.query({
      query: () => '/documents',
    }),
    // Partners endpoint
    getPartners: builder.query({
      query: () => '/partners',
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints.
export const {
  useGetCompaniesQuery,
  useGetInvestmentsQuery,
  useGetFundsQuery,
  useGetDocumentsQuery,
  useGetPartnersQuery,
} = apiSlice;
