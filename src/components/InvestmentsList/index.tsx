

import { Typography } from "@mui/material"
import InvestmentCard from "../InvestmentCard"
import { useNavigate } from 'react-router';
import { noDataMessageStyles } from "@src/utils/uiUtils";
import { Routes } from "@src/constants/routes";
import { InvestmentDetails } from "@src/types";

type InvestmentsListProps = {
  investments: InvestmentDetails[] | undefined;
}
const InvestmentsList = ({investments }: InvestmentsListProps) => {
  const navigate = useNavigate();
  return (
    <>
      {
        investments && investments.length > 0 ? (
          investments.map((investment, index) => (
            <InvestmentCard
              key={index}
              investment={investment}
              onClick={() => navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id))}
            />
          ))
        ) : (
          <Typography variant="body1" sx={noDataMessageStyles}>
            No investments found.
          </Typography>
        )
      }
    </>
    
  )
}

export default InvestmentsList;