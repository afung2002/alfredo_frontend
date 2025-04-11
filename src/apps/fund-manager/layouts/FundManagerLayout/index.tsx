import { Box } from "@mui/material";
import { Outlet } from "react-router";
import AppSideMenu from "@components/AppSideMenu";
import { Routes } from "@constants/routes";

const FundManagerLayout = () => {
  const sideMenuButtons = [
    { label: 'All', value: 'all', path: Routes.FUND_MANAGER },
    { label: 'Funds', value: 'funds', path: Routes.FUND_MANAGER_FUNDS },
    { label: 'Documents', value: 'documents', path: Routes.FUND_MANAGER_DOCUMENTS },
    // { label: 'Limited Partners', value: 'limited-partners', path: '/fundmanager-ai/limited-partners' },
    // { label: 'Settings', value: 'settings', path: '/fundmanager-ai/settings' },
    { label: 'Back to Apps', value: 'back-to-apps', path: Routes.APPS },
  ];
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }} className="bg-gray-50">
      <AppSideMenu sideMenuButtons={sideMenuButtons} />
      <div 
        className="flex-1 xl:px-60 md:px-32 sm:px-16 px-4 pt-24 pb-24"
      >
        <Outlet />
      </div>
    </Box>
  )
}

export default FundManagerLayout;