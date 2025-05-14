import { Chip, Box, Typography, IconButton, Card, CardHeader, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router";
import { Routes } from "@constants/routes";
// import Card from "../Card";
import { useDeleteInvestmentMutation, useGetFundByIdQuery } from "../../services/api/baseApi";
import { InvestmentResponse } from "../../services/api/baseApi/types";
import InvestmentIcon from "@assets/investment.svg";
import { Apps } from "../../constants/apps";
import { useAppContext } from "../../context/appContext";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


interface InvestmentCardProps {
  investment: InvestmentResponse;
  onClick?: () => void;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment }) => {
  const navigate = useNavigate();
  const [deleteInvestment] = useDeleteInvestmentMutation();
  console.log('investment', investment) 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleCardClick = () => {
    navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id.toString()))
  }
  const { app } = useAppContext();
  const handleInvestmentDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleClose();
    deleteInvestment(investment.id)
      .unwrap()
  }
  const handleMoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent the card click event from firing
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1">
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
        {investment?.fund_name && (
          <Chip label={investment?.fund_name} />
        )}
        </div>
        <IconButton onClick={handleMoreMenuClick}>
            <MoreVertIcon />
          </IconButton>
      </div>
      <Box>

        <IconButton size="small" sx={{ color: "text.secondary" }}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleInvestmentDelete}>
          <DeleteOutlineIcon />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default InvestmentCard;