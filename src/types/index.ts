
export interface InvestmentDetails {
  id: string;
  companyName: string;
  websiteUrl: string;
  founderEmail: string;
  description: string;
  amount: string;
  estimatedValue: string;
  investmentDate: string;
  postMoneyValuation: string;
  fundInvested: string;
  type: InvestmentType;
  status: string;
  updates: string
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