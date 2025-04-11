import { Typography, Box, IconButton, Paper, Chip } from "@mui/material";
import { Fund } from "../../types";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";
import Card from "../Card";

interface FundListCardProps {
  fund: Fund;
}

const FundListCard: React.FC<FundListCardProps> = ({ fund }) => {
  const navigate = useNavigate();

  const handleCardClick = (event: React.MouseEvent) => {
    // Prevent navigation if clicking the add button
    // if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
    //   return;
    // }
    navigate(Routes.FUND_MANAGER_FUND.replace(':fundId', fund.id));
  };

  return (
    <div className="mb-4">

<Card
      onClick={() => handleCardClick}
      title={fund.name}
      subtitle={fund?.website_url}
      actions={[
        {
          label: "View Fund",
          onClick: () => navigate(Routes.FUND_MANAGER_FUND.replace(':fundId', fund.id)),
        },
      ]}
      tags={[
        {
          label: `$${Number(fund?.fund_size)?.toLocaleString('en-US')} AUM`,
          color: "secondary",
          onClick: () => { },
        },
        {
          label: `$${Number(fund?.estimated_value)?.toLocaleString('en-US')} EV`,
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
      {fund.description && (
        <div>
          <Typography variant="body2" sx={{
            color: "text.secondary",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '4',
            WebkitBoxOrient: 'vertical',
          }}>
            {fund.description}
          </Typography>
        </div>

      )}

    </Card>
    </div>
    

  )
}

export default FundListCard;