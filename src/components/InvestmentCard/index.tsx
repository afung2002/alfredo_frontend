import { Chip, Box, Typography, IconButton, Card } from "@mui/material";
import { useNavigate } from "react-router";
import { Routes } from "@constants/routes";
// import Card from "../Card";
import { useDeleteInvestmentMutation } from "../../services/api/baseApi";
import { InvestmentResponse } from "../../services/api/baseApi/types";
import InvestmentIcon from "@assets/investment.svg";
import { Apps } from "../../constants/apps";
import { useAppContext } from "../../context/appContext";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
  const { app } = useAppContext();
  const handleInvestmentDelete = (investmentId: number) => {
    // Implement the delete functionality here
    deleteInvestment(investmentId)
      .unwrap()
  }
  return (
    // <div className="">
    //   <Card
    //     onClick={() => handleCardClick}
    //     // onDelete={() => handleInvestmentDelete(investment.id)}
    //     title={investment?.company?.name || ''}
    //     subtitle={`$${Number(investment?.amount).toLocaleString('en-US')}`}
    //     sideImage={InvestmentIcon}
    //     actions={[
    //       {
    //         label: "View Investment",
    //         onClick: () => {
    //           app === Apps.LIMITED_PARTNER && navigate(Routes.LIMITED_PARTNER_FUND_INVESTMENT.replace(':investmentId', investment.id.toString()))

    //           app === Apps.FUND_MANAGER && navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id.toString()))},
    //       },
    //     ]}
    //     tags={[
    //       {
    //         label: `$${Number(investment?.amount)?.toLocaleString('en-US')} Invested`,
    //         color: "secondary",
    //         onClick: () => { },
    //       },
    //       {
    //         label: `$${Number(investment?.estimated_value)?.toLocaleString('en-US')} EV`,
    //         color: "secondary",
    //         onClick: () => { },
    //       },
    //     ]}
    //     className="transition-shadow duration-200"
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "space-between",
    //       p: '24px',
    //       borderRadius: '6px',
    //       cursor: "pointer",
    //       mb: '8px',
    //       backgroundColor: 'grey.100',
    //       ':hover': {
    //         backgroundColor: '#f5f5f5',
    //       }
    //     }}
    //   >
    //     {investment.type && (
    //       <div>
    //         <Chip
    //           label={investment.type}
    //           size="medium"
    //         />
    //       </div>
    //     )}
    //   </Card>
    // </div>
    <Card
      onClick={handleCardClick}
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, flex: 1 }}>
          {investment?.company?.name || ''}
        </Typography>
        <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", width: "min-content" }}
        >
          {`$${Number(investment?.amount).toLocaleString('en-US')}`}
        </Typography>
      </Box>
      <Box>
        {/* {showFundChip && <Chip
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
          />} */}

        <IconButton size="small" sx={{ color: "text.secondary" }}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Card>
  )
}

export default InvestmentCard;