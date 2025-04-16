import { Chip } from "@mui/material";
import { InvestmentDetails } from "../../types";
import { useNavigate } from "react-router";
import { Routes } from "@constants/routes";
import Card from "../Card";
import { useDeleteInvestmentMutation } from "../../services/api/baseApi";


interface InvestmentCardProps {
  investment: InvestmentDetails;
  onClick?: () => void;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment }) => {
  const navigate = useNavigate();
  const [deleteInvestment, { isLoading, isSuccess, isError, error }] = useDeleteInvestmentMutation();
  const handleCardClick = () => {
    navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id))
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
        onDelete={() => handleInvestmentDelete(investment.id)}
        title={investment?.company?.name}
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