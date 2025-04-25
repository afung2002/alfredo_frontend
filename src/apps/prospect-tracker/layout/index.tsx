import { Box } from "@mui/material";
import { Outlet } from "react-router";
import AppSideMenu from "@components/AppSideMenu";
import { Routes } from "@constants/routes";

export default function ProspectTrackerLayout() {
  const sideMenuButtons = [
    {
      label: "Heat",
      value: "heat",
      path: Routes.PROSPECT_TRACKER_HEAT,
    },
    {
      label: "Updates",
      value: "updates",
      path: Routes.PROSPECT_TRACKER_UPDATES,
    },
    {
      label: "Back to Apps",
      value: "back-to-apps",
      path: Routes.APPS,
    },
  ];
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppSideMenu app="Prospecttracker.ai" sideMenuButtons={sideMenuButtons} />
      <div className="flex-1 bg-white">
        <Outlet />
      </div>
    </Box>
  );
}
