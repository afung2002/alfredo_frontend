import { Chip, Typography, Box, Card, IconButton, Paper } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { InvestmentDetails } from "../../types";
import { useNavigate } from "react-router";
import { Routes } from "@constants/routes";


interface InvestmentCardProps {
    investment: InvestmentDetails;
    onClick?: () => void;
}
  
const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment, onClick }) => {
  const navigate = useNavigate();
    // const handleCardClick = (event: React.MouseEvent) => {
    //     // Prevent navigation if clicking the add button
    //     if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
    //         return;
    //     }
    //     onClick?.();
    // };
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(parseInt(investment.amount))

    return (
        <Paper
        variant="outlined"
        onClick={() => navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id))}
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
            {investment.companyName}
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
          {/* <Typography
            variant="body2"
            sx={{ color: "text.secondary", width: "min-content" }}
          >
            {formattedAmount}
          </Typography> */}
          <Chip
            variant="outlined"
            color="secondary"
            label={formattedAmount}
            size="medium"
          />
        </Box>
        <Box>
          <Chip
            color="secondary"
            label={
              investment.fundInvested ? investment.fundInvested : "Angel"
            }
            size="medium"
          />

          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Paper>
    )
}

export default InvestmentCard;