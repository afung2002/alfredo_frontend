import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Routes } from "@constants/routes";
import { useSelector } from "react-redux";
import { selectUserInvestments } from "@redux/selectors/user.selector";
import { JSX, useContext } from "react";
import { Apps } from "@src/constants/apps";
import { useAppContext } from "@src/context/appContext";


type SideMenuButton = {
  label: string;
  value: string;
  path: string;
  icon?: JSX.Element;
};

type AppSideMenuProps = {
  sideMenuButtons: SideMenuButton[];
};


const AppSideMenu = ({ sideMenuButtons }: AppSideMenuProps) => {
  const investments = useSelector(selectUserInvestments);
  const navigate = useNavigate();
  const location = useLocation();
  const { app } = useAppContext();
  const handleButtonClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    console.log(path)
    switch (app) {
      case Apps.LIMITED_PARTNER:
        return path === Routes.LIMITED_PARTNER_FUNDS && location.pathname === path;
      case Apps.FUND_MANAGER:
        return path === Routes.FUND_MANAGER && location.pathname === path;
      default:
        return false;
    }
    if (path === Routes.FUND_MANAGER) {
      // For the main route, only match exact path or investment view/new investment
      return location.pathname === path ||
        location.pathname.startsWith(Routes.FUND_MANAGER) &&
        !sideMenuButtons.some(button =>
          button.path !== path && location.pathname.startsWith(button.path)
        );
    }
    return location.pathname.startsWith(path);
  };
  return (
    <Box
      sx={{
        width: '250px',
        p: 3,
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <Typography variant="h5" sx={{ mb: 6, fontWeight: 600, textAlign: 'left' }}>{app}</Typography>

      </div>
      <List dense>
      {sideMenuButtons.map((button) => (
        <ListItem
        key={button.value}
          sx={{
            // px: "24px",
            display: 'flex',
          }}>
          <ListItemButton
            onClick={() => handleButtonClick(button.path)}
            selected={button?.label === 'Back to Apps' ? false : isActive(button.path)}
            sx={{
              display: 'flex',
              borderRadius: '8px',
              py: '8px',
              px: '12px',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '16px',
            }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                // mr: '15px',
              }}>
                {button.icon && button.icon }
            </ListItemIcon>
            <ListItemText
              primary={<Typography>{button?.label}</Typography>} />
          </ListItemButton>
        </ListItem>
      ))}
      </List>
    </Box>
  )
}

export default AppSideMenu;
