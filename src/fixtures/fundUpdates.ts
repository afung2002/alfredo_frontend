import type { FundUpdateResponse } from '../services/api/baseApi/types';

export const mockFundUpdates: FundUpdateResponse[] = [
  {
    id: 1,
    title: 'Q1 2024 Portfolio Update',
    description: 'Strong quarter with two new investments and one exit',
    date: '2024-03-31',
    fund: 1,
    created_at: '2024-04-01T10:00:00Z',
    updated_at: '2024-04-01T10:00:00Z'
  },
  {
    id: 2,
    title: 'New Investment: TechStart Inc',
    description: 'Invested $2M in Series A round',
    date: '2023-04-01',
    fund: 1,
    created_at: '2023-04-01T10:00:00Z',
    updated_at: '2023-04-01T10:00:00Z'
  }
];
