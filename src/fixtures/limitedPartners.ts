import type { LimitedPartnerResponse } from '../services/api/baseApi/types';

export const mockLimitedPartners: LimitedPartnerResponse[] = [
  {
    user_id: 'user_1',
    name: 'John Smith',
    email: 'john@example.com',
    website_url: 'https://johnsmith.com',
    description: 'Angel investor with 10+ years experience',
    fund: 1,
    created_at: '2023-02-01T10:00:00Z'
  },
  {
    user_id: 'user_2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    website_url: 'https://sarahjohnson.com',
    description: 'Family office investor',
    fund: 1,
    created_at: '2023-02-15T10:00:00Z'
  }
];
