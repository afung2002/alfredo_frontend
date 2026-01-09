// services/baseQueryWithReauth.ts
import { fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setToken } from '@redux/slices/configs';
import { getClerkToken } from '@utils/index';
import { fixtureStore } from '@src/fixtures/store';
import { Endpoints } from '@constants/endpoints';

const USE_FIXTURES = import.meta.env.VITE_USE_FIXTURES === 'true';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fixture mode query handler
const fixtureQuery = async (args: string | FetchArgs): Promise<any> => {
  await delay(300 + Math.random() * 500); // 300-800ms delay

  const url = typeof args === 'string' ? args : args.url;
  const method = typeof args === 'string' ? 'GET' : (args.method || 'GET');
  const body = typeof args === 'string' ? undefined : args.body;

  // Parse URL to determine endpoint
  const urlPath = url.replace(/^\/+/, '').split('?')[0];
  const urlParts = urlPath.split('/').filter(Boolean);
  const endpoint = urlParts[0];
  const id = urlParts[1] ? parseInt(urlParts[1], 10) : null;
  const subEndpoint = urlParts[2];

  try {
    // Funds
    if (endpoint === Endpoints.FUNDS || endpoint === 'funds') {
      if (method === 'GET') {
        if (id && !subEndpoint) {
          return { data: fixtureStore.getFundById(id) };
        }
        if (subEndpoint === 'documents' && id) {
          return { data: fixtureStore.getDocumentsByFundId(String(id)) };
        }
        return { data: fixtureStore.getFunds() };
      }
      if (method === 'POST') {
        return { data: fixtureStore.createFund(body as any) };
      }
      if (method === 'PUT' || method === 'PATCH') {
        return { data: fixtureStore.updateFund(id!, body as any) };
      }
      if (method === 'DELETE') {
        fixtureStore.deleteFund(id!);
        return { data: undefined };
      }
    }

    // Fund Detail (special endpoint)
    if (urlPath.includes('/funds/') && id && !subEndpoint && method === 'GET') {
      return { data: fixtureStore.getFundDetail(id) };
    }

    // Fund Updates
    if (endpoint === Endpoints.FUND_UPDATES || endpoint === 'fund-updates') {
      if (method === 'GET') {
        if (id) {
          return { data: fixtureStore.getFundUpdateById(id) };
        }
        return { data: fixtureStore.getFundUpdates() };
      }
      if (method === 'POST') {
        return { data: fixtureStore.createFundUpdate(body as any) };
      }
      if (method === 'PUT' || method === 'PATCH') {
        return { data: fixtureStore.updateFundUpdate(id!, body as any) };
      }
      if (method === 'DELETE') {
        fixtureStore.deleteFundUpdate(id!);
        return { data: undefined };
      }
    }

    // Companies
    if (endpoint === Endpoints.COMPANIES || endpoint === 'companies') {
      if (method === 'GET') {
        if (id) {
          if (subEndpoint === 'documents') {
            return { data: fixtureStore.getDocumentsByCompanyId(String(id)) };
          }
          return { data: fixtureStore.getCompanyById(id) };
        }
        return { data: fixtureStore.getCompanies() };
      }
      if (method === 'POST') {
        return { data: fixtureStore.createCompany(body as any) };
      }
      if (method === 'PUT' || method === 'PATCH') {
        return { data: fixtureStore.updateCompany(id!, body as any) };
      }
      if (method === 'DELETE') {
        fixtureStore.deleteCompany(id!);
        return { data: undefined };
      }
    }

    // Investments
    if (endpoint === Endpoints.INVESTMENTS || endpoint === 'investments') {
      if (method === 'GET') {
        if (id) {
          if (subEndpoint === 'documents') {
            return { data: fixtureStore.getDocumentsByInvestmentId(String(id)) };
          }
          return { data: fixtureStore.getInvestmentById(id) };
        }
        // Parse query params for filtering
        const queryParams = new URLSearchParams(url.split('?')[1] || '');
        const fundId = queryParams.get('fund') ? parseInt(queryParams.get('fund')!, 10) : undefined;
        const companyId = queryParams.get('company') ? parseInt(queryParams.get('company')!, 10) : undefined;
        return { data: fixtureStore.getInvestments(fundId, companyId) };
      }
      if (method === 'POST') {
        return { data: fixtureStore.createInvestment(body as any) };
      }
      if (method === 'PUT' || method === 'PATCH') {
        return { data: fixtureStore.updateInvestment(id!, body as any) };
      }
      if (method === 'DELETE') {
        fixtureStore.deleteInvestment(id!);
        return { data: undefined };
      }
    }

    // Documents
    if (endpoint === Endpoints.DOCUMENTS || endpoint === 'documents') {
      if (method === 'GET') {
        if (id) {
          if (subEndpoint === 'download') {
            // Return a mock blob for download
            return { data: new Blob(['Mock document content'], { type: 'application/pdf' }) };
          }
          return { data: fixtureStore.getDocumentById(id) };
        }
        return { data: fixtureStore.getDocuments() };
      }
      if (method === 'POST') {
        return { data: fixtureStore.createDocument(body as any) };
      }
      if (method === 'DELETE') {
        fixtureStore.deleteDocument(id!);
        return { data: undefined };
      }
    }

    // Limited Partners
    if (endpoint === 'limited-partner' || urlPath.startsWith('limited-partner/') || urlPath.startsWith('limited_partner/')) {
      const userId = urlParts[1];
      if (method === 'GET') {
        if (urlParts[2] === 'funds') {
          return { data: fixtureStore.getLimitedPartnerFunds(userId) };
        }
        if (urlParts[2] === 'documents') {
          return { data: fixtureStore.getLimitedPartnerDocuments(userId) };
        }
        if (userId && userId !== 'limited-partner' && userId !== 'limited_partner') {
          return { data: fixtureStore.getLimitedPartnerById(userId) };
        }
        return { data: fixtureStore.getLimitedPartners() };
      }
      if (method === 'POST') {
        return { data: fixtureStore.createLimitedPartner(body as any) };
      }
      if (method === 'PUT' || method === 'PATCH') {
        return { data: fixtureStore.updateLimitedPartner(userId, body as any) };
      }
      if (method === 'DELETE') {
        fixtureStore.deleteLimitedPartner(userId);
        return { data: undefined };
      }
    }

    // Fund Limited Partners
    if (endpoint === Endpoints.FUND_LIMITED_PARTNERS || endpoint === 'fund-limited-partners') {
      if (method === 'POST') {
        return { data: fixtureStore.createFundLimitedPartner(body as any) };
      }
    }

    // Invitations
    if (endpoint === 'invitations' || urlPath.startsWith('invitations/')) {
      const invId = urlParts[1];
      if (method === 'GET') {
        if (urlPath.includes('grouped-by-email')) {
          return { data: fixtureStore.getInvitationsGroupedByEmail() };
        }
        if (invId) {
          return { data: fixtureStore.getInvitationById(invId) };
        }
        return { data: fixtureStore.getInvitations() };
      }
      if (method === 'POST') {
        if (urlPath.includes('bulk-create')) {
          return { data: fixtureStore.createBulkInvitations(body as any) };
        }
        if (urlPath.includes('accept')) {
          // Mock accept response
          return { data: { success: true } };
        }
        return { data: fixtureStore.createInvitation(body as any) };
      }
      if (method === 'PUT' || method === 'PATCH') {
        return { data: fixtureStore.updateInvitation(invId, body as any) };
      }
      if (method === 'DELETE') {
        fixtureStore.deleteInvitation(invId);
        return { data: undefined };
      }
    }

    // Fund Manager
    if (urlPath.startsWith('fund-manager/') && method === 'DELETE') {
      const userId = urlParts[1];
      // Mock delete
      return { data: undefined };
    }

    // Default: return empty array or null
    return { data: null };
  } catch (error) {
    return {
      error: {
        status: 500,
        data: { message: 'Fixture error: ' + (error as Error).message }
      }
    };
  }
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).configs.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Use fixtures if enabled
  if (USE_FIXTURES) {
    return fixtureQuery(args);
  }

  // Otherwise use real API
  let result = await rawBaseQuery(args, api, extraOptions);
  if (result.error && (result.error.status === 401)) {
    try {
      const token = await getClerkToken('access_token');
      if (token) {
        api.dispatch(setToken(token));
        result = await rawBaseQuery(args, api, extraOptions);
      }
    } catch (e) {
      console.error('Token refresh failed', e);
    }
  }
  return result;
};
