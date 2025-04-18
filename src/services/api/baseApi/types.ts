// types.ts

// FUNDS
export type BaseFund = {
  name: string;
  website_url?: string | null;
  legal_entity?: string | null;
  description?: string | null;
  fund_size?: string | null;
  estimated_value?: string | null;
  start_date?: string | null; // format: YYYY-MM-DD
  end_date?: string | null;   // format: YYYY-MM-DD
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
  created_at: string;
  updated_at: string;
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

export type CompanyRequest = BaseCompany & {
  fund_manager_id: string | null; // TODO: REMOVE AFTER BACKEND FIX
};

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
  amount: string; // stored as string (possibly decimal in backend)
  estimated_value: string;
  investment_date: string; // format: YYYY-MM-DD
  post_money_valuation: string;
  type: 'FUND' | 'ANGEL'; // Adjust enum if needed
  status: string;
  fund_manager_id: string | null;
  fund: number;
  company: CompanyResponse;
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

export type InvestmentWithDocuments = InvestmentResponse & {
  documents: DocumentResponse[];
};

// DOCUMENTS
export type DocumentUploadRequest = {
  fund_manager_id: string;
  name: string;
  description?: string | null;
  upload_date?: string | null; // YYYY-MM-DD
  investment?: string | null;
  fund?: string | null;
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

// FUND DETAIL
export type FundDetail = FundResponse & {
  documents: DocumentResponse[];
  investments: InvestmentWithDocuments[];
};

// LIMITED PARTNER
export type LimitedPartner = {
  user_id: string;
  website_url?: string | null;
  legal_entity?: string | null;
  description?: string | null;
  fund?: number; // Fund ID
};

export type LimitedPartnerResponse = LimitedPartner & {
  created_at?: string;
};

// FUND-LIMITED-PARTNERS
export type FundLimitedPartnerRequest = {
  fund: number; // Fund ID
  limited_partner: string; // user_id of the limited partner
  invested_amount: string; // string representing decimal
};

export type FundLimitedPartnerResponse = FundLimitedPartnerRequest & {
  user_id: number;
  created_at: string; // ISO 8601 date-time
};
