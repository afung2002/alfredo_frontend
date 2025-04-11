

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
    <div className="flex flex-col w-full gap-4">
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
    </div>
  )
}

export default InvestmentsList;