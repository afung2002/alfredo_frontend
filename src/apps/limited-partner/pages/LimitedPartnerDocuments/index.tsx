import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Document } from '../../../../types';
import UploadDocumentModal from '@components/UploadDocumentModal';
import { searchByTitle } from '@utils/uiUtils';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import DocumentsList from '@components/DocumentsList';
import { useGetDocumentsQuery } from '@services/api/baseApi';
import { Apps } from '@src/constants/apps';

const LimitedPartnerDocuments = () => {
  const { data: documentsData, isLoading: isLoadingDocuments, error: errorDocuments } = useGetDocumentsQuery();

  const { control, watch } = useForm({
    defaultValues: {
      'searchDocuments': ''
    }
  });
  const searchValue = watch('searchDocuments');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>(documentsData || []);
  const [selectedOrientation, setSelectedOrientation] = useState<"row" | "grid">('row');
  const handleOrientationChange = (event: React.MouseEvent<HTMLElement>, newOrientation: "row" | "grid") => {
    if (newOrientation !== null) {
      setSelectedOrientation(newOrientation);
    }
  };
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
          <Box className="flex gap-3 items-center" sx={{ mb: 1 }}>
          <Typography sx={{ textAlign: 'left', fontSize: '1.5rem', lineHeight: '1.334', fontWeight: 500 }}>
              Documents
            </Typography>
            <Chip
              label={documentsData?.length}
              color="secondary"
              sx={{ fontSize: '0.875rem', fontWeight: 700, borderRadius: '4px' }}
            />
          </Box>
    
          <Box sx={{ display: "flex", gap: 2, mb: 2, width: '100%' }}>
    
            <Input
              rounded
              type="text"
              name="searchDocuments"
              control={control}
              placeholder="Search documents..."
              className="flex flex-col w-full"
            />
    
          </Box>
    
          <DocumentsList selectedOrientation={selectedOrientation}  documents={filteredDocs} isLoading={isLoadingDocuments} />
    
          {/* Upload Modal */}
          <UploadDocumentModal
            open={isUploadModalOpen}
            onClose={handleModalClose}
          />
        </Box>
  )
}

export default LimitedPartnerDocuments