import { CompanyResponse } from "../services/api/baseApi/types";

// InvestmentDetails aligned with InvestmentResponse and embedded company
export interface InvestmentDetails {
  id: number;
  created_at: string;
  updated_at: string;
  amount: string;
  estimated_value: string;
  investment_date: string;
  post_money_valuation: string;
  type: 'ANGEL' | 'FUND';
  status: string;
  user_id?: string | null;
  fund?: number | null;
  company?: CompanyResponse; // Aligned with your backend type
}

// Aligned with LimitedPartnerResponse (renamed keys to match camelCase)
export interface LimitedPartnerType {
  user_id: string;
  website_url?: string | null;
  legal_entity?: string | null;
  description?: string | null;
  name: string;
  legalEntity: string;
  email: string;
  id: string;
}

// Aligned with FundResponse + additional fields (updates and portfolio)
export interface Fund {
  id: number;
  name: string;
  website_url?: string | null;
  legal_entity?: string | null;
  description?: string | null;
  fund_size?: string | null;
  estimated_value?: string | null;
  updates?: FundUpdate[]; // Mapped from FundUpdateResponse
  portfolio?: InvestmentDetails[];
}

// Aligned with FundUpdateResponse
export interface FundUpdate {
  id: number;
  title: string;
  description?: string | null;
  date?: string | null; // format: YYYY-MM-DD
  created_at: string;
  updated_at: string;
}

// Aligned with DocumentResponse (not DocumentUploadRequest)
export interface Document {
  id: number;
  name: string;
  company_name: string;
  description?: string | null;
  upload_date?: string | null;
  file: string; // file URL
  created_at: string;
  updated_at: string;
}

export enum InvestmentType {
  FUND = 'FUND',
  ANGEL = 'ANGEL',
}

export enum InvitationStatus {
  PENDING = 'pending',
  REGISTERED = 'registered',
  REJECTED = 'rejected',
    EXPIRED = 'expired',
  }

// Unchanged, frontend-only type
export interface AppType {
  title: string;
  description: string;
  imageUrl: string;
  categoryValue: string;
  category: string;
  path: string;
}
