import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, CircularProgress, Alert, IconButton, Paper } from "@mui/material";
import { LimitedPartnerType } from "../../../../types/index";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowBack, Edit } from "@mui/icons-material";
import { useGetDocumentsQuery, useGetLimitedPartnerByIdQuery } from "@src/services/api/baseApi";
import { Routes } from "@src/constants/routes";
import DocumentsList from "../../../../components/DocumentsList";

const LimitedPartner: React.FC = () => {
  const { limitedPartnerId } = useParams<{ limitedPartnerId: string }>();
  const location = useLocation();
  const { state } = location
  const { data: limitedPartner, error, isLoading } = useGetLimitedPartnerByIdQuery(limitedPartnerId);
  const { data: documents, isLoading: isDocumentsLoading, error: documentsError } = useGetDocumentsQuery()
  const navigate = useNavigate();



  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(Routes.FUND_MANAGER_LIMITED_PARTNER_EDIT.replace(':limitedPartnerId', limitedPartnerId));
  }


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
        <Alert severity="error">
          <>
            {error}
          </></Alert>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ width: "100%", }}>
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

        <Paper
          variant="outlined"
          sx={{
            p: 3,
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

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <div className="flex gap-1 items-center">
                <Typography variant="body2">Legal Entity:</Typography>
                <Typography variant="body1" >
                  {limitedPartner.legal_entity}
                </Typography>
              </div>

              <IconButton onClick={handleEdit} size="small" sx={{ color: "black" }}>
                <Edit />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Website Url</Typography>
              <Typography variant="body2" color="text.secondary">
                {limitedPartner.website_url}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Description:</Typography>
              <Typography variant="body2" color="text.secondary">
                {limitedPartner.description}
              </Typography>
            </Box>
          </Box>
        </Paper>



      </Box>
      <DocumentsList
        documents={documents}
        isLoading={isDocumentsLoading}
      />
    </>

  );
};

export default LimitedPartner;
