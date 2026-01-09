import type { FundResponse } from '../services/api/baseApi/types';

export const mockFunds: FundResponse[] = [
  {
    id: 1,
    name: 'Alpha Ventures Fund I',
    website_url: 'https://alphaventures.com',
    legal_entity: 'Alpha Ventures LLC',
    description: 'Early-stage venture capital fund focused on B2B SaaS',
    fund_size: '50000000',
    estimated_value: '75000000',
    start_date: '2023-01-15',
    end_date: '2028-01-15',
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    limited_partners: [
      {
        limited_partner: {
          user_id: 'user_1',
          name: 'John Smith',
          email: 'john@example.com',
          website_url: 'https://johnsmith.com',
          description: 'Angel investor'
        },
        invested_amount: '5000000',
        created_at: '2023-02-01T10:00:00Z'
      }
    ]
  },
  {
    id: 2,
    name: 'Beta Growth Fund',
    website_url: 'https://betagrowth.com',
    legal_entity: 'Beta Growth Partners',
    description: 'Growth-stage fund investing in consumer tech',
    fund_size: '100000000',
    estimated_value: '150000000',
    start_date: '2022-06-01',
    end_date: '2027-06-01',
    created_at: '2022-06-01T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z',
    limited_partners: []
  }
];
