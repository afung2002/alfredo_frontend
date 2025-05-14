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
  limited_partners:  {
    limited_partner: {
      user_id: string;
      name: string;
      email: string;
      website_url?: string;
      description?: string
    },
    invested_amount: string;
    created_at:string;
  }[]; // Array of limited partners associated with the fund
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
  fund_name: string;
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
  company_name: string;
  limited_partner?: string | null;
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
  description?: string | null;
  fund?: number; // Fund ID
  email: string;
  name: string;
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

// --- INVITATIONS ---

export type InvitationMetadata = {
  role: 'fund_manager' | 'limited_partner'; // Based on enum in swagger
  name: string;
};

export type BaseInvitation = {
  email_address: string;
  fund: number;
  invested_amount?: string;
  public_metadata: InvitationMetadata;
};

export type Invitation = BaseInvitation & {
  id: string;
  status?: string;
  expires_at?: string; // ISO 8601 datetime
  created_at?: string; // ISO 8601 datetime
};

// Single invitation create
export type CreateInvitationRequest = BaseInvitation;

// Bulk invitations create
export type BulkInvitationRequest = BaseInvitation[];

// --- LIMITED PARTNER DOCUMENTS ---

// No extra types needed here.
// We'll reuse your existing `DocumentResponse[]` when fetching LP documents.

// --- DELETE FUND MANAGER ---

// No body needed for delete fund manager mutation, 
// just pass the `user_id` as `string`.
