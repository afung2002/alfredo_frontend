import React from "react";
import { Box, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { LimitedPartnerType } from "../../types/index";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";

interface LimitedPartnerCardProps {
  limitedPartner: LimitedPartnerType;
}
const LimitedPartnerCard = ({limitedPartner}:LimitedPartnerCardProps ) => {
  console.log('LimitedPartnerCard:', limitedPartner);
  const navigate = useNavigate();
  const handleCardClick = (event: React.MouseEvent) => {
    // Prevent navigation if clicking the add button
    // if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
    //   return;
    // }
    navigate(Routes.FUND_MANAGER_LIMITED_PARTNER.replace(':limitedPartnerId', limitedPartner.id));
  };
  return (
    <Paper
      variant="outlined"
      onClick={handleCardClick}
      className="transition-shadow duration-200"
        sx={{
          backgroundColor: 'grey.100',
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: '24px',
          borderRadius: '6px',
          cursor: "pointer",
          mb: '8px',
          ':hover':{
            backgroundColor: '#f5f5f5',
          }
        }}
    >

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {limitedPartner.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {limitedPartner.email}
        </Typography>
      </Box>
      <ArrowForwardIcon color="disabled" />

    </Paper>
  )
}

export default LimitedPartnerCard;