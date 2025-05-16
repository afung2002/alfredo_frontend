import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, CircularProgress, Alert, IconButton, Paper } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowBack, Edit } from "@mui/icons-material";
import { useGetLimitedPartnerByIdQuery, useGetLimitedPartnerDocumentsQuery } from "@src/services/api/baseApi";
import { Routes } from "@src/constants/routes";
import DocumentsList from "../../../../components/DocumentsList";
import { Link } from "@mui/icons-material";
import Input from "../../../../components/Input";
import UploadDocumentModal from "../../../../components/UploadDocumentModal";
import { useForm } from "react-hook-form";
import { searchByTitle } from "../../../../utils/uiUtils";
import ErrorAlert from "../../../../components/ErrorAlert";

const LimitedPartner: React.FC = () => {
  const { limitedPartnerId } = useParams<{ limitedPartnerId: string }>();
  const location = useLocation();
  const { state } = location
  const { data: limitedPartner, error, isLoading } = useGetLimitedPartnerByIdQuery(limitedPartnerId);
  const { data: documents, isLoading: isDocumentsLoading, error: documentsError } = useGetLimitedPartnerDocumentsQuery(limitedPartnerId)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [filteredDocs, setFilteredDocs] = useState<any[]>(documents || []);
  const handleModalClose = () => {
    setIsUploadModalOpen(false);
  }
  const navigate = useNavigate();

  const { control, watch } = useForm({
    defaultValues: {
      'searchDocuments': ''
    }
  });
  const searchValue = watch('searchDocuments');

  useEffect(() => {
    if (searchValue === '') {
      setFilteredDocs(documents || []);
      return;
    }
    const filteredDocs = searchByTitle(documents, searchValue, 'name');
    setFilteredDocs(filteredDocs || []);
  }, [searchValue, documents]);
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
      <ErrorAlert error={error} />
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
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {limitedPartner?.name}
                </Typography>
                <IconButton
                  onClick={() => window.open(limitedPartner?.website_url as string, "_blank")}
                  size="small"
                  sx={{ color: "text.secondary" }}
                  title="Open website"
                >
                  <Link fontSize="small" />
                </IconButton>
              </Box>

              <IconButton onClick={handleEdit} size="small" sx={{ color: "black" }}>
                <Edit />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Email: </Typography>
              <Typography variant="body2" color="text.secondary">
                {limitedPartner.email}
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
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
        Documents
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2, width: '100%' }}>
        <Input
          rounded
          type="text"
          name="searchDocuments"
          control={control}
          placeholder="Search documents..."
          className="flex flex-col w-full"
        />
        <Button
          onClick={() => setIsUploadModalOpen(true)}
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
          Upload New
        </Button>
      </Box>
      <DocumentsList documents={filteredDocs} isLoading={isDocumentsLoading} />
      <UploadDocumentModal
        open={isUploadModalOpen}
        onClose={handleModalClose}
        limitedPartnerId={limitedPartnerId}
      />
    </>

  );
};

export default LimitedPartner;
