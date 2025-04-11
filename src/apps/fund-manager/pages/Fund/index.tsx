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
  Modal,
} from "@mui/material";
import { Fund } from "../../../../types";
import { Link } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack, Edit } from "@mui/icons-material";
import InvestmentsList from "@components/InvestmentsList";
import { getUserDocuments } from "@services/index";
import { useSelector } from "react-redux";
import { selectUserInvestments } from "@redux/selectors/user.selector";
import DocumentsList from "@components/DocumentsList";
import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { searchByTitle } from "@utils/uiUtils";
import Button from "@components/Button";
import UploadDocumentModal from "@components/UploadDocumentModal";
import LimitedPartnersList from "@components/LimitedPartnersList";
import FundUpdatesList from "@components/FundUpdatesList";
import { Routes } from "@constants/routes";
import { useGetFundByIdQuery, useGetFundUpdatesQuery, useGetInvestmentsQuery } from "@services/api/baseApi";
import useCreatePostForm from "./hooks/useCreatePostForm";
import FundUpdateModal from "@components/FundUpdateModal";


const limitedPartners = [
  {
    id: 1,
    name: "Limited Partner 1",
    legalEntity: "Limited Partner 1 legal entity",
    description: "Limited Partner 1 description",
    email: "limitedpartner1@example.com"
  },
  {
    id: 2,
    name: "Limited Partner 2",
    legalEntity: "Limited Partner 2 legal entity",
    description: "Limited Partner 2 description",
    email: "limitedpartner2@example.com"
  },
  {
    id: 3,
    name: "Limited Partner 3",
    legalEntity: "Limited Partner 3 legal entity",
    description: "Limited Partner 3 description",
    email: "limitedpartner3@example.com"
  },
  {
    id: 4,
    name: "Limited Partner 4",
    legalEntity: "Limited Partner 4 legal entity",
    description: "Limited Partner 4 description",
    email: "limitedpartner4@example.com"
  }
];

const filterTabs = [
  { label: "Portfolio", value: "portfolio" },
  { label: "Limited Partners", value: "limited-partners" },
  { label: "Updates", value: "updates" },
  { label: "Documents", value: "documents" },
];

const FundView: React.FC = () => {
  const { fundId } = useParams();
  const { data: fundData, isLoading, error } = useGetFundByIdQuery(fundId || '');
  const { data: fundUpdatesData, isLoading: isLoadingUpdates, error: errorUpdates } = useGetFundUpdatesQuery();
  const { data: investmentsData, isLoading: isLoadingInvestments, error: errorInvestments } = useGetInvestmentsQuery();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    control: postControl,
    handleSubmit: handlePostSubmit,
    postTitle,
    postDescription,
    errors: postErrors,
    reset: resetPostForm,
  } = useCreatePostForm(handleClose);


  useEffect(() => {
    if (fundId && fundUpdatesData) {
      const filteredUpdates = fundUpdatesData.filter((update) => update.fund === +fundId);
      setFilteredUpdates(filteredUpdates);
    }
  }, [fundId, fundUpdatesData]);
  const investments = useSelector(selectUserInvestments);
  const { control, watch,
    setValue, reset, handleSubmit, formState: { errors }
  } = useForm({
    defaultValues: {
      'searchDocuments': '',
      'searchUpdates': '',
      'searchLimitedPartners': '',
      'searchInvestments': ''

    }
  });

  const searchDocumentsValue = watch('searchDocuments');
  const searchUpdatesValue = watch('searchUpdates');
  const searchLimitedPartnersValue = watch('searchLimitedPartners');
  const searchInvestmentsValue = watch('searchInvestments');
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("portfolio");
  const [fund, setFund] = useState<Fund>();
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);
  const [open, setOpen] = useState(false);
  const [filteredUpdates, setFilteredUpdates] = useState<FundUpdate[]>();
  const [filteredLimitedPartners, setFilteredLimitedPartners] = useState<FundUpdate[]>(limitedPartners);
  const [filteredInvestments, setFilteredInvestments] = useState<FundUpdate[]>(investments);
  const handleEdit = () => {
    navigate(Routes.FUND_MANAGER_FUND_EDIT.replace(':fundId', fundId || ''));
  }
  useEffect(() => {
    if (!searchDocumentsValue) return setFilteredDocs(documents);
    const filteredDocs = searchByTitle(documents, searchDocumentsValue, 'file');
    setFilteredDocs(filteredDocs);
  }, [searchDocumentsValue, documents]);

  // useEffect(() => {
  //   if (!searchUpdatesValue) return setFilteredUpdates(updates);
  //   const filteredUpdates = searchByTitle(updates, searchUpdatesValue, 'title');
  //   setFilteredUpdates(filteredUpdates);
  // }, [searchUpdatesValue]);

  useEffect(() => {
    if (!searchLimitedPartnersValue) return setFilteredLimitedPartners(limitedPartners);
    const filteredLimitedPartners = searchByTitle(limitedPartners, searchLimitedPartnersValue, 'name');
    setFilteredLimitedPartners(filteredLimitedPartners);
  }, [searchLimitedPartnersValue]);

  useEffect(() => {
    if (!searchInvestmentsValue) return setFilteredInvestments(investments);
    const filteredInvestments = searchByTitle(investments, searchInvestmentsValue, 'companyName');
    setFilteredInvestments(filteredInvestments);
  }, [searchInvestmentsValue, investments]);
  console.log('Filtered investments:', filteredInvestments); // Log the filtered investments data
  const handleAddNew = () => {
    navigate(Routes.FUND_MANAGER_NEW_INVESTMENT);
  };
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getUserDocuments();
        // Transform the data to match the Document type
        const transformedDocuments: Document[] = data.map((doc: any) => ({
          id: doc._id,
          file: doc.file,
          companyName: doc.companyName,
          description: doc.description,
          uploadDate: doc.uploadDate,
          type: doc.type,
          size: doc.size,
          fileType: doc.fileType,
        }));
        setDocuments(transformedDocuments);
      } catch (err) {
        setError('Failed to fetch documents. Please try again later.');
        console.error('Error fetching documents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);
  const handleModalClose = () => {
    setIsUploadModalOpen(false);
    // Refresh documents list
    // setDocuments([]);
  }
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseInt(fundData?.fundSize || "0"));

  const formattedEstimatedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseInt(fundData?.estimatedValue || "0"));

  // useEffect(() => {
  //   const fetchFund = async () => {
  //     try {
  //       if (fundId) {
  //         const data = await getFundById(fundId);
  //         setFund(data);
  //       } else {
  //         console.error('Fund ID is required');
  //       }
  //     } catch (err) {
  //       setError('Failed to fetch fundData. Please try again later.');
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchFund();
  // }, [fundId]);


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



  if (error) {
    return <div>Fund not found</div>;
  }

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{
          textAlign: "left",
          color: "gray",
          display: "flex",
          justifyContent: "flex-start",
          ml: "-12px",
          "&:hover": {
            color: "black",
          },
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
                {fundData?.name}
              </Typography>
              <IconButton
                onClick={() => window.open(fundData.website_url, "_blank")}
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
                {fundData?.legal_entity}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Description:</Typography>
              <Typography variant="body2" color="text.secondary">
                {fundData?.description}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Fund Size:</Typography>
              <Typography variant="body2" color="text.secondary">
                ${Number(fundData.fund_size).toLocaleString("en-US")} AUM
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Estimated Value:</Typography>
              <Typography variant="body2" color="text.secondary">
                ${Number(fundData.fund_size).toLocaleString("en-US")}
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
          <Box className="flex gap-2 my-4">
            <Input
              type="text"
              name="searchInvestments"
              control={control}
              placeholder="Search investments..."
              className="flex flex-col w-full"
            />
            <Button
              onClick={handleAddNew}
            >
              Add New
            </Button>
          </Box>
          <InvestmentsList
            investments={investmentsData}
          />
        </>

      )}
      {selectedTab === "limited-partners" &&
        (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Input
                type="text"
                name="searchLimitedPartners"
                control={control}
                placeholder="Search..."
                className="flex flex-col w-full"
              />
              {/* <Button
          onClick={handleAddNew}
          variant="contained"
          sx={{
            bgcolor: "black",
            color: "white",
            borderRadius: "5px",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          Add New
        </Button> */}
            </Box>
            <LimitedPartnersList limitedPartners={filteredLimitedPartners} />

          </>
        )
      }
      {selectedTab === "updates" && (
        <>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Input
              type="text"
              name="searchUpdates"
              control={control}
              placeholder="Search updates..."
              className="flex flex-col w-full"
            />
            <Button
              onClick={handleOpen}
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
          <div className="flex gap-2 my-4">
            <Input
              type="text"
              name="searchDocuments"
              control={control}
              placeholder="Search documents..."
              className="flex flex-col w-full"
            />
            <Button
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload New
            </Button>
          </div>

          <DocumentsList
            documents={filteredDocs}
          />
          <UploadDocumentModal
            open={isUploadModalOpen}
            onClose={handleModalClose}
            onDocumentUploaded={() => {
              // Refresh documents list
              // setDocuments([]);
            }}
          />
        </>

      )}
    </Box>
  );
};

export default FundView
