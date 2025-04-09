import { Typography, Box, Card, IconButton, Paper, Chip } from "@mui/material";
import { Fund } from "../../types";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";

interface FundListCardProps {
  fund: Fund;
}

const FundListCard: React.FC<FundListCardProps> = ({ fund }) => {
  const navigate = useNavigate();

  const handleCardClick = (event: React.MouseEvent) => {
    // Prevent navigation if clicking the add button
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(Routes.FUND_MANAGER_FUND.replace(':fundId', fund.id));
  };
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(parseInt(fund.fundSize))
  return (
    <Paper
      variant="outlined"
      onClick={handleCardClick}
      className="transition-shadow duration-200"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: '24px',
        borderRadius: '6px',
        cursor: "pointer",
        mb: '8px',
        backgroundColor: 'grey.100',
        ':hover': {
          backgroundColor: '#f5f5f5',
        }
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          {fund.name}
        </Typography>
        {/* <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} /> */}
        {/* <Typography
            variant="body2"
            sx={{ color: "text.secondary", width: "fit-content" }}
          >
            {formattedAmount} AUM
          </Typography> */}
        <Chip
          variant="outlined"
          color="secondary"
          label={`${formattedAmount} AUM`}
          size="medium"
        />
      </Box>
      <Box>
        <IconButton size="small" sx={{ color: "text.secondary" }}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default FundListCard;