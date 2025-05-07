import { FundResponse, InvestmentResponse } from "../services/api/baseApi/types";
import { InvestmentDetails } from "../types";
import { Clerk } from '@clerk/clerk-js';

export type InvestmentTotals = {
  totalFundInvested: number;
  totalEstimatedValue: number;
  totalInvestments: number;
};
export function calculateInvestmentTotals(investments: InvestmentDetails[]): InvestmentTotals {
  if (!Array.isArray(investments) || investments.length === 0 || !investments) {
    return { totalFundInvested: 0, totalEstimatedValue: 0, totalInvestments: 0 };
  }
  return investments.reduce(
    (totals, investment) => {
      totals.totalFundInvested += parseFloat(investment.amount || '0');
      totals.totalEstimatedValue += parseFloat(investment.estimated_value || '0');
      totals.totalInvestments += 1;
      return totals;
    },
    { totalFundInvested: 0, totalEstimatedValue: 0, totalInvestments: 0 }
  );
}

// Define interface for the fund object


// Utility function to calculate totals
export const calculateFundTotals = (funds: any[]) => {
  let totalFundSize = 0;
  let totalEstimatedValue = 0;

  for (const fund of funds) {
    const fundSize = parseFloat(fund.fund_size ?? '0');
    const estimatedValue = parseFloat(fund.estimated_value ?? '0');

    totalFundSize += isNaN(fundSize) ? 0 : fundSize;
    totalEstimatedValue += isNaN(estimatedValue) ? 0 : estimatedValue;
  }

  return {
    totalFundSize,
    totalEstimatedValue,
  };
};



export function formatNumberString(value: string | number | null): string {
  const number = Number(value);
  return isNaN(number) ? '$0' : `$${number.toLocaleString('en-US')}`;
}

import { InvestmentType } from '../types';


export const filterInvestmentsByType = (investments: InvestmentResponse[], type: InvestmentType): InvestmentResponse[] => {
  return investments.filter(inv => inv.type === type);
}; 

export const filterInvitationsByStatus = (invitations: any[], status: string): any[] => {
  return invitations.filter(inv => inv.status === status);
};

const clerk = new Clerk( import.meta.env.VITE_PUBLIC_CLERK_FRONTEND_API_KEY!);

export const getClerkToken = async (template?: string) => {
  await clerk.load();
  const token = await clerk.session?.getToken({ template });
  return token;
};

export function getReferencedFunds(investments: InvestmentResponse[], funds: FundResponse[]): FundResponse[] {
  const fundIds = investments
    .filter(inv => inv.type === "FUND" && inv.fund !== null)
    .map(inv => inv.fund as number);

  const uniqueFundIds = Array.from(new Set(fundIds));

  return funds.filter(fund => uniqueFundIds.includes(fund.id));
}

export const getReferencedCompanies = (investments: InvestmentResponse[], investmentType: string, id?: string) => {
  console.log(investments, 'investments')
  console.log(investmentType, 'angle-investment')
  console.log(investmentType === "angle-investment")
  console.log(id, 'id')
  if (investmentType === "fund-investment") {
    const companies = investments.filter(inv => inv.type === "FUND" && inv.fund === +id).map(inv => inv.company);
    console.log(companies, 'companies')
    return companies
  } else if (investmentType === "angel-investment") {
    console.log('angel')
    return investments.filter(inv => inv.type === "ANGEL").map(inv => inv.company);
  }
}

export const formatNumberWithCommas = (value: string) => {
  const number = value.replace(/,/g, ''); // Remove any commas first
  if (isNaN(Number(number))) return value; // If not a number, return original
  return Number(number).toLocaleString('en-US'); // American style commas
};

export const removeCommas = (value: string) => value.replace(/,/g, '');

export const calculateInvitationsTotals = (invitations: any[]) => {
  let totalInvitations = 0;
  let totalPending = 0;
  let totalRegistered = 0;
  let totalExpired = 0;

  for (const invitation of invitations) {
    if (invitation.status === "pending") {
      totalPending += 1;
    } else if (invitation.status === "registered") {
      totalRegistered += 1;
    } else if (invitation.status === "expired") {
      totalExpired += 1;
    }
    totalInvitations += 1;
  }

  return {
    totalInvitations,
    totalPending,
    totalRegistered,
    totalExpired,
  };
}