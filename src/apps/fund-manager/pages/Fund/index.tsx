import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Tabs,
  Tab,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { Fund } from "../../../../types";
import { Link } from "@mui/icons-material";
import {  useNavigate, useParams } from "react-router-dom";
import { ArrowBack, Edit } from "@mui/icons-material";
import DocumentsListView from "../Documents";
import InvestmentsList from "../Investments";
// import LimitedPartnersListView from "./LimitedPartnersListView";
// import FundUpdatesListView from "./FundUpdatesListView";
import { getFundById } from "@services/index";

const filterTabs = [
  { label: "Portfolio", value: "portfolio" },
  { label: "Limited Partners", value: "limited-partners" },
  { label: "Updates", value: "updates" },
  { label: "Documents", value: "documents" },
];

const FundView: React.FC = () => {

  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("portfolio");
  const [fund, setFund] = useState<Fund>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fundId } = useParams<{ fundId: string }>();

  const handleEdit = () => {
    navigate(`/fundmanager-ai/funds/${fundId}/edit`);
  }


  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseInt(fund?.fundSize || "0"));

  const formattedEstimatedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseInt(fund?.estimatedValue || "0"));

  useEffect(() => {
    const fetchFund = async () => {
      try {
        if (fundId) {
          const data = await getFundById(fundId);
          setFund(data);
        } else {
          console.error('Fund ID is required');
        }
      } catch (err) {
        setError('Failed to fetch fund. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      } 
    };
    fetchFund();
  }, [fundId]);


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
  
  

  if (!fund) {
    return <div>Fund not found</div>;
  }

  return (
    <Box sx={{ p: 3,   width: '100%' }}>
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{
          textAlign: "left",
          color: "gray",
          display: "flex",
          justifyContent: "flex-start",
          ml:"-12px",
          "&:hover": {
            color: "black",
          },
        }}
      >
                <ArrowBack fontSize="small" sx={{mr:"3px",}}/>
        Back
      </Button>

      <Typography
        variant="h5"
        sx={{ mt: 3, mb: 2, fontWeight: 500, textAlign: "left" }}
      >
        Fund
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          p: 3,
          // width: "500px",
          border: "1px solid",
          borderColor: "grey.200",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {fund?.name}
            </Typography>
              <IconButton
                onClick={() => window.open(fund.websiteUrl, "_blank")}
                size="small"
                sx={{ color: "text.secondary" }}
                title="Open website"
              >
                <Link fontSize="small" />
              </IconButton>
            </Box>
            <IconButton size="small" sx={{ color: "black" }} onClick={handleEdit}>
              <Edit />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Legal Entity:</Typography>
              <Typography variant="body2" color="text.secondary">
                {fund?.legalEntity}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Description:</Typography>
              <Typography variant="body2" color="text.secondary">
                {fund?.description}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Fund Size:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formattedAmount}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Estimated Value:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formattedEstimatedValue}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons={false}
        TabIndicatorProps={{ style: { display: 'none' } }}

      >
        {filterTabs.map((tab) => (
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
      {selectedTab === "portfolio" && (
        <InvestmentsList showFilters={false} showHeader={false} showFundChip={false} />
      )}
      {/* {selectedTab === "limited-partners" && <LimitedPartnersListView />}
      {selectedTab === "updates" && (
        <FundUpdatesListView />
      )} */}
      {/* {selectedTab === "documents" && (
        <DocumentsListView
          showFilters={false}
          showUploadNew={true}
          showHeader={false}
        />
      )} */}
    </Box>
  );
};

export default FundView
