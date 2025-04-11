import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Tab, Tabs, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DocumentCard from '@components/DocumentCard';
import { getUserDocuments } from '@services/index';
import { Document } from '../../../../types';
import UploadDocumentModal from '@components/UploadDocumentModal';
import { Routes } from '../../../../constants/routes';
import { searchByTitle } from '../../../../utils/uiUtils';
import Input from '../../../../components/Input';
import { useForm } from 'react-hook-form';
import Button from '@components/Button';
import DocumentsList from '../../../../components/DocumentsList';
import { useGetDocumentsQuery } from '@services/api/baseApi';
const Documents = () => {
  const { data: documentsData, isLoading: isLoadingDocuments, error: errorDocuments } = useGetDocumentsQuery();
  const { control, watch, setValue } = useForm({
        defaultValues: {
          'searchDocuments': ''
        }
      });
  const searchValue = watch('searchDocuments');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocs, setFilteredDocs] = useState<Document[]>(documentsData || []);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
useEffect(() => {
  const filteredDocs = searchByTitle(documentsData, searchValue, 'file');
  setFilteredDocs(filteredDocs);
  }, [searchValue]);
  const filterTabs = [
    { label: "All", value: "all" },
    { label: "Angel", value: "angel" },
    { label: "Fund", value: "fund" },
  ];

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
  useEffect(() => {
    console.log(selectedTab)
    const filteredDocs = documents.filter((doc) => {
      if (selectedTab === 'all') return true;
      return doc.type === selectedTab;
    });
    setFilteredDocs(filteredDocs);
    setValue('searchDocuments', '');
  }, [selectedTab, documents]);
  const handleModalClose = () => {
    setIsUploadModalOpen(false);
    // Refresh documents list
    // setDocuments([]);
  }
  // Calculate total documents
  const totalDocuments = documents.length;

  // Calculate total documents by type
  const investmentDocuments = documents.filter(doc => doc.companyName?.includes('Investment')).length;
  const fundDocuments = documents.filter(doc => doc.companyName?.includes('Fund')).length;

  const handleAddNew = (event: React.MouseEvent) => {
    // Prevent navigation if clicking the add button
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(Routes.FUND_MANAGER_NEW_DOCUMENT);
  };

  const filteredDocuments = documents.filter(doc =>
    doc.companyName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    doc.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
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
      {/* Document Statistics */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500, textAlign: 'left' }}>
          {totalDocuments} Documents
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2, width: '100%' }}>

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

      </Box>

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

      <DocumentsList documents={filteredDocs} />

      {/* Upload Modal */}
      <UploadDocumentModal
        open={isUploadModalOpen}
        onClose={handleModalClose}
        onDocumentUploaded={() => {
          // Refresh documents list
          // setDocuments([]);
        }}
      />
    </Box>
  );
};

export default Documents; 