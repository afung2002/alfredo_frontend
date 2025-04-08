import { Button, Typography } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Routes } from "@constants/routes";
type SideMenuButton = {
  label: string;
  value: string;
  path: string;
};

type AppSideMenuProps = {
  sideMenuButtons: SideMenuButton[];
};


const AppSideMenu = ({ sideMenuButtons }: AppSideMenuProps) => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
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
      <Typography variant="h5" sx={{ mb: 6, fontWeight: 500, textAlign: 'left' }}>Fundmanager.ai</Typography>
      <ButtonGroup
        orientation="vertical"
        sx={{
          '& .MuiButton-root': {
            border: 'none',
            justifyContent: 'flex-start',
            px: 2,
            py: 1.5,
            textTransform: 'none',
            backgroundColor: 'transparent',
            position: 'relative',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          },
        }}
      >
        <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, textAlign: 'left' }}>Investments</Typography>
        {sideMenuButtons.map((button) => (
          <Button
            key={button.value}
            onClick={() => handleButtonClick(button.path)}
            sx={{
              color: isActive(button.path) ? 'black' : 'text.secondary',
              fontWeight: isActive(button.path) ? 500 : 400,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              ...(button.value !== 'back-to-apps' && {
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  backgroundColor: isActive(button.path) ? 'black' : 'divider',
                  transition: 'background-color 0.2s',
                },
              }),
              ...(button.value === 'back-to-apps' && {
                ml: "-16px",
                justifyContent: 'flex-start',

              }),
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span>{button.label}</span>
              {button.value === 'all' && (
                <Box
                  sx={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {/* {funds.length} */}
                </Box>
              )}
            </Box>
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  )
}

export default AppSideMenu;