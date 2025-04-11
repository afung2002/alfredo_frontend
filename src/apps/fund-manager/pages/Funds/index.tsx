import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FundListCard from '@components/FundListCard';
import { Fund } from '../../../../types';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { FUNDS_FILTER_TABS, userId } from '@constants/index';
import { Routes } from '@constants/routes';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import Button from '@components/Button';
import { useGetFundsQuery } from '@services/api/baseApi';
import { filterInvestmentsByStatus, filterInvestmentsByType } from '../../../../utils/investmentUtils';

const Funds = () => {
  const {data: fundsData,  isLoading, error} = useGetFundsQuery()
  console.log('fundsData:', fundsData);
  console.log('error:', error);
  console.log('isLoading:', isLoading);
  const { control, watch } = useForm({
      defaultValues: {
        'searchFunds': ''
      }
    });

  const searchValue = watch('searchFunds');
  const [funds, setFunds] = useState<Fund[]>([]);
  const [selectedTab, setSelectedTab] = useState("all");
  // const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
    useEffect(() => {
        setSearchQuery(searchValue)
      }, [searchValue]);

  
  // Calculate total fund size
  const totalFundSize = funds
    .reduce((sum, fund) => sum + parseInt(fund.fundSize.replace(/[$,]/g, '')), 0)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    

  const handleAddNew = (event: React.MouseEvent) => {
    // Prevent navigation if clicking the add button
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(Routes.FUND_MANAGER_NEW_FUND);
  };

  const filteredFunds = funds.filter(fund =>
    fund.name.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

    // useEffect(() => {
    //     if (selectedTab === 'all') {
    //       setFilteredFunds(funds || []);
    //     } else if (selectedTab === 'active') {
    //       setFilteredFunds(filterInvestmentsByStatus(funds || [], ));
    //     } else if (selectedTab === 'closed') {
    //       setFilteredFunds(filterInvestmentsByStatus(funds || [], InvestmentType.ANGEL));
    //     }
    // }, [selectedTab]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        {/* <Alert severity="error">{error}</Alert> */}
      </Box>
    );
  }
  const totalEstimatedValue = fundsData?.reduce((sum, fund) => sum + parseInt(fund.estimated_value), 0)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500, textAlign: 'left' }}>
          {fundsData?.length ?? 0} Fund(s)
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth:'475px' }}>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {totalFundSize} AUM
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            ${totalEstimatedValue?.toLocaleString('en-US')} Estimated Value
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2, width: '100%' }}>

        <Input
        type="text"
        name="searchFunds"
        control={control}
        placeholder="Search funds..."
        className="flex flex-col w-full"
      />
        <Button
          onClick={handleAddNew}>
          Add New
        </Button>
      </Box>

      {!isLoading && fundsData && fundsData?.length > 0 ? (
        fundsData.map((fund, index) => (
          <FundListCard key={index} fund={fund} />
        ))
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          No funds found.
        </Typography>
      )}
    </Box>
  );
};

export default Funds;