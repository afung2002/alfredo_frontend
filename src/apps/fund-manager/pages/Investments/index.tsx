import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InvestmentCard from '@components/InvestmentCard';
import { getUserInvestments } from '@services/index';
import { InvestmentDetails, InvestmentType } from '../../../../types';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { userId } from '@constants/index';
import {
  transformInvestmentData,
  calculateTotalInvestments,
  calculateTotalInvested,
  calculateEstimatedValue,
  filterInvestmentsByType
} from '@utils/investmentUtils';
import {
  noDataMessageStyles
} from '@utils/uiUtils';
import { FILTER_TABS, DEFAULT_TAB } from '@constants/index';
import { Routes } from '../../../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { addInvestmentsToUser } from '@redux/slices/user';
import { selectUserInvestments } from '../../../../redux/selectors/user.selector';
import Input from '../../../../components/Input';
import { useForm } from 'react-hook-form';
import Button from '@components/Button';


const Investments = () => {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      'searchInvestments': ''
    }
  });
  const searchValue = watch('searchInvestments');
  const [fundInvestments, setFundInvestments] = useState<InvestmentDetails[]>([]);
  const [angelInvestments, setAngelInvestments] = useState<InvestmentDetails[]>([]);
  const [selectedTab, setSelectedTab] = useState(DEFAULT_TAB);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const investments = useSelector(selectUserInvestments);
  useEffect(() => {
    setSearchQuery(searchValue)
  }, [searchValue]);
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const data = await getUserInvestments(userId);
        const transformedInvestments = transformInvestmentData(data);
        dispatch(addInvestmentsToUser(transformedInvestments));
        // setInvestments(transformedInvestments);
        setFundInvestments(filterInvestmentsByType(transformedInvestments, InvestmentType.FUND));
        setAngelInvestments(filterInvestmentsByType(transformedInvestments, InvestmentType.ANGEL));
      } catch (err) {
        setError('Failed to fetch investments. Please try again later.');
        console.error('Error fetching investments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [userId]);

  const totalInvestments = calculateTotalInvestments(investments || []);
  const totalInvested = calculateTotalInvested(investments || []);
  const estimatedValue = calculateEstimatedValue(totalInvested);

  const handleAddNew = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(Routes.FUND_MANAGER_NEW_INVESTMENT);
  };

  const filteredInvestments = investments?.filter(investment =>
    investment.companyName.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const filteredFundInvestments = fundInvestments.filter(investment =>
    investment.companyName.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const filteredAngelInvestments = angelInvestments.filter(investment =>
    investment.companyName.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }



  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500, textAlign: 'left' }}>
          {totalInvestments} Investments
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: '475px' }}>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {totalInvested} invested
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {estimatedValue} est value
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2, width: '100%' }}>
        <Input
          type="text"
          name="searchInvestments"
          control={control}
          placeholder="Search investments..."
          className="flex flex-col w-full"
        />
        <Button
          onClick={handleAddNew}
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
          sx={{
            minHeight: 32,
            minWidth: 'auto',
            px: 4,
            borderRadius: '50px',
            textTransform: 'none',
            bgcolor: tab.value === selectedTab ? 'primary.main' : 'grey.200',
            color: tab.value === selectedTab ? 'white' : 'black',
            mx: 1,
            fontSize: 14,
            fontWeight: 500,
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'white',
            },
          }}
            key={tab.value}
            label={tab.label}
            value={tab.value}
            disableRipple
          />
        ))}
      </Tabs>

      {selectedTab === "all" && filteredInvestments?.map((investment, index) => (
        <InvestmentCard
          key={index}
          investment={investment}
          onClick={() => navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id))}
        />
      ))}

      {selectedTab === "fund" && (
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
    </Box>
  );
};

export default Investments;