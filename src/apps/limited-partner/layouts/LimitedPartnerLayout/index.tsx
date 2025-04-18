import { Box } from "@mui/material";
import { Outlet } from "react-router";
import AppSideMenu from "@components/AppSideMenu";
import { Routes } from "@constants/routes";
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LimitedPartnerLayout = () => {
  const sideMenuButtons = [
    { label: 'Funds', value: 'all', path: Routes.FUND_MANAGER, icon: <AccountBalanceIcon /> },
    { label: 'Updates', value: 'updates', path: Routes.FUND_MANAGER_FUNDS, icon: <TrendingUpIcon /> },
    { label: 'Documents', value: 'documents', path: Routes.FUND_MANAGER_DOCUMENTS, icon: <FolderOpenOutlinedIcon /> },
    // { label: 'Limited Partners', value: 'limited-partners', path: '/fundmanager-ai/limited-partners' },
    // { label: 'Settings', value: 'settings', path: '/fundmanager-ai/settings' },
    { label: 'Back to Apps', value: 'back-to-apps', path: Routes.APPS, icon: <ArrowBackIcon /> },
  ];
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppSideMenu app="Limitedpartner.ai" sideMenuButtons={sideMenuButtons} />
      <div 
        className="flex-1 xl:px-44 lg:px-32 md:px-28 sm:px-16 px-4 pt-24 pb-24"
      >
        <Outlet />
      </div>
    </Box>
  )
}

export default LimitedPartnerLayout;