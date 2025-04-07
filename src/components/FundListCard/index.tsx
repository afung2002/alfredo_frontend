import { Typography, Box, Card, IconButton } from "@mui/material";
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
        <Card
        onClick={handleCardClick}
        sx={{
          minWidth:'350px',
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.200",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, flex: 1 }}>
            {fund.name}
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", width: "fit-content" }}
          >
            {formattedAmount} AUM
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

export default FundListCard;