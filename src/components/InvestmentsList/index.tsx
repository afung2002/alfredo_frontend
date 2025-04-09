import { Typography } from "@mui/material"
import InvestmentCard from "../InvestmentCard"
import { useNavigate } from 'react-router';
import { noDataMessageStyles } from "@src/utils/uiUtils";
import { Routes } from "@src/constants/routes";

type InvestmentsListProps = {
  selectedTab: string;
  filteredInvestments?: InvestmentDetails[] | undefined;
  filteredFundInvestments?: InvestmentDetails[];
  filteredAngelInvestments?: InvestmentDetails[];
}
import { InvestmentDetails } from "@src/types";
const InvestmentsList = ({selectedTab, filteredInvestments, filteredFundInvestments, filteredAngelInvestments }: InvestmentsListProps) => {
  const navigate = useNavigate();
  return (
    <>
    {
      filteredInvestments && filteredInvestments.length && 
      filteredInvestments?.map((investment, index) => (
        <InvestmentCard
          key={index}
          investment={investment}
          onClick={() => navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id))}
        />
      ))}
    
    {selectedTab === "all" && filteredInvestments?.map((investment, index) => (
      <InvestmentCard
        key={index}
        investment={investment}
        onClick={() => navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id))}
      />
    ))}

    {selectedTab === "fund" && (
      filteredFundInvestments &&
      filteredFundInvestments.length > 0 ? (
        filteredFundInvestments.map((investment, index) => (
          <InvestmentCard
            key={index}
            investment={investment}

          />
        ))
      ) : (
        <Typography variant="body1" sx={noDataMessageStyles}>
          No fund investments found.
        </Typography>
      )
    )}

    {selectedTab === "angel" && (
      filteredAngelInvestments && 
      filteredAngelInvestments.length > 0 ? (
        filteredAngelInvestments.map((investment, index) => (
          <InvestmentCard
            key={index}
            investment={investment}
            onClick={() => navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id))}
          />
        ))
      ) : (
        <Typography variant="body1" sx={noDataMessageStyles}>
          No angel investments found.
        </Typography>
      )
    )}
    </>
    
  )
}

export default InvestmentsList;