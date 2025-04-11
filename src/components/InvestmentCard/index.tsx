import { Chip, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { InvestmentDetails } from "../../types";
import { useNavigate } from "react-router";
import { Routes } from "@constants/routes";
import Card from "../Card";


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

    const handleCardClick = () => {
        navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id))
    }

    return (
      <div className="">
        <Card
        onClick={() => handleCardClick}
        title="Company Name"
        subtitle={`$${Number(investment?.amount).toLocaleString('en-US')}`}
        actions={[
          {
            label: "View Investment",
            onClick: () => navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id)),
          },
        ]}
        tags={[
          {
            label: `$${Number(investment?.fund_invested)?.toLocaleString('en-US')} Invested`,
            color: "secondary",
            onClick: () => { },
          },
          {
            label: `$${Number(investment?.estimated_value)?.toLocaleString('en-US')} EV`,
            color: "secondary",
            onClick: () => { },
          },
        ]}
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
        {investment.type && (
          <div>
            <Chip
              label={investment.type}
              size="medium"
            />
          </div>

        )}

      </Card>
      </div>
    )
}

export default InvestmentCard;