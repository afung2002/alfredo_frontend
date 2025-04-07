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
const LandingLayout = lazy(() => import('@layouts/LandingLayout'));
const LandingPage = lazy(() => import('@pages/LandingPage'));
const Page404 = lazy(() => import('@pages/Page404'));


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
      }
    ],
  },
  { path: '*', element: React.createElement(Page404) },
]
