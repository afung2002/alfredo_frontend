import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
  SxProps,
  Theme
} from "@mui/material";
import { Fund, Document, FundUpdate, LimitedPartner, Investment } from "../../../../types";
import { Link } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack, Edit } from "@mui/icons-material";
import InvestmentsList from "@components/InvestmentsList";
import { getUserDocuments } from "@services/index";
import DocumentsList from "@components/DocumentsList";
import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { searchByTitle } from "@utils/uiUtils";
import Button from "@components/Button";
import UploadDocumentModal from "@components/UploadDocumentModal";
import LimitedPartnersList from "@components/LimitedPartnersList";
import FundUpdatesList from "@components/FundUpdatesList";
import { useGetFundByIdQuery, useGetFundUpdatesQuery, useGetInvestmentsQuery, useGetLimitedPartnersQuery } from "@services/api/baseApi";
import useCreatePostForm from "./hooks/useCreatePostForm";
import FundUpdateModal from "@components/FundUpdateModal";

// Utility function for standardized number formatting
const formatCurrency = (value: string | number | undefined) => {
  if (!value) return '$0';
  return `$${Number(value).toLocaleString("en-US")}`;
};

// Style constants
const commonButtonStyles: SxProps<Theme> = {
  textAlign: "left" as const,
  color: "gray",
  display: "flex",
  justifyContent: "flex-start",
  "&:hover": {
    color: "black",
  },
};

const blackButtonStyles: SxProps<Theme> = {
  bgcolor: "black",
  color: "white",
  borderRadius: "5px",
  "&:hover": {
    bgcolor: "rgba(0, 0, 0, 0.8)",
  },
};

const boxRowStyles: SxProps<Theme> = {
  display: "flex", 
  flexDirection: "row" as const, 
  gap: "5px"
};

const commonInputStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
};

const filterTabs = [
  { label: "Portfolio", value: "portfolio" },
  { label: "Limited Partners", value: "limited-partners" },
  { label: "Updates", value: "updates" },
  { label: "Documents", value: "documents" },
];
const FundView: React.FC = () => {
  const { fundId } = useParams();
  const { data: fundData, isLoading, error } = useGetFundByIdQuery(fundId || '') as {
    data: Fund | undefined;
    isLoading: boolean;
    error: Error | null;
  };
  const { data: fundUpdatesData } = useGetFundUpdatesQuery();
  const { data: investmentsData } = useGetInvestmentsQuery();
  const { data: limitedPartners, isLoading: isLoadingLimitedPartners } = useGetLimitedPartnersQuery();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control: postControl, handleSubmit: handlePostSubmit, errors: postErrors } = useCreatePostForm(handleClose);

  useEffect(() => {
    if (fundId && fundUpdatesData) {
      const filteredUpdates = fundUpdatesData.filter((update) => update.fund === +fundId);
      setFilteredUpdates(filteredUpdates);
    }
  }, [fundId, fundUpdatesData]);

  const { control, watch } = useForm({
    defaultValues: {
      searchDocuments: '',
      searchUpdates: '',
      searchLimitedPartners: '',
      searchInvestments: ''
    }
  });

  const searchDocumentsValue = watch('searchDocuments');
  const searchLimitedPartnersValue = watch('searchLimitedPartners');
  const searchInvestmentsValue = watch('searchInvestments');
  const navigate = useNavigate();
  
  const [selectedTab, setSelectedTab] = useState("portfolio");
  const [errorMsg, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);
  const [filteredUpdates, setFilteredUpdates] = useState<FundUpdate[]>([]);
  const [filteredLimitedPartners, setFilteredLimitedPartners] = useState<LimitedPartner[]>([]);
  const [filteredInvestments, setFilteredInvestments] = useState<Investment[]>([]);
  
  const handleEdit = () => {
    navigate(`/fund-manager/fund/edit/${fundId}`);
  };

  useEffect(() => {
    if (!searchDocumentsValue) return setFilteredDocs(documents);
    const filteredDocs = searchByTitle(documents, searchDocumentsValue, 'file');
    setFilteredDocs(filteredDocs);
  }, [searchDocumentsValue, documents]);

  useEffect(() => {
    if (!searchLimitedPartnersValue) return setFilteredLimitedPartners(limitedPartners);
    const filteredLimitedPartners = searchByTitle(limitedPartners, searchLimitedPartnersValue, 'name');
    setFilteredLimitedPartners(filteredLimitedPartners);
  }, [searchLimitedPartnersValue, limitedPartners]);

  useEffect(() => {
    if (!searchInvestmentsValue) {
      setFilteredInvestments(investmentsData || []);
      return;
    }
    const filtered = searchByTitle(investmentsData || [], searchInvestmentsValue, 'company');
    setFilteredInvestments(filtered);
  }, [searchInvestmentsValue, investmentsData]);
  
  const handleAddNew = () => {
    navigate('/fund-manager/investment/new');
  };

  const handleAddLimitedPartner = () => {
    navigate('/fund-manager/limited-partner/new');
  };
  
  const fetchDocuments = async () => {
    try {
      const docs = await getUserDocuments(fundId);
      setDocuments(docs);
      setFilteredDocs(docs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    }
  };

  const handleModalClose = () => {
    setIsUploadModalOpen(false);
  };

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
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{
          ...commonButtonStyles,
          ml: "-12px",
        }}
      >
        <ArrowBack fontSize="small" sx={{ mr: "3px", }} />
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
          border: "1px solid",
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
                {fundData?.name}
              </Typography>
              <IconButton
                onClick={() => window.open(fundData?.website_url, "_blank")}
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
            <Box sx={boxRowStyles}>
              <Typography variant="body2">Legal Entity:</Typography>
              <Typography variant="body2" color="text.secondary">
                {fundData?.legal_entity}
              </Typography>
            </Box>

            <Box sx={boxRowStyles}>
              <Typography variant="body2">Description:</Typography>
              <Typography variant="body2" color="text.secondary">
                {fundData?.description}
              </Typography>
            </Box>

            <Box sx={boxRowStyles}>
              <Typography variant="body2">Fund Size:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(fundData?.fund_size)} AUM
              </Typography>
            </Box>

            <Box sx={boxRowStyles}>
              <Typography variant="body2">Estimated Value:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(fundData?.estimated_value || fundData?.fund_size)}
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
        <>
          <Box sx={{ display: 'flex', gap: 2, my: 4 }}>
            <Input
              type="text"
              name="searchInvestments"
              control={control}
              placeholder="Search investments..."
              sx={commonInputStyles}
            />
            <Button
              onClick={handleAddNew}
              sx={blackButtonStyles}
            >
              Add New
            </Button>
          </Box>
          <InvestmentsList
            investments={filteredInvestments}
          />
        </>

      )}
      {selectedTab === "limited-partners" && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Input
              type="text"
              name="searchLimitedPartners"
              control={control}
              placeholder="Search..."
              sx={commonInputStyles}
            />
            <Button
              onClick={handleAddLimitedPartner}
              variant="contained"
              sx={blackButtonStyles}
            >
              Add New
            </Button>
          </Box>
          <LimitedPartnersList limitedPartners={filteredLimitedPartners} isLoading={isLoadingLimitedPartners} />
        </>
      )}
      {selectedTab === "updates" && (
        <>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Input
              type="text"
              name="searchUpdates"
              control={control}
              placeholder="Search updates..."
              sx={commonInputStyles}
            />
            <Button
              onClick={handleOpen}
              sx={blackButtonStyles}
            >
              Add New
            </Button>
          </Box>
          <FundUpdatesList updates={filteredUpdates} />
          <FundUpdateModal
            open={open}
            onClose={handleClose}
            onSubmit={handlePostSubmit}
            control={postControl}
            errors={postErrors}
          />
        </>
      )}
      
      {selectedTab === "documents" && (
        <>
          <Box sx={{ display: 'flex', gap: 2, my: 4 }}>
            <Input
              type="text"
              name="searchDocuments"
              control={control}
              placeholder="Search documents..."
              sx={commonInputStyles}
            />
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              sx={blackButtonStyles}
            >
              Upload New
            </Button>
          </Box>
          <DocumentsList
            documents={filteredDocs}
          />
          <UploadDocumentModal
            open={isUploadModalOpen}
            onClose={handleModalClose}
            onDocumentUploaded={() => {
              handleModalClose();
              fetchDocuments();
            }}
          />
        </>
      )}
    </Box>
  );
};

export default FundView;
