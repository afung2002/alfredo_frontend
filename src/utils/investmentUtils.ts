import { Investment, InvestmentType } from '../types';

export const transformInvestmentData = (data: any[]): Investment[] => {
  return data.map((inv: any) => ({
    id: inv._id,
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
    status: inv.status
  }));
};

export const calculateTotalInvestments = (investments: Investment[]): number => {
  return investments.length;
};

export const calculateTotalInvested = (investments: Investment[]): string => {
  return investments
    .reduce((sum, inv) => sum + parseInt(inv.amount.replace(/[$,]/g, '')), 0)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

export const calculateEstimatedValue = (totalInvested: string): string => {
  return (parseInt(totalInvested.replace(/[$,]/g, '')) * 1.5)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

export const filterInvestmentsByType = (investments: Investment[], type: InvestmentType): Investment[] => {
  return investments.filter(inv => inv.type === type);
}; 