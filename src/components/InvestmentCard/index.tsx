import { Chip } from "@mui/material";
import { useNavigate } from "react-router";
import { Routes } from "@constants/routes";
import Card from "../Card";
import { useDeleteInvestmentMutation } from "../../services/api/baseApi";
import { InvestmentResponse } from "../../services/api/baseApi/types";
import InvestmentIcon from "@assets/investment.svg";

interface InvestmentCardProps {
  investment: InvestmentResponse;
  onClick?: () => void;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment }) => {
  const navigate = useNavigate();
  const [deleteInvestment] = useDeleteInvestmentMutation();
  const handleCardClick = () => {
    navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id.toString()))
  }

  const handleInvestmentDelete = (investmentId: number) => {
    // Implement the delete functionality here
    deleteInvestment(investmentId)
      .unwrap()
  }
  return (
    <div className="">
      <Card
        onClick={() => handleCardClick}
        // onDelete={() => handleInvestmentDelete(investment.id)}
        title={investment?.company?.name || ''}
        subtitle={`$${Number(investment?.amount).toLocaleString('en-US')}`}
        sideImage={InvestmentIcon}
        actions={[
          {
            label: "View Investment",
            onClick: () => navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id.toString())),
          },
        ]}
        tags={[
          {
            label: `$${Number(investment?.amount)?.toLocaleString('en-US')} Invested`,
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