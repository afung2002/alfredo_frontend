import { Typography } from "@mui/material";
import { LimitedPartnerType } from "../../types/index";
import { useNavigate } from 'react-router-dom';
import { Routes } from "../../constants/routes";
import Card from "../Card";
import PartnersIcon from '@assets/partners.svg';

interface LimitedPartnerCardProps {
  limitedPartner: LimitedPartnerType;
}
const LimitedPartnerCard = ({limitedPartner}:LimitedPartnerCardProps ) => {
  const navigate = useNavigate();
  console.log(limitedPartner, 'limitedPartner')
  return (
    <Card
      title={limitedPartner.legal_entity}
      subtitle={limitedPartner.website_url}
      sideImage={PartnersIcon}
      actions={[
        {
          label: "View",
          onClick: () => navigate(Routes.FUND_MANAGER_LIMITED_PARTNER.replace(':limitedPartnerId', limitedPartner.user_id.toString())),
        },
      ]}
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