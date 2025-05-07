import { Box, Typography, IconButton, Card, Chip } from "@mui/material";
import { LimitedPartnerType } from "../../types/index";
import { useNavigate, useParams } from 'react-router-dom';
import { Routes } from "../../constants/routes";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LimitedPartner from '../../apps/fund-manager/pages/LimitedPartner/index';
import CheckIcon from '@mui/icons-material/Check';
import Button from "../Button";
interface LimitedPartnerCardProps {
  limitedPartner: any;
}

const InvitationCard = ({limitedPartner}) => {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  const limitedPartnerStatus = (
    <div>
      <Typography variant="body2" sx={{ color: "text.secondary", }}>
        {limitedPartner.status} invitation
      </Typography>
      {
        limitedPartner.status === 'Registered' && (
          <CheckIcon />
        )
      }
    </div>
  )
  return (
    <Card
    onClick={() => navigate(Routes.FUND_MANAGER_LIMITED_PARTNER.replace(':limitedPartnerId', limitedPartner.limited_partner.user_id.toString()), { state: { fundId } })}
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
        {limitedPartner.public_metadata.name}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", }}
      >
        {limitedPartner.email_address}
      </Typography>
    </Box>
    <Box>
    <div className="flex gap-2 items-center">
      <Button
      onClick={() => {}}

      >
        Resend
      </Button>
    <Chip
      label={limitedPartnerStatus}
      size="small"
      variant="outlined"
      />
    {/* <IconButton size="small" sx={{ color: "text.secondary" }}>
        <ArrowForwardIcon />
      </IconButton> */}
    </div>

    </Box>
  </Card>
  )
}

export default InvitationCard;