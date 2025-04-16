import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Routes } from '@constants/routes';
import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute/index';
import MasterLayout from '../layouts/MasterLayout';
import AppsPage from '../pages/AppsPage';
import Settings from '../pages/Settings';
import FundManagerLayout from '../apps/fund-manager/layouts/FundManagerLayout/index';
import Investments from '../apps/fund-manager/pages/Investments';
import Funds from '../apps/fund-manager/pages/Funds';
import Documents from '../apps/fund-manager/pages/Documents';
import NewFund from '../apps/fund-manager/pages/NewFund';
import FundView from '../apps/fund-manager/pages/Fund';
import SavedApps from '../pages/SavedApps';
import Investment from '../apps/fund-manager/pages/Investment';
import NewInvestment from '../apps/fund-manager/pages/NewInvestment';
import LimitedPartner from '../apps/fund-manager/pages/LimitedPartner';
import NewLimitedPartner from '../apps/fund-manager/pages/NewLimitedPartner';
const LandingLayout = lazy(() => import('@layouts/LandingLayout'));
const Page404 = lazy(() => import('@pages/Page404'));

import LandingPage from '@pages/LandingPage';

export const routes: RouteObject[] = [
  {
    path: Routes.LANDING,
    element: <LandingLayout />,
    children: [
      {
        path: Routes.LANDING,
        element: <LandingPage />,
      },
    ],
  },
  {
    path: Routes.APPS,
    element: <ProtectedRoute><MasterLayout /></ProtectedRoute>,
    children: [
      {
        path: Routes.APPS,
        element: <AppsPage />,
      },
      {
        path: Routes.APPS_SETTINGS,
        element: <Settings />,
      },
      {
        path: Routes.APPS_SAVED_APPS,
        element: <SavedApps />,
      },
    ],
  },
  {
    path: Routes.FUND_MANAGER,
    element: <ProtectedRoute><FundManagerLayout /></ProtectedRoute>,
    children: [
      {
        path: Routes.FUND_MANAGER,
        element: <Investments />,
      },
      {
        path: Routes.FUND_MANAGER_INVESTMENT,
        element: <Investment />,
      },
      {
        path: Routes.FUND_MANAGER_NEW_INVESTMENT,
        element: <NewInvestment />,
      },
      {
        path: Routes.FUND_MANAGER_INVESTMENT_EDIT,
        element: <NewInvestment />,
      },
      {
        path: Routes.FUND_MANAGER_FUNDS,
        element: <Funds />,
      },
      {
        path: Routes.FUND_MANAGER_DOCUMENTS,
        element: <Documents />,
      },
      {
        path: Routes.FUND_MANAGER_NEW_FUND,
        element: <NewFund />,
      },
      {
        path: Routes.FUND_MANAGER_FUND_EDIT,
        element: <NewFund />,
      },
      {
        path: Routes.FUND_MANAGER_FUND,
        element: <FundView />,
      },
      {
        path: Routes.FUND_MANAGER_LIMITED_PARTNER,
        element: <LimitedPartner />,
      },
      {
        path: Routes.FUND_MANAGER_NEW_LIMITED_PARTNER,
        element: <NewLimitedPartner />,
      }
    ],
  },
  { path: '*', element: React.createElement(Page404) },
]
