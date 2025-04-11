import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Endpoints } from '@constants/endpoints';
import { Tags } from '@constants/tags';

import type {
  FundRequest,
  FundResponse,
  FundPayload,
  FundUpdatePostRequest,
  FundUpdateResponse,
  FundUpdatePayload,
  CompanyRequest,
  CompanyResponse,
  CompanyPayload,
  InvestmentRequest,
  InvestmentResponse,
  InvestmentPayload,
  DocumentResponse,
  DocumentUploadRequest,
} from './types';


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: [Tags.FUNDS, Tags.FUND_UPDATES, Tags.COMPANIES, Tags.INVESTMENTS, Tags.DOCUMENTS],
  endpoints: (builder) => ({
    // --- FUNDS ---

    getFunds: builder.query<FundResponse[], void>({
      query: () => ({
        url: Endpoints.FUNDS,
        method: 'GET',
      }),
      providesTags: [Tags.FUNDS],
    }),

    createFund: builder.mutation<FundResponse, FundRequest>({
      query: (newFund) => ({
        url: Endpoints.FUNDS,
        method: 'POST',
        body: newFund,
      }),
      invalidatesTags: [Tags.FUNDS],
    }),

    getFundById: builder.query<FundResponse, number | string>({
      query: (id) => ({
        url: `${Endpoints.FUNDS}${id}/`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: Tags.FUNDS, id }],
    }),

    updateFund: builder.mutation<FundResponse, FundPayload>({
      query: ({ id, ...data }) => ({
        url: `${Endpoints.FUNDS}${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tags.FUNDS, id },
        Tags.FUNDS,
      ],
    }),

    patchFund: builder.mutation<FundResponse, FundPayload>({
      query: ({ id, ...data }) => ({
        url: `${Endpoints.FUNDS}${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tags.FUNDS, id },
        Tags.FUNDS,
      ],
    }),

    deleteFund: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `${Endpoints.FUNDS}${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: Tags.FUNDS, id },
        Tags.FUNDS,
      ],
    }),

    // --- FUND UPDATES ---

    getFundUpdates: builder.query<FundUpdateResponse[], void>({
      query: () => ({
        url: Endpoints.FUND_UPDATES,
        method: 'GET',
      }),
      providesTags: [Tags.FUND_UPDATES],
    }),

    createFundUpdate: builder.mutation<FundUpdateResponse, FundUpdatePostRequest>({
      query: (data) => ({
        url: Endpoints.FUND_UPDATES,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [Tags.FUND_UPDATES],
    }),

    getFundUpdateById: builder.query<FundUpdateResponse, number | string>({
      query: (id) => ({
        url: `${Endpoints.FUND_UPDATES}${id}/`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: Tags.FUND_UPDATES, id }],
    }),

    updateFundUpdate: builder.mutation<FundUpdateResponse, FundUpdatePayload>({
      query: ({ id, ...data }) => ({
        url: `${Endpoints.FUND_UPDATES}${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tags.FUND_UPDATES, id },
        Tags.FUND_UPDATES,
      ],
    }),

    patchFundUpdate: builder.mutation<FundUpdateResponse, FundUpdatePayload>({
      query: ({ id, ...data }) => ({
        url: `${Endpoints.FUND_UPDATES}${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tags.FUND_UPDATES, id },
        Tags.FUND_UPDATES,
      ],
    }),

    deleteFundUpdate: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `${Endpoints.FUND_UPDATES}${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: Tags.FUND_UPDATES, id },
        Tags.FUND_UPDATES,
      ],
    }),

    // --- COMPANIES ---
    getCompanies: builder.query<CompanyResponse[], void>({
      query: () => ({
        url: Endpoints.COMPANIES,
        method: 'GET',
      }),
      providesTags: [Tags.COMPANIES],
    }),
    
    createCompany: builder.mutation<CompanyResponse, CompanyRequest>({
      query: (data) => ({
        url: Endpoints.COMPANIES,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [Tags.COMPANIES],
    }),
    
    getCompanyById: builder.query<CompanyResponse, number | string>({
      query: (id) => ({
        url: `${Endpoints.COMPANIES}${id}/`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: Tags.COMPANIES, id }],
    }),
    
    updateCompany: builder.mutation<CompanyResponse, CompanyPayload>({
      query: ({ id, ...data }) => ({
        url: `${Endpoints.COMPANIES}${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tags.COMPANIES, id },
        Tags.COMPANIES,
      ],
    }),
    
    patchCompany: builder.mutation<CompanyResponse, CompanyPayload>({
      query: ({ id, ...data }) => ({
        url: `${Endpoints.COMPANIES}${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tags.COMPANIES, id },
        Tags.COMPANIES,
      ],
    }),
    
    deleteCompany: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `${Endpoints.COMPANIES}${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: Tags.COMPANIES, id },
        Tags.COMPANIES,
      ],
    }),

    // --- INVESTMENTS ---

    getInvestments: builder.query<InvestmentResponse[], void>({
      query: () => ({
        url: Endpoints.INVESTMENTS,
        method: 'GET',
      }),
      providesTags: [Tags.INVESTMENTS],
    }),
    
    createInvestment: builder.mutation<InvestmentResponse, InvestmentRequest>({
      query: (data) => ({
        url: Endpoints.INVESTMENTS,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [Tags.INVESTMENTS],
    }),
    
    getInvestmentById: builder.query<InvestmentResponse, number | string>({
      query: (id) => ({
        url: `${Endpoints.INVESTMENTS}${id}/`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: Tags.INVESTMENTS, id }],
    }),
    
    updateInvestment: builder.mutation<InvestmentResponse, InvestmentPayload>({
      query: ({ id, ...data }) => ({
        url: `${Endpoints.INVESTMENTS}${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tags.INVESTMENTS, id },
        Tags.INVESTMENTS,
      ],
    }),
    
    patchInvestment: builder.mutation<InvestmentResponse, InvestmentPayload>({
      query: ({ id, ...data }) => ({
        url: `${Endpoints.INVESTMENTS}${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tags.INVESTMENTS, id },
        Tags.INVESTMENTS,
      ],
    }),
    
    deleteInvestment: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `${Endpoints.INVESTMENTS}${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: Tags.INVESTMENTS, id },
        Tags.INVESTMENTS,
      ],
    }),

    // --- DOCUMENTS ---

getDocuments: builder.query<DocumentResponse[], void>({
  query: () => ({
    url: Endpoints.DOCUMENTS,
    method: 'GET',
  }),
  providesTags: [Tags.DOCUMENTS],
}),

getDocumentById: builder.query<DocumentResponse, number | string>({
  query: (id) => ({
    url: `${Endpoints.DOCUMENTS}${id}/`,
    method: 'GET',
  }),
  providesTags: (_result, _error, id) => [{ type: Tags.DOCUMENTS, id }],
}),

uploadDocument: builder.mutation<DocumentResponse, DocumentUploadRequest>({
  query: (formData) => {
    const body = new FormData();
    body.append('name', formData.name);
    body.append('company_name', formData.company_name);
    if (formData.description) body.append('description', formData.description);
    if (formData.upload_date) body.append('upload_date', formData.upload_date);
    if (formData.investment !== undefined) body.append('investment', String(formData.investment));
    if (formData.fund !== undefined) body.append('fund', String(formData.fund));
    body.append('file', formData.file);

    return {
      url: Endpoints.DOCUMENTS,
      method: 'POST',
      body,
    };
  },
  invalidatesTags: [Tags.DOCUMENTS],
}),

deleteDocument: builder.mutation<void, number | string>({
  query: (id) => ({
    url: `${Endpoints.DOCUMENTS}${id}/`,
    method: 'DELETE',
  }),
  invalidatesTags: (_result, _error, id) => [
    { type: Tags.DOCUMENTS, id },
    Tags.DOCUMENTS,
  ],
}),

downloadDocument: builder.query<DocumentResponse, number | string>({
  query: (id) => ({
    url: `${Endpoints.DOCUMENTS}${id}/download/`,
    method: 'GET',
  }),
  providesTags: (_result, _error, id) => [{ type: Tags.DOCUMENTS, id }],
}),

    
    
  }),
});

export const {
  // Funds
  useGetFundsQuery,
  useCreateFundMutation,
  useGetFundByIdQuery,
  useUpdateFundMutation,
  usePatchFundMutation,
  useDeleteFundMutation,

  // Fund Updates
  useGetFundUpdatesQuery,
  useCreateFundUpdateMutation,
  useGetFundUpdateByIdQuery,
  useUpdateFundUpdateMutation,
  usePatchFundUpdateMutation,
  useDeleteFundUpdateMutation,

  // Companies
useGetCompaniesQuery,
useCreateCompanyMutation,
useGetCompanyByIdQuery,
useUpdateCompanyMutation,
usePatchCompanyMutation,
useDeleteCompanyMutation,

// Investments
useGetInvestmentsQuery,
useCreateInvestmentMutation,
useGetInvestmentByIdQuery,
useUpdateInvestmentMutation,
usePatchInvestmentMutation,
useDeleteInvestmentMutation,

// Documents
useGetDocumentsQuery,
useGetDocumentByIdQuery,
useUploadDocumentMutation,
useDeleteDocumentMutation,
useDownloadDocumentQuery,


} = apiSlice;
