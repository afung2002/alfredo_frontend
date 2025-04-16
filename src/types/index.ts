
export interface InvestmentDetails {
  id: number;
  created_at: string;
  updated_at: string;
  amount: string;
  estimated_value: string;
  investment_date: string;
  post_money_valuation: string;
  fund_invested: string;
  type: 'ANGEL' | 'FUND';
  status: 'active' | 'inactive' | string;
  user_id: string | null;
  fund: number | null;
  company: {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    website_url: string;
    founder_email: string;
    description: string;
  };
}


export interface LimitedPartnerType {
  _id: string;
  name: string;
  websiteUrl: string;
  email: string;
  description: string;
  legalEntity: string;
}
export interface Fund {
  id: string;
  name: string;
  websiteUrl: string;
  legalEntity: string;
  description: string;
  fundSize: string;
  estimatedValue: string;
  updates?: FundUpdate[];
  portfolio?: InvestmentDetails[];
}

export interface FundUpdate {
  id: string;
  description: string;
  datePosted: string;
}

export interface Document {
  id: string;
  file: File;
  companyName: string;
  description: string;
  uploadDate: string;
}

export enum InvestmentType {
  FUND = 'FUND',
  ANGEL = 'ANGEL',
}

export interface Fund {
  id: string;
  name: string;
  websiteUrl: string;
  legalEntity: string;
  description: string;
  fundSize: string;
  estimatedValue: string;
  updates?: FundUpdate[];
  portfolio?: InvestmentDetails[];
}

export interface AppType {
  title: string;
    description: string;
    imageUrl: string;
    categoryValue: string;
    category: string;
    path: string;
}