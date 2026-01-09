import type { InvestmentResponse } from '../services/api/baseApi/types';
import { mockCompanies } from './companies';

export const mockInvestments: InvestmentResponse[] = [
  {
    id: 1,
    amount: '2000000',
    estimated_value: '5000000',
    investment_date: '2023-04-01',
    post_money_valuation: '20000000',
    type: 'FUND',
    status: 'active',
    fund_manager_id: 'user_2vPjJ5YkMNjQqiLLKuMSw4j8PlH',
    fund: 1,
    company: mockCompanies[0],
    created_at: '2023-04-01T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    fund_name: 'Alpha Ventures Fund I',
    name: 'TechStart Inc'
  },
  {
    id: 2,
    amount: '1500000',
    estimated_value: '3000000',
    investment_date: '2023-06-15',
    post_money_valuation: '15000000',
    type: 'ANGEL',
    status: 'active',
    fund_manager_id: 'user_2vPjJ5YkMNjQqiLLKuMSw4j8PlH',
    company: mockCompanies[1],
    created_at: '2023-06-15T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z',
    fund_name: 'Personal',
    name: 'DataFlow Systems'
  }
];
