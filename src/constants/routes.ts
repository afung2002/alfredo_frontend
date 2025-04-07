export enum Routes {
  LANDING = '/',

  APPS = '/apps',
  APPS_SAVED_APPS = `${Routes.APPS}/saved-apps`,
  APPS_SETTINGS = `${Routes.APPS}/settings`,

  FUND_MANAGER = `${Routes.APPS}/fund-manager`,
  FUND_MANAGER_FUNDS = `${Routes.FUND_MANAGER}/funds`,
  FUND_MANAGER_DOCUMENTS = `${Routes.FUND_MANAGER}/documents`,
  FUND_MANAGER_NEW_DOCUMENT = `${Routes.FUND_MANAGER}/new-document`,
  FUND_MANAGER_INVESTMENT = `${Routes.FUND_MANAGER}/:investmentId`,
  FUND_MANAGER_NEW_INVESTMENT = `${Routes.FUND_MANAGER}/new-investment`,
  FUND_MANAGER_INVESTMENT_EDIT = `${Routes.FUND_MANAGER}/:investmentId/edit`,
  FUND_MANAGER_NEW_FUND = `${Routes.FUND_MANAGER}/new-fund`,
  FUND_MANAGER_FUND = `${Routes.FUND_MANAGER}/funds/:fundId`,
  FUND_MANAGER_FUND_EDIT = `${Routes.FUND_MANAGER}/funds/:fundId/edit`,

  FUND_MANAGER_LIMITED_PARTNER = `${Routes.FUND_MANAGER}/limited-partners/:limitedPartnerId`,
  FUND_MANAGER_LIMITED_PARTNER_EDIT = `${Routes.FUND_MANAGER}/limited-partners/:limitedPartnerId/edit`,
}