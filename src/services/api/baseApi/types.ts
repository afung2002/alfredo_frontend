// FUNDS

export type BaseFund = {
  name: string;
  website_url?: string | null;
  legal_entity?: string | null;
  description?: string | null;
  fund_size?: string | null;
  estimated_value?: string | null;
  start_date?: string | null;
  end_date?: string | null;
};

export type FundRequest = BaseFund;

export type FundResponse = BaseFund & {
  id: number;
  created_at: string; // ISO 8601 date-time
  updated_at: string; // ISO 8601 date-time
};

export type FundPayload = FundRequest & {
  id: number;
};


// FUND UPDATES

export type BaseFundUpdate = {
  title: string;
  description?: string | null;
  date?: string | null; // format: YYYY-MM-DD
  fund: number;
};

export type FundUpdatePostRequest = BaseFundUpdate;

export type FundUpdateResponse = BaseFundUpdate & {
  id: number;
  created_at: string;   // ISO 8601 date-time
  updated_at: string;   // ISO 8601 date-time
};

export type FundUpdatePayload = BaseFundUpdate & {
  id: number;
};

// COMPANIES

export type BaseCompany = {
  name: string;
  website_url?: string | null;
  founder_email: string;
  description?: string | null;
};

export type CompanyRequest = BaseCompany;

export type CompanyResponse = BaseCompany & {
  id: number;
  created_at: string;
  updated_at: string;
};

export type CompanyPayload = BaseCompany & {
  id: number;
};

// INVESTMENTS

export type BaseInvestment = {
  amount: string;
  estimated_value: string;
  investment_date: string; // YYYY-MM-DD
  post_money_valuation: string;
  fund_invested: string;
  type: 'ANGEL' | 'FUND';
  status: string;
  user_id?: string | null;
  fund?: number | null;
  company?: number | null;
};

export type InvestmentRequest = BaseInvestment;

export type InvestmentResponse = BaseInvestment & {
  id: number;
  created_at: string;
  updated_at: string;
};

export type InvestmentPayload = BaseInvestment & {
  id: number;
};

// DOCUMENTS

export type DocumentUploadRequest = {
  name: string;
  company_name: string;
  description?: string | null;
  upload_date?: string | null; // format: YYYY-MM-DD
  investment?: number | null;
  fund?: number | null;
  file: File;
};

export type DocumentResponse = {
  id: number;
  name: string;
  company_name: string;
  description?: string | null;
  upload_date?: string | null;
  file: string; // file URL
  created_at: string;
  updated_at: string;
};
