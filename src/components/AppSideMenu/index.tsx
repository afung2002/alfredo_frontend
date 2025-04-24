import { Button, ButtonGroup, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Routes } from "@constants/routes";
import { useSelector } from "react-redux";
import { selectUserInvestments } from "@redux/selectors/user.selector";
import { JSX, useContext, useState } from "react";
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
  const navigate = useNavigate();
  const { app } = useAppContext();

  const [selectedButton, setSelectedButton] = useState(sideMenuButtons[0].value);

  const handleButtonClick = async (item) => {
    setSelectedButton(item.value);
    navigate(item.path);
  };

  return (
    <Box
      sx={{
        width: 250,
        minWidth: '200px',
        p: 3,
        borderRight: "1px solid rgb(234 234 234)",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        bgcolor: '#fafafb'
      }}
    >
      {/* Logo */}
      <div>
        <Typography variant="h5" sx={{ margin: '0px 25px 30px', fontSize: '1.3rem', textAlign: 'left' }}>{app}</Typography>
      </div>


      {/* Vertical Button Group */}
      <ButtonGroup
        orientation="vertical"
        sx={{
          "& .MuiButton-root": {
            border: "none",
            justifyContent: "flex-start",
            px: 2,
            py: 1.5,
            textTransform: "none",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          },
        }}
      >
        {sideMenuButtons.map((button) => (
          <Button
            key={button.value}
            onClick={() => handleButtonClick(button)}
            className={`${selectedButton === button.value ? "bg-gray-300" : ""}`}
            sx={{
              color:
                selectedButton === button.value ? "black" : "text.secondary",
              fontWeight: selectedButton === button.value ? 500 : 400,
            }}
          >
            {button.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>

  )
}

export default AppSideMenu;
