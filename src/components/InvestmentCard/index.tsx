import { Chip, Typography, Box, Card, IconButton } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { InvestmentDetails } from "../../types";

interface InvestmentCardProps {
    investment: InvestmentDetails;
    onClick?: () => void;
}
  
const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment, onClick }) => {
    const handleCardClick = (event: React.MouseEvent) => {
        // Prevent navigation if clicking the add button
        if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
            return;
        }
        onClick?.();
    };
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(parseInt(investment.amount))

    return (
        <Card
        onClick={handleCardClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderRadius: '4px',
          border: "1px solid",
          borderColor: "grey.200",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, flex: 1 }}>
            {investment.companyName}
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", width: "min-content" }}
          >
            {formattedAmount}
          </Typography>
        </Box>
        <Box>
          <Chip
            label={
              investment.fundInvested ? investment.fundInvested : "Angel"
            }
            size="small"
            sx={{
              backgroundColor: "grey.100",
              borderRadius: "2px",
              color:  investment.fundInvested ? "primary.main" : "gray",
              width: "100px"
            }}
          />

          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Card>
    )
}

export default InvestmentCard;