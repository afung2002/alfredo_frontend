import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Chip,
  Button,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { InvestmentDetails } from "../../../../types";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBack, Edit, Link } from "@mui/icons-material";
// import DocumentsListView from "./DocumentsListView";
import { getInvestmentById } from "@services/index";
const Investment: React.FC = () => {
  const [investment, setInvestment] = useState<InvestmentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { investmentId } = useParams<{ investmentId: string }>();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/fundmanager-ai/${investmentId}/edit`);
  };

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseInt(investment?.amount || "0"));

  const formattedEstimatedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseInt(investment?.estimatedValue || "0"));

  const formattedPostMoneyValuation = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseInt(investment?.postMoneyValuation || "0"));

  useEffect(() => {
    const fetchInvestment = async () => {
      try {
        if (investmentId) {
          const data = await getInvestmentById(investmentId);
          setInvestment(data);
        } else {
          console.error("Investment ID is required");
        }
      } catch (err) {
        setError("Failed to fetch investment. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchInvestment();
  }, [investmentId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
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

  if (!investment) {
    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h5">Investment not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto", width: "fit-content" }}>
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{
          textAlign: "left",
          color: "gray",
          ml: "-12px",
          display: "flex",
          justifyContent: "flex-start",
          "&:hover": {
            color: "black",
          },
        }}
      >
        <ArrowBack fontSize="small" sx={{ mr: "3px" }} />
        Back
      </Button>
      <Typography
        variant="h5"
        sx={{ mt: 3, mb: 2, fontWeight: 500, textAlign: "left" }}
      >
        Investment
      </Typography>
      <Card
        sx={{
          p: 3,
          width: "500px",
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
              mb: "-10px",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {investment.companyName}
              </Typography>
              <IconButton
                onClick={() => window.open(investment.websiteUrl, "_blank")}
                size="small"
                sx={{ color: "text.secondary" }}
                title="Open website"
              >
                <Link fontSize="small" />
              </IconButton>
            </Box>
            <IconButton
              onClick={handleEdit}
              size="small"
              sx={{ color: "black" }}
            >
              <Edit />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Type:</Typography>
              <Typography variant="body2" color="text.secondary">
                {investment.type.charAt(0).toUpperCase() +
                  investment.type.slice(1).toLowerCase()}{" "}
                Investment
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Description:</Typography>
              <Typography variant="body2" color="text.secondary">
                {investment.description}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Founder Email:</Typography>
              <Typography variant="body2" color="text.secondary">
                {investment.founderEmail}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Amount Invested:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formattedAmount}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Estimated Value Now:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formattedEstimatedValue}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Investment Date:</Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(investment.investmentDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Valuation at Investment:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formattedPostMoneyValuation}
              </Typography>
            </Box>
            <Chip
              label={investment.fundInvested ? investment.fundInvested : ""}
              sx={{
                bgcolor: "grey.100",
                color: "grey.700",
                borderRadius: "4px",
                width: "min-content",
                mt: 1,
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "5px",
            width: "100%",
            borderTop: "1px solid",
            borderColor: "grey.200",
            pt: 0,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "primary.main",
              fontWeight: 500,
              mb: 1,
              mt: 2,
            }}
          >
            LATEST STATUS
          </Typography>
          <Typography variant="body2" color="text.secondary" align="left">
            {investment.status}
          </Typography>
        </Box>
      </Card>
      {/* <DocumentsListView
        showFilters={false}
        showUploadNew={true}
        showHeader={true}
      /> */}
    </Box>
  );
};

export default Investment;
