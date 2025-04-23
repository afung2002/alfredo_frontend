import {
  Box,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBack, Edit } from "@mui/icons-material";
import { Routes } from "@constants/routes";
import { useGetDocumentsByInvestmentIdQuery, useGetDocumentsQuery, useGetInvestmentByIdQuery, useLazyGetCompanyByIdQuery } from "@services/api/baseApi";
import DocumentsList from "@components/DocumentsList";
import Input from "@components/Input";
import { useForm } from "react-hook-form";
import Button from "@components/Button";
import UploadDocumentModal from "@components/UploadDocumentModal";
import { useEffect, useState } from "react";
import { searchByTitle } from "@utils/uiUtils";
import { formatNumberString } from "../../../../utils";
import { Apps } from "@src/constants/apps";
import { useAppContext } from "../../../../context/appContext";

const Investment: React.FC = () => {
  const { investmentId } = useParams<{ investmentId: string }>();
  const { data: investmentData, isLoading: investmentLoading, isError: investmentError } = useGetInvestmentByIdQuery(
    investmentId ? +investmentId : 0,
    { skip: !investmentId || !+investmentId }
  );
  const { data: documentsData, isLoading: isLoadingDocuments, error: errorDocuments } = useGetDocumentsByInvestmentIdQuery(investmentId);
  const [getCompany, {data: companyData, isLoading: companyLoading, error: companyError}] = useLazyGetCompanyByIdQuery();
  useEffect(() => {
    if (investmentError || investmentLoading) {
      return
    }
    getCompany(investmentData?.company?.id || 0).unwrap()
  }, [investmentData, investmentLoading, investmentError]);


  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [filteredDocs, setFilteredDocs] = useState<any[]>(documentsData || []);
  const { control, watch } = useForm({
    defaultValues: {
      'searchDocuments': ''
    }
  });
  const searchValue = watch('searchDocuments');

  useEffect(() => {
    if (searchValue === '') {
      setFilteredDocs(documentsData || []);
      return;
    }
    const filteredDocs = searchByTitle(documentsData, searchValue, 'name');
    setFilteredDocs(filteredDocs || []);
  }, [searchValue, documentsData, documentsData]);
  const navigate = useNavigate();
  const handleModalClose = () => {
    setIsUploadModalOpen(false);
  }
  const handleEdit = () => {
    navigate(Routes.FUND_MANAGER_INVESTMENT_EDIT.replace(":investmentId", investmentId || ""));
  }; 
  const {app} = useAppContext();

  if (investmentLoading) {
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

  if (investmentError) {
    return (
      <Box p={3}>
        <Alert severity="error">{investmentError}</Alert>
      </Box>
    );
  }

  if (!investmentData) {
    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h5">Investment not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
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
                {companyData?.name}
              </Typography>
              {/* <IconButton
                onClick={() => window.open(investmentData.websiteUrl, "_blank")}
                size="small"
                sx={{ color: "text.secondary" }}
                title="Open website"
              >
                <Link fontSize="small" />
              </IconButton> */}
            </Box>
            {
              app === Apps.FUND_MANAGER && (
                <IconButton
              onClick={handleEdit}
              size="small"
              sx={{ color: "black" }}
            >
              <Edit />
            </IconButton>
              )
            }
            
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Type:</Typography>
              <Typography variant="body2" color="text.secondary">
                {investmentData?.type === "FUND" ? "Fund " : "Angel "}
                Investment
              </Typography>
            </Box>

            {/* <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Description:</Typography>
              <Typography variant="body2" color="text.secondary">
                {investmentData.description}
              </Typography>
            </Box> */}

            {/* <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Founder Email:</Typography>
              <Typography variant="body2" color="text.secondary">
                {investmentData.founderEmail}
              </Typography>
            </Box> */}

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Amount Invested:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatNumberString(investmentData?.amount)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Estimated Value Now:</Typography>
              <Typography variant="body2" color="text.secondary">
              {formatNumberString(investmentData?.estimated_value)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Investment Date:</Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(investmentData.investment_date).toLocaleDateString(
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
              {formatNumberString(investmentData?.post_money_valuation)}

              </Typography>
            </Box>
            <Chip
              label={investmentData.amount ? formatNumberString(investmentData?.amount) : ""}
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
            {investmentData?.status}
          </Typography>
        </Box>
      </Paper>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
        Documents
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2, width: '100%' }}>

        <Input
          type="text"
          name="searchDocuments"
          control={control}
          placeholder="Search documents..."
          className="flex flex-col w-full"
        />
        <Button
          onClick={() => setIsUploadModalOpen(true)}>
          Upload New
        </Button>

      </Box>
      <DocumentsList documents={filteredDocs} isLoading={isLoadingDocuments} />
      <UploadDocumentModal
        open={isUploadModalOpen}
        onClose={handleModalClose}
        investmentId={investmentId}
      />
    </Box>
  );
};

export default Investment;
