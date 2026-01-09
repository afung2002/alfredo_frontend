import type { CompanyResponse } from '../services/api/baseApi/types';

export const mockCompanies: CompanyResponse[] = [
  {
    id: 1,
    name: 'TechStart Inc',
    website_url: 'https://techstart.com',
    founder_email: 'founder@techstart.com',
    description: 'AI-powered productivity platform',
    created_at: '2023-03-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'DataFlow Systems',
    website_url: 'https://dataflow.io',
    founder_email: 'ceo@dataflow.io',
    description: 'Enterprise data analytics platform',
    created_at: '2023-05-20T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: 3,
    name: 'CloudSecure',
    website_url: 'https://cloudsecure.com',
    founder_email: 'hello@cloudsecure.com',
    description: 'Cloud security and compliance solutions',
    created_at: '2023-07-10T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z'
  }
];
