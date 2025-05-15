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
  Theme,
  DialogTitle,
  DialogContent,
  Dialog,
  Button,
} from "@mui/material";
import { FundUpdate, } from "../../../../types";
import { Link } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack, Edit } from "@mui/icons-material";
import InvestmentsList from "@components/InvestmentsList";
import DocumentsList from "@components/DocumentsList";
import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { searchByTitle } from "@utils/uiUtils";
import UploadDocumentModal from "@components/UploadDocumentModal";
import LimitedPartnersList from "@components/LimitedPartnersList";
import FundUpdatesList from "@components/FundUpdatesList";
import {
  useGetDocumentsByFundIdQuery,
  useGetDocumentsQuery,
  useGetFundByIdQuery,
  useGetFundUpdatesQuery,
  useGetInvestmentsQuery, useGetLimitedPartnersQuery,
  useLazyGetLimitedPartnersQuery
} from "@services/api/baseApi";
import useCreatePostForm from "./hooks/useCreatePostForm";
import FundUpdateModal from "@components/FundUpdateModal";
import { formatNumberString } from "../../../../utils";
import { DocumentResponse, InvestmentResponse, LimitedPartnerResponse } from "@services/api/baseApi/types";
import { Routes } from "../../../../constants/routes";
import NewLimitedPartnerFundForm from "../../../../components/NewLimitedPartnerFundForm";
import { Apps } from "@src/constants/apps";
import { useAppContext } from "@src/context/appContext";
import FeedbackModal from "../../../../components/FeedbackModal";

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

const filterTabs = [
  { label: "Portfolio", value: "portfolio" },
  { label: "Limited Partners", value: "limited-partners" },
  { label: "Updates", value: "updates" },
  { label: "Documents", value: "documents" },
];

const limitedPartnersAppFilterTabs = [
  { label: "Portfolio", value: "portfolio" },
  { label: "Updates", value: "updates" },
  { label: "Documents", value: "documents" },
];
const FundView: React.FC = () => {
  const { fundId } = useParams();
  const { data: fundData, isLoading, error } = useGetFundByIdQuery(fundId ? Number(fundId) : 0, { skip: !fundId });
  const { data: documentsData, isLoading: isLoadingDocuments, error: errorDocuments } = useGetDocumentsByFundIdQuery(fundId)

  const { data: fundUpdatesData, isLoading: isFundUpdatesLoading, error: fundUpdatesError } = useGetFundUpdatesQuery();
  const { data: investmentsData, isLoading: isInvestmentsLoading, error: investmentsError } = useGetInvestmentsQuery({ fund: fundId ? +fundId : 0 });
  const [getLimitedPartners, { data: limitedPartners, isLoading: isLoadingLimitedPartners }] = useLazyGetLimitedPartnersQuery();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control: postControl, handleSubmit: handlePostSubmit, errors: postErrors, setValue } = useCreatePostForm(handleClose);

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
  useEffect(() => {
    if (isLoadingLimitedPartners) return;
    if (limitedPartners) {

      const fundLimitedPartners = limitedPartners.filter((partner) => partner.fund === +fundId);
      setFilteredLimitedPartners(fundLimitedPartners || []);
    }
  }, [limitedPartners]);
  const searchDocumentsValue = watch('searchDocuments');
  const searchLimitedPartnersValue = watch('searchLimitedPartners');
  const searchInvestmentsValue = watch('searchInvestments');
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState("portfolio");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [filteredDocs, setFilteredDocs] = useState<DocumentResponse[] | []>(documentsData || []);
  const [filteredUpdates, setFilteredUpdates] = useState<FundUpdate[]>([]);
  const [filteredLimitedPartners, setFilteredLimitedPartners] = useState<LimitedPartnerResponse[]>([]);
  const [filteredInvestments, setFilteredInvestments] = useState<InvestmentResponse[]>([]);
  const [isLimitedPartnerModelOpen, setIsLimitedPartnerModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const handleEdit = () => {
    navigate(Routes.FUND_MANAGER_FUND_EDIT.replace(':fundId', fundId || ''));
  };
  const { app } = useAppContext();
  useEffect(() => {
    if (!searchDocumentsValue) return setFilteredDocs(documentsData || []);
    const filteredDocs = searchByTitle(documentsData, searchDocumentsValue, 'file');
    setFilteredDocs(filteredDocs || []);
  }, [searchDocumentsValue, documentsData]);

  useEffect(() => {
    if (!searchLimitedPartnersValue) return setFilteredLimitedPartners(limitedPartners || []);
    const filteredLimitedPartners = searchByTitle(limitedPartners, searchLimitedPartnersValue, 'name');
    setFilteredLimitedPartners(filteredLimitedPartners || []);
  }, [searchLimitedPartnersValue, limitedPartners]);

  useEffect(() => {
    if (!searchInvestmentsValue) {
      setFilteredInvestments(investmentsData || []);
      return;
    }
    const filtered = searchByTitle(investmentsData || [], searchInvestmentsValue, 'company');
    setFilteredInvestments(filtered || []);
  }, [searchInvestmentsValue, investmentsData]);

  const handleAddNew = () => {
    console.log('fundId', fundId)
    console.log('fundName', fundData?.name)
    navigate(Routes.FUND_MANAGER_NEW_INVESTMENT, {
      state: {
        fundId: fundId,
        fundName: fundData?.name
      }
    });
  };


  // const handleAddLimitedPartner = () => {
  //   navigate(Routes.FUND_MANAGER_NEW_LIMITED_PARTNER);
  // };
  useEffect(() => {
    if (app === Apps.LIMITED_PARTNER) return
    getLimitedPartners();
  }, [app])

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
        <Alert severity="error">Something went wrong</Alert>
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
                onClick={() => window.open(fundData?.website_url as string, "_blank")}
                size="small"
                sx={{ color: "text.secondary" }}
                title="Open website"
              >
                <Link fontSize="small" />
              </IconButton>
            </Box>
            {
              app !== Apps.LIMITED_PARTNER && (
                <IconButton size="small" sx={{ color: "black" }} onClick={handleEdit}>
                  <Edit />
                </IconButton>
              )
            }

          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <Box sx={boxRowStyles}>
              <Typography variant="body2">Name:</Typography>
              <Typography variant="body2" color="text.secondary">
                {fundData?.name}
              </Typography>
            </Box>

            <Box sx={boxRowStyles}>
              <Typography variant="body2">Description:</Typography>
              <Typography variant="body2" color="text.secondary"
              >
                {fundData?.description}
              </Typography>
            </Box>

            <Box sx={boxRowStyles}>
              <Typography variant="body2">Fund Size:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatNumberString(fundData?.fund_size ?? null)} AUM
              </Typography>
            </Box>

            <Box sx={boxRowStyles}>
              <Typography variant="body2">Estimated Value:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatNumberString(fundData?.estimated_value ?? fundData?.fund_size ?? null)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Tabs
        sx={{
          mt: 4,
          mb: 2,
        }}
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons={false}
        TabIndicatorProps={{ style: { display: 'none' } }}

      >
        {
          app !== Apps.LIMITED_PARTNER &&
          filterTabs.map((tab) => (
            <Tab
              disableFocusRipple
              disableTouchRipple
              sx={{
                minHeight: 32,
                minWidth: 'auto',
                px: 4,
                borderRadius: '50px',
                textTransform: 'none',
                bgcolor: 'transparent !important', // Set background transparent
                color: 'gray',
                mx: 1,
                fontSize: 14,
                fontWeight: 600,
                border: '1px solid gray',
                '&.Mui-selected': {
                  border: '1px solid black',
                  bgcolor: 'transparent !important', // Ensure selected tab is also transparent
                  color: 'black', // Optional: change color for selected tab
                },

              }}
              key={tab.value}
              label={tab.label}
              value={tab.value}
              disableRipple
            />
          ))}

        {
          app === Apps.LIMITED_PARTNER &&
          limitedPartnersAppFilterTabs.map((tab) => (
            <Tab
            sx={{
              minHeight: 32,
              minWidth: 'auto',
              px: 4,
              borderRadius: '50px',
              textTransform: 'none',
              bgcolor: 'transparent !important', // Set background transparent
              color: 'gray',
              mx: 1,
              fontSize: 14,
              fontWeight: 600,
              border: '1px solid gray',
              '&.Mui-selected': {
                border: '1px solid black',
                bgcolor: 'transparent !important', // Ensure selected tab is also transparent
                color: 'black', // Optional: change color for selected tab
              },

            }}
              key={tab.value}
              label={tab.label}
              value={tab.value}
              disableRipple
            />
          ))
        }
      </Tabs>
      <Box sx={{ width: '100%' }}>
        {selectedTab === "portfolio" && (
          <>
            <Box sx={{ display: 'flex', gap: 2, mb: 3, width: '100%' }}>
              <Input
                rounded
                className="w-full"
                type="text"
                name="searchInvestments"
                control={control}
                placeholder="Search investments..."
              />
              {
                app !== Apps.LIMITED_PARTNER && (
                  <Button
                    onClick={handleAddNew}
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
                    Add New
                  </Button>
                )
              }

            </Box>
            <InvestmentsList
              isLoading={isInvestmentsLoading}
              error={investmentsError}
              investments={filteredInvestments}
            />
          </>

        )}
        {selectedTab === "limited-partners" && (
          <>
            <Box sx={{ display: "flex", gap: 2, mb: 3, width: '100%' }}>
              <Input
                rounded
                className="w-full"
                type="text"
                name="searchLimitedPartners"
                control={control}
                placeholder="Search..."
              />

              <Button
                onClick={() => setIsLimitedPartnerModalOpen(true)}
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
                Add New
              </Button>
            </Box>
            <LimitedPartnersList page="Fund" limitedPartners={fundData?.limited_partners} isLoading={isLoadingLimitedPartners} />


          </>
        )}
        {selectedTab === "updates" && (
          <>
            <Box sx={{ display: "flex", gap: 2, mb: 3, width: '100%' }}>
              <Input
                rounded
                className="w-full"
                type="text"
                name="searchUpdates"
                control={control}
                placeholder="Search updates..."
              />
              {
                app !== Apps.LIMITED_PARTNER && (
                  <Button
                    onClick={handleOpen}
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
                    Add New
                  </Button>
                )
              }

            </Box>
            <FundUpdatesList
              updates={filteredUpdates}
              isLoading={isFundUpdatesLoading}
              error={fundUpdatesError} />
            <FundUpdateModal
              open={open}
              onClose={handleClose}
              onSubmit={handlePostSubmit}
              control={postControl}
              errors={postErrors}
              setValue={setValue}
            />
          </>
        )}

        {selectedTab === "documents" && (
          <>
            <Box sx={{ display: 'flex', gap: 2, mb: 3, width: '100%' }}>
              <Input
                rounded
                className="w-full"
                type="text"
                name="searchDocuments"
                control={control}
                placeholder="Search documents..."
              />
              {
                app !== Apps.LIMITED_PARTNER && (
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
                )
              }
            </Box>
            <DocumentsList
              documents={filteredDocs}
            />
            <UploadDocumentModal
              open={isUploadModalOpen}
              onClose={handleModalClose}
              fundId={fundId}
            />
          </>
        )}
      </Box>
      <Dialog open={isLimitedPartnerModelOpen} onClose={() => setIsLimitedPartnerModalOpen(false)}>
        <DialogTitle>Add Limited Partner</DialogTitle>
        <DialogContent>
          <NewLimitedPartnerFundForm 
          openFeedbackModal={() => setIsFeedbackModalOpen(true)}
          fundId={fundId} 
          closeModal={() => setIsLimitedPartnerModalOpen(false)} 
          fundLimitedPartners={fundData?.limited_partners} />
        </DialogContent>
      </Dialog>
      <FeedbackModal
      open={isFeedbackModalOpen}
      setIsFeedbackModalOpen={setIsFeedbackModalOpen}
      title="Invite Sent!"
      buttonText="Got it"
      
    >
      <Typography>Your invitation has been sent </Typography>
    </FeedbackModal>
    </Box>
  );
};

export default FundView;
