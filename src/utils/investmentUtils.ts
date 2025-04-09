import { InvestmentDetails, InvestmentType } from '../types';

export const transformInvestmentData = (data: any[]): InvestmentDetails[] => {
  console.log(data)
  return data.map((inv: InvestmentDetails) => ({
    id: inv.id,
    companyName: inv.companyName,
    websiteUrl: inv.websiteUrl,
    founderEmail: inv.founderEmail,
    description: inv.description,
    amount: inv.amount?.toString(),
    estimatedValue: inv.estimatedValue?.toString(),
    investmentDate: inv.investmentDate,
    postMoneyValuation: inv.postMoneyValuation?.toString(),
    fundInvested: inv.fundInvested,
    type: inv.fundInvested ? InvestmentType.FUND : InvestmentType.ANGEL,
    status: inv.status,
    updates: inv.updates,
  }));
};

export const calculateTotalInvestments = (investments: InvestmentDetails[]): number => {
  return investments.length;
};

export const calculateTotalInvested = (investments: InvestmentDetails[]): string => {
  return investments
    .reduce((sum, inv) => sum + parseInt(inv.amount.replace(/[$,]/g, '')), 0)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

export const calculateEstimatedValue = (totalInvested: string): string => {
  return (parseInt(totalInvested.replace(/[$,]/g, '')) * 1.5)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

export const filterInvestmentsByType = (investments: InvestmentDetails[], type: InvestmentType): InvestmentDetails[] => {
  return investments.filter(inv => inv.type === type);
}; 