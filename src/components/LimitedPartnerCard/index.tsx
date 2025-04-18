import React from "react";
import { Box, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { LimitedPartnerType } from "../../types/index";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";
import Card from "../Card";
import PartnersIcon from '@assets/partners.svg';

interface LimitedPartnerCardProps {
  limitedPartner: LimitedPartnerType;
}
const LimitedPartnerCard = ({limitedPartner}:LimitedPartnerCardProps ) => {
  // const handleCardClick = (event: React.MouseEvent) => {
  //   navigate(Routes.FUND_MANAGER_LIMITED_PARTNER.replace(':limitedPartnerId', limitedPartner.id));
  // };
  return (
    <Card
      title={limitedPartner.legal_entity}
      subtitle={limitedPartner.website_url}
      sideImage={PartnersIcon}
    >
      {
        limitedPartner?.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {limitedPartner.description}
          </Typography>
        )
      }
    </Card>
  )
}

export default LimitedPartnerCard;