import { Box } from "@mui/material";
import { Outlet } from "react-router";
import AppSideMenu from "@components/AppSideMenu";
import { Routes } from "@constants/routes";
import { Apps } from "@constants/apps";
import { useAppContext } from "../../../context/appContext";

export default function ProspectTrackerLayout() {
  const sideMenuButtons = [
    {
      label: "Prospects",
      value: "prospects",
      path: Routes.PROSPECT_TRACKER_PROSPECTS,
    },
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
  const { app, setApp } = useAppContext();
  setApp(Apps.PROSPECT_TRACKER);
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppSideMenu sideMenuButtons={sideMenuButtons} />
      <div className="flex-1 bg-white">
        <Outlet />
      </div>
    </Box>
  );
}
