import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FundListCard from '@components/FundListCard';
import { getUserFunds } from '@services/index';
import { Fund } from '../../../../types';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { userId } from '@constants/index';
import { Routes } from '@constants/routes';

const Funds = () => {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filterTabs = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Closed", value: "closed" },
  ];

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const data = await getUserFunds(userId);
        console.log('Fetched funds:', data); // Log the fetched data

        // Transform the data to match the Fund type
        const transformedFunds: Fund[] = data.map((fund: any) => ({
          id: fund._id,
          name: fund.name,
          websiteUrl: fund.websiteUrl,
          legalEntity: fund.legalEntity,
          description: fund.description,
          fundSize: fund.fundSize?.toString(),
          estimatedValue: fund.estimatedValue.toString(),
          updates: fund.updates?.map((update: any) => ({
            id: update._id,
            description: update.description,
            date: update.datePosted
          })),
          portfolio: fund.portfolio?.map((investment: any) => ({
            id: investment._id,
            companyName: investment.companyName,
            websiteUrl: investment.websiteUrl,
            founderEmail: investment.founderEmail,
            description: investment.description,
            amount: investment.amount?.toString(),
            estimatedValue: investment.estimatedValue?.toString(),
            investmentDate: investment.investmentDate,
            postMoneyValuation: investment.postMoneyValuation?.toString(),
            fundInvested: investment.fundInvested,
            type: investment.fundInvested ? 'fund' : 'angel',
            status: investment.status
          }))
        }));
        console.log('Transformed funds:', transformedFunds); // Log the transformed data
        setFunds(transformedFunds);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  // Calculate total funds
  const totalFunds = funds.length;
  
  // Calculate total fund size
  const totalFundSize = funds
    .reduce((sum, fund) => sum + parseInt(fund.fundSize.replace(/[$,]/g, '')), 0)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    
  // Calculate total estimated value
  const totalEstimatedValue = funds
    .reduce((sum, fund) => sum + parseInt(fund.estimatedValue.replace(/[$,]/g, '')), 0)
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
          {totalFunds} Funds
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth:'475px' }}>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {totalFundSize} AUM
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {totalEstimatedValue} Estimated Value
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          placeholder="Search funds..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "28px",
              height: "36px",
              "& fieldset": {
                borderColor: "rgba(0, 0, 0, 0.10)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(0, 0, 0, 0.12)",
              },
            },
          }}
        />
        <Button
          onClick={handleAddNew}
          variant="contained"
          sx={{
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

      {filteredFunds.length > 0 ? (
        filteredFunds.map((fund, index) => (
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