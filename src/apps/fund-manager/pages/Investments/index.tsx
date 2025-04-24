import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Tab, Tabs, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { InvestmentDetails, InvestmentType } from '../../../../types';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  filterInvestmentsByType,
  getClerkToken
} from '@utils/index';
import { FILTER_TABS, DEFAULT_TAB } from '@constants/index';
import { Routes } from '@constants/routes';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import InvestmentsList from '@src/components/InvestmentsList';
import { useGetInvestmentsQuery } from '@services/api/baseApi';
import { calculateInvestmentTotals, formatNumberString } from '../../../../utils';
import { InvestmentResponse } from '../../../../services/api/baseApi/types';


const Investments = () => {
  getClerkToken();
  const { data: investmentsData, isLoading: isLoadingInvestments, error: errorInvestments } = useGetInvestmentsQuery();
  const { control, watch } = useForm({
    defaultValues: {
      'searchInvestments': ''
    }
  });

  const searchValue = watch('searchInvestments');
  const [filteredInvestments, setFilteredInvestments] = useState<InvestmentResponse[]>(investmentsData || []);
  const [selectedTab, setSelectedTab] = useState(DEFAULT_TAB);
  const navigate = useNavigate();

  const { totalInvestments, totalFundInvested, totalEstimatedValue } = calculateInvestmentTotals(investmentsData);


  const handleAddNew = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(Routes.FUND_MANAGER_NEW_INVESTMENT);
  };
  useEffect(() => {
    if (selectedTab === 'all') {
      setFilteredInvestments(investmentsData || []);
    } else if (selectedTab === 'fund') {
      setFilteredInvestments(filterInvestmentsByType(investmentsData || [], InvestmentType.FUND));
    } else if (selectedTab === 'angel') {
      setFilteredInvestments(filterInvestmentsByType(investmentsData || [], InvestmentType.ANGEL));
    }
  }, [selectedTab, investmentsData]);

  useEffect(() => {
    if (searchValue) {
      const filtered = filteredInvestments?.filter(investment =>
        investment.company.name.toLowerCase()?.includes(searchValue.toLowerCase())
      );
      setFilteredInvestments(filtered || []);
    } else {
      setFilteredInvestments(investmentsData || []);
    }
  }, [searchValue,]);


  if (isLoadingInvestments) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (errorInvestments) {
    return (
      <Box p={3}>
        <Alert severity="error"><>{errorInvestments}</></Alert>
      </Box>
    );
  }


  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ mb: 1 }}>
        <Box className="flex gap-3 items-center" sx={{ mb: 1 }}>
          <Typography sx={{ textAlign: 'left', fontSize: '1.5rem', lineHeight: '1.334', fontWeight: 500 }}>
            {totalInvestments} Investments
          </Typography>
          {/* <Chip
            label={totalInvestments}
            color="secondary"
            sx={{ fontSize: '0.875rem', fontWeight: 700, borderRadius: '4px' }}
          /> */}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: '475px' }}>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {formatNumberString(totalFundInvested)} invested
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
          <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {formatNumberString(totalEstimatedValue)} est value
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2, width: '100%' }}>
        <Input
          rounded
          type="text"
          name="searchInvestments"
          control={control}
          placeholder="Search investments..."
          className="flex flex-col w-full"
        />
        <Button
          onClick={handleAddNew}
          variant="contained"
          sx={{
            flexShrink: 0,
            textTransform: "none",
            bgcolor: "black",
            color: "white",
            borderRadius: "2px",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          Add New
        </Button>
      </Box>

      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons={false}
        TabIndicatorProps={{ style: { display: 'none' } }}
      >
        {FILTER_TABS.map((tab) => (
          <Tab
            disableFocusRipple
            disableTouchRipple
            sx={{
              minHeight: 32,
              minWidth: 'auto',
              px: 4,
              borderRadius: '50px',
              textTransform: 'none',
              bgcolor: 'transparent !important', // Set background transparent
              color: 'gray',
              mx: 1,
              fontSize: 14,
              fontWeight: 600,
              border: '1px solid gray',
              '&.Mui-selected': {
                border: '1px solid black',
                bgcolor: 'transparent !important', // Ensure selected tab is also transparent
                color: 'black', // Optional: change color for selected tab
              },

            }}
            key={tab.value}
            label={tab.label}
            value={tab.value}
            disableRipple
          />
        ))}
      </Tabs>

      <InvestmentsList
        investments={filteredInvestments}
      />
    </Box>
  );
};

export default Investments;