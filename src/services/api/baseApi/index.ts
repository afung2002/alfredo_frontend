// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tags } from '@constants/tags';
import { Endpoints } from '@constants/endpoints';
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl:import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    // Companies endpoint
    getCompanies: builder.query<Company[], void>({
      query: () => ({
        url: Endpoints.COMPANIES,
        method: 'GET',
      }),
      providesTags: [Tags.COMPANIES],
    }),
    // Investments endpoint
    getInvestments: builder.query({
      query: () => ({
        url: Endpoints.INVESTMENTS,
        method: 'GET',
      }),
      providesTags: [Tags.INVESTMENTS],
    }),
    // Funds endpoint
    getFunds: builder.query({
      query: () => ({
        url: Endpoints.FUNDS,
        method: 'GET',
      }),
      providesTags: [Tags.FUNDS],
    }),
    // Documents endpoint
    getDocuments: builder.query({
      query: () => ({
        url: Endpoints.DOCUMENTS,
        method: 'GET',
      }),
      providesTags: [Tags.Documents],
    }),
    // Partners endpoint
    getPartners: builder.query({
      query: () => ({
        url: Endpoints.LIMITED_PARTNERS,
        method: 'GET',
      }),
      providesTags: [Tags.LIMITED_PARTNERS],
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
