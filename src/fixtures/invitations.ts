import type { Invitation } from '../services/api/baseApi/types';

export const mockInvitations: Invitation[] = [
  {
    id: 'inv_1',
    email_address: 'newlp@example.com',
    fund: 1,
    invested_amount: '1000000',
    public_metadata: {
      role: 'limited_partner',
      name: 'New Limited Partner'
    },
    status: 'pending',
    expires_at: '2024-12-31T23:59:59Z',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'inv_2',
    email_address: 'anotherlp@example.com',
    fund: 1,
    invested_amount: '2000000',
    public_metadata: {
      role: 'limited_partner',
      name: 'Another Limited Partner'
    },
    status: 'registered',
    expires_at: '2024-12-31T23:59:59Z',
    created_at: '2024-01-10T10:00:00Z'
  }
];
