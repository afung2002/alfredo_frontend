import  { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { Document } from '../../../../types';
import UploadDocumentModal from '@components/UploadDocumentModal';
import { searchByTitle } from '@utils/uiUtils';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import Button from '@components/Button';
import DocumentsList from '@components/DocumentsList';
import { useGetDocumentsQuery } from '@services/api/baseApi';

const Documents = () => {
  const { data: documentsData, isLoading: isLoadingDocuments, error: errorDocuments } = useGetDocumentsQuery();

  const { control, watch } = useForm({
    defaultValues: {
      'searchDocuments': ''
    }
  });
  const searchValue = watch('searchDocuments');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>(documentsData || []);
  useEffect(() => {
    if (searchValue === '') {
      setFilteredDocs(documentsData || []);
      return;
    }
    const filteredDocs = searchByTitle(documentsData, searchValue, 'name') || [];
    setFilteredDocs(filteredDocs);
  }, [searchValue, documentsData]);


  // useEffect(() => {
  //   const filteredDocs = documents.filter((doc) => {
  //     if (selectedTab === 'all') return true;
  //     return doc.type === selectedTab;
  //   });
  //   setFilteredDocs(filteredDocs);
  //   setValue('searchDocuments', '');
  // }, [selectedTab, documents, setValue]);
  const handleModalClose = () => {
    setIsUploadModalOpen(false);
  }

  if (isLoadingDocuments) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (errorDocuments) {
    return (
      <Box p={3}>
        <Alert severity="error">
          <>{errorDocuments}</></Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Document Statistics */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500, textAlign: 'left' }}>
          {documentsData?.length} Documents
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


      <DocumentsList documents={filteredDocs} isLoading={isLoadingDocuments} />

      {/* Upload Modal */}
      <UploadDocumentModal
        open={isUploadModalOpen}
        onClose={handleModalClose}
        onDocumentUploaded={() => {
          // No action needed after document upload - component will re-render with refreshed data
        }}
      />
    </Box>
  );
};

export default Documents; 