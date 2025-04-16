import { InvestmentDetails } from "../types";

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
      totals.totalFundInvested += parseFloat(investment.fund_invested || '0');
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


export const filterInvestmentsByType = (investments: InvestmentDetails[], type: InvestmentType): InvestmentDetails[] => {
  console.log(investments, type)
  return investments.filter(inv => inv.type === type);
}; 