import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, CircularProgress, Alert, IconButton } from "@mui/material";
import { LimitedPartnerType } from "../../../../types/index";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack, Edit } from "@mui/icons-material";
import { getLimitedPartnerById } from "@services/index";

const LimitedPartner: React.FC = () => {
  const [limitedPartner, setLimitedPartner] = useState<LimitedPartnerType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { limitedPartnerId } = useParams<{ limitedPartnerId: string }>();

  

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/fundmanager-ai/limited-partners/${limitedPartnerId}/edit`);
  }

  useEffect(() => {
    const fetchLimitedPartner = async () => {
      try {
        if (limitedPartnerId) {
          const data = await getLimitedPartnerById(limitedPartnerId);
          setLimitedPartner(data);
        } else {
          setError("Limited partner ID is required");
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch limited partner. Please try again.");
        console.error("Error fetching limited partner:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLimitedPartner();
  }, [limitedPartnerId]);

  if (!limitedPartner) {
    return <div>Limited partner not found</div>;
  }


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
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto", width:'min-content' }}>
      <Button
        variant="text"
        onClick={handleBack}
        sx={{
          textAlign: "left",
          color: "gray",
          display: "flex",
          justifyContent: "flex-start",
          "&:hover": {
            color: "black",
          },
        }}
      >
        <ArrowBack />
        Back
      </Button>

      <Typography
        variant="h5"
        sx={{ mt: 4, mb: 2, fontWeight: 500, textAlign: "left" }}
      >
        Limited Partner
      </Typography>

      <Card
        sx={{
          p: 3,
          width: "550px",
          border: "1px solid",
          borderColor: "grey.200",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "flex-start",
          mb: 4,
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
          
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%"}}>
            <Typography variant="h6" >
              {limitedPartner.name}
            </Typography>
            <IconButton onClick={handleEdit} size="small" sx={{ color: "black" }}>
              <Edit />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <Typography variant="body2">Legal Entity:</Typography>
            <Typography variant="body2" color="text.secondary">
              {limitedPartner.legalEntity}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <Typography variant="body2">Description:</Typography>
            <Typography variant="body2" color="text.secondary">
              {limitedPartner.description}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <Typography variant="body2">LP Email:</Typography>
            <Typography variant="body2" color="text.secondary">
              {limitedPartner.email}
            </Typography>
          </Box>
        </Box>
      </Card>

      
      {/* <DocumentsList
        documents={}
      /> */}
    </Box>
  );
};

export default LimitedPartner;
