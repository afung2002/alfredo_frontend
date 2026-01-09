// In-memory store for write operations in fixture mode
import type {
  FundResponse,
  FundRequest,
  CompanyResponse,
  CompanyRequest,
  InvestmentResponse,
  InvestmentRequest,
  DocumentResponse,
  FundUpdateResponse,
  FundUpdatePostRequest,
  LimitedPartnerResponse,
  LimitedPartner,
  FundLimitedPartnerResponse,
  FundLimitedPartnerRequest,
  Invitation
} from '../services/api/baseApi/types';
import { mockFunds, mockCompanies, mockInvestments, mockDocuments, mockFundUpdates, mockLimitedPartners, mockInvitations } from './index';

class FixtureStore {
  private funds: FundResponse[] = [...mockFunds];
  private companies: CompanyResponse[] = [...mockCompanies];
  private investments: InvestmentResponse[] = [...mockInvestments];
  private documents: DocumentResponse[] = [...mockDocuments];
  private fundUpdates: FundUpdateResponse[] = [...mockFundUpdates];
  private limitedPartners: LimitedPartnerResponse[] = [...mockLimitedPartners];
  private invitations: Invitation[] = [...mockInvitations];
  private nextId = {
    fund: Math.max(0, ...mockFunds.map(f => f.id)) + 1,
    company: Math.max(0, ...mockCompanies.map(c => c.id)) + 1,
    investment: Math.max(0, ...mockInvestments.map(i => i.id)) + 1,
    document: Math.max(0, ...mockDocuments.map(d => d.id)) + 1,
    fundUpdate: Math.max(0, ...mockFundUpdates.map(u => u.id)) + 1,
    invitation: mockInvitations.length + 1
  };

  // Funds
  getFunds(): FundResponse[] {
    return [...this.funds];
  }

  getFundById(id: number): FundResponse | undefined {
    return this.funds.find(f => f.id === id);
  }

  createFund(data: FundRequest): FundResponse {
    const now = new Date().toISOString();
    const newFund: FundResponse = {
      ...data,
      id: this.nextId.fund++,
      created_at: now,
      updated_at: now,
      limited_partners: []
    };
    this.funds.push(newFund);
    return newFund;
  }

  updateFund(id: number, data: Partial<FundRequest>): FundResponse | undefined {
    const fund = this.funds.find(f => f.id === id);
    if (!fund) return undefined;
    Object.assign(fund, data, { updated_at: new Date().toISOString() });
    return { ...fund };
  }

  deleteFund(id: number): boolean {
    const index = this.funds.findIndex(f => f.id === id);
    if (index === -1) return false;
    this.funds.splice(index, 1);
    return true;
  }

  // Companies
  getCompanies(): CompanyResponse[] {
    return [...this.companies];
  }

  getCompanyById(id: number): CompanyResponse | undefined {
    return this.companies.find(c => c.id === id);
  }

  createCompany(data: CompanyRequest): CompanyResponse {
    const now = new Date().toISOString();
    const newCompany: CompanyResponse = {
      name: data.name,
      website_url: data.website_url,
      founder_email: data.founder_email,
      description: data.description,
      id: this.nextId.company++,
      created_at: now,
      updated_at: now
    };
    this.companies.push(newCompany);
    return newCompany;
  }

  updateCompany(id: number, data: Partial<CompanyRequest>): CompanyResponse | undefined {
    const company = this.companies.find(c => c.id === id);
    if (!company) return undefined;
    Object.assign(company, data, { updated_at: new Date().toISOString() });
    return { ...company };
  }

  deleteCompany(id: number): boolean {
    const index = this.companies.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.companies.splice(index, 1);
    return true;
  }

  // Investments
  getInvestments(fundId?: number, companyId?: number): InvestmentResponse[] {
    let investments = [...this.investments];
    if (fundId !== undefined) {
      investments = investments.filter(i => i.fund === fundId);
    }
    if (companyId !== undefined) {
      investments = investments.filter(i => i.company.id === companyId);
    }
    return investments;
  }

  getInvestmentById(id: number): InvestmentResponse | undefined {
    return this.investments.find(i => i.id === id);
  }

  createInvestment(data: InvestmentRequest): InvestmentResponse {
    const now = new Date().toISOString();
    const company = this.companies.find(c => c.id === data.company.id) || data.company;
    const newInvestment: InvestmentResponse = {
      ...data,
      company,
      id: this.nextId.investment++,
      created_at: now,
      updated_at: now,
      fund_name: data.fund ? `Fund ${data.fund}` : 'Personal',
      name: company.name
    };
    this.investments.push(newInvestment);
    return newInvestment;
  }

  updateInvestment(id: number, data: Partial<InvestmentRequest>): InvestmentResponse | undefined {
    const investment = this.investments.find(i => i.id === id);
    if (!investment) return undefined;
    Object.assign(investment, data, { updated_at: new Date().toISOString() });
    return { ...investment };
  }

  deleteInvestment(id: number): boolean {
    const index = this.investments.findIndex(i => i.id === id);
    if (index === -1) return false;
    this.investments.splice(index, 1);
    return true;
  }

  // Documents
  getDocuments(): DocumentResponse[] {
    return [...this.documents];
  }

  getDocumentById(id: number): DocumentResponse | undefined {
    return this.documents.find(d => d.id === id);
  }

  getDocumentsByFundId(fundId: string): DocumentResponse[] {
    return this.documents.filter(d => d.name.includes('Fund'));
  }

  getDocumentsByInvestmentId(investmentId: string): DocumentResponse[] {
    return this.documents.filter(d => d.name.includes('Investment'));
  }

  getDocumentsByCompanyId(companyId: string): DocumentResponse[] {
    return [...this.documents];
  }

  createDocument(data: DocumentUploadRequest): DocumentResponse {
    const now = new Date().toISOString();
    const newDocument: DocumentResponse = {
      id: this.nextId.document++,
      name: data.name,
      company_name: data.company_name,
      description: data.description || null,
      upload_date: data.upload_date || new Date().toISOString().split('T')[0],
      file: URL.createObjectURL(data.file),
      created_at: now,
      updated_at: now
    };
    this.documents.push(newDocument);
    return newDocument;
  }

  deleteDocument(id: number): boolean {
    const index = this.documents.findIndex(d => d.id === id);
    if (index === -1) return false;
    this.documents.splice(index, 1);
    return true;
  }

  // Fund Updates
  getFundUpdates(): FundUpdateResponse[] {
    return [...this.fundUpdates];
  }

  getFundUpdateById(id: number): FundUpdateResponse | undefined {
    return this.fundUpdates.find(u => u.id === id);
  }

  createFundUpdate(data: FundUpdatePostRequest): FundUpdateResponse {
    const now = new Date().toISOString();
    const newUpdate: FundUpdateResponse = {
      ...data,
      id: this.nextId.fundUpdate++,
      created_at: now,
      updated_at: now
    };
    this.fundUpdates.push(newUpdate);
    return newUpdate;
  }

  updateFundUpdate(id: number, data: Partial<FundUpdatePostRequest>): FundUpdateResponse | undefined {
    const update = this.fundUpdates.find(u => u.id === id);
    if (!update) return undefined;
    Object.assign(update, data, { updated_at: new Date().toISOString() });
    return { ...update };
  }

  deleteFundUpdate(id: number): boolean {
    const index = this.fundUpdates.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.fundUpdates.splice(index, 1);
    return true;
  }

  // Limited Partners
  getLimitedPartners(): LimitedPartnerResponse[] {
    return [...this.limitedPartners];
  }

  getLimitedPartnerById(userId: string): LimitedPartnerResponse | undefined {
    return this.limitedPartners.find(lp => lp.user_id === userId);
  }

  createLimitedPartner(data: LimitedPartner): LimitedPartnerResponse {
    const now = new Date().toISOString();
    const newLP: LimitedPartnerResponse = {
      ...data,
      created_at: now
    };
    this.limitedPartners.push(newLP);
    return newLP;
  }

  updateLimitedPartner(userId: string, data: Partial<LimitedPartner>): LimitedPartnerResponse | undefined {
    const lp = this.limitedPartners.find(l => l.user_id === userId);
    if (!lp) return undefined;
    Object.assign(lp, data);
    return { ...lp };
  }

  deleteLimitedPartner(userId: string): boolean {
    const index = this.limitedPartners.findIndex(lp => lp.user_id === userId);
    if (index === -1) return false;
    this.limitedPartners.splice(index, 1);
    return true;
  }

  getLimitedPartnerFunds(userId: string): FundResponse[] {
    return this.funds.filter(f => f.limited_partners.some(lp => lp.limited_partner.user_id === userId));
  }

  createFundLimitedPartner(data: FundLimitedPartnerRequest): FundLimitedPartnerResponse {
    const fund = this.funds.find(f => f.id === data.fund);
    if (fund) {
      const lp = this.limitedPartners.find(l => l.user_id === data.limited_partner);
      if (lp) {
        fund.limited_partners.push({
          limited_partner: {
            user_id: lp.user_id,
            name: lp.name,
            email: lp.email,
            website_url: lp.website_url,
            description: lp.description
          },
          invested_amount: data.invested_amount,
          created_at: new Date().toISOString()
        });
      }
    }
    return {
      ...data,
      user_id: this.nextId.fund,
      created_at: new Date().toISOString()
    };
  }

  // Invitations
  getInvitations(): Invitation[] {
    return [...this.invitations];
  }

  getInvitationById(id: string): Invitation | undefined {
    return this.invitations.find(inv => inv.id === id);
  }

  createInvitation(data: any): Invitation {
    const now = new Date().toISOString();
    const newInvitation: Invitation = {
      ...data,
      id: `inv_${this.nextId.invitation++}`,
      status: 'pending',
      expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: now
    };
    this.invitations.push(newInvitation);
    return newInvitation;
  }

  createBulkInvitations(data: any[]): Invitation[] {
    return data.map(d => this.createInvitation(d));
  }

  updateInvitation(id: string, data: Partial<Invitation>): Invitation | undefined {
    const invitation = this.invitations.find(inv => inv.id === id);
    if (!invitation) return undefined;
    Object.assign(invitation, data);
    return { ...invitation };
  }

  deleteInvitation(id: string): boolean {
    const index = this.invitations.findIndex(inv => inv.id === id);
    if (index === -1) return false;
    this.invitations.splice(index, 1);
    return true;
  }

  getInvitationsGroupedByEmail(): Invitation[] {
    return [...this.invitations];
  }

  // Fund Detail
  getFundDetail(id: number) {
    const fund = this.getFundById(id);
    if (!fund) return undefined;
    const fundDocuments = this.documents.filter(d => d.name.includes('Fund'));
    const fundInvestments = this.investments.filter(i => i.fund === id).map(inv => ({
      ...inv,
      documents: this.documents.filter(d => d.company_name === inv.company.name)
    }));
    return {
      ...fund,
      documents: fundDocuments,
      investments: fundInvestments
    };
  }

  getLimitedPartnerDocuments(userId: string): DocumentResponse[] {
    return this.documents.filter(d => d.name.includes('LP'));
  }
}

export const fixtureStore = new FixtureStore();
