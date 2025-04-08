import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, Tab, Tabs, TextField } from '@mui/material';
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
  searchTextFieldStyles, 
  addNewButtonStyles, 
  tabsStyles, 
  noDataMessageStyles 
} from '@utils/uiUtils';
import { FILTER_TABS, DEFAULT_TAB } from '@constants/index';
import { Routes } from '../../../../constants/routes';



const Investments = () => {
  const [investments, setInvestments] = useState<InvestmentDetails[]>([]);
  const [fundInvestments, setFundInvestments] = useState<InvestmentDetails[]>([]);
  const [angelInvestments, setAngelInvestments] = useState<InvestmentDetails[]>([]);
  const [selectedTab, setSelectedTab] = useState(DEFAULT_TAB);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const data = await getUserInvestments(userId);
        const transformedInvestments = transformInvestmentData(data);
        setInvestments(transformedInvestments);
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

  const totalInvestments = calculateTotalInvestments(investments);
  const totalInvested = calculateTotalInvested(investments);
  const estimatedValue = calculateEstimatedValue(totalInvested);

  const handleAddNew = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(Routes.FUND_MANAGER_NEW_INVESTMENT);
  };

  const filteredInvestments = investments.filter(investment =>
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

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          placeholder="Search investments..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={searchTextFieldStyles}
        />
        <Button
          onClick={handleAddNew}
          variant="contained"
          sx={addNewButtonStyles}
        >
          Add New
        </Button>
      </Box>

      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons={false}
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={tabsStyles}
      >
        {FILTER_TABS.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            disableRipple
          />
        ))}
      </Tabs>

      {selectedTab === "all" && filteredInvestments.map((investment, index) => (
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
              onClick={() => navigate(Routes.FUND_MANAGER_INVESTMENT.replace(':investmentId', investment.id))}
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