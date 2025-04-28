import { Box, Typography, IconButton, Card } from "@mui/material";
import { Fund } from "../../types";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";
// import Card from "../Card";
import { useDeleteFundMutation } from "../../services/api/baseApi";
import FundIcon from "@assets/fund.svg";
import { Apps } from "../../constants/apps";
import { useAppContext } from "@src/context/appContext";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface FundListCardProps {
  fund: Fund;
}

const FundListCard: React.FC<FundListCardProps> = ({ fund }) => {
  const navigate = useNavigate();
    const [deleteFund, { isLoading, isSuccess, isError, error }] = useDeleteFundMutation();
    const { app } = useAppContext();
  
  const handleCardClick = (event: React.MouseEvent) => {
    // Prevent navigation if clicking the add button
    // if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
    //   return;
    // }
    navigate(Routes.FUND_MANAGER_FUND.replace(':fundId', fund.id.toString()));
  };
  const handleFundDelete = (fundId: number) => {
    // Implement the delete functionality here
    deleteFund(fundId)
      .unwrap()
  }
  return (
    // <div className="mb-4">
    //   <Card
    //     onClick={() => handleCardClick}
    //     onDelete={ app === Apps.LIMITED_PARTNER ? undefined : () => handleFundDelete(fund.id)}
    //     title={fund.name}
    //     subtitle={fund?.website_url}
    //     sideImage={FundIcon}
    //     actions={[
    //       {
    //         label: "View Fund",
    //         onClick: () => {app === Apps.LIMITED_PARTNER && navigate(Routes.LIMITED_PARTNER_FUND.replace(':fundId', fund.id.toString()));
    //         app === Apps.FUND_MANAGER && navigate(Routes.FUND_MANAGER_FUND.replace(':fundId', fund.id.toString()));
    //         },
    //       },
    //     ]}
    //     tags={[
    //       {
    //         label: `$${Number(fund?.fund_size)?.toLocaleString('en-US')} AUM`,
    //         color: "secondary",
    //         onClick: () => { },
    //       },
    //       {
    //         label: `$${Number(fund?.estimated_value)?.toLocaleString('en-US')} EV`,
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
    //     {fund.description && (
    //       <div>
    //         <Typography variant="body2" sx={{
    //           color: "text.secondary",
    //           overflow: 'hidden',
    //           textOverflow: 'ellipsis',
    //           display: '-webkit-box',
    //           WebkitLineClamp: '4',
    //           WebkitBoxOrient: 'vertical',
    //         }}>
    //           {fund.description}
    //         </Typography>
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
              {fund?.name || ''}
            </Typography>
            <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", }}
            >
              {`$${Number(fund?.fund_size)?.toLocaleString('en-US')} AUM`}
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

export default FundListCard;