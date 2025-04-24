import { Box, Typography, IconButton, Card } from "@mui/material";
import { LimitedPartnerType } from "../../types/index";
import { useNavigate, useParams } from 'react-router-dom';
import { Routes } from "../../constants/routes";
// import Card from "../Card";
import PartnersIcon from '@assets/partners.svg';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface LimitedPartnerCardProps {
  limitedPartner: LimitedPartnerType;
}
const LimitedPartnerCard = ({limitedPartner}:LimitedPartnerCardProps ) => {
  const {fundId} = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  console.log(limitedPartner, 'limitedPartner')
  return (
    // <Card
    //   title={limitedPartner.name}
    //   subtitle={limitedPartner.email}
    //   sideImage={PartnersIcon}
    //   actions={[
    //     {
    //       label: "View",
    //       onClick: () => navigate(Routes.FUND_MANAGER_LIMITED_PARTNER.replace(':limitedPartnerId', limitedPartner.user_id.toString()), { state: { fundId } }),
    //     },
    //   ]}
    // >
    //   {
    //     limitedPartner?.description && (
    //       <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
    //         {limitedPartner.description}
    //       </Typography>
    //     )
    //   }
    // </Card>
    <Card
              onClick={() => navigate(Routes.FUND_MANAGER_LIMITED_PARTNER.replace(':limitedPartnerId', limitedPartner.user_id.toString()), { state: { fundId } })}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 3,
                mb: 1,
                borderRadius: '4px',
                border: "1px solid",
                borderColor: "grey.200",
                cursor: "pointer",
                boxShadow: "rgb(0 0 0 / 10%) 0px 2px 4px",
                "&:hover": {
                  boxShadow: "rgb(0 0 0 / 15%) 0px 4px 6px",
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: 'column', }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, flex: 1 }}>
                  {limitedPartner.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", }}
                >
                  {limitedPartner.email}
                </Typography>
              </Box>
              <Box>

        
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
            </Card>
  )
}

export default LimitedPartnerCard;